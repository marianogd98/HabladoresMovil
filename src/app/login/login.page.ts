import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NavController,AlertController, LoadingController  } from '@ionic/angular';
import {Router} from "@angular/router"
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private storage: Storage,
    public navCtrl: NavController,  
  ) { }

  ngOnInit() {
    this.storage.create();
    this.signinForm = this.fb.group({
      nick: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });    
  }

async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    //this.router.navigateByUrl('/dashboard', { replaceUrl: true }); //no sirve con navigate url en movil
    //alert("hola");
    //this.navCtrl.navigateForward("dashboard");
    //await loading.dismiss();
    var response = await this.authService.login(this.signinForm.value);
    console.log(response);
    
    /*.subscribe(
      async (res) => {
        console.log(res)
        await loading.dismiss();        
        //this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        this.navCtrl.navigateForward("dashboard");
      },
      async (res) => {
        this.navCtrl.navigateForward("dashboard");
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error.toString(),//.error
          buttons: ['OK'],
        });
 
        await alert.present(); 
    })*/
    
    /*this.authService.login(this.signinForm.value).subscribe(
      async (res) => {
        //console.log(this.signinForm.value)
        await loading.dismiss();        
        //this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        this.navCtrl.navigateForward("dashboard");
      },
      async (res) => {
        this.navCtrl.navigateForward("dashboard");
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.error.toString(),//.error
          buttons: ['OK'],
        });
 
        await alert.present();
      }
    );*/
  }
 
  // Easy access for form fields
  get email() {
    return this.signinForm.get('email');
  }
  
  get password() {
    return this.signinForm.get('password');
  }  

}
