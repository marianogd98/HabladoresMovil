import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApimegainsideService } from '../../services/apimegainside.service'

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
})
export class MetasPage implements OnInit {
  public folder: string;
  public fechaCalendario:string = "20210610";
  public metasInside:any = {data : {ventasPorTienda:[]}};

  constructor(private activatedRoute: ActivatedRoute, public apiService: ApimegainsideService, public loadingController: LoadingController) {
    this.fechaCalendario = this.apiService.getDate();
    this.buscarData();
   }

  ngOnInit() {
  }

  buscarData(){

    var fechal = this.fechaCalendario.replace(/[^a-zA-Z0-9]/g, '');
    if(fechal.length > 10){
      fechal = fechal.split('T')[0];
    }
    /*this.apiService.getMetas(fechal)
    .subscribe(
      (data) => { // Success
        this.metasInside = data;
      },
      (error) =>{
        this.metasInside = this.apiService.noData();
      }
    )*/
  }

  redondeo(valor:number){
    return  Math.round(valor);
  }
}
