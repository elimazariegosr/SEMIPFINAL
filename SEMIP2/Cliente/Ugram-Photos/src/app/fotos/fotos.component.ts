import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {ElementRef,ViewChild } from '@angular/core';
import { Console } from 'console';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['../styles_forms.css']
})

export class FotosComponent implements OnInit {
  albums = new Array;
  sesion:any
  
  verSeleccion :any
  constructor(private router: Router, 
    private conexion: ConexionService) {
      if(localStorage.getItem("sesion") == null){
        this.router.navigate(['/Users/Login'])
      }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")[0]
      this.obtener_albumes();
  }

  ngOnInit(): void {
  }
  mostrar(foto:any){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'block';
    const div_image = document.getElementById('div_image');
    if(div_image) div_image.innerHTML = "<img src=" + foto.url_fotop + " class=\"fadeIn second\"  style=\"max-height: 400px;\">"; 
    const desc = document.getElementById('desc') as HTMLInputElement
    if(desc != null){
      desc.value = foto.descripcion
  
    }
  }
  ocultar(){
    const div  = document.getElementById('rep_ast');
    if(div) div.style.display = 'none';  
  }
  capturar(selected: string) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = selected;
}

  traducir(texto:string){
    if(this.verSeleccion == null || this.verSeleccion == '0'){
      alert("Por favor seleccione un idioma.")
      return 
    }
    let traducido = this.conexion.traducir({"text" : texto, "idioma" : this.verSeleccion});
    traducido.subscribe(res=>{
        if(res == null){
          alert("No hay descripcion")
        }else{
          let val = JSON.stringify(res);
          let s = JSON.parse(val +"")
          console.log(s)
          
          const traduccion = document.getElementById('traduccion') as HTMLInputElement
          traduccion.value = s.message.TranslatedText
        }
      })
  }
  obtener_albumes(){
      let alb = this.conexion.obtener_fotos({"user": this.sesion.codigo_usuario});
      alb.subscribe(res=>{
        if(res == null){
          alert("No hay Fotos")
        }else{
          console.log(JSON.parse(JSON.stringify(res)))
          this.clasificar_fotos(JSON.parse(JSON.stringify(res)))
        }
      })
  }
  lista = new Array<Album>()
  clasificar_fotos(fotos: any){
      let perfil = new Album
      perfil.nombre = "Fotos de Perfil"
      this.lista.push(perfil)
      for(let i = 0; i < fotos.length; i++){
        if(fotos[i].album == "Fotos_Perfil"){
          perfil.fotos.push(fotos[i])
        }else{
          this.analizar_tags(fotos[i], [fotos[i].tag1, 
            fotos[i].tag2, fotos[i].tag3, fotos[i].tag4, fotos[i].tag5])
        }
      }
      console.log(this.lista)
  }
  analizar_tags(foto:any, tags:any){
      this.crear_album_tag(tags, foto)  
  }
  existe_album(nombre:any){
    for(let i = 0; i < this.lista.length; i++){
      if(this.lista[i].nombre == nombre){
        return this.lista[i]
      }
    }
    return null
  }
  crear_album_tag(tags:any, foto:any){
    for(let i = 0; i < tags.length; i++){
      
      let album = this.existe_album(tags[i])
      if(album != null){
        album as Album
        album.fotos.push(foto)
      }else{
        album  = new Album
        album.fotos.push(foto)
        album.nombre = tags[i]
        album.tags = tags
        this.lista.push(album) 
     
      }
    }
  }
}
class Album {
  nombre: any
  tags = new Array 
  fotos = new Array
}