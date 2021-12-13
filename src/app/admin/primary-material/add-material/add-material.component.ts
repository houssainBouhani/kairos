import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: "app-add-material",
  templateUrl: "./add-material.component.html",
  styleUrls: ["./add-material.component.css"],
})
export class AddMaterialComponent implements OnInit {
  constructor(private router: Router) {}



  date1: Date;
  ngOnInit(): void {}


  addPrimaryMatter = () => {
    console.log("ok")
  };
}
