import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { FotosComponent } from './fotos/fotos.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';
import { ModificarAlbumComponent } from './modificar-album/modificar-album.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SeleccionarFotoComponent } from './seleccionar-foto/seleccionar-foto.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import Amplify, {Interactions } from 'aws-amplify';
import { FormsModule } from '@angular/forms';
import { ObtenerTextoComponent } from './obtener-texto/obtener-texto.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { VerServiciosComponent } from './ver-servicios/ver-servicios.component';
import { CrearOficioComponent } from './crear-oficio/crear-oficio.component';

Amplify.configure({
  Auth: {
    identityPoolId: 'us-west-2:f95a93db-d3d7-4a10-90db-4027c0073eec',
    region: 'us-west-2'
  },
  Interactions: {
    bots: {
      "botsito": {
        "name": "botsito",
        "alias": "$LATEST",
        "region": "us-west-2",
      },
    }
  }
});
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrarComponent,
    FotosComponent,
    ModificarUsuarioComponent,
    SubirFotoComponent,
    ModificarAlbumComponent,
    SeleccionarFotoComponent,
    ChatbotComponent,
    ObtenerTextoComponent,
    AdminHomeComponent,
    SolicitudesComponent,
    CrearServicioComponent,
    VerServiciosComponent,
    CrearOficioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
