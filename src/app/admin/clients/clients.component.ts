import { Component, OnInit } from "@angular/core";
//model
import { Client } from "./model/client";

//services

import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { Toast } from "src/app/shared/services/toast.service";
import { clients } from "./service/clients.service";
clients;

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
  providers: [ConfirmationService],
})
export class ClientsComponent implements OnInit {
  //modal related position config
  position: string;
  displayPosition: boolean;
  clients: Client;
  loading: boolean = false;
  //search
  searchTerm: string;
  // client to be restored or deleted  client id , and archived status
  client: { id: string; archived: boolean };

  constructor(
    private clientService: clients,
    private primengConfig: PrimeNGConfig,
    private ConfirmationService: ConfirmationService,
    private Toast: Toast
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.onGetAllClients();
  }

  //get all clients
  onGetAllClients = () => {
    this.loading = true;
    this.clientService.getAllClients().subscribe(
      (data: Client) => {
        this.clients = data;
        console.log(this.clients);
        this.loading = false;
      },
      (error) => console.log(error)
    );
  };

  //delete client
  onDeleteClient = () => {
    this.loading = true;
    this.clientService.deleteClient(this.client.id).subscribe((response) => {
      this.Toast.success("fournisseur supprimé avec succès");
      this.loading = false;
      this.onGetAllClients();
      this.ConfirmationService.close();
    });
  };

  // restore client
  onRestoreClient = () => {
    this.loading = true;
    this.clientService.restoreClient(this.client.id).subscribe((response) => {
      this.Toast.success("fournisseur restaurer avec succès");
      this.loading = false;
      this.onGetAllClients();
      this.ConfirmationService.close();
    });
  };

  //open DELETE Modal
  DeleteClientModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous supprimer ce client?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // client to be archived
    this.client = { id, archived };

  };

  //open RESTORE Modal
  RestoreClientModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous restaurer ce client?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // client to be deleted
    this.client = { id, archived };
  };

  //MODAL details position
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  //CANCEL close modal
  cancel = () => {
    this.ConfirmationService.close();
  };
}
