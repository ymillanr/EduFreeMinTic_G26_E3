import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {Asignatura} from './asignatura.model';

@model()
export class Docente extends Entity {
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
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
    required: true,
  })
  celular: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  tipoDocente: string[];

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @hasMany(() => Grupo, {through: {model: () => Asignatura}})
  grupos: Grupo[];

  @belongsTo(() => Grupo)
  grupoId: string;

  constructor(data?: Partial<Docente>) {
    super(data);
  }
}

export interface DocenteRelations {
  // describe navigational properties here
}

export type DocenteWithRelations = Docente & DocenteRelations;
