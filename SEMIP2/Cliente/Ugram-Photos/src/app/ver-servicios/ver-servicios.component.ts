import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-ver-servicios',
  templateUrl: './ver-servicios.component.html',
  styleUrls: ['../styles_forms.css']
})
export class VerServiciosComponent implements OnInit {

  servicios:any = [];
  servicios_aux:any = [];
  servicio: any;
  sesion: any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")
    this.servicio = {};
     this.obtener_servicios();
   }

  ngOnInit(): void {
  }

  comprar(){
    
    alert("Se reservo correctamente el servicio")
    this.conexion.putServicio({
      "id" : this.servicio.idServicio,
      "empleado" : this.sesion.idUsuario,
      "cliente" : this.servicio.fkCliente,
      "estado" : 3
    }).subscribe(res =>{
      this.regresar()
      this.obtener_servicios()
      console.log(res);
    })
  }
  obtener_servicios(){
    this.servicios_aux = [];
    this.conexion.getServicios().subscribe(res =>{
      this.servicios = (JSON.parse(JSON.stringify(res)))[0];
      for(let i = 0; i < this.servicios.length; i++){
        if(this.servicios[i].estado == 'Espera'){
          this.servicios_aux.push(this.servicios[i])
        }
      }
      this.servicios = this.servicios_aux;
    })
  }
  buscar(valor:any){
    let lista = [];
    this.servicios = this.servicios_aux;
    
    if(valor == ""){
    }else{
      for (let i = 0; i < this.servicios.length; i++) {
        let agregado = false;
        if(this.palabra_like(valor, this.servicios[i].nombre)){
          lista.push(this.servicios[i]);
          agregado = true;
        }
        if(!agregado){
          if(this.palabra_like_2(valor, this.servicios[i].nombre)){
            lista.push(this.servicios[i]);
            agregado = true;
          }
        }            
      }
    }
    
    if(lista.length == 0){
      lista = this.servicios_aux
    }
    this.servicios = lista;  
  }

  copiar(lista_o:any, lista_d:any){
    for(let i = 0; i < lista_o.length; i++){
      lista_d.push(lista_o[i])
    }  
  }

  palabra_like(palabra:any, frase:any){
    let frases = frase.split(" ");
    let palabras = palabra.split(" ");
        for (let i = 0; i < frases.length; i++) {
          for (let j = 0; j < palabras.length; j++) {
            if(palabras[j].toUpperCase() == frases[i].toUpperCase()){
                return true;
            }
          }  
        }
        return false;
  }
  palabra_like_2( palabra:any,  frase:any){
    let frase_aux = "";
    for (let  k = 0; k < frase.length; k++) {
        for (let i = k; i < frase.length; i++) {
            frase_aux += frase.charAt(i);
            if(frase_aux.toUpperCase() == palabra.toUpperCase()){
                return true;
            }
        }
        frase_aux = "";
    }   
    return false;
  }

  regresar(){
    (document.getElementById('servicios') as HTMLDivElement).style.display = 'block';
    (document.getElementById('servicio') as HTMLDivElement).style.display = 'none';
    
  }
  adquirir(servicio:any){
    console.log(servicio);
    (document.getElementById('servicios') as HTMLDivElement).style.display = 'none';
    (document.getElementById('servicio') as HTMLDivElement).style.display = 'block';
    this.servicio = servicio;
  }

}

