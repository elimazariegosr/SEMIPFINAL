import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-crear-oficio',
  templateUrl: './crear-oficio.component.html',
  styleUrls: ['../styles_forms.css']
})
export class CrearOficioComponent implements OnInit {

  oficios:any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("admin") == null){
      this.router.navigate(['/Users/Login'])
    }
    this.obtener_oficios()
  }

  ngOnInit(): void {
  }

  obtener_oficios(){
      this.conexion.getOficios().subscribe(res =>{
        let val = JSON.parse(JSON.stringify(res));
        this.oficios = val[0]
      })
  }
  crear_oficio(oficio: any){
    if(oficio == ""){
      return
    }
    this.conexion.postOficio({"nombre" : oficio}).subscribe(res =>{
      if(res == null){

      }else{
        this.obtener_oficios()    
      }
      (document.getElementById("nombre") as HTMLInputElement).value = ""
    })
  }

}
