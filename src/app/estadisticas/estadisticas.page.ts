import {AfterViewInit, Component, ElementRef, ViewChild , OnInit  } from '@angular/core';

//import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-annotation';

//import {ChartsModule} from "ng2-charts";
import { Chart } from 'chart.js';
/*import { Label } from 'ng2-charts/ng2-charts';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';*/


import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
//import { Storage } from '@ionic/storage-angular';
import { ApimegainsideService } from '../services/apimegainside.service'


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements  AfterViewInit {
 
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('barCanvasVentas') private barCanvasVentas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  barChartVentas: any;
  doughnutChart: any;
  lineChart: any;

  public folder: string;
  public tiendaIdSelect:number = 4;
  public ventasDep: any;
  public typeCharSelet: string = "bar";
  public rangeFecha: any = {fechaIni:"", fechaFin:"" };
  public buttonColor:any = ["secondary","",""];

  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute,public apiService: ApimegainsideService, public loadingController: LoadingController) { }

    ngOnInit() {
      //this.barChartMethod();
      //this.doughnutChartMethod();
      //this.lineChartMethod();
    }

    ngAfterViewInit() {
      this.rangeFecha.fechaIni = this.activatedRoute.snapshot.paramMap.get("fecha");
      
      if(this.rangeFecha.fechaIni==null)
        this.rangeFecha.fechaIni = this.apiService.getLast3Week();

      this.rangeFecha.fechaFin = this.apiService.getDate();

      console.log(this.rangeFecha);

      this.getDataChart(this.rangeFecha);
      //this.barSetData();
      //this.barChartMethod();    

      //this.doughnutChartMethod();
      //this.lineChartMethod();
    }
    
    async getDataChart(rangeFecha: any){

      //let fechaIni = this.apiService.getLast3Week()//this.apiService.getLast3Month(); //nDays==5?this.apiService.getPastDayWeek():(nDays==3)?this.apiService.getLast3Month():0;//getFirtsDayWeek();
      //let fechaFin = this.apiService.getDate();     
      /*await this.apiService.getVentaDepartamento(this.tiendaIdSelect, rangeFecha.fechaIni, rangeFecha.fechaFin)
      .subscribe(
        (data) => { // Success
          //this.presentLoading();
          this.ventasDep = data;
          //console.log(this.typeCharSelet)
          this.chartSetData(data,this.typeCharSelet);  

          
          //this.lineChartMethod();        
        },
        (error) =>{
          console.error(error.status);
          //if(error.status == 401){ this.navCtrl.navigateForward("login");}
          //this.ventasDep = this.noData();
        }
      )*/
      var fechal = this.rangeFecha.fechaFin.replace(/[^a-zA-Z0-9]/g, '');
      /*await this.apiService.getVentas(fechal)
      .subscribe(
        (data) => { // Success
          //this.presentLoading();
          //this.ventasInside = data;
          this.doughnutChartMethod(data,this.typeCharSelet);
        },
        (error) =>{
          console.error(error.status);
          //if(error.status == 401){ this.navCtrl.navigateForward("login");}
          //this.ventasInside = this.noData();
        }
      )*/
    }


    chartSetData(data, typeChart){
      let labels = [];
      let dataInfo = [];
      /*data.forEach(dep => {
        labels.push(dep.dpto);
        dataInfo.push(dep.utilidadusd);
      });*/
      for (let i = 0; i < data.length-1; i++) {
        labels.push(data[i].dpto);
        dataInfo.push(data[i].utilidadusd);
      }
      //console.log(data);
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: typeChart,
        data: {
          labels: labels,//['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
          datasets: [{
            label: '% de Utilidad',
            data: dataInfo,//[200, 50, 30, 15, 20, 34],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255,99,132,0.5)',
              'rgba(192, 57, 43, 0.5)',
              'rgba(243, 156, 18, 0.5)',
              'rgba(52, 152, 219, 0.5)',
              'rgba(215, 189, 226, 0.5)',
              'rgba(88, 214, 141, 0.5)',
              'rgba(208, 211, 212, 0.5)',
              'rgba(115, 198, 182, 0.5)',
              'rgba(249, 231, 159, 0.5)',
              'rgba(110, 44, 0 , 0.5)',
              'rgba(185, 119, 14 , 0.5)',
              'rgba(127, 179, 213, 0.5)',
              'rgba(118, 215, 196, 0.5)'

            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255,99,132, 1)',
              'rgba(192, 57, 43, 1)',
              'rgba(243, 156, 18, 1)',
              'rgba(52, 152, 219, 1)',
              'rgba(215, 189, 226, 1)',
              'rgba(88, 214, 141, 1)',
              'rgba(208, 211, 212, 1)',
              'rgba(115, 198, 182, 1)',
              'rgba(249, 231, 159, 1)',
              'rgba(110, 44, 0 , 1)',
              'rgba(185, 119, 14 , 1)',
              'rgba(127, 179, 213, 1)',
              'rgba(118, 215, 196, 1)'              


            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

    }

    getData(tiempo){

      if(tiempo==5){
        this.buttonColor = ["secondary","",""];
        this.rangeFecha.fechaIni = this.apiService.getFirtsDayWeek();
        this.rangeFecha.fechaFin = this.apiService.getPastDayWeek();
      }else if(tiempo==21){
        this.buttonColor = ["","secondary",""];
        this.rangeFecha.fechaIni = this.apiService.getLast3Week();
        this.rangeFecha.fechaFin = this.apiService.getDate();
      }else if(tiempo==90){
        this.buttonColor = ["","","secondary"];
        this.rangeFecha.fechaIni = this.apiService.getLast3Month();;
        this.rangeFecha.fechaFin = this.apiService.getDate();
      }

      this.getDataChart(this.rangeFecha);
    }

    barChartMethod() {
      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
          datasets: [{
            label: '# of Votes',
            data: [200, 50, 30, 15, 20, 34],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  
    doughnutChartMethod(data, typeChart) {
      let labels = [];
      let dataInfo = [];
      /*data.forEach(dep => {
        labels.push(dep.dpto);
        dataInfo.push(dep.utilidadusd);
      });*/

      for (let i = 0; i < data.data.ventasPorTienda.length; i++) {
        labels.push(data.data.ventasPorTienda[i].nombre);
        dataInfo.push(data.data.ventasPorTienda[i].totalDolares);
      }
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: typeChart,
        data: {
          labels: labels,
          datasets: [{
            label: 'Ventas',
            data: dataInfo,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384'
            ]
          }]
        }
      });
    }
  
    lineChartMethod() {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
          datasets: [
            {
              label: 'Sell per week',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
              spanGaps: false,
            }
          ]
        }
      });
    }
    buscarDataSelect(ev: any){
     alert(this.tiendaIdSelect)
    }
    segmentChanged(ev: any) {
      console.log('Segment changed', ev.detail.value);
      this.typeCharSelet = ev.detail.value;
      this.getDataChart(this.rangeFecha);
    }    
}
