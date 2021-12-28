import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Components
import { AddClientsComponent } from "../clients/add-clients/add-clients.component";
import { ClientsComponent } from "../clients/clients.component";
import { EditClientComponent } from "../clients/edit-client/edit-client.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { AddRessourcesComponent } from "../humain-ressources/add-ressources/add-ressources.component";
import { HumainRessourcesComponent } from "../humain-ressources/humain-ressources.component";
import { AddLotsComponent } from "../lots/add-lots/add-lots.component";
import { LotsComponent } from "../lots/lots.component";
import { AddMaterialComponent } from "../primary-material/add-material/add-material.component";
import { PrimaryMaterialComponent } from "../primary-material/primary-material.component";
import { AddProviderComponent } from "../providers/add-provider/add-provider.component";
import { ProvidersComponent } from "../providers/providers.component";
import { DepotComponent } from "../depot/depot.component";
import { AddDepotComponent } from "../depot/add-depot/add-depot.component";
import { PackagingComponent } from "../packaging/packaging.component";
import { AddPackagesComponent } from "../packaging/add-packages/add-packages.component";
import { BasicMaterialComponent } from "../basic-material/basic-material.component";
import { AddBasicComponent } from "../basic-material/add-basic/add-basic.component";
import { EditProviderComponent } from "../providers/edit-provider/edit-provider.component";


const routes: Routes = [
  { path: "", component: DashboardComponent }, // default route of the module
  { path: "primaryMatter", component: PrimaryMaterialComponent },
  { path: "primaryMatter/add", component: AddMaterialComponent },
  { path: "humainRessources", component: HumainRessourcesComponent },
  { path: "humainRessources/add", component: AddRessourcesComponent },
  { path: "providers", component: ProvidersComponent },
  { path: "providers/add", component: AddProviderComponent },
  { path: "providers/edit/:id", component: EditProviderComponent },
  { path: "clients", component: ClientsComponent },
  { path: "clients/add", component: AddClientsComponent },
  { path: "clients/edit/:id", component: EditClientComponent },
  { path: "lots", component: LotsComponent },
  { path: "lots/add", component: AddLotsComponent },
  { path: "depot", component: DepotComponent },
  { path: "depot/add", component: AddDepotComponent },
  { path: "packaging", component: PackagingComponent },
  { path: "packaging/add", component: AddPackagesComponent },
  { path: "basicMatter", component: BasicMaterialComponent },
  { path: "basicMatter/add", component: AddBasicComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
