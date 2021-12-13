import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class Toast {
  private toast = new Subject<any>();

  constructor() {}

  getAlert(): Observable<any> {
    return this.toast.asObservable();
  }

  success(message: string) {
    this.toast.next({ type: "success", text: message });
    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  error(message: string) {
    this.toast.next({ type: "error", text: message });
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  warning(message: string) {
    this.toast.next({ type: "warning", text: message });
    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.toast.next();
  }
}
