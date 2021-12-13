import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.css']
})
export class AddDepotComponent implements OnInit {

  date1: Date;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addDepot = () => {
    console.log("ok")
  };

}
