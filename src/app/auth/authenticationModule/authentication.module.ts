
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


//routing
import { authenticationRoutingModule } from "./authentication.routing";

//components
import { LoginComponent } from "../login/login.component";
import { ForgetpwComponent } from "../forgetpw/forgetpw.component";



@NgModule({
  imports: [
    CommonModule,
    authenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [LoginComponent, ForgetpwComponent],
})
export class AuthenticationModule {}
