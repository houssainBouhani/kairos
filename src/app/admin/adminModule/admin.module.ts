import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// components
import { HumainRessourcesComponent } from "../humain-ressources/humain-ressources.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { PrimaryMaterialComponent } from "../primary-material/primary-material.component";
import { AddMaterialComponent } from "../primary-material/add-material/add-material.component";
import { AddRessourcesComponent } from "../humain-ressources/add-ressources/add-ressources.component";
import { ProvidersComponent } from "../providers/providers.component";
import { AddProviderComponent } from "../providers/add-provider/add-provider.component";
import { ClientsComponent } from "./../clients/clients.component";
import { AddClientsComponent } from "../clients/add-clients/add-clients.component";
import { LotsComponent } from "../lots/lots.component";
import { AddLotsComponent } from "../lots/add-lots/add-lots.component";
import { DepotComponent } from "../depot/depot.component";
import { AddDepotComponent } from "../depot/add-depot/add-depot.component";
import { PackagingComponent } from "../packaging/packaging.component";
import { AddPackagesComponent } from "../packaging/add-packages/add-packages.component";
import { BasicMaterialComponent } from "../basic-material/basic-material.component";
import { AddBasicComponent } from "../basic-material/add-basic/add-basic.component";
import { TransformationComponent } from "./../transformation/transformation.component";

//NG PRIME
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { TooltipModule } from "primeng/tooltip";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@NgModule({
  declarations: [
    DashboardComponent,
    PrimaryMaterialComponent,
    AddMaterialComponent,
    HumainRessourcesComponent,
    AddRessourcesComponent,
    ProvidersComponent,
    AddProviderComponent,
    ClientsComponent,
    AddClientsComponent,
    LotsComponent,
    AddLotsComponent,
    DepotComponent,
    AddDepotComponent,
    PackagingComponent,
    AddPackagesComponent,
    BasicMaterialComponent,
    AddBasicComponent,
    TransformationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
  ],
})
export class AdminModule {}
