import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  url:any
  constructor(private http:HttpClient) { 
    //this.url = "http://Practica1-1781073929.us-east-2.elb.amazonaws.com:3000/";
    //this.url = "http://3.17.128.87:3000/";
    this.url = "http://localhost:3000/";


  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  login(data:any){
    return this.http.post(this.url + 'login', data)
  }
  login_cam(data:any){
    return this.http.post(this.url + 'loginImg', data)
  }
  crear_usuario(data:any){
    return this.http.post(this.url + 'crearUsuario', data)
  }
  buscar_usuario(data:any){
    return this.http.post(this.url +'buscarUsuario', data)
  }
  crear_foto(data:any){
    console.log(data)
    return this.http.post(this.url +'crearFoto2', data)
  }
  crear_album(data:any){
    return this.http.post(this.url +'crearAlbum', data)
  }
  obtener_texto(data:any){
    return this.http.post(this.url +'texto', data)
  }
  obtener_foto_url(data:any){
    return this.http.post(this.url +'buscarFotoURL', data)
  }
  obtener_fotos(data:any){
    return this.http.post(this.url +'buscarFotos2', data)
  }
  traducir(data:any){
    return this.http.post(this.url +'translate', data)  
  }
  modificar_usuario(data:any){
    return this.http.post(this.url +'modificarUsuario', data)
  }
  obtener_albumes(data:any){
    return this.http.post(this.url +'buscarFotos', data)
  }
  obtener_albumes_list(data:any){
    return this.http.post(this.url +'buscarAlbum', data)
  }
  eliminar_album(data: any){
    return this.http.post(this.url +'eliminarAlbum', data)
  }
  getOficios(){
    return this.http.post(this.url + 'buscarOficio', {})
  }
  getServicios(){
    return this.http.post(this.url + 'buscarServicios', {})
  }
  
  putServicio(data: any){
    return this.http.post(this.url + 'actualizarServicio', data)
  }

  getServicio(data: any){
    return this.http.post(this.url + 'buscarServicio', data)
  }
  
  postOficio(data : any){
    return this.http.post(this.url + 'crearOficio', data)
  }

  postServicio(data: any){
    return this.http.post(this.url + 'crearServicio', data)  
  }
  prueba(data: any){
    return this.http.get(this.url +'/')
  }
  
}
