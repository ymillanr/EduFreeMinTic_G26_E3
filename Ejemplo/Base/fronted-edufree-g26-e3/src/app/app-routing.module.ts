import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AsignaturaComponent } from './asignatura/asignatura.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { GrupoComponent } from './grupo/grupo.component';
import { LoginComponent } from './login/login.component';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';
import { RegistroProgramasComponent } from './registro-programas/registro-programas.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: '',
  component:LoginComponent},

  {path:'login',
  component:LoginComponent},

  {path:'admin-usuarios',
  component:AdminUsuariosComponent},

  {path:'registro',
  component:RegistroComponent},

  {path:'registro-programas',
  component:RegistroProgramasComponent},

  {path:'grupo',
  component:GrupoComponent},

  {path:'asignatura',
  component:AsignaturaComponent},

  {path:'calificaciones',
  component:CalificacionesComponent},


  {path:'programas-en-oferta',
  component:ProgramasEnOfertaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
