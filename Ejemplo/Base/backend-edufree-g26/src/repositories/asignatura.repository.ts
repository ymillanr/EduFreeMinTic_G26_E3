import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asignatura, AsignaturaRelations, UsuarioPorGrupo} from '../models';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';

export class AsignaturaRepository extends DefaultCrudRepository<
  Asignatura,
  typeof Asignatura.prototype.id,
  AsignaturaRelations
> {

  public readonly usuarioPorGrupo: HasOneRepositoryFactory<UsuarioPorGrupo, typeof Asignatura.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>,
  ) {
    super(Asignatura, dataSource);
    this.usuarioPorGrupo = this.createHasOneRepositoryFactoryFor('usuarioPorGrupo', usuarioPorGrupoRepositoryGetter);
    this.registerInclusionResolver('usuarioPorGrupo', this.usuarioPorGrupo.inclusionResolver);
  }
}
