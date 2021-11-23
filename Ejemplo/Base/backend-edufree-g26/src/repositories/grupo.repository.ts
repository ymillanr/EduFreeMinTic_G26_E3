import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grupo, GrupoRelations, Usuarios, UsuarioPorGrupo} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';

export class GrupoRepository extends DefaultCrudRepository<
  Grupo,
  typeof Grupo.prototype.id,
  GrupoRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuarios, typeof Grupo.prototype.id>;

  public readonly usuarioPorGrupos: HasManyRepositoryFactory<UsuarioPorGrupo, typeof Grupo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>,
  ) {
    super(Grupo, dataSource);
    this.usuarioPorGrupos = this.createHasManyRepositoryFactoryFor('usuarioPorGrupos', usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarioPorGrupos', this.usuarioPorGrupos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
