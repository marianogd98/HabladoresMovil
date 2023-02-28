import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApimegainsideService } from '../../services/apimegainside.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public folder: string;
  public fecha:Date;
  highlighted = "";
  public list = [{id:'0'}, {id:'1'}, {id:'2'} ,{id:'3'}];
  public fechaCalendario:string = "20210614";
  public ventasInside:any = {data : {ventasPorTienda:[]}};
  public esHoy:string;


  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute, public apiService: ApimegainsideService, public loadingController: LoadingController, private storage: Storage) { 
    this.esHoy = "Hoy";
    this.fechaCalendario = this.getDate();
    this.ventasInside = this.noData();
  }


   async ngOnInit() {
    var fechal = this.fechaCalendario.replace(/[^a-zA-Z0-9]/g, '');
    await this.apiService.getVentas(fechal).then((data) => {
       this.ventasInside = data;
    }).catch((error)=> {
      if(error.status == 401 || error.status == 400){
        this.navCtrl.navigateForward("login");
      }
      //if(error.status == 401){ this.navCtrl.navigateForward("login");}
      this.ventasInside = this.noData();
    });
    /*await this.apiService.getVentas(fechal)
    .subscribe(
      (data) => { // Success
        //this.presentLoading();
        this.ventasInside = data;
        console.log(this.ventasInside.data)
      },
      (error) =>{        
        if(error.status == 401 || error.status == 400){
          this.navCtrl.navigateForward("login");
        }
        //if(error.status == 401){ this.navCtrl.navigateForward("login");}
        this.ventasInside = this.noData();
      }
    )*/

    //-------------------------------    
  }

  selectAvatar(id){
    if (this.highlighted === "") {
      this.highlighted = id;
    } else {
      this.highlighted = "";
    }
  }

  async buscarData(data){
    this.esHoy = "";
    var fechal = this.fechaCalendario.replace(/[^a-zA-Z0-9]/g, '');
    if(fechal.length > 10){
      fechal = fechal.split('T')[0];
    }

    await this.apiService.getVentas(fechal).then((data) => {
      this.ventasInside = data;
   }).catch((error)=> {
     if(error.status == 401 || error.status == 400){
       this.navCtrl.navigateForward("login");
     }
     //if(error.status == 401){ this.navCtrl.navigateForward("login");}
     this.ventasInside = this.noData();
   });    

    /*this.apiService.getVentas(fechal)    
    .subscribe(
      (data) => { // Success
        //this.presentLoading();
        this.ventasInside = data;
      },
      (error) =>{
        if(error.status == 401){ this.navCtrl.navigateForward("login");}
        this.ventasInside = this.noData();
      }
    )*/
    
    
  }

  noData(){
    return {
      data: {
        ventasPorTienda: [],
        totalBolivares: 0,
        totalDolares: 0,
        cantidadFacturas: 0,
        ticketPromedio: 0
      }
    };
  }

  moneda(text){
    if(text!="----"){
      let val = (text/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
      return text
  }

  getDate(){
    var currentDate = new Date();
    return currentDate.getFullYear()+"-"+(currentDate.getMonth()<9?"0"+(currentDate.getMonth()+1):(currentDate.getMonth()+1))+"-"+(currentDate.getDate()<10?"0"+currentDate.getDate():currentDate.getDate());
  }  

  irMetas(venta: any){
    this.navCtrl.navigateForward("metas");
  }

  irGrafico(){
    this.navCtrl.navigateForward(["estadisticas", {fecha: this.fechaCalendario}]);
  }  

}
