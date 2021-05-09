import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ConexionService} from '../servicios/conexion.service';
import {Md5} from 'ts-md5/dist/md5';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../styles_forms.css'],
  providers: [ConexionService]
})
export class LoginComponent implements OnInit {

  foto_cargada:any
  foto_b64:any
  tipo_foto:any
  constructor(private router: Router,
              private conexion: ConexionService) {
    if(localStorage.getItem("sesion") != null){
      this.router.navigate(['/Users/Servicios'])
    }else{

      localStorage.setItem("ruta_anterior","/Users/Login");
      this.foto_b64 = localStorage.getItem("imgb64");
      this.foto_cargada = localStorage.getItem("encabezado")  +","+  this.foto_b64;
      this.tipo_foto = localStorage.getItem("tipoimg");
      if(this.foto_b64 != null){
        this.mostrar()
        console.log(this.tipo_foto)
      }
      localStorage.removeItem("imgb64");
      localStorage.removeItem("encabezado");
   
    }
}

  ngOnInit(): void {
    if(this.foto_b64 != null){
      this.mostrar()
      console.log(this.tipo_foto)
    }
    
  }
  
  agregar_imagen(){
    this.router.navigate(["/Users/Fotos/Seleccionar"]) 
  }
  validar_login(usr:string, pass:string){
    
    if(usr == "admin" && pass == "admin"){
        localStorage.setItem("admin","admin"); 
        this.router.navigate(['/Users/Admin'])
        return  
    }
    if(usr == "" && pass == ""){
        alert("Campos vacios")
    }else{
    
      
      let sesion = this.conexion.buscar_usuario({"email" : usr, "pass": pass});

      sesion.subscribe(resp=>{
        if(resp == null){
            this.router.navigate(['/Users/Login'])
            alert("Datos erroneos, porfavor intente de nuevo")
        }else{
          let val = JSON.stringify(resp);
          let s = JSON.parse(val)

      
          /*const md5 = new Md5();
          let encrip =md5.appendStr(pass).end();
    */
          console.log(s)
          localStorage.setItem("sesion", JSON.stringify(s[0][0]));
          this.router.navigate(['/Users/Servicios'])
         
        }
       })    
    }
  }

  tomar_foto(user:string){
    console.log("iniciando login cam")
    if(user == ""){
      alert("Campos vacios")
  }else{
  
    let sesion = this.conexion.login_cam({"user" : user, "foto" : this.foto_b64});

    sesion.subscribe(resp=>{
      if(resp == null){
          this.router.navigate(['/Users/Login'])
          alert("Datos erroneos, porfavor intente de nuevo")
      }else{
        let val = JSON.stringify(resp);
        let s = JSON.parse(val +"")
        localStorage.setItem("sesion", "[" + JSON.stringify(s.login[0]) + "]");
          
        this.router.navigate(['/Users/Servicios'])
            
      }
     })
     this.foto_b64 = null
     this.tipo_foto = null    
  }

  }
  /*cargar_foto(){
      if(localStorage.getItem("ruta_anterior")){
        this.router.navigate([localStorage.getItem("ruta_anterior")])
      }
  }*/
   vas:any;
      
   ocultar_divtm(){
    const div  = document.getElementById('div_tomar_foto');
    if(div) div.style.display = 'none';  
  }
  
  mostrar(){
    const div  = document.getElementById('div_tomar_foto');
    if(div) div.style.display = 'block';
  }
}
