import {Entity, model, property, hasMany} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';
import {Perfil} from './perfil.model';
import {PermisosPorPerfil} from './permisos-por-perfil.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  perfil: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
  })
  celular?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  nacionalidad?: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  tipoDocente?: string[];

  @hasMany(() => Grupo, {through: {model: () => UsuarioPorGrupo}})
  UsuarioPorGrupo: Grupo[];

  @hasMany(() => Perfil, {through: {model: () => PermisosPorPerfil}})
  UsuarioPorPerfil: Perfil[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
