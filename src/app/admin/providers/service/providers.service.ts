import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONFIG } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class providers {
  constructor(private http: HttpClient) {}

  getAllProviders = () => {
    return this.http.get(`${CONFIG.URL}api/Provider/afficherall`);
  };


  deleteProvider = (providerId) => {
    return this.http.post(
      `${CONFIG.URL}api/Provider/archiver?id=${providerId}`,
      providerId
    );
  };

  restoreProvider = (providerId) => {
    return this.http.post(
      `${CONFIG.URL}api/Provider/desarchiver?id=${providerId}`,
      providerId
    );
  };


  getProviderToEdit = (providerId) => {
    return this.http.get(
      `${CONFIG.URL}api/Provider/afficherbyid?id=${providerId}`
    );
  };

  addProvider = (provider) => {
    return this.http.post(`${CONFIG.URL}api/Provider/add`, provider);
  };

  editProvider = (editedProvider) => {
    return this.http.put(`${CONFIG.URL}api/Provider/update`, editedProvider);
  }

}
