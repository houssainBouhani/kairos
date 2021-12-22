import { Provider } from "./../model/provider";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { providers } from "../service/providers.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-edit-provider",
  templateUrl: "./edit-provider.component.html",
  styleUrls: ["./edit-provider.component.css"],
})
export class EditProviderComponent implements OnInit {
  //edit form

  providerForm: FormGroup;
  providerId: string;

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
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.providerId = this.route.snapshot.paramMap.get("id");
    this.getProviderById(this.providerId);

    let contact = this.fb.group({
      lastName: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      nationality: new FormControl("", [Validators.required]),
      sexe: new FormControl("", [Validators.required]),
      Telephone: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      socialNum: new FormControl("", [Validators.required]),
    });

    let adresspresonnel = this.fb.group({
      cityName: new FormControl("", [Validators.required]),
      region: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      streetNum: new FormControl("", [Validators.required]),
      adressdes: new FormControl("", [Validators.required]),
    });

    let adressetravaille = this.fb.group({
      cityName: new FormControl("", [Validators.required]),
      region: new FormControl("", [Validators.required]),
      zip: new FormControl("", [Validators.required]),
      street: new FormControl("", [Validators.required]),
      streetNum: new FormControl("", [Validators.required]),
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
            lastName: provider.contact.lastname,
            firstName: provider.contact.firstname,
            nationality: provider.contact.nationalno,
            sexe: provider.contact.titleid === 1 ? "Mme" : "Mr",
            Telephone: provider.contact.telephone,
            email: provider.contact.email,
            socialNum: provider.contact.raisonsocial,
          },
          adresspresonnel: {
            cityName: provider.adresspresonnel.cityname,
            region: provider.adresspresonnel.regionname,
            zip: provider.adresspresonnel.zip,
            street: provider.adresspresonnel.streetname,
            streetNum: provider.adresspresonnel.streetno,
            adressdes: provider.adresspresonnel.adressdes,
          },
          adressetravaille: {
            cityName: provider.adressetravaille.cityname,
            region: provider.adressetravaille.regionname,
            zip: provider.adressetravaille.zip,
            street: provider.adressetravaille.streetname,
            streetNum: provider.adressetravaille.streetno,
            adressdes: provider.adressetravaille.adressdes,
          },
        });

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
    if (this.currentForm <= 1) {
      this.currentForm = 1;
    }
    this.setFormTitle();
  };

  Onedit = () => {
    console.log(this.providerForm.value)
   this.providerService.editProvider(this.providerId,this.providerForm.value).subscribe((msg)=>{
      console.log(msg);
    },(e)=>{
      console.log(e)
    })
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
