import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }
  addClient = () => {
   console.log("ok")
  };
}
