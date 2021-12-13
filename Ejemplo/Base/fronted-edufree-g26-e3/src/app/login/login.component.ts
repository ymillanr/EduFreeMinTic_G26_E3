import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

interface Usuario {

  codigo: string;
  password: string

}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  formLogin: any;
  titulo = "Login";

  constructor(
    private fb: FormBuilder,
    private servicioBackend: BackendService,
    private servicioGlobal: GlobalService,
    private router: Router
    ) {

    // this.formLogin = new FormGroup({
    //   firstName: new FormControl(''),
    //   lastName: new FormControl(''),
    // });


    this.formLogin = this.fb.group(
      {
        correo: ['', Validators.required],
        password: ['', Validators.required]


      }

    );

  }

  ngOnInit(): void {
    this.servicioGlobal.rutaActual = 'sesion/login';
  }



  autenticar(): void {
    const passwordEncriptada = Md5.hashStr(this.formLogin.controls.password.value);
    const credenciales = this.formLogin.getRawValue();
    credenciales.password = passwordEncriptada;
    this.servicioBackend.autenticar(JSON.stringify(credenciales)).subscribe(
      {
        next: (respuesta) => {

          if (respuesta && respuesta.data) {

            if (respuesta.tk) {
              this.servicioBackend.token = respuesta.tk;
              localStorage.setItem('tk', respuesta.tk);
              localStorage.setItem('perfil', JSON.stringify(respuesta.data.perfil));
              localStorage.setItem('nombreUsuario', respuesta.data.nombre);
              this.servicioGlobal.actualizarSideBar();
              this.router.navigate(['/admin/admin-usuarios']);
            }

            alert('Felicidades estas logueado');
          } else {
            alert('Lo sentimos, las credenciales son incorrectas');
          }

          // console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }

    )
  // alert(JSON.stringify(credenciales));
  }

}
