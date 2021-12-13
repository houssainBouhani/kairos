import { AuthGuard } from "./auth/guard/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "authentication",
    loadChildren: () =>
      import("src/app/auth/authenticationModule/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "admin",
    loadChildren: () =>
      import("src/app/admin/adminModule/admin.module").then(
        (m) => m.AdminModule
      ),
    canActivate: [AuthGuard],
  },
  { path: "", redirectTo: "authentication/login", pathMatch: "full" },
  { path: "**", redirectTo: "authentication" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
