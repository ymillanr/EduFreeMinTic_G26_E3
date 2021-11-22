import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Docente,
  Grupo,
} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteGrupoController {
  constructor(
    @repository(DocenteRepository)
    public docenteRepository: DocenteRepository,
  ) { }

  @get('/docentes/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to Docente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.string('id') id: typeof Docente.prototype.id,
  ): Promise<Grupo> {
    return this.docenteRepository.grupo(id);
  }
}
