// TypeScript Version: 4.0
import { Params, Paginated, Id, NullableId, Hook } from '@feathersjs/feathers';
import {
  InternalServiceMethods,
  AdapterServiceOptions,
} from '@feathersjs/adapter-commons';
import { Model, Document, Query } from 'mongoose';

export namespace hooks {
  function toObject(options?: any, dataField?: string): Hook;
}

export namespace transactionManager {
  const beginTransaction: Hook;
  const commitTransaction: Hook;
  const rollbackTransaction: Hook;
}

export interface MongooseServiceOptions<T extends Document = any> extends AdapterServiceOptions {
  Model: Model<T>;
  lean: boolean;
  overwrite: boolean;
  useEstimatedDocumentCount: boolean;
  queryModifier?: (query: Query<any, any>, params: Params) => void;
  queryModifierKey?: string;
}

export class Service<T = any> implements InternalServiceMethods<T> {
  Model: Model<Document>;
  options: MongooseServiceOptions<Document>;

  constructor(config?: Partial<MongooseServiceOptions>);

  $find(_params?: P & { paginate?: PaginationOptions; }): Promise<Paginated<T>>;
  $find(_params?: P & { paginate: false; }): Promise<T[]>;
  $find(params?: P): Promise<T[] | Paginated<T>>;
  $get(id: Id, params?: Params): Promise<T>;
  $create(data: Partial<T>, params?: Params): Promise<T>;
  $create(data: Partial<T>[], params?: Params): Promise<T[]>;
  $create(data: Partial<T> | Partial<T>[], params?: Params): Promise<T | T[]>;
  $update(id: Id, data: T, params?: Params): Promise<T>;
  $patch(id: null, data: Partial<T>, params?: Params): Promise<T[]>;
  $patch(id: Id, data: Partial<T>, params?: Params): Promise<T>;
  $patch(id: NullableId, data: Partial<T>, params?: Params): Promise<T | T[]>;
  $remove(id: null, params?: Params): Promise<T[]>;
  $remove(id: Id, params?: Params): Promise<T>;
  $remove(id: NullableId, params?: Params): Promise<T | T[]>;
}

declare const mongoose: ((config?: Partial<MongooseServiceOptions>) => Service);
export default mongoose;
