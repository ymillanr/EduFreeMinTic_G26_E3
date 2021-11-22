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
Grupo,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosGrupoController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Grupo through UsuarioPorGrupo',
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
    return this.usuariosRepository.UsuarioPorGrupo(id).find(filter);
  }

  @post('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'create a Grupo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupo, {
            title: 'NewGrupoInUsuarios',
            exclude: ['id'],
          }),
        },
      },
    }) grupo: Omit<Grupo, 'id'>,
  ): Promise<Grupo> {
    return this.usuariosRepository.UsuarioPorGrupo(id).create(grupo);
  }

  @patch('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'Usuarios.Grupo PATCH success count',
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
    return this.usuariosRepository.UsuarioPorGrupo(id).patch(grupo, where);
  }

  @del('/usuarios/{id}/grupos', {
    responses: {
      '200': {
        description: 'Usuarios.Grupo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupo)) where?: Where<Grupo>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioPorGrupo(id).delete(where);
  }
}
