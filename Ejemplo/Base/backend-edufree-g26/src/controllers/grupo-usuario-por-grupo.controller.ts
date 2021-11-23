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
  Grupo,
  UsuarioPorGrupo,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoUsuarioPorGrupoController {
  constructor(
    @repository(GrupoRepository) protected grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Array of Grupo has many UsuarioPorGrupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UsuarioPorGrupo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UsuarioPorGrupo>,
  ): Promise<UsuarioPorGrupo[]> {
    return this.grupoRepository.usuarioPorGrupos(id).find(filter);
  }

  @post('/grupos/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioPorGrupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {
            title: 'NewUsuarioPorGrupoInGrupo',
            exclude: ['id'],
            optional: ['grupoId']
          }),
        },
      },
    }) usuarioPorGrupo: Omit<UsuarioPorGrupo, 'id'>,
  ): Promise<UsuarioPorGrupo> {
    return this.grupoRepository.usuarioPorGrupos(id).create(usuarioPorGrupo);
  }

  @patch('/grupos/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Grupo.UsuarioPorGrupo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {partial: true}),
        },
      },
    })
    usuarioPorGrupo: Partial<UsuarioPorGrupo>,
    @param.query.object('where', getWhereSchemaFor(UsuarioPorGrupo)) where?: Where<UsuarioPorGrupo>,
  ): Promise<Count> {
    return this.grupoRepository.usuarioPorGrupos(id).patch(usuarioPorGrupo, where);
  }

  @del('/grupos/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Grupo.UsuarioPorGrupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UsuarioPorGrupo)) where?: Where<UsuarioPorGrupo>,
  ): Promise<Count> {
    return this.grupoRepository.usuarioPorGrupos(id).delete(where);
  }
}
