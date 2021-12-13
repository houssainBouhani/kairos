import { Component, OnInit, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  //select canva element
  @ViewChild("trafficChart") trafficChart;

  clientsListOpened: boolean = true;
  active: boolean = true;
  canvas: any;
  ctx: any;


  constructor() {}

  ngAfterViewInit() {
    this.canvas = this.trafficChart.nativeElement;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.width = 320;
    this.ctx.canvas.height = 320;
    this.ctx.le;
    new Chart(this.ctx, {
      type: "doughnut",
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              afterLabel: function () {
                return "%";
              },
            },
          },
          legend: {
            display: false,
          },
        },
        cutout: 120,
        responsive: false,
      },
      data: {
        labels: ["MATIÈRES PREMIÈRES", "PRODUITS FINIS", "PRODUITS REJETÉS"],
        datasets: [
          {
            data: [150, 200, 75],
            backgroundColor: ["#2C7BE5", "#A6C5F7", "#D2DDEC"],
          },
        ],
      },
    });
  }

  ngOnInit(): void {}

  switchMenus = ($event) => {
    const providerNavLink = $event.target.classList.contains("provider");

    if (providerNavLink) {
      this.clientsListOpened = !this.clientsListOpened;
      this.active = !this.active;
    } else {
      this.clientsListOpened = true;
      this.active = true;
    }
  };



}
