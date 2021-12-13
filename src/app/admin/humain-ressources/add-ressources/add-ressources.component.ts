import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-ressources',
  templateUrl: './add-ressources.component.html',
  styleUrls: ['./add-ressources.component.css'],
})
export class AddRessourcesComponent implements OnInit {


  constructor(private router: Router) { }


  date1: Date;

  ngOnInit(): void {


  }

  addRessource = () => {
   console.log("ok")
  };
}
