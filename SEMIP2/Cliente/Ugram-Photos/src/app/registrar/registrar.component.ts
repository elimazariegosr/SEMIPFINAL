import { Component, OnInit, Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ConexionService } from '../servicios/conexion.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['../styles_forms.css']
})
export class RegistrarComponent implements OnInit {

  foto_perfil = "";
  foto_b64 :any;
  usr_creado :any;
  tipo_foto:any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("sesion") != null){
      this.router.navigate(['/Users/Servicios'])
    }
    localStorage.setItem("ruta_anterior","/Users/Registrar");
    this.foto_b64 = localStorage.getItem("imgb64");

    this.foto_perfil = localStorage.getItem("encabezado") +"," +  this.foto_b64;
    this.tipo_foto = localStorage.getItem("tipoimg");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");

   }

  ngOnInit(): void {
  }

  registrar(nombre: any, apellido: any, email: any, dpi: any, pass: any){
      this.conexion.crear_usuario({
                                    "nombre": nombre, 
                                    "apellido": apellido, 
                                    "email": email,
                                    "pass" :pass,
                                    "dpi" : dpi,
                                    "base64" : this.foto_b64,
                                    "tipo" : this.tipo_foto}).subscribe(res =>{
                                      console.log(res)
                                      if(res == null){
                                        alert("No se pudo registrar el usuario")
                                      }else{
                                        alert("Se registro correctamente el usuairo")
                                      }
      })
  }
     
  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
}
