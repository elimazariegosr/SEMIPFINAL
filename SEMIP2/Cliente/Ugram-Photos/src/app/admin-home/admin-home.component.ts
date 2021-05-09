import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['../styles_forms.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router,
    private conexion: ConexionService) { 

      if(localStorage.getItem("admin") == null){
        this.router.navigate(['/Users/Login'])
      }
    }

  ngOnInit(): void {
  }
  usuarios(){
    alert("Opcion en mantenimiento")
  }

  oficio(){
    this.router.navigate(['/Users/Admin/Oficios/Crear'])
  }
  servicios(){
    this.router.navigate(['/Users/Admin/Solicitudes'])   
  }
}
