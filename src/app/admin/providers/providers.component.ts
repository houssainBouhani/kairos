import {Component, OnInit } from "@angular/core";

//model
import { Provider } from "./model/provider";

//services
import { providers } from "./service/providers.service";
import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-providers",
  templateUrl: "./providers.component.html",
  styleUrls: ["./providers.component.css"],
  providers: [ConfirmationService],
})
export class ProvidersComponent implements OnInit {


  //modal related position config
  position: string;
  displayPosition: boolean;

  providers: Provider;

  loading: boolean = false;

  // provider to be restored or deleted  Provider id , and archived status

  provider: { id: string; archived: boolean };

  constructor(
    private primengConfig: PrimeNGConfig,
    private providerService: providers,
    private ConfirmationService: ConfirmationService,
    private Toast: Toast
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.onGetAllProviders();
  }

  //CRUD

  //get all providers
  onGetAllProviders = () => {
    this.loading = true;
    this.providerService.getAllProviders().subscribe(
      (data: Provider) => {
        this.providers = data;
        this.loading = false;
      },
      (error) => console.log(error)
    );
  };

  //delete provider
  onDeleteProvider = () => {
    this.providerService
      .deleteProvider(this.provider.id)
      .subscribe((response) => {
        this.Toast.success("fournisseur supprimé avec succès");
        this.onGetAllProviders();
        this.ConfirmationService.close();
      });
  };

  // restore provider
  onRestoreProvider = () => {
    this.providerService
      .restoreProvider(this.provider.id)
      .subscribe((response) => {
        this.Toast.success("fournisseur restaurer avec succès");
        this.onGetAllProviders();
        this.ConfirmationService.close();
      });
  };

  //MODAL details position
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  //open DELETE Modal
  DeleteProviderModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous supprimer ce fournisseur ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // provider to be archived
    this.provider = { id, archived };
  };

  //open RESTORE Modal
  RestoreProviderModal = ({ id, archived }) => {
    this.ConfirmationService.confirm({
      message: "Voulez-vous restaurer ce fournisseur ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
    });
    // provider to be deleted
    this.provider = { id, archived };
  };

  //CANCEL close modal
  cancel = () => {
    this.ConfirmationService.close();
  };
}
