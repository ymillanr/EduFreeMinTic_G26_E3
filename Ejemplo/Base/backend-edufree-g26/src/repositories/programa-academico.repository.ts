import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProgramaAcademico, ProgramaAcademicoRelations, Asignatura, Grupo} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {GrupoRepository} from './grupo.repository';

export class ProgramaAcademicoRepository extends DefaultCrudRepository<
  ProgramaAcademico,
  typeof ProgramaAcademico.prototype.id,
  ProgramaAcademicoRelations
> {

  public readonly asignaturas: HasManyRepositoryFactory<Asignatura, typeof ProgramaAcademico.prototype.id>;

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof ProgramaAcademico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>,
  ) {
    super(ProgramaAcademico, dataSource);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
    this.asignaturas = this.createHasManyRepositoryFactoryFor('asignaturas', asignaturaRepositoryGetter,);
    this.registerInclusionResolver('asignaturas', this.asignaturas.inclusionResolver);
  }
}
