import {Entity, model, property} from '@loopback/repository';

@model()
export class PermisosPorPerfil extends Entity {
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
  usuariosId: string;

  @property({
    type: 'string',
    required: true,
  })
  perfilId: string;


  constructor(data?: Partial<PermisosPorPerfil>) {
    super(data);
  }
}

export interface PermisosPorPerfilRelations {
  // describe navigational properties here
}

export type PermisosPorPerfilWithRelations = PermisosPorPerfil & PermisosPorPerfilRelations;
