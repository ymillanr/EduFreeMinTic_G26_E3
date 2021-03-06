import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuarioPorGrupo, UsuarioPorGrupoRelations} from '../models';

export class UsuarioPorGrupoRepository extends DefaultCrudRepository<
  UsuarioPorGrupo,
  typeof UsuarioPorGrupo.prototype.id,
  UsuarioPorGrupoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuarioPorGrupo, dataSource);
  }
}
