import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Toast } from "src/app/shared/services/toast.service";
import { ValidationForm } from "./../../../shared/helpers/validationsForm";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Hr } from "./../model/hr";
import { hr } from "./../services/hr.service";

@Component({
  selector: "app-edit-ressources",
  templateUrl: "./edit-ressources.component.html",
  styleUrls: ["./edit-ressources.component.css"],
})
export class EditRessourcesComponent implements OnInit {
  //edit form

  hrForm: FormGroup;
  hrId: string;
  hr: Hr;

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
    private hrService: hr,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toast: Toast,
    private ValidationFormService: ValidationForm
  ) {}

  ngOnInit(): void {
    this.hrId = this.route.snapshot.paramMap.get("id");
    this.getHrById(this.hrId);
    let contact = this.fb.group({
      lastname: new FormControl("", [Validators.required]),
      firstname: new FormControl("", [Validators.required]),
      nationalno: new FormControl("", [Validators.required]),
      titleid: new FormControl("", [Validators.required]),
      telephone: new FormControl("", [
        Validators.required,
        this.ValidationFormService.validateNumber,
      ]),
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

    this.hrForm = this.fb.group({
      contact,
      adressetravaille,
      adresspresonnel,
    });

    this.hrForm.valueChanges.subscribe((value: Hr) => {
      if (
        this.hrForm.get("contact").valid &&
        !this.hrForm.get("contact").pristine
      ) {
        this.steps.step1 = true;
      } else {
        this.steps.step1 = false;
      }

      if (
        this.hrForm.get("adresspresonnel").valid &&
        !this.hrForm.get("adresspresonnel").pristine
      ) {
        this.steps.step2 = true;
      } else {
        this.steps.step2 = false;
      }
      if (
        this.hrForm.get("adressetravaille").valid &&
        !this.hrForm.get("adressetravaille").pristine
      ) {
        this.steps.step3 = true;
      } else {
        this.steps.step3 = false;
      }
    });
  }

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
      this.router.navigate(["admin/humainRessources"]);
    }
    this.setFormTitle();
  };

  getHrById = (Hrid: string) => {
    this.loading = true;
    this.hrService.getHrToEdit(Hrid).subscribe(
      (hr: Hr) => {
        this.hrForm.patchValue({
          contact: {
            lastname: hr.contact.lastname,
            firstname: hr.contact.firstname,
            nationalno: hr.contact.nationalno,
            titleid: hr.contact.titleid,
            telephone: hr.contact.telephone,
            email: hr.contact.email,
            password: hr.contact.password,
            raisonsocial: hr.contact.raisonsocial,
            remarque: hr.contact.remarque,
          },
          adresspresonnel: {
            cityname: hr.adresspresonnel.cityname,
            regionname: hr.adresspresonnel.regionname,
            zip: hr.adresspresonnel.zip,
            streetname: hr.adresspresonnel.streetname,
            streetno: hr.adresspresonnel.streetno,
            adressdes: hr.adresspresonnel.adressdes,
          },
          adressetravaille: {
            cityname: hr.adressetravaille.cityname,
            regionname: hr.adressetravaille.regionname,
            zip: hr.adressetravaille.zip,
            streetname: hr.adressetravaille.streetname,
            streetno: hr.adressetravaille.streetno,
            adressdes: hr.adressetravaille.adressdes,
          },
        });

        this.hr = hr;
        this.loading = false;
      },
      (error) => console.log(error)
    );
  };
  onEditHr = () => {
    const updatedHr = {
      contact: {
        id: this.hr.contact.id,
        ...this.hrForm.get("contact").value,
        password: this.hr.contact.password,
        activeFlag: this.hr.contact.activeFlag,
        profile: this.hr.contact.profil,
        insertdate: this.hr.contact.insertdate,
      },
      adresspresonnel: {
        id: this.hr.adresspresonnel.id,
        ...this.hrForm.get("adresspresonnel").value,
      },
      adressetravaille: {
        id: this.hr.adressetravaille.id,
        ...this.hrForm.get("adressetravaille").value,
      },
    };

    this.loading = true;



    this.hrService.editHr(updatedHr).subscribe(
      (response) => {
        if (response) {
          this.loading = false;
          this.toast.success("humainRessources modifié avec succès");
          this.router.navigate(["/admin/humainRessources"]);
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
