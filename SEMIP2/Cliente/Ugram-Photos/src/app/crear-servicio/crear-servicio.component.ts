import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['../styles_forms.css']
})
export class CrearServicioComponent implements OnInit {

  foto_perfil:any;
  foto_b64:any;
  clasificacion:any;
  oficio_seleccionado : any;
  sesion: any;
  tipo_foto: any;
  constructor(private router: Router, private conexion: ConexionService) { 
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")

    if(localStorage.getItem("encabezado") != null && localStorage.getItem("imgb64") != null){
      this.foto_b64 = localStorage.getItem("imgb64");
      this.foto_perfil = localStorage.getItem("encabezado") +"," +  this.foto_b64;
      this.tipo_foto = localStorage.getItem("tipoimg");
   
    }
    localStorage.setItem("ruta_anterior","/Users/Solicitudes/Crear");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");
    this.obtener_oficios()  
  }

  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
  ngOnInit(): void {
  }

  crear_servicio(nombre:any, descr: any){
    let fecha = this.get_fecha();
    let usuario1 = this.sesion.idUsuario;
    this.conexion.postServicio({
                                  "nombre": nombre,
                                  "descripcion": descr,
                                  "fecha" : fecha,
                                  "empleado" : usuario1,
                                  "cliente": usuario1,
                                  "oficio" : this.oficio_seleccionado,
                                  "base64" : this.foto_b64,
                                  "tipo" : this.tipo_foto  

                              }).subscribe(res =>{
                                console.log(res)
    })
  }
  get_fecha(){
    let fecha = new Date();
    return fecha.getFullYear() + "-" + (fecha.getMonth() + 1) +
     "-" + fecha.getDay()
  }


  obtener_oficios(){
    this.conexion.getOficios().subscribe(res =>{
      this.clasificacion = JSON.parse(JSON.stringify(res))[0]
      console.log(res)
    })
  }

  capturar_oficio(seleciconado:any){
    this.oficio_seleccionado = seleciconado;
  }
}
