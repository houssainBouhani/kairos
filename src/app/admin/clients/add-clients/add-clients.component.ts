import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { clients } from "../service/clients.service";
import { Client } from "./../model/client";
import { ValidationForm } from "./../../../shared/helpers/validationsForm";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-add-clients",
  templateUrl: "./add-clients.component.html",
  styleUrls: ["./add-clients.component.css"],
})
export class AddClientsComponent implements OnInit {
 //add form

 clientForm: FormGroup;
 clientId: string;

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
     password: new FormControl("", [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
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

 onAddclient = () => {
   this.loading = true;
   console.log(this.clientForm.value);
   this.clientService.addClient(this.clientForm.value).subscribe(
     (response) => {
       if (response) {
         this.loading = false;
         this.toast.success("client ajouté avec succès .");
         this.router.navigate(["admin/clients"]);
       }
     },
     (error) => {
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
