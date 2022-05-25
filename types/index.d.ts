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

  $find(params?: Params): Promise<T | T[] | Paginated<T>>;
  $get(id: Id, params?: Params): Promise<T>;
  $create(data: Partial<T> | Array<Partial<T>>, params?: Params): Promise<T | T[]>;
  $update(id: NullableId, data: T, params?: Params): Promise<T>;
  $patch(id: NullableId, data: Partial<T>, params?: Params): Promise<T>;
  $remove(id: NullableId, params?: Params): Promise<T>;
}

declare const mongoose: ((config?: Partial<MongooseServiceOptions>) => Service);
export default mongoose;
