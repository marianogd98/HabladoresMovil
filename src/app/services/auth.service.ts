import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://172.50.3.11:8500/api/";//"http://172.50.0.22:8500/api/";//
  respuesta: any;
  public header: any;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private http: HTTP /*,private http: HttpClient*/, private storage: Storage) { }

  /*async login(postData){
    const header = new HttpHeaders ().set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('responseType','text')
    //.set('Authorization', localStorage.getItem("Token_Full").toString())
    //.set('Authorization', 'Bearer ' + localStorage.getItem("Token_Full").toString())
    ;
    
    var datos={ Nick: postData.form.value.Nick, Password:postData.form.value.Password};
    var handleError: any;
    //https
    this.respuesta= this.http.post(this.url+'seguridad/auth', JSON.stringify(datos), { headers: header })
    .toPromise()
    .then(response => response as any)
    .catch(handleError => handleError as any);
    
    return this.respuesta;
  }*/

  login(credentials: {nick, password}): Observable<any> {
    let headres= this.header = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json; charset=utf-8',
      //'Authorization': 'Bearer ' +  this.tokenItem
    };      
    /*this.header = new HttpHeaders ().set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json; charset=utf-8');*/

    this.http.post(this.baseUrl+"seguridad/auth", credentials,  headres)
    .then((data) => {
      map((data: any) => {  localStorage.setItem(TOKEN_KEY, data.data.token);/*data.data.token*/ }),
      /*switchMap(token => {
        return from(this.storage.set(TOKEN_KEY, token));
      }),*/
      tap(_ => {
        this.isAuthenticated.next(true);
      })
      return true;
    })
    .catch((error) => {
      console.log(error)
      return false;
    });
    return null;
  }
 
  logout(){//: Promise<void> {
    this.isAuthenticated.next(false);
    localStorage.removeItem(TOKEN_KEY);//return this.storage.remove(TOKEN_KEY);
  }   
}
