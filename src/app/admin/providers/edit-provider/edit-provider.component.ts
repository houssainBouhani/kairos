import { Provider } from "./../model/provider";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { providers } from "../service/providers.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-edit-provider",
  templateUrl: "./edit-provider.component.html",
  styleUrls: ["./edit-provider.component.css"],
})
export class EditProviderComponent implements OnInit {
  //edit form

  providerForm: FormGroup;
  providerId: string;
  provider: Provider;

  //loading ui
  loading: boolean = false;
  // forms steps
  steps = {
    step1: false,
    step2: false,
    step3: false,
  };

  // number of forms
  forms = [1, 2, 3];
  //get current form
  currentForm = this.forms[0];

  formTitle: string = "Contact";

  constructor(
    private providerService: providers,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toast: Toast
  ) {}

  ngOnInit(): void {
    this.providerId = this.route.snapshot.paramMap.get("id");
    this.getProviderById(this.providerId);

    let contact = this.fb.group({
      lastname: new FormControl("", [Validators.required]),
      firstname: new FormControl("", [Validators.required]),
      nationalno: new FormControl("", [Validators.required]),
      titleid: new FormControl("", [Validators.required]),
      telephone: new FormControl("", [Validators.required, Validators.min(8)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      raisonsocial: new FormControl("", [Validators.required]),
      remarque: new FormControl(""),
    });

    let adresspresonnel = this.fb.group({
      cityname: new FormControl("", [Validators.required]),
      regionname: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required]),
      streetname: new FormControl("", [Validators.required]),
      streetno: new FormControl("", [Validators.required]),
      adressdes: new FormControl("", [Validators.required]),
    });

    let adressetravaille = this.fb.group({
      cityname: new FormControl("", [Validators.required]),
      regionname: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required]),
      streetname: new FormControl("", [Validators.required]),
      streetno: new FormControl("", [Validators.required]),
      adressdes: new FormControl("", [Validators.required]),
    });

    this.providerForm = this.fb.group({
      contact,
      adressetravaille,
      adresspresonnel,
    });

    this.providerForm.valueChanges.subscribe((value: Provider) => {
      if (
        this.providerForm.get("contact").valid &&
        !this.providerForm.get("contact").pristine
      ) {
        this.steps.step1 = true;
      } else {
        this.steps.step1 = false;
      }

      if (
        this.providerForm.get("adresspresonnel").valid &&
        !this.providerForm.get("adresspresonnel").pristine
      ) {
        this.steps.step2 = true;
      } else {
        this.steps.step2 = false;
      }
      if (
        this.providerForm.get("adressetravaille").valid &&
        !this.providerForm.get("adressetravaille").pristine
      ) {
        this.steps.step3 = true;
      } else {
        this.steps.step3 = false;
      }
    });
  }

  getProviderById = (Providerid: string) => {
    this.loading = true;
    this.providerService.getProviderToEdit(Providerid).subscribe(
      (provider: Provider) => {
        this.providerForm.patchValue({
          contact: {
            lastname: provider.contact.lastname,
            firstname: provider.contact.firstname,
            nationalno: provider.contact.nationalno,
            titleid: provider.contact.titleid,
            telephone: provider.contact.telephone,
            email: provider.contact.email,
            raisonsocial: provider.contact.raisonsocial,
            remarque: provider.contact.remarque,
          },
          adresspresonnel: {
            cityname: provider.adresspresonnel.cityname,
            regionname: provider.adresspresonnel.regionname,
            zip: provider.adresspresonnel.zip,
            streetname: provider.adresspresonnel.streetname,
            streetno: provider.adresspresonnel.streetno,
            adressdes: provider.adresspresonnel.adressdes,
          },
          adressetravaille: {
            cityname: provider.adressetravaille.cityname,
            regionname: provider.adressetravaille.regionname,
            zip: provider.adressetravaille.zip,
            streetname: provider.adressetravaille.streetname,
            streetno: provider.adressetravaille.streetno,
            adressdes: provider.adressetravaille.adressdes,
          },
        });

        this.provider = provider;
        this.loading = false;
      },
      (error) => console.log(error)
    );
  };

  // move to next step
  next = () => {
    this.currentForm++;
    if (this.currentForm > this.forms.length) {
      this.currentForm = 3;
    }
    this.setFormTitle();
  };

  // go back to previous step
  previous = () => {
    this.currentForm--;
    if (this.currentForm < 1) {
      this.router.navigate(["admin/providers"]);
    }
    this.setFormTitle();
  };

  onEditProvider = () => {
    const updatedProvider = {
      contact: {
        id: this.provider.contact.id,
        ...this.providerForm.get("contact").value,
        password: null,
        activeFlag: this.provider.contact.activeFlag,
        profile: this.provider.contact.profil,
        insertdate: this.provider.contact.insertdate,
      },
      adresspresonnel: {
        id: this.provider.adresspresonnel.id,
        ...this.providerForm.get("adresspresonnel").value,
      },
      adressetravaille: {
        id: this.provider.adressetravaille.id,
        ...this.providerForm.get("adressetravaille").value,
      },
    };

    this.loading = true;
    this.providerService.editProvider(updatedProvider).subscribe(
      (response) => {
        if (response) {
          this.loading = false;
          this.toast.success("fournisseur supprimé avec succès");
          this.router.navigate(["/admin/providers"]);
        }
      },
      (e) => {
        this.loading = false;
        this.toast.error("Une erreur s'est produite. Veuillez réessayer");
      }
    );
  };

  // set form title dynamically depends on step number
  setFormTitle = () => {
    switch (this.currentForm) {
      case 1:
        this.formTitle = "Contact";
        break;
      case 2:
        this.formTitle = "Adresse Personnel";
        break;
      case 3:
        this.formTitle = "Adresse Travaille";
        break;
    }
  };
}
