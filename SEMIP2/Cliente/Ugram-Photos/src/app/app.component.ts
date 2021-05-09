import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ugram-Photos';
  sesion:any;
  servicio:any;
  admin:any;
  constructor(private router:Router){
    
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")
    this.admin = localStorage.getItem("admin")
    
  }

  salir(){
    localStorage.removeItem("sesion")
    localStorage.removeItem("admin")
    this.sesion = null;
    this.router.navigate(['/Users/Login'])

  }
  grabar_ls(){

  }
}
