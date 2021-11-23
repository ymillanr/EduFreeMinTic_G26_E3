import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, UsuarioPorGrupo} from '../models';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly usuarioPorGrupos: HasManyRepositoryFactory<UsuarioPorGrupo, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>,
  ) {
    super(Usuarios, dataSource);
    this.usuarioPorGrupos = this.createHasManyRepositoryFactoryFor('usuarioPorGrupos', usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarioPorGrupos', this.usuarioPorGrupos.inclusionResolver);
  }
}
