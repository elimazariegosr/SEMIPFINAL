import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['../styles_forms.css']
})
export class SolicitudesComponent implements OnInit {

  
  solicitudes:any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("admin") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.obtener_servicios()
 }

ngOnInit(): void {
}

obtener_servicios(){
  this.conexion.getServicios().subscribe(res =>{
    this.solicitudes = (JSON.parse(JSON.stringify(res)))[0];
    console.log(this.solicitudes)
  })
}
aceptar(servicio:any){
  this.conexion.putServicio({
      "id" : servicio.idServicio,
      "empleado" : servicio.fkEmpleado,
      "cliente" : servicio.fkCliente,
      "estado" : 2
    }).subscribe(res =>{
      
  this.obtener_servicios()
      console.log(res);
    })
}
rechazar(servicio:any){
  this.conexion.putServicio({
    "id" : servicio.idServicio,
    "empleado" : servicio.fkEmpleado,
    "cliente" : servicio.fkCliente,
    "estado" : 5
  }).subscribe(res =>{

    this.obtener_servicios()
        console.log(res);
  })

}
}
