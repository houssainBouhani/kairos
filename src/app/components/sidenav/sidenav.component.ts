import { AuthenticationService } from "./../../auth/services/authentication.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent implements OnInit {
  profileMenuOpened: boolean = false;
  searchMenuOpened: boolean = false;
  notificationMenuOpened: boolean = false;
  mobileMenu: boolean = false;
  mainMenuHoverd: boolean = false;

  @Output() sideNavOpened: EventEmitter<Boolean> = new EventEmitter();

  constructor(private AuthenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onLoggedout() {
    this.AuthenticationService.logout();
  }

  openProfileMenu = () => {
    this.profileMenuOpened = !this.profileMenuOpened;
  };

  openSearchMenu = () => {
    this.searchMenuOpened = !this.searchMenuOpened;
  };

  hideSearchModal = ($event) => {
    $event.srcElement.classList.contains("search-backdrop")
      ? (this.searchMenuOpened = false)
      : null;
  };
  hideNotifModal = ($event) => {
    $event.srcElement.classList.contains("search-backdrop")
      ? (this.notificationMenuOpened = false)
      : null;
  };

  openNotificationMenu = () => {
    this.notificationMenuOpened = !this.notificationMenuOpened;
  };

  openMobileMenu = () => {
    this.mobileMenu = !this.mobileMenu;
  };

  showNav() {
    this.mainMenuHoverd = true;
    this.sideNavOpened.emit(this.mainMenuHoverd);
  }

  hideNav() {
    this.mainMenuHoverd = false;
    this.sideNavOpened.emit(this.mainMenuHoverd);
  }
}
