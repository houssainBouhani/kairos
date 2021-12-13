import { Router } from "@angular/router";

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-lots",
  templateUrl: "./add-lots.component.html",
  styleUrls: ["./add-lots.component.css"],
})
export class AddLotsComponent implements OnInit {
  date1: Date;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  addPrimaryMatter = () => {
  console.log("ok")
  };
}
