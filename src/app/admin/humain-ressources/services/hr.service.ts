import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONFIG } from "src/environments/environment";

@Injectable({ providedIn: "root" })

export class hr {
  constructor(private http: HttpClient) {}

  getAllHrs = () => {
    return this.http.get(`${CONFIG.URL}hR/getAllHR`);
  };

  getHrToEdit = (HrId) => {
    return this.http.get(
      `${CONFIG.URL}hR/getHRBYID?id=${HrId}`
    );
  };

  deleteHr = (HrId) => {
    return this.http.post(
      `${CONFIG.URL}hR/archiver?id=${HrId}`,
      HrId
    );
  };

  restoreHr = (HrId) => {
    return this.http.post(
      `${CONFIG.URL}hR/desarchiver?id=${HrId}`,
      HrId
    );
  };

  addHr= (Hr) => {
    return this.http.post(`${CONFIG.URL}hR/add`, Hr);
  };

  editHr = (editedHr) => {
    return this.http.put(`${CONFIG.URL}hR/updateHR`, editedHr);
  };

}
