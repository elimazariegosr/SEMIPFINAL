import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../styles_forms.css']
})
export class HomeComponent implements OnInit {

  sesion:any;
  servicios: any;
  seleccionado: any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")
      console.log(this.sesion)
      this.obtener_servicios()
    }

   obtener(){
   
   }
  ngOnInit(): void {
  }
 
  verServicios(){
      (document.getElementById('contenido') as HTMLDivElement).style.display = 'none';
      (document.getElementById('servicios') as HTMLDivElement).style.display = 'block';
  }
  verServiciosAdq(){
    (document.getElementById('contenido') as HTMLDivElement).style.display = 'none';
    (document.getElementById('servicios_adq') as HTMLDivElement).style.display = 'block';
}
  verContenido(){
    (document.getElementById('contenido') as HTMLDivElement).style.display = 'block';
    (document.getElementById('servicios') as HTMLDivElement).style.display = 'none';
    (document.getElementById('servicios_adq') as HTMLDivElement).style.display = 'none';
  
  }
  editar_perfil(){
    this.router.navigate(['/Users/Edit'])
  }
  obtener_servicios(){
    this.conexion.getServicios().subscribe(res =>{
      this.servicios = (JSON.parse(JSON.stringify(res)))[0];
      console.log(this.servicios)
    })
  }
}
