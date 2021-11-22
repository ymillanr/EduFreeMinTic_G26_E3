import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, ProgramaAcademico, Estudiante, Asignatura} from '../models';
import {ProgramaAcademicoRepository} from './programa-academico.repository';
import {AsignaturaRepository} from './asignatura.repository';
import {EstudianteRepository} from './estudiante.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly programaAcademico: BelongsToAccessor<ProgramaAcademico, typeof Grupo.prototype.id>;

  public readonly estudiantes: HasManyThroughRepositoryFactory<Estudiante, typeof Estudiante.prototype.id,
          Asignatura,
          typeof Grupo.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProgramaAcademicoRepository') protected programaAcademicoRepositoryGetter: Getter<ProgramaAcademicoRepository>, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Grupo, dataSource);
    this.estudiantes = this.createHasManyThroughRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter, asignaturaRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
    this.programaAcademico = this.createBelongsToAccessorFor('programaAcademico', programaAcademicoRepositoryGetter,);
    this.registerInclusionResolver('programaAcademico', this.programaAcademico.inclusionResolver);
  }
}
