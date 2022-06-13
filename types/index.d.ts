// TypeScript Version: 4.0
import { Params, Paginated, Id, NullableId, Hook } from '@feathersjs/feathers';
// import {
//   PaginationOptions, 
//   InternalServiceMethods,
//   AdapterServiceOptions,
// } from '@feathersjs/adapter-commons';
import {
  AdapterBase,
  AdapterParams,
  AdapterServiceOptions,
  PaginationOptions,
  AdapterQuery
} from '@feathersjs/adapter-commons'
import { NullableId, Id, Paginated } from '@feathersjs/feathers'
import { Model, Document, Query } from 'mongoose';

export namespace hooks {
  function toObject(options?: any, dataField?: string): Hook;
}

export namespace transactionManager {
  const beginTransaction: Hook;
  const commitTransaction: Hook;
  const rollbackTransaction: Hook;
}

export interface MongooseAdapterOptions<T extends Document = any> extends AdapterServiceOptions {
  Model: Model<T>;
  lean: boolean;
  overwrite: boolean;
  useEstimatedDocumentCount: boolean;
  queryModifier?: (query: Query<any, any>, params: Params) => void;
  queryModifierKey?: string;
}
export interface MongooseAdapterParams<Q = AdapterQuery>
  extends AdapterParams<Q, Partial<MongooseAdapterOptions>> {
}

// export class Service<T = any> implements InternalServiceMethods<T> {
export class MongooseAdapter<
  T,
  D = Partial<T>,
  P extends MongooseAdapterParams<any> = MongooseAdapterParams
> extends AdapterBase<T, D, P, MongooseAdapterOptions> {
  Model: Model<Document>;
  options: MongooseAdapterOptions<Document>;

  constructor(config?: Partial<MongooseAdapterOptions>);

  $find(params?: P& { paginate?: PaginationOptions; }): Promise<Paginated<T>>;
  $find(params?: P& { paginate: false; }): Promise<T[]>;
  $find(params?: P): Promise<T[] | Paginated<T>>;
  $get(id: Id, params?: P): Promise<T>;
  $create(data: Partial<D>, params?: P): Promise<T>;
  $create(data: Partial<D>[], params?: P): Promise<T[]>;
  $create(data: Partial<D> | Partial<D>[], _params?: P): Promise<T | T[]>;
  $create(data: Partial<D> | Partial<D>[], params: P): Promise<T | T[]>;
  $update(id: Id, data: D, params: P): Promise<T>;
  $patch(id: null, data: Partial<D>, params?: P): Promise<T[]>;
  $patch(id: Id, data: Partial<D>, params?: P): Promise<T>;
  $patch(id: NullableId, data: Partial<D>, _params?: P): Promise<T | T[]>;
  $patch(id: NullableId, _data: Partial<D>, params: P): Promise<T | T[]>;
  $remove(id: null, params?: P): Promise<T[]>;
  $remove(id: Id, params?: P): Promise<T>;
  $remove(id: NullableId, _params?: P): Promise<T | T[]>;
  $remove(id: NullableId, params: P): Promise<T | T[]>;
}

declare const mongoose: ((config?: Partial<MongooseAdapterOptions>) => MongooseAdapter);
export default mongoose;
