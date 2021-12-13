import { Component } from "@angular/core";

import { AuthenticationService } from "./auth/services/authentication.service";
import { User } from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  slideRight: boolean = false;
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe((user) => {
      setTimeout(() => {
        this.currentUser = user;
      }, 300);
    });
  }

  handleNavSlide = ($event) => {
    this.slideRight = $event;
  };
}
