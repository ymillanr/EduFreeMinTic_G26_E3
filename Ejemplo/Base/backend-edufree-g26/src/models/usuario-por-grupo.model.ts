import {Entity, model, property, hasOne} from '@loopback/repository';

@model()
export class UsuarioPorGrupo extends Entity {
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
  grupoId: string;

  @property({
    type: 'string',
    required: true,
  })
  usuariosId: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: string;

  @property({
    type: 'string',
  })
  asignaturaId?: string;

  constructor(data?: Partial<UsuarioPorGrupo>) {
    super(data);
  }
}

export interface UsuarioPorGrupoRelations {
  // describe navigational properties here
}

export type UsuarioPorGrupoWithRelations = UsuarioPorGrupo & UsuarioPorGrupoRelations;
