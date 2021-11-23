import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {ProgramaAcademico} from './programa-academico.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';

@model()
export class Asignatura extends Entity {
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
  nombre: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaCreacion: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  profundizacion: string[];

  @belongsTo(() => ProgramaAcademico)
  programaAcademicoId: string;

  @hasOne(() => UsuarioPorGrupo)
  usuarioPorGrupo: UsuarioPorGrupo;

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
