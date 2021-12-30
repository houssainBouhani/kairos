import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { primaryMatter } from "./../service/primaryMatter.service";
import { Basic, Lot, Provider } from "./../model/primaryMatter";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-add-material",
  templateUrl: "./add-material.component.html",
  styleUrls: ["./add-material.component.css"],
})
export class AddMaterialComponent implements OnInit {
  //add form
  PrimaryMatterForm: FormGroup;
  //loading ui
  loading: boolean = false;
  basicMaterials: Basic[];
  providers: Provider[];
  lots: Lot[];


  constructor(
    private PmService: primaryMatter,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: Toast,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.PmService.getAllBasicMaterial().subscribe((data: Basic[]) => {
      this.basicMaterials = data;
    });

    this.PmService.getAllProvider().subscribe((data: Provider[]) => {
      this.providers = data;
    });

    this.PmService.getAllLot().subscribe((data: Lot[]) => {
      this.lots = data;
      console.log(this.lots)
    });

    this.PrimaryMatterForm = this.fb.group({
      barcode: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      initialQuantity: new FormControl("", [
        Validators.required,
      ]),
      quantityUnit: new FormControl("", [
        Validators.required,
      ]),
      openQuantity: new FormControl("", [Validators.required]),
      dateExp: new FormControl("", [Validators.required]),
      fournisseur: new FormControl("", [Validators.required]),
      lot: new FormControl("", [Validators.required]),
      basic: new FormControl("", [Validators.required]),
    });
  }

  addPrimaryMatter = () => {
    this.loading = true;

    let primarymaterial = {
      barcode: this.PrimaryMatterForm.get("barcode").value,
      description: this.PrimaryMatterForm.get("description").value,
      initialQuantity: this.PrimaryMatterForm.get("initialQuantity").value,
      quantityUnit: this.PrimaryMatterForm.get("quantityUnit").value,
      openQuantity: this.PrimaryMatterForm.get("openQuantity").value,
      dateExp: this.PrimaryMatterForm.get("dateExp").value,
    };

    let fournisseur = this.PrimaryMatterForm.get("fournisseur").value;
    let lot = this.PrimaryMatterForm.get("lot").value;
    let basic = this.PrimaryMatterForm.get("basic").value;

    this.PmService.addPrimarymaterial(
      basic,
      fournisseur,
      lot,
      primarymaterial
    ).subscribe(
      (response) => {
        if (response) {
          this.loading = false;
          this.toast.success("Matière premiére ajouté avec succès .");
          this.router.navigate(["admin/primaryMatter"]);
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.toast.error("Une erreur s'est produite. Veuillez réessayer");
      }
    );
  };

  goBack = () => {
    this.router.navigate(["admin/primaryMatter"]);
  }
}
