import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-humain-ressources',
  templateUrl: './humain-ressources.component.html',
  styleUrls: ['./humain-ressources.component.css']
})
export class HumainRessourcesComponent implements OnInit {
  items
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Modifier', icon: 'pi pi-refresh'},
      {label: 'Supprimer', icon: 'pi pi-times'},
      {separator:true},
  ];
  }

}
