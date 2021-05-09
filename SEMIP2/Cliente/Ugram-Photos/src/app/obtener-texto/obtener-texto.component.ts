import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-obtener-texto',
  templateUrl: './obtener-texto.component.html',
  styleUrls: ['../styles_forms.css']
})
export class ObtenerTextoComponent implements OnInit {
  foto_b64:any;
  tipo_foto:any;
  foto_cargada:any
  
  constructor(private router: Router, private conexion: ConexionService) { 
    localStorage.setItem("ruta_anterior","/Users/Fotos/ObtenerTexto");
    this.foto_b64 = localStorage.getItem("imgb64");
    this.foto_cargada = localStorage.getItem("encabezado")  +","+  this.foto_b64;
    this.tipo_foto = localStorage.getItem("tipoimg");
    localStorage.removeItem("imgb64");
    localStorage.removeItem("encabezado");
  }
  ngOnInit(): void {
  }
  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }

  analizar_foto(){
    if(this.foto_b64 == null){
      alert("Por favor seleccione una foto.")
      return
    }

    let texto = this.conexion.obtener_texto({"foto": this.foto_b64});
      texto.subscribe(res=>{
        if(res == null){
          alert("No hay descripcion")
        }else{
          const text_area = document.getElementById('texto') as HTMLTextAreaElement;
          let val = JSON.stringify(res);
          let s = JSON.parse(val +"")
          text_area.value = s.text
        }
      })
  }
}
