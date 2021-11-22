import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupo,
  ProgramaAcademico,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoProgramaAcademicoController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/programa-academico', {
    responses: {
      '200': {
        description: 'ProgramaAcademico belonging to Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProgramaAcademico)},
          },
        },
      },
    },
  })
  async getProgramaAcademico(
    @param.path.string('id') id: typeof Grupo.prototype.id,
  ): Promise<ProgramaAcademico> {
    return this.grupoRepository.programaAcademico(id);
  }
}
