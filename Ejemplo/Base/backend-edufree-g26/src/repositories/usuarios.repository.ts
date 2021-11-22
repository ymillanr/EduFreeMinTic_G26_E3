import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Grupo, UsuarioPorGrupo, Perfil, PermisosPorPerfil} from '../models';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';
import {GrupoRepository} from './grupo.repository';
import {PermisosPorPerfilRepository} from './permisos-por-perfil.repository';
import {PerfilRepository} from './perfil.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly UsuarioPorGrupo: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          UsuarioPorGrupo,
          typeof Usuarios.prototype.id
        >;

  public readonly UsuarioPorPerfil: HasManyThroughRepositoryFactory<Perfil, typeof Perfil.prototype.id,
          PermisosPorPerfil,
          typeof Usuarios.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('PermisosPorPerfilRepository') protected permisosPorPerfilRepositoryGetter: Getter<PermisosPorPerfilRepository>, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Usuarios, dataSource);
    this.UsuarioPorPerfil = this.createHasManyThroughRepositoryFactoryFor('UsuarioPorPerfil', perfilRepositoryGetter, permisosPorPerfilRepositoryGetter,);
    this.registerInclusionResolver('UsuarioPorPerfil', this.UsuarioPorPerfil.inclusionResolver);
    this.UsuarioPorGrupo = this.createHasManyThroughRepositoryFactoryFor('UsuarioPorGrupo', grupoRepositoryGetter, usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('UsuarioPorGrupo', this.UsuarioPorGrupo.inclusionResolver);
  }
}
