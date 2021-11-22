import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProgramaAcademico,
  Grupo,
} from '../models';
import {ProgramaAcademicoRepository} from '../repositories';

export class ProgramaAcademicoGrupoController {
  constructor(
    @repository(ProgramaAcademicoRepository) protected programaAcademicoRepository: ProgramaAcademicoRepository,
  ) { }

  @get('/programa-academicos/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of ProgramaAcademico has many Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupo>,
  ): Promise<Grupo[]> {
    return this.programaAcademicoRepository.grupos(id).find(filter);
  }

  @post('/programa-academicos/{id}/grupos', {
    responses: {
      '200': {
        description: 'ProgramaAcademico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProgramaAcademico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInProgramaAcademico',
            exclude: ['id'],
            optional: ['programaAcademicoId']
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.programaAcademicoRepository.grupos(id).create(grupo);
  }

  @patch('/programa-academicos/{id}/grupos', {
    responses: {
      '200': {
        description: 'ProgramaAcademico.Grupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {partial: true}),
        },
      },
    })
    grupo: Partial<Grupo>,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.programaAcademicoRepository.grupos(id).patch(grupo, where);
  }

  @del('/programa-academicos/{id}/grupos', {
    responses: {
      '200': {
        description: 'ProgramaAcademico.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.programaAcademicoRepository.grupos(id).delete(where);
  }
}
