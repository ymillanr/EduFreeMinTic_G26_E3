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
PermisosPorPerfil,
Perfil,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosPerfilController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/perfils', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Perfil through PermisosPorPerfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perfil)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Perfil>,
  ): Promise<Perfil[]> {
    return this.usuariosRepository.UsuarioPorPerfil(id).find(filter);
  }

  @post('/usuarios/{id}/perfils', {
    responses: {
      '200': {
        description: 'create a Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perfil)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfilInUsuarios',
            exclude: ['id'],
          }),
        },
      },
    }) perfil: Omit<Perfil, 'id'>,
  ): Promise<Perfil> {
    return this.usuariosRepository.UsuarioPorPerfil(id).create(perfil);
  }

  @patch('/usuarios/{id}/perfils', {
    responses: {
      '200': {
        description: 'Usuarios.Perfil PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Partial<Perfil>,
    @param.query.object('where', getWhereSchemaFor(Perfil)) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioPorPerfil(id).patch(perfil, where);
  }

  @del('/usuarios/{id}/perfils', {
    responses: {
      '200': {
        description: 'Usuarios.Perfil DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Perfil)) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.usuariosRepository.UsuarioPorPerfil(id).delete(where);
  }
}
