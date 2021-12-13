import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  formUsuarios: any;
  listaUsuarios: any[] = [];
  idUsuarioActual= '';
  modoCrud = 'adicion';



  constructor(
    private fb: FormBuilder,
    private servicioBackend: BackendService
  ) {
    this.formUsuarios = this.fb.group(
      {
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        correo: ['', Validators.compose([Validators.email, Validators.required])],


      }

    );

    this.obtenerUsuarios();

  }

  ngOnInit(): void {
  }

  obtenerUsuarios(): void {

    this.servicioBackend.getRequest('usuarios').subscribe(
      {
        next: (data) => {

          this.listaUsuarios = data;
          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }
    );
  }

  iniciarAdicion(): void {
    this.modoCrud = 'adicion';
  }
  crearUsuarios(): void {

    const usuarioNuevo = this.formUsuarios.getRawValue();
    usuarioNuevo['password'] = 'xxx';


    this.servicioBackend.postRequest('usuarios', JSON.stringify(usuarioNuevo)).subscribe(
      {
        next: (data) => {
          this.listaUsuarios.unshift(data);
          this.formUsuarios.reset();

          Swal.fire('Felicidades', 'Has creado un nuevo usuario', 'success');
          this.formUsuarios.reset();
          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }
    );


  }

  iniciarEdicion(usuarios: any):void {

    this.formUsuarios.patchValue(usuarios);
    this.idUsuarioActual = usuarios.id;
    this.modoCrud = 'edicion';
  }

  editarUsuarios(): void {

    const newUser = this.formUsuarios.getRawValue();
    this.servicioBackend.patchRequest('usuarios', this.idUsuarioActual, newUser).subscribe(
      {
        next: (data) => {
        
          this.obtenerUsuarios();
          Swal.fire('Usuario', 'ha sido actualizado','success');
          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }
    );
  
}

eliminarUsuario(usuarios: any) {

  this.servicioBackend.deleteRequest('usuarios', usuarios.id).subscribe(

    {
      next: (data) => {

        this.obtenerUsuarios();
        Swal.fire('Se ha eliminado al usuario: ' + usuarios.nombre, 'success');
        console.log(data);
      },
      error: (e) => {
        console.log('error');
      },
      complete: () => {
        console.log('completo');
      }
    }
  );

}

}
function success(arg0: string, arg1: string, success: any, arg3: string, arg4: void) {
  throw new Error('Function not implemented.');
}

