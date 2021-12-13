import { Toast } from "./../../shared/services/toast.service";
import { AuthenticationService } from "./../services/authentication.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  validForm: string;
  loginform: FormGroup;
  loading = false;
  showPassword = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private ToastService: Toast
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["admin"]);
    }
  }

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (this.loginform.status === "INVALID") {
      this.ToastService.warning("le format e-mail/mot de passe n'est pas valide.");
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginform.value).subscribe(
      (data) => {
        this.ToastService.success("Connecté avec succès");
        this.router.navigate(["admin"]);
      },
      (error) => {
        this.loading = false;
        this.ToastService.error("s'il vous plaît vérifier vos informations d'identification");
      }
    );
  }
}
