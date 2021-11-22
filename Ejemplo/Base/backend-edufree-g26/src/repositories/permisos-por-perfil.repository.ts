import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PermisosPorPerfil, PermisosPorPerfilRelations} from '../models';

export class PermisosPorPerfilRepository extends DefaultCrudRepository<
  PermisosPorPerfil,
  typeof PermisosPorPerfil.prototype.id,
  PermisosPorPerfilRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PermisosPorPerfil, dataSource);
  }
}
