import {Entity, model, property, hasMany} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Grupo} from './grupo.model';

@model()
export class ProgramaAcademico extends Entity {
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
  registroSNIES: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  modalidad: string[];

  @property({
    type: 'number',
    required: true,
  })
  duracion: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tipo: string[];

  @property({
    type: 'number',
    required: true,
  })
  creditos: number;

  @property({
    type: 'date',
  })
  FechaCreacion?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  facultad: string[];


  @hasMany(() => Asignatura)
  asignaturas: Asignatura[];

  @hasMany(() => Grupo)
  grupos: Grupo[];

  constructor(data?: Partial<ProgramaAcademico>) {
    super(data);
  }
}

export interface ProgramaAcademicoRelations {
  // describe navigational properties here
}

export type ProgramaAcademicoWithRelations = ProgramaAcademico & ProgramaAcademicoRelations;
