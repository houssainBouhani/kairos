import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForgetpwComponent } from "../forgetpw/forgetpw.component";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
  { path: "", component: LoginComponent }, // default route of the module
  { path: "login", component: LoginComponent },
  { path: "forgetpsw", component: ForgetpwComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class authenticationRoutingModule {}
