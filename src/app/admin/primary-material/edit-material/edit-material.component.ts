import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { primaryMatter } from "./../service/primaryMatter.service";
import { Basic, Lot, Provider, PrimaryMatter } from "./../model/primaryMatter";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-edit-material",
  templateUrl: "./edit-material.component.html",
  styleUrls: ["./edit-material.component.css"],
})
export class EditMaterialComponent implements OnInit {
  //add form
  PrimaryMatterForm: FormGroup;
  //loading ui
  loading: boolean = false;
  basicMaterials: Basic;
  providers: Provider;
  lots: Lot;

  primaryMatter: PrimaryMatter;

  pmId: string;
  constructor(
    private PmService: primaryMatter,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: Toast,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pmId = this.route.snapshot.paramMap.get("id");
    this.getPrimarymaterialById(this.pmId);

    this.PrimaryMatterForm = this.fb.group({
      barcode: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      initialQuantity: new FormControl("", [Validators.required]),
      quantityUnit: new FormControl("", [Validators.required]),
      openQuantity: new FormControl("", [Validators.required]),
      dateExp: new FormControl("", [Validators.required]),
      fournisseur: new FormControl("", [Validators.required]),
      lot: new FormControl("", [Validators.required]),
      basic: new FormControl("", [Validators.required]),
    });
  }

  getPrimarymaterialById = (Pmid: string) => {
    this.loading = true;
    this.PmService.getAllBasicMaterial().subscribe((data: Basic) => {
      this.basicMaterials = data;
    });

    this.PmService.getAllProvider().subscribe((data: Provider) => {
      this.providers = data;
    });

    this.PmService.getAllLot().subscribe((data: Lot) => {
      this.lots = data;
    });

    this.PmService.getPrimarymaterialToEdit(Pmid).subscribe(
      (pm: PrimaryMatter) => {
        this.PrimaryMatterForm.patchValue({
          barcode: pm.barcode,
          description: pm.description,
          initialQuantity: pm.initialQuantity,
          quantityUnit: pm.quantityUnit,
          openQuantity: pm.openQuantity,
          dateExp: new Date(pm.dateExp),
          fournisseur: pm.lot.provider?.contact.email,
          lot: pm.lot.description,
          basic: pm.basic.basicdes,
        });
        this.primaryMatter = pm;
        console.log(this.primaryMatter);
      },
      (error) => console.log(error)
    );
  };

  onUpdateMp = () => {
    this.loading = true;
    const updated = {
      ...this.primaryMatter,
      barcode: this.PrimaryMatterForm.get("barcode").value,
      description: this.PrimaryMatterForm.get("description").value,
      initialQuantity: this.PrimaryMatterForm.get("initialQuantity").value,
      quantityUnit: this.PrimaryMatterForm.get("quantityUnit").value,
      openQuantity: this.PrimaryMatterForm.get("openQuantity").value,
      dateExp: this.PrimaryMatterForm.get("dateExp").value,
      basic: {
        ...this.primaryMatter.basic,
        basicdes: this.PrimaryMatterForm.get("basic").value,
      },
    };

    this.PmService.updatePrimaryMaterial(updated).subscribe(
      (response) => {
        if (response) {
          this.loading = false;
          this.toast.success("Matière premiére modifié avec succès .");
          this.router.navigate(["admin/primaryMatter"]);
        }
      },
      (e) => console.log(e)
    );
  };
}
