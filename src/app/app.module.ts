import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule } from "@angular/http";

//routing
import { AppRoutingModule } from "./app-routing.module";


//HELPER
import { JwtInterceptor } from "./shared/helpers/jwt.interceptor";

//components
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ToastComponent } from "./components/toast/toast.component";
import { AppComponent } from "./app.component";



@NgModule({
  declarations: [AppComponent, SidenavComponent, ToastComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
