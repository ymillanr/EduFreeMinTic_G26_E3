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
  Asignatura,
  UsuarioPorGrupo,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaUsuarioPorGrupoController {
  constructor(
    @repository(AsignaturaRepository) protected asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/usuario-por-grupo', {
    responses: {
      '200': {
        description: 'Asignatura has one UsuarioPorGrupo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsuarioPorGrupo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UsuarioPorGrupo>,
  ): Promise<UsuarioPorGrupo> {
    return this.asignaturaRepository.usuarioPorGrupo(id).get(filter);
  }

  @post('/asignaturas/{id}/usuario-por-grupo', {
    responses: {
      '200': {
        description: 'Asignatura model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioPorGrupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asignatura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {
            title: 'NewUsuarioPorGrupoInAsignatura',
            exclude: ['id'],
            optional: ['asignaturaId']
          }),
        },
      },
    }) usuarioPorGrupo: Omit<UsuarioPorGrupo, 'id'>,
  ): Promise<UsuarioPorGrupo> {
    return this.asignaturaRepository.usuarioPorGrupo(id).create(usuarioPorGrupo);
  }

  @patch('/asignaturas/{id}/usuario-por-grupo', {
    responses: {
      '200': {
        description: 'Asignatura.UsuarioPorGrupo PATCH success count',
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
    return this.asignaturaRepository.usuarioPorGrupo(id).patch(usuarioPorGrupo, where);
  }

  @del('/asignaturas/{id}/usuario-por-grupo', {
    responses: {
      '200': {
        description: 'Asignatura.UsuarioPorGrupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UsuarioPorGrupo)) where?: Where<UsuarioPorGrupo>,
  ): Promise<Count> {
    return this.asignaturaRepository.usuarioPorGrupo(id).delete(where);
  }
}
