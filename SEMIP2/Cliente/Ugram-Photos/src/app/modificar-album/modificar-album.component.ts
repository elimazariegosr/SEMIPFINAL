import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-modificar-album',
  templateUrl: './modificar-album.component.html',
  styleUrls: ['../styles_forms.css']
})
export class ModificarAlbumComponent implements OnInit {
  albums:any;
  sesion:any
  verSeleccion :any
  
  constructor(private router: Router, private conexion: ConexionService) {
    
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
    this.obtener_albumes();

  }

  capturar(selected: string) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = selected;
}
  obtener_albumes(){
    let alb = this.conexion.obtener_albumes_list({"user": this.sesion.codigo_usuario});
    alb.subscribe(res=>{
      if(res == null){
        alert("No hay albums")
      }else{
          this.albums = res
      }
    })
  }

  eliminar_a(){
    if(this.verSeleccion == null || this.verSeleccion == 'Seleccione un Album'){
      alert("Por favor seleccione un Album.")
      return 
    }
    let eliminar = this.conexion.eliminar_album({"user":this.sesion.codigo_usuario, "album": this.verSeleccion})
    eliminar.subscribe(elim =>{
      if(elim == null){
        alert("Datos erroneos, porfavor intente de nuevo")
      }else{
        alert("Se elimino correctamenta el Album")
        this.router.navigate(['/Users/Login'])
         
      }
    })
  
  }
  crear_a(nombre:string){
    if(nombre != ""){
      let crear_album = this.conexion.crear_album({"user":this.sesion.codigo_usuario, "album":nombre});
      crear_album.subscribe(crear_a =>{
        if(JSON.parse(JSON.stringify(crear_a)).res == null){
          alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          alert("Se creo correctamenta el Album")
          this.router.navigate(['/Users/Login'])
        }
      })  
    }else{
      alert("No se puede crear el album, Campo nombre vacio.")
    }
  }
  ngOnInit(): void {
  }

}
