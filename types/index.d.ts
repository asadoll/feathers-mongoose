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
import { Model, Document, Query } from 'mongoose';
import { Paginated, ServiceMethods, Id, NullableId } from '@feathersjs/feathers'

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

export class MongooseService<
    T = any,
    D = Partial<T>,
    P extends MongooseAdapterParams<any> = MongooseAdapterParams
  >
  extends MongooseAdapter<T, D, P>
  implements ServiceMethods<T | Paginated<T>, D, P>
{
  async find(params?: P & { paginate?: PaginationOptions }): Promise<Paginated<T>>
  async find(params?: P & { paginate: false }): Promise<T[]>
  async find(params?: P): Promise<Paginated<T> | T[]>
  async find(params?: P): Promise<Paginated<T> | T[]> {
    return this._find(params) as any
  }

  async get(id: Id, params?: P): Promise<T> {
    return this._get(id, params)
  }

  async create(data: Partial<D>, params?: P): Promise<T>
  async create(data: Partial<D>[], params?: P): Promise<T[]>
  async create(data: Partial<D> | Partial<D>[], params?: P): Promise<T | T[]> {
    return this._create(data, params)
  }

  async update(id: Id, data: D, params?: P): Promise<T> {
    return this._update(id, data, params)
  }

  async patch(id: Id, data: Partial<D>, params?: P): Promise<T>
  async patch(id: null, data: Partial<D>, params?: P): Promise<T[]>
  async patch(id: NullableId, data: Partial<D>, params?: P): Promise<T | T[]> {
    return this._patch(id, data, params)
  }

  async remove(id: Id, params?: P): Promise<T>
  async remove(id: null, params?: P): Promise<T[]>
  async remove(id: NullableId, params?: P): Promise<T | T[]> {
    return this._remove(id, params)
  }
}
declare const mongoose: ((config?: Partial<MongooseAdapterOptions>) => MongooseService);
export default mongoose;
