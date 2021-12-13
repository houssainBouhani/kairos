import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";


//routing
import { AppRoutingModule } from "./app-routing.module";


//components
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ToastComponent } from './components/toast/toast.component';
import { AppComponent } from "./app.component";









@NgModule({
  declarations: [AppComponent, SidenavComponent, ToastComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,HttpClientModule,HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
