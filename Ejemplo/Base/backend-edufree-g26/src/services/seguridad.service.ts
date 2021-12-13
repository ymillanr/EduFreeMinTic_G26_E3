import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Credenciales, Usuarios } from '../models';
import { UsuariosRepository } from '../repositories';
const jwt = require('jsonwebtoken');

@injectable({ scope: BindingScope.TRANSIENT })
export class SeguridadService {

  claveSecreta = 'secreto';
  constructor(

    @repository(UsuariosRepository) public usuarioRepositorio: UsuariosRepository


  ) { }

  async ValidarUsuario(credenciales: Credenciales) {

    try {

      const usuarioEncontrado = await this.usuarioRepositorio.findOne(
        {
          where: {
            correo: credenciales.correo,
            password: credenciales.password
        }
      }
      );

      if (usuarioEncontrado) {
      
      return usuarioEncontrado;
      } else {
      
        return false;
      }

    } catch (error) {
      console.log(error.message);
      return false;
    }

  }


  async GenerarToken(usuarios: Usuarios) {

    const token = jwt.sign({
      data:{
        nombre: usuarios.nombre,
        apellidos: usuarios.apellidos,
        correo: usuarios.correo,
      }

     }, this.claveSecreta);
     return token;
    }


    ValidarToken(token: string) {
      try {
        const datos = jwt.verify(token, this.claveSecreta);
      } catch (error) {
        return false;
      }

    }
  /*
   * Add service methods here
   */
}
