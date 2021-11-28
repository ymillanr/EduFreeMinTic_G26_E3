import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {ProgramaAcademico} from './programa-academico.model';
import {Asignatura} from './asignatura.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';

@model()
export class Grupo extends Entity {
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
  fechaCreacion: string;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadEstudiantes: number;

  @property({
    type: 'date',
    required: true,
  })
  inicioDocencia: string;

  @property({
    type: 'date',
    required: true,
  })
  finDocencia: string;

  @property({
    type: 'string',
    required: true,
  })
  semestreAcademico: string;
  

  @belongsTo(() => ProgramaAcademico)
  programaAcademicoId: string;
  
  @hasMany(() => UsuarioPorGrupo)
  usuarioPorGrupos: UsuarioPorGrupo[];

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
