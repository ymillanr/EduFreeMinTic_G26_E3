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
  Usuarios,
  UsuarioPorGrupo,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosUsuarioPorGrupoController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many UsuarioPorGrupo',
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
    return this.usuariosRepository.usuarioPorGrupos(id).find(filter);
  }

  @post('/usuarios/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioPorGrupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {
            title: 'NewUsuarioPorGrupoInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) usuarioPorGrupo: Omit<UsuarioPorGrupo, 'id'>,
  ): Promise<UsuarioPorGrupo> {
    return this.usuariosRepository.usuarioPorGrupos(id).create(usuarioPorGrupo);
  }

  @patch('/usuarios/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Usuarios.UsuarioPorGrupo PATCH success count',
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
    return this.usuariosRepository.usuarioPorGrupos(id).patch(usuarioPorGrupo, where);
  }

  @del('/usuarios/{id}/usuario-por-grupos', {
    responses: {
      '200': {
        description: 'Usuarios.UsuarioPorGrupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UsuarioPorGrupo)) where?: Where<UsuarioPorGrupo>,
  ): Promise<Count> {
    return this.usuariosRepository.usuarioPorGrupos(id).delete(where);
  }
}
