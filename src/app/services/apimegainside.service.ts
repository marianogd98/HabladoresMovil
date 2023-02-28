import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

//import { Storage } from '@ionic/storage-angular';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class ApimegainsideService{
  url = "http://172.50.3.11:8500/api/";//"http://172.50.0.22:8500/api/";//
  respuesta: any;
  header: any;
  tokenItem:string;

  constructor(private http: HTTP/*private http: HttpClient*/, private storage: Storage) {
    this.tokenItem =  this.getToken();
    //alert(this.tokenItem)
    /*const headers = new HttpHeaders ().set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json; charset=utf-8')
    //.set('Authorization', localStorage.getItem("Token_Full").toString())
    .set('Authorization', 'Bearer ' +  this.tokenItem);*/
    //this.header = headers;
    //alert(this.header)    
    //this.getHeader();
    this.header = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' +  this.tokenItem
    };     
   }

   getToken(){
      return localStorage.getItem(TOKEN_KEY).toString();
      //return this.storage.get('my-token').then( (res) => {   return res } );
   }

    getHeader(){     
     /*this.header = new HttpHeaders ().set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json; charset=utf-8')
    //.set('Authorization', localStorage.getItem("Token_Full").toString())
    .set('Authorization', 'Bearer ' +  this.tokenItem);*/
    this.header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' +  this.tokenItem
      };
   }

    //devuelve lista de habladores
     getVentas(fecha:string) {
      //console.log( JSON.stringify({'headers': this.header}) )
      //this.tokenItem = this.storage.get('my-token').then( (res) => {  return res } ); 
      //return this.http.get(this.url+'venta/fecha/'+fecha+'/idTienda/0', {'headers': this.header});
      let headers = this.header;
      return this.http.get(
        this.url+'venta/fecha/'+fecha+'/idTienda/0',//URL
        {},         //Data 
        {headers} // Headers
       )
       .then(response => {
          // prints 200
          console.log(response.status);
          try {
            response.data = JSON.parse(response.data);
            // prints test
            console.log(response.data.message);
          } catch(e) {
            console.error('JSON parsing error');
          }
       })
       .catch(response => {
         // prints 403
         console.log(response.status);
  
         // prints Permission denied
         console.log(response.error);
       });    
    }

    getMetas(fecha:string){  
      //return this.http.get(this.url+'venta/metas/fecha/'+fecha+'/idTienda/0', {'headers': this.header});     
    }

    getVentaDepartamento(tiendaId:number, fechaIni: string, fechaFin:string){
      //http://172.50.3.11:8500/api/venta/departamentos?pTienda=4&pFechaI=2021-08-23&pFechaF=2021-08-23
     // return this.http.get(this.url+'venta/departamentos?pTienda='+tiendaId+'&pFechaI='+fechaIni+'&pFechaF='+fechaFin, {'headers': this.header})
    }
    

    getDate(){
      var currentDate = new Date();
      return currentDate.getFullYear()+"-"+(currentDate.getMonth()<9?"0"+(currentDate.getMonth()+1):(currentDate.getMonth()+1))+"-"+(currentDate.getDate()<10?"0"+currentDate.getDate():currentDate.getDate());
    }

    formatDate(date) {
      var d = date,
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }    

  getPastDayWeek(){
    var curr = new Date;
    return this.formatDate(new Date(curr.setDate(curr.getDate())));
    
  }  

    getFirtsDayWeek(){
      var curr = new Date;
      return this.formatDate(new Date(curr.setDate(curr.getDate() - curr.getDay()+1)));
      
    }

    getLastDayWeek(ndays=6){
      var curr = new Date;      
     return this.formatDate(new Date(curr.setDate(curr.getDate() - curr.getDay()+ndays)));
    } 

    getLast3Week(){
      var curr = new Date; 
      return this.formatDate(new Date(curr.setDate(curr.getDay()+1)));
    }    
    
    getLast3Month(){
      var curr = new Date; 
      return this.formatDate(new Date(curr.setMonth(curr.getMonth() - 3)));
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
}
