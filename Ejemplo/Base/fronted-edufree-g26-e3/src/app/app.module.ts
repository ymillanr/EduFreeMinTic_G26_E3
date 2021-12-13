import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroProgramasComponent } from './registro-programas/registro-programas.component';
import { GrupoComponent } from './grupo/grupo.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgramasEnOfertaComponent,
    AdminUsuariosComponent,
    RegistroComponent,
    RegistroProgramasComponent,
    GrupoComponent,
    AsignaturaComponent,
    CalificacionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
