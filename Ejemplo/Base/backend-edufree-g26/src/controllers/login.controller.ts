// Uncomment these imports to begin using these cool features!

import { service } from "@loopback/core";
import { HttpErrors, post, requestBody } from "@loopback/rest";
import { Credenciales, Usuarios } from "../models";
import { SeguridadService } from "../services";

// import {inject} from '@loopback/core';


export class LoginController {
  constructor(@service(SeguridadService)
  public servicioSeguridad: SeguridadService,) {}

  @post('/autenticar', {

    responses:{

      '200':{description:'Login exitoso'}
    }

  })

  async login(

    @requestBody() credenciales: Credenciales
  ): Promise<{ tk: any; data: Usuarios & import("c:/Users/yeiso/OneDrive/Documentos/Mision TIC/Desarrollo de Software/Desarrollo Web/NodeJS/Ejemplo/Base/backend-edufree-g26/src/models/usuarios.model").UsuariosRelations; }>{
    try {
      const usuarioEncontrado = await this.servicioSeguridad.ValidarUsuario(credenciales);
      if(usuarioEncontrado){
        //* Se genera el token
        const token = await this.servicioSeguridad.GenerarToken(usuarioEncontrado);
        console.log(token);
        return {        
        tk: token,
        data: usuarioEncontrado

        };
      }else {
        throw new HttpErrors[401]('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      throw new HttpErrors[401]('Usuario o contraseña incorrectos');
    }
    
    
  }
}
