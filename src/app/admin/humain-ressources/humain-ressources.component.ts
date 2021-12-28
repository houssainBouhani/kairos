import { Component, OnInit } from "@angular/core";

//model
import { Hr } from "./model/hr";

//services
import { hr } from "./services/hr.service";

import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-humain-ressources",
  templateUrl: "./humain-ressources.component.html",
  styleUrls: ["./humain-ressources.component.css"],
  providers: [ConfirmationService],
})
export class HumainRessourcesComponent implements OnInit {
  //modal related position config
  position: string;
  displayPosition: boolean;

  hrs: Hr[];

  loading: boolean = false;

  //search

  searchTerm: string;

  // provider to be restored or deleted  Provider id , and archived status

  hr: { id: string; archived: boolean };

  adressHome;
  adressWork;
  constructor(
    private primengConfig: PrimeNGConfig,
    private hrService: hr,
    private ConfirmationService: ConfirmationService,
    private Toast: Toast
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.onGetAllHr();
  }

  //get all hr
  onGetAllHr = () => {
    this.loading = true;
    this.hrService.getAllHrs().subscribe(
      (data: Hr[]) => {
        this.hrs = data;

        this.loading = false;
      },
      (error) => console.log(error)
    );
  };

  //delete hr
  onDeleteHr = () => {
    this.loading = true;
    this.hrService.deleteHr(this.hr.id).subscribe((response) => {
      this.Toast.success("ressource humaine supprimé avec succès");
      this.loading = false;
      this.onGetAllHr();
      this.ConfirmationService.close();
    });
  };

  // restore hr
  onRestoreHr = () => {
    this.loading = true;
    this.hrService.restoreHr(this.hr.id).subscribe((response) => {
      this.Toast.success("ressource humaine restaurer avec succès");
      this.loading = false;
      this.onGetAllHr();
      this.ConfirmationService.close();
    });
  };

  //open DELETE Modal
  DeletehrModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous supprimer ce ressource humaine ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    console.log(id);
    // hr to be archived
    this.hr = { id, archived };
  };

  //open RESTORE Modal
  RestorehrModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous restaurer ce ressource humaine ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // hr to be deleted
    this.hr = { id, archived };
  };

  //MODAL details position
  showPositionDialog(position: string, idhr) {
    this.position = position;
    this.displayPosition = true;

    let hrsAdress;
    hrsAdress = this.hrs.filter((hr) => (hr.id === idhr ? hr : null));

    let [hr] = hrsAdress;

    let { adresspresonnel, adressetravaille } = hr;

    this.adressHome = adresspresonnel;
    this.adressWork = adressetravaille;
  }

  //CANCEL close modal
  cancel = () => {
    this.ConfirmationService.close();
  };
}
