import { Toast } from './../../shared/services/toast.service';
import { AuthenticationService } from "./../services/authentication.service";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: "app-forgetpw",
  templateUrl: "./forgetpw.component.html",
  styleUrls: ["./forgetpw.component.css"],
})
export class ForgetpwComponent implements OnInit {
  emailform;
  hideToast = false;
  loading = false;

  constructor(private authenticationService: AuthenticationService, private ToastService: Toast) {}

  ngOnInit(): void {
    this.emailform = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }


  onResetPassword() {
    if (this.emailform.status === "INVALID") {
      this.ToastService.warning("veuillez vérifier le format de votre e-mail");
      return;
    }

    this.loading = true;
    this.authenticationService
      .resetpassword(this.emailform.value.email)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.ToastService.success("un email est envoyé à votre adresse");
        },
        (error) => {
          console.log(error)
        }
      );
  }
}
