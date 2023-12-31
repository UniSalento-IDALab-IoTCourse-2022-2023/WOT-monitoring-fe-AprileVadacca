import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/models/alerts';
import { Boiler } from 'src/app/models/boiler';
import { Client } from 'src/app/models/client';
import { Stat } from 'src/app/models/stat';
import { AggrDataService } from 'src/app/services/aggr-data.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  alertsList : Alert[] = []
  stat : Stat = {} as Stat
  statList : Stat[] = []
  boiler : Boiler = {} as Boiler
  client : Client = {} as Client
  
  constructor( 
    private route: ActivatedRoute, 
    private clientService : ClientsService,
    private alertService : AlertsService, 
    private aggrDataService : AggrDataService, 
    ) {}

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log(id); // Use the id parameter as needed
      this.getClient(id);
      this.getAlertsList(id);
      this.getStats(id);
    });
  }

  getAlertsList(id : string | null){
    this.alertService.getByBoilerId(id).subscribe(
      (alerts: Alert[]) => {
        this.alertsList = alerts;
        console.log(this.alertsList);
      },
    );
  }

  getStats(id : string | null){
    this.aggrDataService.getByBoilerId(id).subscribe(
      (stats: Stat[]) => {
        this.statList = stats;
        this.stat = this.statList[this.statList.length - 1];
      }
      );
    }

    getClient(id : string | null){
      this.clientService.getByBoilerId(id).subscribe(
        (client : Client) => {
          this.client = client
          console.log(this.client)
        }
      )
    }

}