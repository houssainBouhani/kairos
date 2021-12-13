import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-primary-material",
  templateUrl: "./primary-material.component.html",
  styleUrls: ["./primary-material.component.css"],
})
export class PrimaryMaterialComponent implements OnInit {
  constructor() {}


  actionMenuTable: boolean = false;

  ngOnInit(): void {}



  openActionMenu() {
    this.actionMenuTable = !this.actionMenuTable;
  }


}
