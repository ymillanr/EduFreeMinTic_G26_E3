import { AuthenticationStrategy } from "@loopback/authentication";
import parseBearerToken from "parse-bearer-token";
import { UserProfile } from "@loopback/security";
import { Request } from "@loopback/express";
import { HttpErrors } from "@loopback/rest";
import { SeguridadService } from "../services";
import { service } from "@loopback/core";




export class EstrategiaSeguridad implements AuthenticationStrategy{

    name: string = 'seguridad';
    servicioSeguridad: any;

    constructor(

        @service(SeguridadService) public seguridadService: SeguridadService
    ){


    }
 

    async authenticate(request: Request): Promise<UserProfile | undefined> {

        let token = parseBearerToken(request);

        if(token){

            let response = await this.servicioSeguridad.validarToken(token);

            if(response){

                const perfil: UserProfile = Object.assign({
                    nombre: response.data.nombre,
                    correo: response.data.correo});

                return perfil;

            }else{
                throw new HttpErrors[401]('Token no valido');
            }


        } else {
            throw new HttpErrors[401]('No se ha proporcionado un token');
        }

    }
}