import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Toast } from "src/app/shared/services/toast.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.css"],
})
export class ToastComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private toast: Toast) {}

  ngOnInit(): void {
    this.subscription = this.toast.getAlert().subscribe((message) => {
      switch (message && message.type) {
        case "success":
          message.cssClass = "sucess-added";
          message.icon = " las la-clipboard-check";
          break;
        case "error":
          message.cssClass = "danger-added";
          message.icon = " las la-exclamation-circle";
          break;
        case "warning":
          message.cssClass = "warning-added";
          message.icon = "las la-exclamation";
          break;
      }
      this.message = message;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
