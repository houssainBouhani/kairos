import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-packages',
  templateUrl: './add-packages.component.html',
  styleUrls: ['./add-packages.component.css']
})
export class AddPackagesComponent implements OnInit {



  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addPackage = () => {
  console.log("ok")
  };
}
