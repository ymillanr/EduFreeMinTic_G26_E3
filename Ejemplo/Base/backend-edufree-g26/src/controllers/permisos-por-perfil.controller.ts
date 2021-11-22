import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PermisosPorPerfil} from '../models';
import {PermisosPorPerfilRepository} from '../repositories';

export class PermisosPorPerfilController {
  constructor(
    @repository(PermisosPorPerfilRepository)
    public permisosPorPerfilRepository : PermisosPorPerfilRepository,
  ) {}

  @post('/permisos-por-perfils')
  @response(200, {
    description: 'PermisosPorPerfil model instance',
    content: {'application/json': {schema: getModelSchemaRef(PermisosPorPerfil)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisosPorPerfil, {
            title: 'NewPermisosPorPerfil',
            exclude: ['id'],
          }),
        },
      },
    })
    permisosPorPerfil: Omit<PermisosPorPerfil, 'id'>,
  ): Promise<PermisosPorPerfil> {
    return this.permisosPorPerfilRepository.create(permisosPorPerfil);
  }

  @get('/permisos-por-perfils/count')
  @response(200, {
    description: 'PermisosPorPerfil model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PermisosPorPerfil) where?: Where<PermisosPorPerfil>,
  ): Promise<Count> {
    return this.permisosPorPerfilRepository.count(where);
  }

  @get('/permisos-por-perfils')
  @response(200, {
    description: 'Array of PermisosPorPerfil model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PermisosPorPerfil, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PermisosPorPerfil) filter?: Filter<PermisosPorPerfil>,
  ): Promise<PermisosPorPerfil[]> {
    return this.permisosPorPerfilRepository.find(filter);
  }

  @patch('/permisos-por-perfils')
  @response(200, {
    description: 'PermisosPorPerfil PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisosPorPerfil, {partial: true}),
        },
      },
    })
    permisosPorPerfil: PermisosPorPerfil,
    @param.where(PermisosPorPerfil) where?: Where<PermisosPorPerfil>,
  ): Promise<Count> {
    return this.permisosPorPerfilRepository.updateAll(permisosPorPerfil, where);
  }

  @get('/permisos-por-perfils/{id}')
  @response(200, {
    description: 'PermisosPorPerfil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PermisosPorPerfil, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PermisosPorPerfil, {exclude: 'where'}) filter?: FilterExcludingWhere<PermisosPorPerfil>
  ): Promise<PermisosPorPerfil> {
    return this.permisosPorPerfilRepository.findById(id, filter);
  }

  @patch('/permisos-por-perfils/{id}')
  @response(204, {
    description: 'PermisosPorPerfil PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisosPorPerfil, {partial: true}),
        },
      },
    })
    permisosPorPerfil: PermisosPorPerfil,
  ): Promise<void> {
    await this.permisosPorPerfilRepository.updateById(id, permisosPorPerfil);
  }

  @put('/permisos-por-perfils/{id}')
  @response(204, {
    description: 'PermisosPorPerfil PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() permisosPorPerfil: PermisosPorPerfil,
  ): Promise<void> {
    await this.permisosPorPerfilRepository.replaceById(id, permisosPorPerfil);
  }

  @del('/permisos-por-perfils/{id}')
  @response(204, {
    description: 'PermisosPorPerfil DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.permisosPorPerfilRepository.deleteById(id);
  }
}
