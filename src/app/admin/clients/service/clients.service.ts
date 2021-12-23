import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONFIG } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class clients {
  constructor(private http: HttpClient) {}

  getAllClients = () => {
    return this.http.get(`${CONFIG.URL}api/Customer/getAllCustomer`);
  };

  deleteClient = (clientId) => {
    return this.http.post(
      `${CONFIG.URL}api/Customer/archiver?id=${clientId}`,
      clientId
    );
  };

  restoreClient = (clientId) => {
    return this.http.post(
      `${CONFIG.URL}api/Customer/desarchiver?id=${clientId}`,
      clientId
    );
  };
}
