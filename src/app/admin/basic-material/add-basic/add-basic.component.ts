import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-basic',
  templateUrl: './add-basic.component.html',
  styleUrls: ['./add-basic.component.css']
})
export class AddBasicComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addBasicMatter = () => {
    console.log("ok")
  }
}
