import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { clients } from "../service/clients.service";
import { Client } from "./../model/client";
import { Toast } from "src/app/shared/services/toast.service";
import { ValidationForm } from "./../../../shared/helpers/validationsForm";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"],
})
export class EditClientComponent implements OnInit {
  //edit form

  clientForm: FormGroup;
  clientId: string;
  client: Client;

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
    private clientService: clients,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toast: Toast,
    private ValidationFormService: ValidationForm
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get("id");
    this.getClientById(this.clientId);
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

    this.clientForm = this.fb.group({
      contact,
      adressetravaille,
      adresspresonnel,
    });

    this.clientForm.valueChanges.subscribe((value: Client) => {
      if (
        this.clientForm.get("contact").valid &&
        !this.clientForm.get("contact").pristine
      ) {
        this.steps.step1 = true;
      } else {
        this.steps.step1 = false;
      }

      if (
        this.clientForm.get("adresspresonnel").valid &&
        !this.clientForm.get("adresspresonnel").pristine
      ) {
        this.steps.step2 = true;
      } else {
        this.steps.step2 = false;
      }
      if (
        this.clientForm.get("adressetravaille").valid &&
        !this.clientForm.get("adressetravaille").pristine
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
      this.router.navigate(["admin/clients"]);
    }
    this.setFormTitle();
  };

  getClientById = (Clientid: string) => {
    this.loading = true;
    this.clientService.getClientToEdit(Clientid).subscribe(
      (client: Client) => {
        this.clientForm.patchValue({
          contact: {
            lastname: client.contact.lastname,
            firstname: client.contact.firstname,
            nationalno: client.contact.nationalno,
            titleid: client.contact.titleid,
            telephone: client.contact.telephone,
            email: client.contact.email,
            password: client.contact.password,
            raisonsocial: client.contact.raisonsocial,
            remarque: client.contact.remarque,
          },
          adresspresonnel: {
            cityname: client.adresspresonnel.cityname,
            regionname: client.adresspresonnel.regionname,
            zip: client.adresspresonnel.zip,
            streetname: client.adresspresonnel.streetname,
            streetno: client.adresspresonnel.streetno,
            adressdes: client.adresspresonnel.adressdes,
          },
          adressetravaille: {
            cityname: client.adressetravaille.cityname,
            regionname: client.adressetravaille.regionname,
            zip: client.adressetravaille.zip,
            streetname: client.adressetravaille.streetname,
            streetno: client.adressetravaille.streetno,
            adressdes: client.adressetravaille.adressdes,
          },
        });

        this.client = client;

        this.loading = false;
      },
      (error) => console.log(error)
    );
  };

  onEditClient = () => {
    const updatedClient = {
      contact: {
        id: this.client.contact.id,
        ...this.clientForm.get("contact").value,
        password: this.client.contact.password,
        activeFlag: this.client.contact.activeFlag,
        profile: this.client.contact.profil,
        insertdate: this.client.contact.insertdate,
      },
      adresspresonnel: {
        id: this.client.adresspresonnel.id,
        ...this.clientForm.get("adresspresonnel").value,
      },
      adressetravaille: {
        id: this.client.adressetravaille.id,
        ...this.clientForm.get("adressetravaille").value,
      },
    };

    this.loading = true;

    this.clientService.editClient(updatedClient).subscribe(
      (response) => {
        if (response) {
          this.loading = false;
          this.toast.success("client  modifié avec succès");
          this.router.navigate(["/admin/clients"]);
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
