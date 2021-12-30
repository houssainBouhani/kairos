import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONFIG } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class primaryMatter {
  constructor(private http: HttpClient) {}

  getAllPm = () => {
    return this.http.get(`${CONFIG.URL}api/PrimaryMatrial/afficherall`);
  };

  restorePm = (pmId) => {
    return this.http.post(
      `${CONFIG.URL}api/PrimaryMatrial/desarchiver?id=${pmId}`,
      pmId
    );
  };

  deletePm = (pmId) => {
    return this.http.post(
      `${CONFIG.URL}api/PrimaryMatrial/archiver?id=${pmId}`,
      pmId
    );
  };

  getAllBasicMaterial() {
    return this.http.get(`${CONFIG.URL}api/basic_Material/getall`);
  }

  getAllProvider() {
    return this.http.get(`${CONFIG.URL}api/Provider/afficherall`);
  }

  getAllLot() {
    return this.http.get(`${CONFIG.URL}api/lot/getallNonArchiver`);
  }

  addPrimarymaterial(basicmaterail, email, lots, primarymaterial) {
    return this.http.post(
      `${CONFIG.URL}api/PrimaryMatrial/add?basicmaterail=${basicmaterail}&email=${email}&lots=${lots}`,
      primarymaterial
    );
  }

  getPrimarymaterialToEdit = (pmId) => {
    return this.http.get(
      `${CONFIG.URL}api/PrimaryMatrial/afficherallbyid?id=${pmId}`
    );
  };
  updatePrimaryMaterial = (editedPm) => {
    return this.http.put(`${CONFIG.URL}api/PrimaryMatrial/update`, editedPm);
  };
}
