import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import {Interactions} from 'aws-amplify';
import { FormsModule } from '@angular/forms'; 
import { ConexionService } from '../servicios/conexion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['../styles_forms.css']
}
)

export class ChatbotComponent implements OnInit {

  mensaje_:any;
  oficios:any;
  servicios:any;
  sesion :any;
  constructor(private router: Router, private conexion: ConexionService) {
    if(localStorage.getItem("sesion") == null){
      this.router.navigate(['/Users/Login'])
    }
      this.sesion = JSON.parse(localStorage.getItem("sesion") +"")
      console.log(this.sesion)
      this.obtener_servicios()
    }
 ngOnInit(): void {
  }
  
  obtener_servicios(){
    this.conexion.getServicios().subscribe(res =>{
      this.servicios = (JSON.parse(JSON.stringify(res)))[0];
      console.log(this.servicios)
    })
  }
  aling = "left";
  color = "goldenrod";

  enviar_msg(mensaje:string){ 
    this.mensaje_ = mensaje
    this.startChat();
    (document.getElementById('div_oficio') as HTMLDivElement).style.display = 'none';
    (document.getElementById('div_servicios') as HTMLDivElement).style.display = 'none';
    (document.getElementById('div_agregados') as HTMLDivElement).style.display = 'none';
    (document.getElementById('div_adquiridos') as HTMLDivElement).style.display = 'none';
   
  }

  mostrar_msg(mensaje:string){
    if(this.aling  == "right"){
      this.aling = "left";
      this.color = "#F8CA7A";
    }else{
      this.aling = "right";
      this.color = "white";
    }
    const area = document.getElementById('chat') as HTMLSelectElement;
    area.innerHTML += '<option class="rounded" style="text-align:' + 
    this.aling + '; background-color:'+this.color+';"  title=" '+this.get_fecha()+'">' + mensaje + ' </option>'
    const entrada = document.getElementById('mensaje') as HTMLInputElement;
    entrada.value = ""
  
  }
  async startChat() {
    // Provide a bot name and user input
    this.mostrar_msg(this.mensaje_)
    var response = await Interactions.send("botsito", this.mensaje_.toString());
    this.mensaje_ = '';
    if(response && response.message){
      this.mostrar_msg(response.message);
      console.log(response.message);
      let msg = response.message.split(" ");
      if(msg[0] == "Los" && msg[1] == "oficios"){
          (document.getElementById('div_oficio') as HTMLDivElement).style.display = 'block'
          this.get_oficios()
      }
      if(msg[0] == "Los" && msg[1] == "servicios" && msg[2] == "agregados"){
        (document.getElementById('div_agregados') as HTMLDivElement).style.display = 'block'
    
      }
      if(msg[0] == "Los" && msg[1] == "servicios" && msg[2] == "adquiridos"){
        (document.getElementById('div_adquiridos') as HTMLDivElement).style.display = 'block'
        
      }
      if(msg[0] == "Todos" && msg[1] == "los" && msg[2] == "servicios"){
        (document.getElementById('div_servicios') as HTMLDivElement).style.display = 'block'
      }
      if(msg[0] == "La" && msg[1] == "informacion" && msg[2] == "general"){
        (document.getElementById('div_servicios') as HTMLDivElement).style.display = 'block'
      }
        
    }
    if(response && !response.message){
      
    }
  }



  get_fecha(){
    let fecha = new Date();
    return fecha.getDate() + "-" + (fecha.getMonth() + 1) +
     "-" + fecha.getFullYear() +" | " + fecha.getHours() + ":" +
      fecha.getMinutes()
  }

  get_oficios(){
    this.conexion.getOficios().subscribe(res =>{
      let val = JSON.parse(JSON.stringify(res));
      this.oficios = val[0]
    })
  }
}
