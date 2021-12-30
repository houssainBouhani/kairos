import { PrimaryMatter } from "./model/primaryMatter";
import { Component, OnInit } from "@angular/core";
import { primaryMatter } from "./service/primaryMatter.service";

import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-primary-material",
  templateUrl: "./primary-material.component.html",
  styleUrls: ["./primary-material.component.css"],
  providers: [ConfirmationService],
})
export class PrimaryMaterialComponent implements OnInit {
  primaryMatterList: PrimaryMatter[];
  //modal related position config
  position: string;
  displayPosition: boolean;

  loading: boolean = false;

  //search

  searchTerm: string;

  // provider to be restored or deleted  Pm id , and archived status
  primaryMatter: { id: string; archived: boolean };

  constructor(
    private pmService: primaryMatter,
    private primengConfig: PrimeNGConfig,
    private ConfirmationService: ConfirmationService,
    private Toast: Toast
  ) {}

  ngOnInit(): void {
    this.onGetAllprimaryMatterList();


  }

  //CRUD

  //get all mp
  onGetAllprimaryMatterList = () => {
    this.loading = true;
    this.pmService.getAllPm().subscribe(
      (data: PrimaryMatter[]) => {
        this.primaryMatterList = data;
        this.loading = false;
      },
      (error) => console.log(error)
    );
  };

  //delete primaryMatter
  onDeletePm = () => {
    this.loading = true;
    this.pmService.deletePm(this.primaryMatter.id).subscribe((response) => {
      this.Toast.success("fournisseur supprimé avec succès");
      this.loading = false;
      this.onGetAllprimaryMatterList();
      this.ConfirmationService.close();
    });
  };

  // restore primaryMatter
  onRestorePm = () => {
    this.loading = true;
    this.pmService.restorePm(this.primaryMatter.id).subscribe((response) => {
      this.Toast.success("fournisseur restaurer avec succès");
      this.loading = false;
      this.onGetAllprimaryMatterList();
      this.ConfirmationService.close();
    });
  };

  //open RESTORE Modal
  RestorePmModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous restaurer ce fournisseur ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // primaryMatter to be deleted
    this.primaryMatter = { id, archived };
  };

  //open DELETE Modal
  DeletePmModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous supprimer ce fournisseur ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // primaryMatter to be archived
    this.primaryMatter = { id, archived };
  };

  //CANCEL close modal
  cancel = () => {
    this.ConfirmationService.close();
  };
}
