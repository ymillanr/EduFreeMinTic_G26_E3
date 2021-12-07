import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Usuario{

  codigo: string;
  password: string

}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: any;


  titulo="Login"
  usuarioLogin: Usuario = {codigo:"", password:""};

  codigoUsuario:string= "";
  password:string= "";

  constructor(private fb: FormBuilder) {
    
      // this.formLogin = new FormGroup({
      //   firstName: new FormControl(''),
      //   lastName: new FormControl(''),
      // });


      this.formLogin = this.fb.group(
        {
            codigo:['', Validators.required],
            password:['', Validators.required],


        }

      )

   }

  ngOnInit(): void {
  }

changeCodeUser(event:any):void{

  console.log(event);
}

mostrarInfo():void{
  const credenciales = this.formLogin.getRawValue();
  alert(JSON.stringify(credenciales));
}

}
