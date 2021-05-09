import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CrearOficioComponent } from './crear-oficio/crear-oficio.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { FotosComponent } from './fotos/fotos.component';
import {HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModificarAlbumComponent } from './modificar-album/modificar-album.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { ObtenerTextoComponent } from './obtener-texto/obtener-texto.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { SeleccionarFotoComponent } from './seleccionar-foto/seleccionar-foto.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';
import { VerServiciosComponent } from './ver-servicios/ver-servicios.component';

const routes: Routes = [
  //{path:'**', pathMatch:'full', redirectTo:'Users/Login'},
  {path: 'Users/Login', component: LoginComponent},
  {path: 'Users/Registrar', component: RegistrarComponent},
  {path: 'Users/Fotos', component: FotosComponent},
  {path: 'Users/Edit', component: ModificarUsuarioComponent},
  {path: 'Users/Fotos/Subir', component: SubirFotoComponent},
  {path: 'Users/Fotos/Seleccionar', component: SeleccionarFotoComponent},
  {path: 'Users/Fotos/Modifcar', component:ModificarAlbumComponent},
  {path: 'Users/Fotos/ObtenerTexto', component:ObtenerTextoComponent},
  {path: 'Chatbot', component:ChatbotComponent},
  {path: 'Users', component: HomeComponent},
  {path: 'Users/Admin', component: AdminHomeComponent},
  {path: 'Users/Admin/Oficios/Crear', component: CrearOficioComponent},
  {path: 'Users/Admin/Solicitudes', component: SolicitudesComponent},
  {path: 'Users/Solicitudes/Crear', component: CrearServicioComponent},
  {path: 'Users/Servicios', component: VerServiciosComponent},
  {path: '', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
