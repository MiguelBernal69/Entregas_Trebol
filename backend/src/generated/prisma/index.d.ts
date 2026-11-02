
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model UserRegion
 * 
 */
export type UserRegion = $Result.DefaultSelection<Prisma.$UserRegionPayload>
/**
 * Model OrderHistory
 * 
 */
export type OrderHistory = $Result.DefaultSelection<Prisma.$OrderHistoryPayload>
/**
 * Model DistributionSession
 * 
 */
export type DistributionSession = $Result.DefaultSelection<Prisma.$DistributionSessionPayload>
/**
 * Model ProductionEntry
 * 
 */
export type ProductionEntry = $Result.DefaultSelection<Prisma.$ProductionEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  preventista: 'preventista',
  distribuidor: 'distribuidor'
};

export type Role = (typeof Role)[keyof typeof Role]


export const OrderStatus: {
  pendiente: 'pendiente',
  aceptado: 'aceptado',
  asignado: 'asignado',
  entregado: 'entregado',
  entrega_parcial: 'entrega_parcial'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const OrderAction: {
  created: 'created',
  updated: 'updated',
  status_changed: 'status_changed',
  assigned: 'assigned',
  delivered: 'delivered'
};

export type OrderAction = (typeof OrderAction)[keyof typeof OrderAction]


export const SessionStatus: {
  activa: 'activa',
  cerrada: 'cerrada'
};

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type OrderAction = $Enums.OrderAction

export const OrderAction: typeof $Enums.OrderAction

export type SessionStatus = $Enums.SessionStatus

export const SessionStatus: typeof $Enums.SessionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRegion`: Exposes CRUD operations for the **UserRegion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRegions
    * const userRegions = await prisma.userRegion.findMany()
    * ```
    */
  get userRegion(): Prisma.UserRegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderHistory`: Exposes CRUD operations for the **OrderHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderHistories
    * const orderHistories = await prisma.orderHistory.findMany()
    * ```
    */
  get orderHistory(): Prisma.OrderHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.distributionSession`: Exposes CRUD operations for the **DistributionSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DistributionSessions
    * const distributionSessions = await prisma.distributionSession.findMany()
    * ```
    */
  get distributionSession(): Prisma.DistributionSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productionEntry`: Exposes CRUD operations for the **ProductionEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductionEntries
    * const productionEntries = await prisma.productionEntry.findMany()
    * ```
    */
  get productionEntry(): Prisma.ProductionEntryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Region: 'Region',
    Client: 'Client',
    Product: 'Product',
    Order: 'Order',
    OrderItem: 'OrderItem',
    UserRegion: 'UserRegion',
    OrderHistory: 'OrderHistory',
    DistributionSession: 'DistributionSession',
    ProductionEntry: 'ProductionEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "region" | "client" | "product" | "order" | "orderItem" | "userRegion" | "orderHistory" | "distributionSession" | "productionEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      UserRegion: {
        payload: Prisma.$UserRegionPayload<ExtArgs>
        fields: Prisma.UserRegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>
          }
          findFirst: {
            args: Prisma.UserRegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>
          }
          findMany: {
            args: Prisma.UserRegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>[]
          }
          create: {
            args: Prisma.UserRegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>
          }
          createMany: {
            args: Prisma.UserRegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserRegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>[]
          }
          delete: {
            args: Prisma.UserRegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>
          }
          update: {
            args: Prisma.UserRegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>
          }
          deleteMany: {
            args: Prisma.UserRegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserRegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>[]
          }
          upsert: {
            args: Prisma.UserRegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRegionPayload>
          }
          aggregate: {
            args: Prisma.UserRegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRegion>
          }
          groupBy: {
            args: Prisma.UserRegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRegionCountArgs<ExtArgs>
            result: $Utils.Optional<UserRegionCountAggregateOutputType> | number
          }
        }
      }
      OrderHistory: {
        payload: Prisma.$OrderHistoryPayload<ExtArgs>
        fields: Prisma.OrderHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>
          }
          findFirst: {
            args: Prisma.OrderHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>
          }
          findMany: {
            args: Prisma.OrderHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>[]
          }
          create: {
            args: Prisma.OrderHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>
          }
          createMany: {
            args: Prisma.OrderHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>[]
          }
          delete: {
            args: Prisma.OrderHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>
          }
          update: {
            args: Prisma.OrderHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>
          }
          deleteMany: {
            args: Prisma.OrderHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>[]
          }
          upsert: {
            args: Prisma.OrderHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderHistoryPayload>
          }
          aggregate: {
            args: Prisma.OrderHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderHistory>
          }
          groupBy: {
            args: Prisma.OrderHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<OrderHistoryCountAggregateOutputType> | number
          }
        }
      }
      DistributionSession: {
        payload: Prisma.$DistributionSessionPayload<ExtArgs>
        fields: Prisma.DistributionSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DistributionSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DistributionSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>
          }
          findFirst: {
            args: Prisma.DistributionSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DistributionSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>
          }
          findMany: {
            args: Prisma.DistributionSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>[]
          }
          create: {
            args: Prisma.DistributionSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>
          }
          createMany: {
            args: Prisma.DistributionSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DistributionSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>[]
          }
          delete: {
            args: Prisma.DistributionSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>
          }
          update: {
            args: Prisma.DistributionSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>
          }
          deleteMany: {
            args: Prisma.DistributionSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DistributionSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DistributionSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>[]
          }
          upsert: {
            args: Prisma.DistributionSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionSessionPayload>
          }
          aggregate: {
            args: Prisma.DistributionSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDistributionSession>
          }
          groupBy: {
            args: Prisma.DistributionSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DistributionSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DistributionSessionCountArgs<ExtArgs>
            result: $Utils.Optional<DistributionSessionCountAggregateOutputType> | number
          }
        }
      }
      ProductionEntry: {
        payload: Prisma.$ProductionEntryPayload<ExtArgs>
        fields: Prisma.ProductionEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductionEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductionEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>
          }
          findFirst: {
            args: Prisma.ProductionEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductionEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>
          }
          findMany: {
            args: Prisma.ProductionEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>[]
          }
          create: {
            args: Prisma.ProductionEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>
          }
          createMany: {
            args: Prisma.ProductionEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductionEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>[]
          }
          delete: {
            args: Prisma.ProductionEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>
          }
          update: {
            args: Prisma.ProductionEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>
          }
          deleteMany: {
            args: Prisma.ProductionEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductionEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductionEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>[]
          }
          upsert: {
            args: Prisma.ProductionEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionEntryPayload>
          }
          aggregate: {
            args: Prisma.ProductionEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductionEntry>
          }
          groupBy: {
            args: Prisma.ProductionEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductionEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductionEntryCountArgs<ExtArgs>
            result: $Utils.Optional<ProductionEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    region?: RegionOmit
    client?: ClientOmit
    product?: ProductOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    userRegion?: UserRegionOmit
    orderHistory?: OrderHistoryOmit
    distributionSession?: DistributionSessionOmit
    productionEntry?: ProductionEntryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    clientsCreated: number
    ordersCreated: number
    ordersDelivery: number
    historyActions: number
    regionsCreated: number
    assignedRegions: number
    distributionSessions: number
    sessionsClosedByMe: number
    productionEntries: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clientsCreated?: boolean | UserCountOutputTypeCountClientsCreatedArgs
    ordersCreated?: boolean | UserCountOutputTypeCountOrdersCreatedArgs
    ordersDelivery?: boolean | UserCountOutputTypeCountOrdersDeliveryArgs
    historyActions?: boolean | UserCountOutputTypeCountHistoryActionsArgs
    regionsCreated?: boolean | UserCountOutputTypeCountRegionsCreatedArgs
    assignedRegions?: boolean | UserCountOutputTypeCountAssignedRegionsArgs
    distributionSessions?: boolean | UserCountOutputTypeCountDistributionSessionsArgs
    sessionsClosedByMe?: boolean | UserCountOutputTypeCountSessionsClosedByMeArgs
    productionEntries?: boolean | UserCountOutputTypeCountProductionEntriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClientsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersDeliveryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHistoryActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRegionsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssignedRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRegionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDistributionSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DistributionSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsClosedByMeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DistributionSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProductionEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionEntryWhereInput
  }


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    clients: number
    orders: number
    assignedUsers: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clients?: boolean | RegionCountOutputTypeCountClientsArgs
    orders?: boolean | RegionCountOutputTypeCountOrdersArgs
    assignedUsers?: boolean | RegionCountOutputTypeCountAssignedUsersArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountAssignedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRegionWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    orders: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | ClientCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    orderItems: number
    productionEntries: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
    productionEntries?: boolean | ProductCountOutputTypeCountProductionEntriesArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountProductionEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionEntryWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    history: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    history?: boolean | OrderCountOutputTypeCountHistoryArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderHistoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    role: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    isActive?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    isActive?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    phone: string | null
    password: string
    role: $Enums.Role
    isActive: boolean
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    clientsCreated?: boolean | User$clientsCreatedArgs<ExtArgs>
    ordersCreated?: boolean | User$ordersCreatedArgs<ExtArgs>
    ordersDelivery?: boolean | User$ordersDeliveryArgs<ExtArgs>
    historyActions?: boolean | User$historyActionsArgs<ExtArgs>
    regionsCreated?: boolean | User$regionsCreatedArgs<ExtArgs>
    assignedRegions?: boolean | User$assignedRegionsArgs<ExtArgs>
    distributionSessions?: boolean | User$distributionSessionsArgs<ExtArgs>
    sessionsClosedByMe?: boolean | User$sessionsClosedByMeArgs<ExtArgs>
    productionEntries?: boolean | User$productionEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "role" | "isActive" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clientsCreated?: boolean | User$clientsCreatedArgs<ExtArgs>
    ordersCreated?: boolean | User$ordersCreatedArgs<ExtArgs>
    ordersDelivery?: boolean | User$ordersDeliveryArgs<ExtArgs>
    historyActions?: boolean | User$historyActionsArgs<ExtArgs>
    regionsCreated?: boolean | User$regionsCreatedArgs<ExtArgs>
    assignedRegions?: boolean | User$assignedRegionsArgs<ExtArgs>
    distributionSessions?: boolean | User$distributionSessionsArgs<ExtArgs>
    sessionsClosedByMe?: boolean | User$sessionsClosedByMeArgs<ExtArgs>
    productionEntries?: boolean | User$productionEntriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      clientsCreated: Prisma.$ClientPayload<ExtArgs>[]
      ordersCreated: Prisma.$OrderPayload<ExtArgs>[]
      ordersDelivery: Prisma.$OrderPayload<ExtArgs>[]
      historyActions: Prisma.$OrderHistoryPayload<ExtArgs>[]
      regionsCreated: Prisma.$RegionPayload<ExtArgs>[]
      assignedRegions: Prisma.$UserRegionPayload<ExtArgs>[]
      distributionSessions: Prisma.$DistributionSessionPayload<ExtArgs>[]
      sessionsClosedByMe: Prisma.$DistributionSessionPayload<ExtArgs>[]
      productionEntries: Prisma.$ProductionEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      phone: string | null
      password: string
      role: $Enums.Role
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clientsCreated<T extends User$clientsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$clientsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ordersCreated<T extends User$ordersCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ordersDelivery<T extends User$ordersDeliveryArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersDeliveryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    historyActions<T extends User$historyActionsArgs<ExtArgs> = {}>(args?: Subset<T, User$historyActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    regionsCreated<T extends User$regionsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$regionsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedRegions<T extends User$assignedRegionsArgs<ExtArgs> = {}>(args?: Subset<T, User$assignedRegionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    distributionSessions<T extends User$distributionSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$distributionSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessionsClosedByMe<T extends User$sessionsClosedByMeArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsClosedByMeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productionEntries<T extends User$productionEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$productionEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.clientsCreated
   */
  export type User$clientsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * User.ordersCreated
   */
  export type User$ordersCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.ordersDelivery
   */
  export type User$ordersDeliveryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.historyActions
   */
  export type User$historyActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    where?: OrderHistoryWhereInput
    orderBy?: OrderHistoryOrderByWithRelationInput | OrderHistoryOrderByWithRelationInput[]
    cursor?: OrderHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderHistoryScalarFieldEnum | OrderHistoryScalarFieldEnum[]
  }

  /**
   * User.regionsCreated
   */
  export type User$regionsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    cursor?: RegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * User.assignedRegions
   */
  export type User$assignedRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    where?: UserRegionWhereInput
    orderBy?: UserRegionOrderByWithRelationInput | UserRegionOrderByWithRelationInput[]
    cursor?: UserRegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRegionScalarFieldEnum | UserRegionScalarFieldEnum[]
  }

  /**
   * User.distributionSessions
   */
  export type User$distributionSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    where?: DistributionSessionWhereInput
    orderBy?: DistributionSessionOrderByWithRelationInput | DistributionSessionOrderByWithRelationInput[]
    cursor?: DistributionSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DistributionSessionScalarFieldEnum | DistributionSessionScalarFieldEnum[]
  }

  /**
   * User.sessionsClosedByMe
   */
  export type User$sessionsClosedByMeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    where?: DistributionSessionWhereInput
    orderBy?: DistributionSessionOrderByWithRelationInput | DistributionSessionOrderByWithRelationInput[]
    cursor?: DistributionSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DistributionSessionScalarFieldEnum | DistributionSessionScalarFieldEnum[]
  }

  /**
   * User.productionEntries
   */
  export type User$productionEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    where?: ProductionEntryWhereInput
    orderBy?: ProductionEntryOrderByWithRelationInput | ProductionEntryOrderByWithRelationInput[]
    cursor?: ProductionEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductionEntryScalarFieldEnum | ProductionEntryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    id: number | null
    createdBy: number | null
  }

  export type RegionSumAggregateOutputType = {
    id: number | null
    createdBy: number | null
  }

  export type RegionMinAggregateOutputType = {
    id: number | null
    name: string | null
    color: string | null
    createdBy: number | null
    createdAt: Date | null
  }

  export type RegionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    color: string | null
    createdBy: number | null
    createdAt: Date | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    name: number
    color: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    id?: true
    createdBy?: true
  }

  export type RegionSumAggregateInputType = {
    id?: true
    createdBy?: true
  }

  export type RegionMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdBy?: true
    createdAt?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdBy?: true
    createdAt?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: number
    name: string
    color: string
    createdBy: number
    createdAt: Date
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdBy?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    clients?: boolean | Region$clientsArgs<ExtArgs>
    orders?: boolean | Region$ordersArgs<ExtArgs>
    assignedUsers?: boolean | Region$assignedUsersArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdBy?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdBy?: boolean
    createdAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "color" | "createdBy" | "createdAt", ExtArgs["result"]["region"]>
  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    clients?: boolean | Region$clientsArgs<ExtArgs>
    orders?: boolean | Region$ordersArgs<ExtArgs>
    assignedUsers?: boolean | Region$assignedUsersArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      clients: Prisma.$ClientPayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      assignedUsers: Prisma.$UserRegionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      color: string
      createdBy: number
      createdAt: Date
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clients<T extends Region$clientsArgs<ExtArgs> = {}>(args?: Subset<T, Region$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Region$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Region$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedUsers<T extends Region$assignedUsersArgs<ExtArgs> = {}>(args?: Subset<T, Region$assignedUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'Int'>
    readonly name: FieldRef<"Region", 'String'>
    readonly color: FieldRef<"Region", 'String'>
    readonly createdBy: FieldRef<"Region", 'Int'>
    readonly createdAt: FieldRef<"Region", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to delete.
     */
    limit?: number
  }

  /**
   * Region.clients
   */
  export type Region$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Region.orders
   */
  export type Region$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Region.assignedUsers
   */
  export type Region$assignedUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    where?: UserRegionWhereInput
    orderBy?: UserRegionOrderByWithRelationInput | UserRegionOrderByWithRelationInput[]
    cursor?: UserRegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRegionScalarFieldEnum | UserRegionScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
    regionId: number | null
    createdBy: number | null
  }

  export type ClientSumAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
    regionId: number | null
    createdBy: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: number | null
    name: string | null
    ownerName: string | null
    phone: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    photoUrl: string | null
    regionId: number | null
    createdBy: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    ownerName: string | null
    phone: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    photoUrl: string | null
    regionId: number | null
    createdBy: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    ownerName: number
    phone: number
    address: number
    latitude: number
    longitude: number
    photoUrl: number
    regionId: number
    createdBy: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    regionId?: true
    createdBy?: true
  }

  export type ClientSumAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
    regionId?: true
    createdBy?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    ownerName?: true
    phone?: true
    address?: true
    latitude?: true
    longitude?: true
    photoUrl?: true
    regionId?: true
    createdBy?: true
    isActive?: true
    createdAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    ownerName?: true
    phone?: true
    address?: true
    latitude?: true
    longitude?: true
    photoUrl?: true
    regionId?: true
    createdBy?: true
    isActive?: true
    createdAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    ownerName?: true
    phone?: true
    address?: true
    latitude?: true
    longitude?: true
    photoUrl?: true
    regionId?: true
    createdBy?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl: string | null
    regionId: number | null
    createdBy: number
    isActive: boolean
    createdAt: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ownerName?: boolean
    phone?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    regionId?: boolean
    createdBy?: boolean
    isActive?: boolean
    createdAt?: boolean
    region?: boolean | Client$regionArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Client$ordersArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ownerName?: boolean
    phone?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    regionId?: boolean
    createdBy?: boolean
    isActive?: boolean
    createdAt?: boolean
    region?: boolean | Client$regionArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ownerName?: boolean
    phone?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    regionId?: boolean
    createdBy?: boolean
    isActive?: boolean
    createdAt?: boolean
    region?: boolean | Client$regionArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    ownerName?: boolean
    phone?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    photoUrl?: boolean
    regionId?: boolean
    createdBy?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "ownerName" | "phone" | "address" | "latitude" | "longitude" | "photoUrl" | "regionId" | "createdBy" | "isActive" | "createdAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | Client$regionArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Client$ordersArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | Client$regionArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | Client$regionArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      region: Prisma.$RegionPayload<ExtArgs> | null
      creator: Prisma.$UserPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      ownerName: string
      phone: string
      address: string
      latitude: number
      longitude: number
      photoUrl: string | null
      regionId: number | null
      createdBy: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    region<T extends Client$regionArgs<ExtArgs> = {}>(args?: Subset<T, Client$regionArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Client$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Client$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'Int'>
    readonly name: FieldRef<"Client", 'String'>
    readonly ownerName: FieldRef<"Client", 'String'>
    readonly phone: FieldRef<"Client", 'String'>
    readonly address: FieldRef<"Client", 'String'>
    readonly latitude: FieldRef<"Client", 'Float'>
    readonly longitude: FieldRef<"Client", 'Float'>
    readonly photoUrl: FieldRef<"Client", 'String'>
    readonly regionId: FieldRef<"Client", 'Int'>
    readonly createdBy: FieldRef<"Client", 'Int'>
    readonly isActive: FieldRef<"Client", 'Boolean'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.region
   */
  export type Client$regionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    where?: RegionWhereInput
  }

  /**
   * Client.orders
   */
  export type Client$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    price: number | null
    unit: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    price: number | null
    unit: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    unit: number
    category: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    unit?: true
    category?: true
    isActive?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    unit?: true
    category?: true
    isActive?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    unit?: true
    category?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    description: string | null
    price: number
    unit: string
    category: string
    isActive: boolean
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    unit?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    productionEntries?: boolean | Product$productionEntriesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    unit?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    unit?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    unit?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "unit" | "category" | "isActive" | "createdAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    productionEntries?: boolean | Product$productionEntriesArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      productionEntries: Prisma.$ProductionEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      price: number
      unit: string
      category: string
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productionEntries<T extends Product$productionEntriesArgs<ExtArgs> = {}>(args?: Subset<T, Product$productionEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly unit: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly isActive: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.productionEntries
   */
  export type Product$productionEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    where?: ProductionEntryWhereInput
    orderBy?: ProductionEntryOrderByWithRelationInput | ProductionEntryOrderByWithRelationInput[]
    cursor?: ProductionEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductionEntryScalarFieldEnum | ProductionEntryScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    id: number | null
    clientId: number | null
    preventistaId: number | null
    distributorId: number | null
    regionId: number | null
    discount: number | null
  }

  export type OrderSumAggregateOutputType = {
    id: number | null
    clientId: number | null
    preventistaId: number | null
    distributorId: number | null
    regionId: number | null
    discount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: number | null
    clientId: number | null
    preventistaId: number | null
    distributorId: number | null
    regionId: number | null
    status: $Enums.OrderStatus | null
    notes: string | null
    deliveredAt: Date | null
    discount: number | null
    createdAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: number | null
    clientId: number | null
    preventistaId: number | null
    distributorId: number | null
    regionId: number | null
    status: $Enums.OrderStatus | null
    notes: string | null
    deliveredAt: Date | null
    discount: number | null
    createdAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    clientId: number
    preventistaId: number
    distributorId: number
    regionId: number
    status: number
    notes: number
    deliveredAt: number
    discount: number
    createdAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    id?: true
    clientId?: true
    preventistaId?: true
    distributorId?: true
    regionId?: true
    discount?: true
  }

  export type OrderSumAggregateInputType = {
    id?: true
    clientId?: true
    preventistaId?: true
    distributorId?: true
    regionId?: true
    discount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    clientId?: true
    preventistaId?: true
    distributorId?: true
    regionId?: true
    status?: true
    notes?: true
    deliveredAt?: true
    discount?: true
    createdAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    clientId?: true
    preventistaId?: true
    distributorId?: true
    regionId?: true
    status?: true
    notes?: true
    deliveredAt?: true
    discount?: true
    createdAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    clientId?: true
    preventistaId?: true
    distributorId?: true
    regionId?: true
    status?: true
    notes?: true
    deliveredAt?: true
    discount?: true
    createdAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: number
    clientId: number
    preventistaId: number
    distributorId: number | null
    regionId: number | null
    status: $Enums.OrderStatus
    notes: string | null
    deliveredAt: Date | null
    discount: number
    createdAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    preventistaId?: boolean
    distributorId?: boolean
    regionId?: boolean
    status?: boolean
    notes?: boolean
    deliveredAt?: boolean
    discount?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    preventista?: boolean | UserDefaultArgs<ExtArgs>
    distributor?: boolean | Order$distributorArgs<ExtArgs>
    region?: boolean | Order$regionArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    history?: boolean | Order$historyArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    preventistaId?: boolean
    distributorId?: boolean
    regionId?: boolean
    status?: boolean
    notes?: boolean
    deliveredAt?: boolean
    discount?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    preventista?: boolean | UserDefaultArgs<ExtArgs>
    distributor?: boolean | Order$distributorArgs<ExtArgs>
    region?: boolean | Order$regionArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    preventistaId?: boolean
    distributorId?: boolean
    regionId?: boolean
    status?: boolean
    notes?: boolean
    deliveredAt?: boolean
    discount?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    preventista?: boolean | UserDefaultArgs<ExtArgs>
    distributor?: boolean | Order$distributorArgs<ExtArgs>
    region?: boolean | Order$regionArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    clientId?: boolean
    preventistaId?: boolean
    distributorId?: boolean
    regionId?: boolean
    status?: boolean
    notes?: boolean
    deliveredAt?: boolean
    discount?: boolean
    createdAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "preventistaId" | "distributorId" | "regionId" | "status" | "notes" | "deliveredAt" | "discount" | "createdAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    preventista?: boolean | UserDefaultArgs<ExtArgs>
    distributor?: boolean | Order$distributorArgs<ExtArgs>
    region?: boolean | Order$regionArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    history?: boolean | Order$historyArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    preventista?: boolean | UserDefaultArgs<ExtArgs>
    distributor?: boolean | Order$distributorArgs<ExtArgs>
    region?: boolean | Order$regionArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    preventista?: boolean | UserDefaultArgs<ExtArgs>
    distributor?: boolean | Order$distributorArgs<ExtArgs>
    region?: boolean | Order$regionArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      preventista: Prisma.$UserPayload<ExtArgs>
      distributor: Prisma.$UserPayload<ExtArgs> | null
      region: Prisma.$RegionPayload<ExtArgs> | null
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      history: Prisma.$OrderHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clientId: number
      preventistaId: number
      distributorId: number | null
      regionId: number | null
      status: $Enums.OrderStatus
      notes: string | null
      deliveredAt: Date | null
      discount: number
      createdAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    preventista<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    distributor<T extends Order$distributorArgs<ExtArgs> = {}>(args?: Subset<T, Order$distributorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    region<T extends Order$regionArgs<ExtArgs> = {}>(args?: Subset<T, Order$regionArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    history<T extends Order$historyArgs<ExtArgs> = {}>(args?: Subset<T, Order$historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'Int'>
    readonly clientId: FieldRef<"Order", 'Int'>
    readonly preventistaId: FieldRef<"Order", 'Int'>
    readonly distributorId: FieldRef<"Order", 'Int'>
    readonly regionId: FieldRef<"Order", 'Int'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly notes: FieldRef<"Order", 'String'>
    readonly deliveredAt: FieldRef<"Order", 'DateTime'>
    readonly discount: FieldRef<"Order", 'Float'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.distributor
   */
  export type Order$distributorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Order.region
   */
  export type Order$regionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    where?: RegionWhereInput
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.history
   */
  export type Order$historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    where?: OrderHistoryWhereInput
    orderBy?: OrderHistoryOrderByWithRelationInput | OrderHistoryOrderByWithRelationInput[]
    cursor?: OrderHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderHistoryScalarFieldEnum | OrderHistoryScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    deliveredQuantity: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    deliveredQuantity: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    deliveredQuantity: number | null
    isBonification: boolean | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    quantity: number | null
    unitPrice: number | null
    deliveredQuantity: number | null
    isBonification: boolean | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity: number
    isBonification: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    deliveredQuantity?: true
  }

  export type OrderItemSumAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    deliveredQuantity?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    deliveredQuantity?: true
    isBonification?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    deliveredQuantity?: true
    isBonification?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    unitPrice?: true
    deliveredQuantity?: true
    isBonification?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity: number | null
    isBonification: boolean
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    deliveredQuantity?: boolean
    isBonification?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    deliveredQuantity?: boolean
    isBonification?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    deliveredQuantity?: boolean
    isBonification?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    unitPrice?: boolean
    deliveredQuantity?: boolean
    isBonification?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "quantity" | "unitPrice" | "deliveredQuantity" | "isBonification", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      productId: number
      quantity: number
      unitPrice: number
      deliveredQuantity: number | null
      isBonification: boolean
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'Int'>
    readonly orderId: FieldRef<"OrderItem", 'Int'>
    readonly productId: FieldRef<"OrderItem", 'Int'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly unitPrice: FieldRef<"OrderItem", 'Float'>
    readonly deliveredQuantity: FieldRef<"OrderItem", 'Int'>
    readonly isBonification: FieldRef<"OrderItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model UserRegion
   */

  export type AggregateUserRegion = {
    _count: UserRegionCountAggregateOutputType | null
    _avg: UserRegionAvgAggregateOutputType | null
    _sum: UserRegionSumAggregateOutputType | null
    _min: UserRegionMinAggregateOutputType | null
    _max: UserRegionMaxAggregateOutputType | null
  }

  export type UserRegionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    regionId: number | null
  }

  export type UserRegionSumAggregateOutputType = {
    id: number | null
    userId: number | null
    regionId: number | null
  }

  export type UserRegionMinAggregateOutputType = {
    id: number | null
    userId: number | null
    regionId: number | null
    createdAt: Date | null
  }

  export type UserRegionMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    regionId: number | null
    createdAt: Date | null
  }

  export type UserRegionCountAggregateOutputType = {
    id: number
    userId: number
    regionId: number
    createdAt: number
    _all: number
  }


  export type UserRegionAvgAggregateInputType = {
    id?: true
    userId?: true
    regionId?: true
  }

  export type UserRegionSumAggregateInputType = {
    id?: true
    userId?: true
    regionId?: true
  }

  export type UserRegionMinAggregateInputType = {
    id?: true
    userId?: true
    regionId?: true
    createdAt?: true
  }

  export type UserRegionMaxAggregateInputType = {
    id?: true
    userId?: true
    regionId?: true
    createdAt?: true
  }

  export type UserRegionCountAggregateInputType = {
    id?: true
    userId?: true
    regionId?: true
    createdAt?: true
    _all?: true
  }

  export type UserRegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRegion to aggregate.
     */
    where?: UserRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRegions to fetch.
     */
    orderBy?: UserRegionOrderByWithRelationInput | UserRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRegions
    **/
    _count?: true | UserRegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRegionMaxAggregateInputType
  }

  export type GetUserRegionAggregateType<T extends UserRegionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRegion[P]>
      : GetScalarType<T[P], AggregateUserRegion[P]>
  }




  export type UserRegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRegionWhereInput
    orderBy?: UserRegionOrderByWithAggregationInput | UserRegionOrderByWithAggregationInput[]
    by: UserRegionScalarFieldEnum[] | UserRegionScalarFieldEnum
    having?: UserRegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRegionCountAggregateInputType | true
    _avg?: UserRegionAvgAggregateInputType
    _sum?: UserRegionSumAggregateInputType
    _min?: UserRegionMinAggregateInputType
    _max?: UserRegionMaxAggregateInputType
  }

  export type UserRegionGroupByOutputType = {
    id: number
    userId: number
    regionId: number
    createdAt: Date
    _count: UserRegionCountAggregateOutputType | null
    _avg: UserRegionAvgAggregateOutputType | null
    _sum: UserRegionSumAggregateOutputType | null
    _min: UserRegionMinAggregateOutputType | null
    _max: UserRegionMaxAggregateOutputType | null
  }

  type GetUserRegionGroupByPayload<T extends UserRegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRegionGroupByOutputType[P]>
            : GetScalarType<T[P], UserRegionGroupByOutputType[P]>
        }
      >
    >


  export type UserRegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    regionId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRegion"]>

  export type UserRegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    regionId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRegion"]>

  export type UserRegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    regionId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRegion"]>

  export type UserRegionSelectScalar = {
    id?: boolean
    userId?: boolean
    regionId?: boolean
    createdAt?: boolean
  }

  export type UserRegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "regionId" | "createdAt", ExtArgs["result"]["userRegion"]>
  export type UserRegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type UserRegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type UserRegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $UserRegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRegion"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      region: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      regionId: number
      createdAt: Date
    }, ExtArgs["result"]["userRegion"]>
    composites: {}
  }

  type UserRegionGetPayload<S extends boolean | null | undefined | UserRegionDefaultArgs> = $Result.GetResult<Prisma.$UserRegionPayload, S>

  type UserRegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRegionCountAggregateInputType | true
    }

  export interface UserRegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRegion'], meta: { name: 'UserRegion' } }
    /**
     * Find zero or one UserRegion that matches the filter.
     * @param {UserRegionFindUniqueArgs} args - Arguments to find a UserRegion
     * @example
     * // Get one UserRegion
     * const userRegion = await prisma.userRegion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRegionFindUniqueArgs>(args: SelectSubset<T, UserRegionFindUniqueArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRegion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRegionFindUniqueOrThrowArgs} args - Arguments to find a UserRegion
     * @example
     * // Get one UserRegion
     * const userRegion = await prisma.userRegion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRegionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRegion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionFindFirstArgs} args - Arguments to find a UserRegion
     * @example
     * // Get one UserRegion
     * const userRegion = await prisma.userRegion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRegionFindFirstArgs>(args?: SelectSubset<T, UserRegionFindFirstArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRegion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionFindFirstOrThrowArgs} args - Arguments to find a UserRegion
     * @example
     * // Get one UserRegion
     * const userRegion = await prisma.userRegion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRegionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRegions
     * const userRegions = await prisma.userRegion.findMany()
     * 
     * // Get first 10 UserRegions
     * const userRegions = await prisma.userRegion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRegionWithIdOnly = await prisma.userRegion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRegionFindManyArgs>(args?: SelectSubset<T, UserRegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRegion.
     * @param {UserRegionCreateArgs} args - Arguments to create a UserRegion.
     * @example
     * // Create one UserRegion
     * const UserRegion = await prisma.userRegion.create({
     *   data: {
     *     // ... data to create a UserRegion
     *   }
     * })
     * 
     */
    create<T extends UserRegionCreateArgs>(args: SelectSubset<T, UserRegionCreateArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRegions.
     * @param {UserRegionCreateManyArgs} args - Arguments to create many UserRegions.
     * @example
     * // Create many UserRegions
     * const userRegion = await prisma.userRegion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRegionCreateManyArgs>(args?: SelectSubset<T, UserRegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserRegions and returns the data saved in the database.
     * @param {UserRegionCreateManyAndReturnArgs} args - Arguments to create many UserRegions.
     * @example
     * // Create many UserRegions
     * const userRegion = await prisma.userRegion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserRegions and only return the `id`
     * const userRegionWithIdOnly = await prisma.userRegion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserRegionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserRegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserRegion.
     * @param {UserRegionDeleteArgs} args - Arguments to delete one UserRegion.
     * @example
     * // Delete one UserRegion
     * const UserRegion = await prisma.userRegion.delete({
     *   where: {
     *     // ... filter to delete one UserRegion
     *   }
     * })
     * 
     */
    delete<T extends UserRegionDeleteArgs>(args: SelectSubset<T, UserRegionDeleteArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRegion.
     * @param {UserRegionUpdateArgs} args - Arguments to update one UserRegion.
     * @example
     * // Update one UserRegion
     * const userRegion = await prisma.userRegion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRegionUpdateArgs>(args: SelectSubset<T, UserRegionUpdateArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRegions.
     * @param {UserRegionDeleteManyArgs} args - Arguments to filter UserRegions to delete.
     * @example
     * // Delete a few UserRegions
     * const { count } = await prisma.userRegion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRegionDeleteManyArgs>(args?: SelectSubset<T, UserRegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRegions
     * const userRegion = await prisma.userRegion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRegionUpdateManyArgs>(args: SelectSubset<T, UserRegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRegions and returns the data updated in the database.
     * @param {UserRegionUpdateManyAndReturnArgs} args - Arguments to update many UserRegions.
     * @example
     * // Update many UserRegions
     * const userRegion = await prisma.userRegion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserRegions and only return the `id`
     * const userRegionWithIdOnly = await prisma.userRegion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserRegionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserRegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserRegion.
     * @param {UserRegionUpsertArgs} args - Arguments to update or create a UserRegion.
     * @example
     * // Update or create a UserRegion
     * const userRegion = await prisma.userRegion.upsert({
     *   create: {
     *     // ... data to create a UserRegion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRegion we want to update
     *   }
     * })
     */
    upsert<T extends UserRegionUpsertArgs>(args: SelectSubset<T, UserRegionUpsertArgs<ExtArgs>>): Prisma__UserRegionClient<$Result.GetResult<Prisma.$UserRegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionCountArgs} args - Arguments to filter UserRegions to count.
     * @example
     * // Count the number of UserRegions
     * const count = await prisma.userRegion.count({
     *   where: {
     *     // ... the filter for the UserRegions we want to count
     *   }
     * })
    **/
    count<T extends UserRegionCountArgs>(
      args?: Subset<T, UserRegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRegion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserRegionAggregateArgs>(args: Subset<T, UserRegionAggregateArgs>): Prisma.PrismaPromise<GetUserRegionAggregateType<T>>

    /**
     * Group by UserRegion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserRegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRegionGroupByArgs['orderBy'] }
        : { orderBy?: UserRegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserRegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRegion model
   */
  readonly fields: UserRegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRegion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserRegion model
   */
  interface UserRegionFieldRefs {
    readonly id: FieldRef<"UserRegion", 'Int'>
    readonly userId: FieldRef<"UserRegion", 'Int'>
    readonly regionId: FieldRef<"UserRegion", 'Int'>
    readonly createdAt: FieldRef<"UserRegion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRegion findUnique
   */
  export type UserRegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * Filter, which UserRegion to fetch.
     */
    where: UserRegionWhereUniqueInput
  }

  /**
   * UserRegion findUniqueOrThrow
   */
  export type UserRegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * Filter, which UserRegion to fetch.
     */
    where: UserRegionWhereUniqueInput
  }

  /**
   * UserRegion findFirst
   */
  export type UserRegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * Filter, which UserRegion to fetch.
     */
    where?: UserRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRegions to fetch.
     */
    orderBy?: UserRegionOrderByWithRelationInput | UserRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRegions.
     */
    cursor?: UserRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRegions.
     */
    distinct?: UserRegionScalarFieldEnum | UserRegionScalarFieldEnum[]
  }

  /**
   * UserRegion findFirstOrThrow
   */
  export type UserRegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * Filter, which UserRegion to fetch.
     */
    where?: UserRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRegions to fetch.
     */
    orderBy?: UserRegionOrderByWithRelationInput | UserRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRegions.
     */
    cursor?: UserRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRegions.
     */
    distinct?: UserRegionScalarFieldEnum | UserRegionScalarFieldEnum[]
  }

  /**
   * UserRegion findMany
   */
  export type UserRegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * Filter, which UserRegions to fetch.
     */
    where?: UserRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRegions to fetch.
     */
    orderBy?: UserRegionOrderByWithRelationInput | UserRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRegions.
     */
    cursor?: UserRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRegions.
     */
    distinct?: UserRegionScalarFieldEnum | UserRegionScalarFieldEnum[]
  }

  /**
   * UserRegion create
   */
  export type UserRegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRegion.
     */
    data: XOR<UserRegionCreateInput, UserRegionUncheckedCreateInput>
  }

  /**
   * UserRegion createMany
   */
  export type UserRegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRegions.
     */
    data: UserRegionCreateManyInput | UserRegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRegion createManyAndReturn
   */
  export type UserRegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * The data used to create many UserRegions.
     */
    data: UserRegionCreateManyInput | UserRegionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRegion update
   */
  export type UserRegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRegion.
     */
    data: XOR<UserRegionUpdateInput, UserRegionUncheckedUpdateInput>
    /**
     * Choose, which UserRegion to update.
     */
    where: UserRegionWhereUniqueInput
  }

  /**
   * UserRegion updateMany
   */
  export type UserRegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRegions.
     */
    data: XOR<UserRegionUpdateManyMutationInput, UserRegionUncheckedUpdateManyInput>
    /**
     * Filter which UserRegions to update
     */
    where?: UserRegionWhereInput
    /**
     * Limit how many UserRegions to update.
     */
    limit?: number
  }

  /**
   * UserRegion updateManyAndReturn
   */
  export type UserRegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * The data used to update UserRegions.
     */
    data: XOR<UserRegionUpdateManyMutationInput, UserRegionUncheckedUpdateManyInput>
    /**
     * Filter which UserRegions to update
     */
    where?: UserRegionWhereInput
    /**
     * Limit how many UserRegions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserRegion upsert
   */
  export type UserRegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRegion to update in case it exists.
     */
    where: UserRegionWhereUniqueInput
    /**
     * In case the UserRegion found by the `where` argument doesn't exist, create a new UserRegion with this data.
     */
    create: XOR<UserRegionCreateInput, UserRegionUncheckedCreateInput>
    /**
     * In case the UserRegion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRegionUpdateInput, UserRegionUncheckedUpdateInput>
  }

  /**
   * UserRegion delete
   */
  export type UserRegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
    /**
     * Filter which UserRegion to delete.
     */
    where: UserRegionWhereUniqueInput
  }

  /**
   * UserRegion deleteMany
   */
  export type UserRegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRegions to delete
     */
    where?: UserRegionWhereInput
    /**
     * Limit how many UserRegions to delete.
     */
    limit?: number
  }

  /**
   * UserRegion without action
   */
  export type UserRegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRegion
     */
    select?: UserRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRegion
     */
    omit?: UserRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRegionInclude<ExtArgs> | null
  }


  /**
   * Model OrderHistory
   */

  export type AggregateOrderHistory = {
    _count: OrderHistoryCountAggregateOutputType | null
    _avg: OrderHistoryAvgAggregateOutputType | null
    _sum: OrderHistorySumAggregateOutputType | null
    _min: OrderHistoryMinAggregateOutputType | null
    _max: OrderHistoryMaxAggregateOutputType | null
  }

  export type OrderHistoryAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    changedBy: number | null
  }

  export type OrderHistorySumAggregateOutputType = {
    id: number | null
    orderId: number | null
    changedBy: number | null
  }

  export type OrderHistoryMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    changedBy: number | null
    action: $Enums.OrderAction | null
    previousStatus: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus | null
    createdAt: Date | null
  }

  export type OrderHistoryMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    changedBy: number | null
    action: $Enums.OrderAction | null
    previousStatus: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus | null
    createdAt: Date | null
  }

  export type OrderHistoryCountAggregateOutputType = {
    id: number
    orderId: number
    changedBy: number
    action: number
    previousStatus: number
    newStatus: number
    snapshotData: number
    createdAt: number
    _all: number
  }


  export type OrderHistoryAvgAggregateInputType = {
    id?: true
    orderId?: true
    changedBy?: true
  }

  export type OrderHistorySumAggregateInputType = {
    id?: true
    orderId?: true
    changedBy?: true
  }

  export type OrderHistoryMinAggregateInputType = {
    id?: true
    orderId?: true
    changedBy?: true
    action?: true
    previousStatus?: true
    newStatus?: true
    createdAt?: true
  }

  export type OrderHistoryMaxAggregateInputType = {
    id?: true
    orderId?: true
    changedBy?: true
    action?: true
    previousStatus?: true
    newStatus?: true
    createdAt?: true
  }

  export type OrderHistoryCountAggregateInputType = {
    id?: true
    orderId?: true
    changedBy?: true
    action?: true
    previousStatus?: true
    newStatus?: true
    snapshotData?: true
    createdAt?: true
    _all?: true
  }

  export type OrderHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderHistory to aggregate.
     */
    where?: OrderHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderHistories to fetch.
     */
    orderBy?: OrderHistoryOrderByWithRelationInput | OrderHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderHistories
    **/
    _count?: true | OrderHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderHistoryMaxAggregateInputType
  }

  export type GetOrderHistoryAggregateType<T extends OrderHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderHistory[P]>
      : GetScalarType<T[P], AggregateOrderHistory[P]>
  }




  export type OrderHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderHistoryWhereInput
    orderBy?: OrderHistoryOrderByWithAggregationInput | OrderHistoryOrderByWithAggregationInput[]
    by: OrderHistoryScalarFieldEnum[] | OrderHistoryScalarFieldEnum
    having?: OrderHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderHistoryCountAggregateInputType | true
    _avg?: OrderHistoryAvgAggregateInputType
    _sum?: OrderHistorySumAggregateInputType
    _min?: OrderHistoryMinAggregateInputType
    _max?: OrderHistoryMaxAggregateInputType
  }

  export type OrderHistoryGroupByOutputType = {
    id: number
    orderId: number
    changedBy: number
    action: $Enums.OrderAction
    previousStatus: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonValue
    createdAt: Date
    _count: OrderHistoryCountAggregateOutputType | null
    _avg: OrderHistoryAvgAggregateOutputType | null
    _sum: OrderHistorySumAggregateOutputType | null
    _min: OrderHistoryMinAggregateOutputType | null
    _max: OrderHistoryMaxAggregateOutputType | null
  }

  type GetOrderHistoryGroupByPayload<T extends OrderHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], OrderHistoryGroupByOutputType[P]>
        }
      >
    >


  export type OrderHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    changedBy?: boolean
    action?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    snapshotData?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    changer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderHistory"]>

  export type OrderHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    changedBy?: boolean
    action?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    snapshotData?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    changer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderHistory"]>

  export type OrderHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    changedBy?: boolean
    action?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    snapshotData?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    changer?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderHistory"]>

  export type OrderHistorySelectScalar = {
    id?: boolean
    orderId?: boolean
    changedBy?: boolean
    action?: boolean
    previousStatus?: boolean
    newStatus?: boolean
    snapshotData?: boolean
    createdAt?: boolean
  }

  export type OrderHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "changedBy" | "action" | "previousStatus" | "newStatus" | "snapshotData" | "createdAt", ExtArgs["result"]["orderHistory"]>
  export type OrderHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    changer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrderHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    changer?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrderHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    changer?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrderHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderHistory"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      changer: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      changedBy: number
      action: $Enums.OrderAction
      previousStatus: $Enums.OrderStatus | null
      newStatus: $Enums.OrderStatus
      snapshotData: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["orderHistory"]>
    composites: {}
  }

  type OrderHistoryGetPayload<S extends boolean | null | undefined | OrderHistoryDefaultArgs> = $Result.GetResult<Prisma.$OrderHistoryPayload, S>

  type OrderHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderHistoryCountAggregateInputType | true
    }

  export interface OrderHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderHistory'], meta: { name: 'OrderHistory' } }
    /**
     * Find zero or one OrderHistory that matches the filter.
     * @param {OrderHistoryFindUniqueArgs} args - Arguments to find a OrderHistory
     * @example
     * // Get one OrderHistory
     * const orderHistory = await prisma.orderHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderHistoryFindUniqueArgs>(args: SelectSubset<T, OrderHistoryFindUniqueArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderHistoryFindUniqueOrThrowArgs} args - Arguments to find a OrderHistory
     * @example
     * // Get one OrderHistory
     * const orderHistory = await prisma.orderHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryFindFirstArgs} args - Arguments to find a OrderHistory
     * @example
     * // Get one OrderHistory
     * const orderHistory = await prisma.orderHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderHistoryFindFirstArgs>(args?: SelectSubset<T, OrderHistoryFindFirstArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryFindFirstOrThrowArgs} args - Arguments to find a OrderHistory
     * @example
     * // Get one OrderHistory
     * const orderHistory = await prisma.orderHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderHistories
     * const orderHistories = await prisma.orderHistory.findMany()
     * 
     * // Get first 10 OrderHistories
     * const orderHistories = await prisma.orderHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderHistoryWithIdOnly = await prisma.orderHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderHistoryFindManyArgs>(args?: SelectSubset<T, OrderHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderHistory.
     * @param {OrderHistoryCreateArgs} args - Arguments to create a OrderHistory.
     * @example
     * // Create one OrderHistory
     * const OrderHistory = await prisma.orderHistory.create({
     *   data: {
     *     // ... data to create a OrderHistory
     *   }
     * })
     * 
     */
    create<T extends OrderHistoryCreateArgs>(args: SelectSubset<T, OrderHistoryCreateArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderHistories.
     * @param {OrderHistoryCreateManyArgs} args - Arguments to create many OrderHistories.
     * @example
     * // Create many OrderHistories
     * const orderHistory = await prisma.orderHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderHistoryCreateManyArgs>(args?: SelectSubset<T, OrderHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderHistories and returns the data saved in the database.
     * @param {OrderHistoryCreateManyAndReturnArgs} args - Arguments to create many OrderHistories.
     * @example
     * // Create many OrderHistories
     * const orderHistory = await prisma.orderHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderHistories and only return the `id`
     * const orderHistoryWithIdOnly = await prisma.orderHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderHistory.
     * @param {OrderHistoryDeleteArgs} args - Arguments to delete one OrderHistory.
     * @example
     * // Delete one OrderHistory
     * const OrderHistory = await prisma.orderHistory.delete({
     *   where: {
     *     // ... filter to delete one OrderHistory
     *   }
     * })
     * 
     */
    delete<T extends OrderHistoryDeleteArgs>(args: SelectSubset<T, OrderHistoryDeleteArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderHistory.
     * @param {OrderHistoryUpdateArgs} args - Arguments to update one OrderHistory.
     * @example
     * // Update one OrderHistory
     * const orderHistory = await prisma.orderHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderHistoryUpdateArgs>(args: SelectSubset<T, OrderHistoryUpdateArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderHistories.
     * @param {OrderHistoryDeleteManyArgs} args - Arguments to filter OrderHistories to delete.
     * @example
     * // Delete a few OrderHistories
     * const { count } = await prisma.orderHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderHistoryDeleteManyArgs>(args?: SelectSubset<T, OrderHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderHistories
     * const orderHistory = await prisma.orderHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderHistoryUpdateManyArgs>(args: SelectSubset<T, OrderHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderHistories and returns the data updated in the database.
     * @param {OrderHistoryUpdateManyAndReturnArgs} args - Arguments to update many OrderHistories.
     * @example
     * // Update many OrderHistories
     * const orderHistory = await prisma.orderHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderHistories and only return the `id`
     * const orderHistoryWithIdOnly = await prisma.orderHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderHistory.
     * @param {OrderHistoryUpsertArgs} args - Arguments to update or create a OrderHistory.
     * @example
     * // Update or create a OrderHistory
     * const orderHistory = await prisma.orderHistory.upsert({
     *   create: {
     *     // ... data to create a OrderHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderHistory we want to update
     *   }
     * })
     */
    upsert<T extends OrderHistoryUpsertArgs>(args: SelectSubset<T, OrderHistoryUpsertArgs<ExtArgs>>): Prisma__OrderHistoryClient<$Result.GetResult<Prisma.$OrderHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryCountArgs} args - Arguments to filter OrderHistories to count.
     * @example
     * // Count the number of OrderHistories
     * const count = await prisma.orderHistory.count({
     *   where: {
     *     // ... the filter for the OrderHistories we want to count
     *   }
     * })
    **/
    count<T extends OrderHistoryCountArgs>(
      args?: Subset<T, OrderHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderHistoryAggregateArgs>(args: Subset<T, OrderHistoryAggregateArgs>): Prisma.PrismaPromise<GetOrderHistoryAggregateType<T>>

    /**
     * Group by OrderHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderHistoryGroupByArgs['orderBy'] }
        : { orderBy?: OrderHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderHistory model
   */
  readonly fields: OrderHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    changer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderHistory model
   */
  interface OrderHistoryFieldRefs {
    readonly id: FieldRef<"OrderHistory", 'Int'>
    readonly orderId: FieldRef<"OrderHistory", 'Int'>
    readonly changedBy: FieldRef<"OrderHistory", 'Int'>
    readonly action: FieldRef<"OrderHistory", 'OrderAction'>
    readonly previousStatus: FieldRef<"OrderHistory", 'OrderStatus'>
    readonly newStatus: FieldRef<"OrderHistory", 'OrderStatus'>
    readonly snapshotData: FieldRef<"OrderHistory", 'Json'>
    readonly createdAt: FieldRef<"OrderHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderHistory findUnique
   */
  export type OrderHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderHistory to fetch.
     */
    where: OrderHistoryWhereUniqueInput
  }

  /**
   * OrderHistory findUniqueOrThrow
   */
  export type OrderHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderHistory to fetch.
     */
    where: OrderHistoryWhereUniqueInput
  }

  /**
   * OrderHistory findFirst
   */
  export type OrderHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderHistory to fetch.
     */
    where?: OrderHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderHistories to fetch.
     */
    orderBy?: OrderHistoryOrderByWithRelationInput | OrderHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderHistories.
     */
    cursor?: OrderHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderHistories.
     */
    distinct?: OrderHistoryScalarFieldEnum | OrderHistoryScalarFieldEnum[]
  }

  /**
   * OrderHistory findFirstOrThrow
   */
  export type OrderHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderHistory to fetch.
     */
    where?: OrderHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderHistories to fetch.
     */
    orderBy?: OrderHistoryOrderByWithRelationInput | OrderHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderHistories.
     */
    cursor?: OrderHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderHistories.
     */
    distinct?: OrderHistoryScalarFieldEnum | OrderHistoryScalarFieldEnum[]
  }

  /**
   * OrderHistory findMany
   */
  export type OrderHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * Filter, which OrderHistories to fetch.
     */
    where?: OrderHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderHistories to fetch.
     */
    orderBy?: OrderHistoryOrderByWithRelationInput | OrderHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderHistories.
     */
    cursor?: OrderHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderHistories.
     */
    distinct?: OrderHistoryScalarFieldEnum | OrderHistoryScalarFieldEnum[]
  }

  /**
   * OrderHistory create
   */
  export type OrderHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderHistory.
     */
    data: XOR<OrderHistoryCreateInput, OrderHistoryUncheckedCreateInput>
  }

  /**
   * OrderHistory createMany
   */
  export type OrderHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderHistories.
     */
    data: OrderHistoryCreateManyInput | OrderHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderHistory createManyAndReturn
   */
  export type OrderHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many OrderHistories.
     */
    data: OrderHistoryCreateManyInput | OrderHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderHistory update
   */
  export type OrderHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderHistory.
     */
    data: XOR<OrderHistoryUpdateInput, OrderHistoryUncheckedUpdateInput>
    /**
     * Choose, which OrderHistory to update.
     */
    where: OrderHistoryWhereUniqueInput
  }

  /**
   * OrderHistory updateMany
   */
  export type OrderHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderHistories.
     */
    data: XOR<OrderHistoryUpdateManyMutationInput, OrderHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderHistories to update
     */
    where?: OrderHistoryWhereInput
    /**
     * Limit how many OrderHistories to update.
     */
    limit?: number
  }

  /**
   * OrderHistory updateManyAndReturn
   */
  export type OrderHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * The data used to update OrderHistories.
     */
    data: XOR<OrderHistoryUpdateManyMutationInput, OrderHistoryUncheckedUpdateManyInput>
    /**
     * Filter which OrderHistories to update
     */
    where?: OrderHistoryWhereInput
    /**
     * Limit how many OrderHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderHistory upsert
   */
  export type OrderHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderHistory to update in case it exists.
     */
    where: OrderHistoryWhereUniqueInput
    /**
     * In case the OrderHistory found by the `where` argument doesn't exist, create a new OrderHistory with this data.
     */
    create: XOR<OrderHistoryCreateInput, OrderHistoryUncheckedCreateInput>
    /**
     * In case the OrderHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderHistoryUpdateInput, OrderHistoryUncheckedUpdateInput>
  }

  /**
   * OrderHistory delete
   */
  export type OrderHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
    /**
     * Filter which OrderHistory to delete.
     */
    where: OrderHistoryWhereUniqueInput
  }

  /**
   * OrderHistory deleteMany
   */
  export type OrderHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderHistories to delete
     */
    where?: OrderHistoryWhereInput
    /**
     * Limit how many OrderHistories to delete.
     */
    limit?: number
  }

  /**
   * OrderHistory without action
   */
  export type OrderHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderHistory
     */
    select?: OrderHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderHistory
     */
    omit?: OrderHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderHistoryInclude<ExtArgs> | null
  }


  /**
   * Model DistributionSession
   */

  export type AggregateDistributionSession = {
    _count: DistributionSessionCountAggregateOutputType | null
    _avg: DistributionSessionAvgAggregateOutputType | null
    _sum: DistributionSessionSumAggregateOutputType | null
    _min: DistributionSessionMinAggregateOutputType | null
    _max: DistributionSessionMaxAggregateOutputType | null
  }

  export type DistributionSessionAvgAggregateOutputType = {
    id: number | null
    distributorId: number | null
    closedByAdminId: number | null
  }

  export type DistributionSessionSumAggregateOutputType = {
    id: number | null
    distributorId: number | null
    closedByAdminId: number | null
  }

  export type DistributionSessionMinAggregateOutputType = {
    id: number | null
    distributorId: number | null
    status: $Enums.SessionStatus | null
    openedAt: Date | null
    closedAt: Date | null
    closedByAdminId: number | null
    notes: string | null
  }

  export type DistributionSessionMaxAggregateOutputType = {
    id: number | null
    distributorId: number | null
    status: $Enums.SessionStatus | null
    openedAt: Date | null
    closedAt: Date | null
    closedByAdminId: number | null
    notes: string | null
  }

  export type DistributionSessionCountAggregateOutputType = {
    id: number
    distributorId: number
    status: number
    openedAt: number
    closedAt: number
    closedByAdminId: number
    notes: number
    snapshotData: number
    _all: number
  }


  export type DistributionSessionAvgAggregateInputType = {
    id?: true
    distributorId?: true
    closedByAdminId?: true
  }

  export type DistributionSessionSumAggregateInputType = {
    id?: true
    distributorId?: true
    closedByAdminId?: true
  }

  export type DistributionSessionMinAggregateInputType = {
    id?: true
    distributorId?: true
    status?: true
    openedAt?: true
    closedAt?: true
    closedByAdminId?: true
    notes?: true
  }

  export type DistributionSessionMaxAggregateInputType = {
    id?: true
    distributorId?: true
    status?: true
    openedAt?: true
    closedAt?: true
    closedByAdminId?: true
    notes?: true
  }

  export type DistributionSessionCountAggregateInputType = {
    id?: true
    distributorId?: true
    status?: true
    openedAt?: true
    closedAt?: true
    closedByAdminId?: true
    notes?: true
    snapshotData?: true
    _all?: true
  }

  export type DistributionSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DistributionSession to aggregate.
     */
    where?: DistributionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DistributionSessions to fetch.
     */
    orderBy?: DistributionSessionOrderByWithRelationInput | DistributionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DistributionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DistributionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DistributionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DistributionSessions
    **/
    _count?: true | DistributionSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DistributionSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DistributionSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DistributionSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DistributionSessionMaxAggregateInputType
  }

  export type GetDistributionSessionAggregateType<T extends DistributionSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateDistributionSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDistributionSession[P]>
      : GetScalarType<T[P], AggregateDistributionSession[P]>
  }




  export type DistributionSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DistributionSessionWhereInput
    orderBy?: DistributionSessionOrderByWithAggregationInput | DistributionSessionOrderByWithAggregationInput[]
    by: DistributionSessionScalarFieldEnum[] | DistributionSessionScalarFieldEnum
    having?: DistributionSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DistributionSessionCountAggregateInputType | true
    _avg?: DistributionSessionAvgAggregateInputType
    _sum?: DistributionSessionSumAggregateInputType
    _min?: DistributionSessionMinAggregateInputType
    _max?: DistributionSessionMaxAggregateInputType
  }

  export type DistributionSessionGroupByOutputType = {
    id: number
    distributorId: number
    status: $Enums.SessionStatus
    openedAt: Date
    closedAt: Date | null
    closedByAdminId: number | null
    notes: string | null
    snapshotData: JsonValue | null
    _count: DistributionSessionCountAggregateOutputType | null
    _avg: DistributionSessionAvgAggregateOutputType | null
    _sum: DistributionSessionSumAggregateOutputType | null
    _min: DistributionSessionMinAggregateOutputType | null
    _max: DistributionSessionMaxAggregateOutputType | null
  }

  type GetDistributionSessionGroupByPayload<T extends DistributionSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DistributionSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DistributionSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DistributionSessionGroupByOutputType[P]>
            : GetScalarType<T[P], DistributionSessionGroupByOutputType[P]>
        }
      >
    >


  export type DistributionSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    distributorId?: boolean
    status?: boolean
    openedAt?: boolean
    closedAt?: boolean
    closedByAdminId?: boolean
    notes?: boolean
    snapshotData?: boolean
    distributor?: boolean | UserDefaultArgs<ExtArgs>
    closedByAdmin?: boolean | DistributionSession$closedByAdminArgs<ExtArgs>
  }, ExtArgs["result"]["distributionSession"]>

  export type DistributionSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    distributorId?: boolean
    status?: boolean
    openedAt?: boolean
    closedAt?: boolean
    closedByAdminId?: boolean
    notes?: boolean
    snapshotData?: boolean
    distributor?: boolean | UserDefaultArgs<ExtArgs>
    closedByAdmin?: boolean | DistributionSession$closedByAdminArgs<ExtArgs>
  }, ExtArgs["result"]["distributionSession"]>

  export type DistributionSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    distributorId?: boolean
    status?: boolean
    openedAt?: boolean
    closedAt?: boolean
    closedByAdminId?: boolean
    notes?: boolean
    snapshotData?: boolean
    distributor?: boolean | UserDefaultArgs<ExtArgs>
    closedByAdmin?: boolean | DistributionSession$closedByAdminArgs<ExtArgs>
  }, ExtArgs["result"]["distributionSession"]>

  export type DistributionSessionSelectScalar = {
    id?: boolean
    distributorId?: boolean
    status?: boolean
    openedAt?: boolean
    closedAt?: boolean
    closedByAdminId?: boolean
    notes?: boolean
    snapshotData?: boolean
  }

  export type DistributionSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "distributorId" | "status" | "openedAt" | "closedAt" | "closedByAdminId" | "notes" | "snapshotData", ExtArgs["result"]["distributionSession"]>
  export type DistributionSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    distributor?: boolean | UserDefaultArgs<ExtArgs>
    closedByAdmin?: boolean | DistributionSession$closedByAdminArgs<ExtArgs>
  }
  export type DistributionSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    distributor?: boolean | UserDefaultArgs<ExtArgs>
    closedByAdmin?: boolean | DistributionSession$closedByAdminArgs<ExtArgs>
  }
  export type DistributionSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    distributor?: boolean | UserDefaultArgs<ExtArgs>
    closedByAdmin?: boolean | DistributionSession$closedByAdminArgs<ExtArgs>
  }

  export type $DistributionSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DistributionSession"
    objects: {
      distributor: Prisma.$UserPayload<ExtArgs>
      closedByAdmin: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      distributorId: number
      status: $Enums.SessionStatus
      openedAt: Date
      closedAt: Date | null
      closedByAdminId: number | null
      notes: string | null
      snapshotData: Prisma.JsonValue | null
    }, ExtArgs["result"]["distributionSession"]>
    composites: {}
  }

  type DistributionSessionGetPayload<S extends boolean | null | undefined | DistributionSessionDefaultArgs> = $Result.GetResult<Prisma.$DistributionSessionPayload, S>

  type DistributionSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DistributionSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DistributionSessionCountAggregateInputType | true
    }

  export interface DistributionSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DistributionSession'], meta: { name: 'DistributionSession' } }
    /**
     * Find zero or one DistributionSession that matches the filter.
     * @param {DistributionSessionFindUniqueArgs} args - Arguments to find a DistributionSession
     * @example
     * // Get one DistributionSession
     * const distributionSession = await prisma.distributionSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DistributionSessionFindUniqueArgs>(args: SelectSubset<T, DistributionSessionFindUniqueArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DistributionSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DistributionSessionFindUniqueOrThrowArgs} args - Arguments to find a DistributionSession
     * @example
     * // Get one DistributionSession
     * const distributionSession = await prisma.distributionSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DistributionSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, DistributionSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DistributionSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionFindFirstArgs} args - Arguments to find a DistributionSession
     * @example
     * // Get one DistributionSession
     * const distributionSession = await prisma.distributionSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DistributionSessionFindFirstArgs>(args?: SelectSubset<T, DistributionSessionFindFirstArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DistributionSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionFindFirstOrThrowArgs} args - Arguments to find a DistributionSession
     * @example
     * // Get one DistributionSession
     * const distributionSession = await prisma.distributionSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DistributionSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, DistributionSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DistributionSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DistributionSessions
     * const distributionSessions = await prisma.distributionSession.findMany()
     * 
     * // Get first 10 DistributionSessions
     * const distributionSessions = await prisma.distributionSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const distributionSessionWithIdOnly = await prisma.distributionSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DistributionSessionFindManyArgs>(args?: SelectSubset<T, DistributionSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DistributionSession.
     * @param {DistributionSessionCreateArgs} args - Arguments to create a DistributionSession.
     * @example
     * // Create one DistributionSession
     * const DistributionSession = await prisma.distributionSession.create({
     *   data: {
     *     // ... data to create a DistributionSession
     *   }
     * })
     * 
     */
    create<T extends DistributionSessionCreateArgs>(args: SelectSubset<T, DistributionSessionCreateArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DistributionSessions.
     * @param {DistributionSessionCreateManyArgs} args - Arguments to create many DistributionSessions.
     * @example
     * // Create many DistributionSessions
     * const distributionSession = await prisma.distributionSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DistributionSessionCreateManyArgs>(args?: SelectSubset<T, DistributionSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DistributionSessions and returns the data saved in the database.
     * @param {DistributionSessionCreateManyAndReturnArgs} args - Arguments to create many DistributionSessions.
     * @example
     * // Create many DistributionSessions
     * const distributionSession = await prisma.distributionSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DistributionSessions and only return the `id`
     * const distributionSessionWithIdOnly = await prisma.distributionSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DistributionSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, DistributionSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DistributionSession.
     * @param {DistributionSessionDeleteArgs} args - Arguments to delete one DistributionSession.
     * @example
     * // Delete one DistributionSession
     * const DistributionSession = await prisma.distributionSession.delete({
     *   where: {
     *     // ... filter to delete one DistributionSession
     *   }
     * })
     * 
     */
    delete<T extends DistributionSessionDeleteArgs>(args: SelectSubset<T, DistributionSessionDeleteArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DistributionSession.
     * @param {DistributionSessionUpdateArgs} args - Arguments to update one DistributionSession.
     * @example
     * // Update one DistributionSession
     * const distributionSession = await prisma.distributionSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DistributionSessionUpdateArgs>(args: SelectSubset<T, DistributionSessionUpdateArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DistributionSessions.
     * @param {DistributionSessionDeleteManyArgs} args - Arguments to filter DistributionSessions to delete.
     * @example
     * // Delete a few DistributionSessions
     * const { count } = await prisma.distributionSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DistributionSessionDeleteManyArgs>(args?: SelectSubset<T, DistributionSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DistributionSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DistributionSessions
     * const distributionSession = await prisma.distributionSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DistributionSessionUpdateManyArgs>(args: SelectSubset<T, DistributionSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DistributionSessions and returns the data updated in the database.
     * @param {DistributionSessionUpdateManyAndReturnArgs} args - Arguments to update many DistributionSessions.
     * @example
     * // Update many DistributionSessions
     * const distributionSession = await prisma.distributionSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DistributionSessions and only return the `id`
     * const distributionSessionWithIdOnly = await prisma.distributionSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DistributionSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, DistributionSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DistributionSession.
     * @param {DistributionSessionUpsertArgs} args - Arguments to update or create a DistributionSession.
     * @example
     * // Update or create a DistributionSession
     * const distributionSession = await prisma.distributionSession.upsert({
     *   create: {
     *     // ... data to create a DistributionSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DistributionSession we want to update
     *   }
     * })
     */
    upsert<T extends DistributionSessionUpsertArgs>(args: SelectSubset<T, DistributionSessionUpsertArgs<ExtArgs>>): Prisma__DistributionSessionClient<$Result.GetResult<Prisma.$DistributionSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DistributionSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionCountArgs} args - Arguments to filter DistributionSessions to count.
     * @example
     * // Count the number of DistributionSessions
     * const count = await prisma.distributionSession.count({
     *   where: {
     *     // ... the filter for the DistributionSessions we want to count
     *   }
     * })
    **/
    count<T extends DistributionSessionCountArgs>(
      args?: Subset<T, DistributionSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DistributionSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DistributionSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DistributionSessionAggregateArgs>(args: Subset<T, DistributionSessionAggregateArgs>): Prisma.PrismaPromise<GetDistributionSessionAggregateType<T>>

    /**
     * Group by DistributionSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DistributionSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DistributionSessionGroupByArgs['orderBy'] }
        : { orderBy?: DistributionSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DistributionSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDistributionSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DistributionSession model
   */
  readonly fields: DistributionSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DistributionSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DistributionSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    distributor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    closedByAdmin<T extends DistributionSession$closedByAdminArgs<ExtArgs> = {}>(args?: Subset<T, DistributionSession$closedByAdminArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DistributionSession model
   */
  interface DistributionSessionFieldRefs {
    readonly id: FieldRef<"DistributionSession", 'Int'>
    readonly distributorId: FieldRef<"DistributionSession", 'Int'>
    readonly status: FieldRef<"DistributionSession", 'SessionStatus'>
    readonly openedAt: FieldRef<"DistributionSession", 'DateTime'>
    readonly closedAt: FieldRef<"DistributionSession", 'DateTime'>
    readonly closedByAdminId: FieldRef<"DistributionSession", 'Int'>
    readonly notes: FieldRef<"DistributionSession", 'String'>
    readonly snapshotData: FieldRef<"DistributionSession", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * DistributionSession findUnique
   */
  export type DistributionSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * Filter, which DistributionSession to fetch.
     */
    where: DistributionSessionWhereUniqueInput
  }

  /**
   * DistributionSession findUniqueOrThrow
   */
  export type DistributionSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * Filter, which DistributionSession to fetch.
     */
    where: DistributionSessionWhereUniqueInput
  }

  /**
   * DistributionSession findFirst
   */
  export type DistributionSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * Filter, which DistributionSession to fetch.
     */
    where?: DistributionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DistributionSessions to fetch.
     */
    orderBy?: DistributionSessionOrderByWithRelationInput | DistributionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DistributionSessions.
     */
    cursor?: DistributionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DistributionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DistributionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DistributionSessions.
     */
    distinct?: DistributionSessionScalarFieldEnum | DistributionSessionScalarFieldEnum[]
  }

  /**
   * DistributionSession findFirstOrThrow
   */
  export type DistributionSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * Filter, which DistributionSession to fetch.
     */
    where?: DistributionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DistributionSessions to fetch.
     */
    orderBy?: DistributionSessionOrderByWithRelationInput | DistributionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DistributionSessions.
     */
    cursor?: DistributionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DistributionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DistributionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DistributionSessions.
     */
    distinct?: DistributionSessionScalarFieldEnum | DistributionSessionScalarFieldEnum[]
  }

  /**
   * DistributionSession findMany
   */
  export type DistributionSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * Filter, which DistributionSessions to fetch.
     */
    where?: DistributionSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DistributionSessions to fetch.
     */
    orderBy?: DistributionSessionOrderByWithRelationInput | DistributionSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DistributionSessions.
     */
    cursor?: DistributionSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DistributionSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DistributionSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DistributionSessions.
     */
    distinct?: DistributionSessionScalarFieldEnum | DistributionSessionScalarFieldEnum[]
  }

  /**
   * DistributionSession create
   */
  export type DistributionSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a DistributionSession.
     */
    data: XOR<DistributionSessionCreateInput, DistributionSessionUncheckedCreateInput>
  }

  /**
   * DistributionSession createMany
   */
  export type DistributionSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DistributionSessions.
     */
    data: DistributionSessionCreateManyInput | DistributionSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DistributionSession createManyAndReturn
   */
  export type DistributionSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * The data used to create many DistributionSessions.
     */
    data: DistributionSessionCreateManyInput | DistributionSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DistributionSession update
   */
  export type DistributionSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a DistributionSession.
     */
    data: XOR<DistributionSessionUpdateInput, DistributionSessionUncheckedUpdateInput>
    /**
     * Choose, which DistributionSession to update.
     */
    where: DistributionSessionWhereUniqueInput
  }

  /**
   * DistributionSession updateMany
   */
  export type DistributionSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DistributionSessions.
     */
    data: XOR<DistributionSessionUpdateManyMutationInput, DistributionSessionUncheckedUpdateManyInput>
    /**
     * Filter which DistributionSessions to update
     */
    where?: DistributionSessionWhereInput
    /**
     * Limit how many DistributionSessions to update.
     */
    limit?: number
  }

  /**
   * DistributionSession updateManyAndReturn
   */
  export type DistributionSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * The data used to update DistributionSessions.
     */
    data: XOR<DistributionSessionUpdateManyMutationInput, DistributionSessionUncheckedUpdateManyInput>
    /**
     * Filter which DistributionSessions to update
     */
    where?: DistributionSessionWhereInput
    /**
     * Limit how many DistributionSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DistributionSession upsert
   */
  export type DistributionSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the DistributionSession to update in case it exists.
     */
    where: DistributionSessionWhereUniqueInput
    /**
     * In case the DistributionSession found by the `where` argument doesn't exist, create a new DistributionSession with this data.
     */
    create: XOR<DistributionSessionCreateInput, DistributionSessionUncheckedCreateInput>
    /**
     * In case the DistributionSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DistributionSessionUpdateInput, DistributionSessionUncheckedUpdateInput>
  }

  /**
   * DistributionSession delete
   */
  export type DistributionSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
    /**
     * Filter which DistributionSession to delete.
     */
    where: DistributionSessionWhereUniqueInput
  }

  /**
   * DistributionSession deleteMany
   */
  export type DistributionSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DistributionSessions to delete
     */
    where?: DistributionSessionWhereInput
    /**
     * Limit how many DistributionSessions to delete.
     */
    limit?: number
  }

  /**
   * DistributionSession.closedByAdmin
   */
  export type DistributionSession$closedByAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * DistributionSession without action
   */
  export type DistributionSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DistributionSession
     */
    select?: DistributionSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DistributionSession
     */
    omit?: DistributionSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionSessionInclude<ExtArgs> | null
  }


  /**
   * Model ProductionEntry
   */

  export type AggregateProductionEntry = {
    _count: ProductionEntryCountAggregateOutputType | null
    _avg: ProductionEntryAvgAggregateOutputType | null
    _sum: ProductionEntrySumAggregateOutputType | null
    _min: ProductionEntryMinAggregateOutputType | null
    _max: ProductionEntryMaxAggregateOutputType | null
  }

  export type ProductionEntryAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    quantity: number | null
    createdBy: number | null
  }

  export type ProductionEntrySumAggregateOutputType = {
    id: number | null
    productId: number | null
    quantity: number | null
    createdBy: number | null
  }

  export type ProductionEntryMinAggregateOutputType = {
    id: number | null
    productId: number | null
    quantity: number | null
    notes: string | null
    createdBy: number | null
    date: Date | null
    createdAt: Date | null
  }

  export type ProductionEntryMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    quantity: number | null
    notes: string | null
    createdBy: number | null
    date: Date | null
    createdAt: Date | null
  }

  export type ProductionEntryCountAggregateOutputType = {
    id: number
    productId: number
    quantity: number
    notes: number
    createdBy: number
    date: number
    createdAt: number
    _all: number
  }


  export type ProductionEntryAvgAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    createdBy?: true
  }

  export type ProductionEntrySumAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    createdBy?: true
  }

  export type ProductionEntryMinAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    notes?: true
    createdBy?: true
    date?: true
    createdAt?: true
  }

  export type ProductionEntryMaxAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    notes?: true
    createdBy?: true
    date?: true
    createdAt?: true
  }

  export type ProductionEntryCountAggregateInputType = {
    id?: true
    productId?: true
    quantity?: true
    notes?: true
    createdBy?: true
    date?: true
    createdAt?: true
    _all?: true
  }

  export type ProductionEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionEntry to aggregate.
     */
    where?: ProductionEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionEntries to fetch.
     */
    orderBy?: ProductionEntryOrderByWithRelationInput | ProductionEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductionEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductionEntries
    **/
    _count?: true | ProductionEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductionEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductionEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductionEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductionEntryMaxAggregateInputType
  }

  export type GetProductionEntryAggregateType<T extends ProductionEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateProductionEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductionEntry[P]>
      : GetScalarType<T[P], AggregateProductionEntry[P]>
  }




  export type ProductionEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionEntryWhereInput
    orderBy?: ProductionEntryOrderByWithAggregationInput | ProductionEntryOrderByWithAggregationInput[]
    by: ProductionEntryScalarFieldEnum[] | ProductionEntryScalarFieldEnum
    having?: ProductionEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductionEntryCountAggregateInputType | true
    _avg?: ProductionEntryAvgAggregateInputType
    _sum?: ProductionEntrySumAggregateInputType
    _min?: ProductionEntryMinAggregateInputType
    _max?: ProductionEntryMaxAggregateInputType
  }

  export type ProductionEntryGroupByOutputType = {
    id: number
    productId: number
    quantity: number
    notes: string | null
    createdBy: number | null
    date: Date
    createdAt: Date
    _count: ProductionEntryCountAggregateOutputType | null
    _avg: ProductionEntryAvgAggregateOutputType | null
    _sum: ProductionEntrySumAggregateOutputType | null
    _min: ProductionEntryMinAggregateOutputType | null
    _max: ProductionEntryMaxAggregateOutputType | null
  }

  type GetProductionEntryGroupByPayload<T extends ProductionEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductionEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductionEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductionEntryGroupByOutputType[P]>
            : GetScalarType<T[P], ProductionEntryGroupByOutputType[P]>
        }
      >
    >


  export type ProductionEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    notes?: boolean
    createdBy?: boolean
    date?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    creator?: boolean | ProductionEntry$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["productionEntry"]>

  export type ProductionEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    notes?: boolean
    createdBy?: boolean
    date?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    creator?: boolean | ProductionEntry$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["productionEntry"]>

  export type ProductionEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    quantity?: boolean
    notes?: boolean
    createdBy?: boolean
    date?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    creator?: boolean | ProductionEntry$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["productionEntry"]>

  export type ProductionEntrySelectScalar = {
    id?: boolean
    productId?: boolean
    quantity?: boolean
    notes?: boolean
    createdBy?: boolean
    date?: boolean
    createdAt?: boolean
  }

  export type ProductionEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "quantity" | "notes" | "createdBy" | "date" | "createdAt", ExtArgs["result"]["productionEntry"]>
  export type ProductionEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    creator?: boolean | ProductionEntry$creatorArgs<ExtArgs>
  }
  export type ProductionEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    creator?: boolean | ProductionEntry$creatorArgs<ExtArgs>
  }
  export type ProductionEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    creator?: boolean | ProductionEntry$creatorArgs<ExtArgs>
  }

  export type $ProductionEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductionEntry"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      quantity: number
      notes: string | null
      createdBy: number | null
      date: Date
      createdAt: Date
    }, ExtArgs["result"]["productionEntry"]>
    composites: {}
  }

  type ProductionEntryGetPayload<S extends boolean | null | undefined | ProductionEntryDefaultArgs> = $Result.GetResult<Prisma.$ProductionEntryPayload, S>

  type ProductionEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductionEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductionEntryCountAggregateInputType | true
    }

  export interface ProductionEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductionEntry'], meta: { name: 'ProductionEntry' } }
    /**
     * Find zero or one ProductionEntry that matches the filter.
     * @param {ProductionEntryFindUniqueArgs} args - Arguments to find a ProductionEntry
     * @example
     * // Get one ProductionEntry
     * const productionEntry = await prisma.productionEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductionEntryFindUniqueArgs>(args: SelectSubset<T, ProductionEntryFindUniqueArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductionEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductionEntryFindUniqueOrThrowArgs} args - Arguments to find a ProductionEntry
     * @example
     * // Get one ProductionEntry
     * const productionEntry = await prisma.productionEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductionEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductionEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductionEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryFindFirstArgs} args - Arguments to find a ProductionEntry
     * @example
     * // Get one ProductionEntry
     * const productionEntry = await prisma.productionEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductionEntryFindFirstArgs>(args?: SelectSubset<T, ProductionEntryFindFirstArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductionEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryFindFirstOrThrowArgs} args - Arguments to find a ProductionEntry
     * @example
     * // Get one ProductionEntry
     * const productionEntry = await prisma.productionEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductionEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductionEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductionEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductionEntries
     * const productionEntries = await prisma.productionEntry.findMany()
     * 
     * // Get first 10 ProductionEntries
     * const productionEntries = await prisma.productionEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productionEntryWithIdOnly = await prisma.productionEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductionEntryFindManyArgs>(args?: SelectSubset<T, ProductionEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductionEntry.
     * @param {ProductionEntryCreateArgs} args - Arguments to create a ProductionEntry.
     * @example
     * // Create one ProductionEntry
     * const ProductionEntry = await prisma.productionEntry.create({
     *   data: {
     *     // ... data to create a ProductionEntry
     *   }
     * })
     * 
     */
    create<T extends ProductionEntryCreateArgs>(args: SelectSubset<T, ProductionEntryCreateArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductionEntries.
     * @param {ProductionEntryCreateManyArgs} args - Arguments to create many ProductionEntries.
     * @example
     * // Create many ProductionEntries
     * const productionEntry = await prisma.productionEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductionEntryCreateManyArgs>(args?: SelectSubset<T, ProductionEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductionEntries and returns the data saved in the database.
     * @param {ProductionEntryCreateManyAndReturnArgs} args - Arguments to create many ProductionEntries.
     * @example
     * // Create many ProductionEntries
     * const productionEntry = await prisma.productionEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductionEntries and only return the `id`
     * const productionEntryWithIdOnly = await prisma.productionEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductionEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductionEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductionEntry.
     * @param {ProductionEntryDeleteArgs} args - Arguments to delete one ProductionEntry.
     * @example
     * // Delete one ProductionEntry
     * const ProductionEntry = await prisma.productionEntry.delete({
     *   where: {
     *     // ... filter to delete one ProductionEntry
     *   }
     * })
     * 
     */
    delete<T extends ProductionEntryDeleteArgs>(args: SelectSubset<T, ProductionEntryDeleteArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductionEntry.
     * @param {ProductionEntryUpdateArgs} args - Arguments to update one ProductionEntry.
     * @example
     * // Update one ProductionEntry
     * const productionEntry = await prisma.productionEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductionEntryUpdateArgs>(args: SelectSubset<T, ProductionEntryUpdateArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductionEntries.
     * @param {ProductionEntryDeleteManyArgs} args - Arguments to filter ProductionEntries to delete.
     * @example
     * // Delete a few ProductionEntries
     * const { count } = await prisma.productionEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductionEntryDeleteManyArgs>(args?: SelectSubset<T, ProductionEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductionEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductionEntries
     * const productionEntry = await prisma.productionEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductionEntryUpdateManyArgs>(args: SelectSubset<T, ProductionEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductionEntries and returns the data updated in the database.
     * @param {ProductionEntryUpdateManyAndReturnArgs} args - Arguments to update many ProductionEntries.
     * @example
     * // Update many ProductionEntries
     * const productionEntry = await prisma.productionEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductionEntries and only return the `id`
     * const productionEntryWithIdOnly = await prisma.productionEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductionEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductionEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductionEntry.
     * @param {ProductionEntryUpsertArgs} args - Arguments to update or create a ProductionEntry.
     * @example
     * // Update or create a ProductionEntry
     * const productionEntry = await prisma.productionEntry.upsert({
     *   create: {
     *     // ... data to create a ProductionEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductionEntry we want to update
     *   }
     * })
     */
    upsert<T extends ProductionEntryUpsertArgs>(args: SelectSubset<T, ProductionEntryUpsertArgs<ExtArgs>>): Prisma__ProductionEntryClient<$Result.GetResult<Prisma.$ProductionEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductionEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryCountArgs} args - Arguments to filter ProductionEntries to count.
     * @example
     * // Count the number of ProductionEntries
     * const count = await prisma.productionEntry.count({
     *   where: {
     *     // ... the filter for the ProductionEntries we want to count
     *   }
     * })
    **/
    count<T extends ProductionEntryCountArgs>(
      args?: Subset<T, ProductionEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductionEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductionEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductionEntryAggregateArgs>(args: Subset<T, ProductionEntryAggregateArgs>): Prisma.PrismaPromise<GetProductionEntryAggregateType<T>>

    /**
     * Group by ProductionEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductionEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductionEntryGroupByArgs['orderBy'] }
        : { orderBy?: ProductionEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductionEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductionEntry model
   */
  readonly fields: ProductionEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductionEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductionEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends ProductionEntry$creatorArgs<ExtArgs> = {}>(args?: Subset<T, ProductionEntry$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductionEntry model
   */
  interface ProductionEntryFieldRefs {
    readonly id: FieldRef<"ProductionEntry", 'Int'>
    readonly productId: FieldRef<"ProductionEntry", 'Int'>
    readonly quantity: FieldRef<"ProductionEntry", 'Int'>
    readonly notes: FieldRef<"ProductionEntry", 'String'>
    readonly createdBy: FieldRef<"ProductionEntry", 'Int'>
    readonly date: FieldRef<"ProductionEntry", 'DateTime'>
    readonly createdAt: FieldRef<"ProductionEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductionEntry findUnique
   */
  export type ProductionEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * Filter, which ProductionEntry to fetch.
     */
    where: ProductionEntryWhereUniqueInput
  }

  /**
   * ProductionEntry findUniqueOrThrow
   */
  export type ProductionEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * Filter, which ProductionEntry to fetch.
     */
    where: ProductionEntryWhereUniqueInput
  }

  /**
   * ProductionEntry findFirst
   */
  export type ProductionEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * Filter, which ProductionEntry to fetch.
     */
    where?: ProductionEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionEntries to fetch.
     */
    orderBy?: ProductionEntryOrderByWithRelationInput | ProductionEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductionEntries.
     */
    cursor?: ProductionEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionEntries.
     */
    distinct?: ProductionEntryScalarFieldEnum | ProductionEntryScalarFieldEnum[]
  }

  /**
   * ProductionEntry findFirstOrThrow
   */
  export type ProductionEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * Filter, which ProductionEntry to fetch.
     */
    where?: ProductionEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionEntries to fetch.
     */
    orderBy?: ProductionEntryOrderByWithRelationInput | ProductionEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductionEntries.
     */
    cursor?: ProductionEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionEntries.
     */
    distinct?: ProductionEntryScalarFieldEnum | ProductionEntryScalarFieldEnum[]
  }

  /**
   * ProductionEntry findMany
   */
  export type ProductionEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * Filter, which ProductionEntries to fetch.
     */
    where?: ProductionEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionEntries to fetch.
     */
    orderBy?: ProductionEntryOrderByWithRelationInput | ProductionEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductionEntries.
     */
    cursor?: ProductionEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionEntries.
     */
    distinct?: ProductionEntryScalarFieldEnum | ProductionEntryScalarFieldEnum[]
  }

  /**
   * ProductionEntry create
   */
  export type ProductionEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductionEntry.
     */
    data: XOR<ProductionEntryCreateInput, ProductionEntryUncheckedCreateInput>
  }

  /**
   * ProductionEntry createMany
   */
  export type ProductionEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductionEntries.
     */
    data: ProductionEntryCreateManyInput | ProductionEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductionEntry createManyAndReturn
   */
  export type ProductionEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * The data used to create many ProductionEntries.
     */
    data: ProductionEntryCreateManyInput | ProductionEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductionEntry update
   */
  export type ProductionEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductionEntry.
     */
    data: XOR<ProductionEntryUpdateInput, ProductionEntryUncheckedUpdateInput>
    /**
     * Choose, which ProductionEntry to update.
     */
    where: ProductionEntryWhereUniqueInput
  }

  /**
   * ProductionEntry updateMany
   */
  export type ProductionEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductionEntries.
     */
    data: XOR<ProductionEntryUpdateManyMutationInput, ProductionEntryUncheckedUpdateManyInput>
    /**
     * Filter which ProductionEntries to update
     */
    where?: ProductionEntryWhereInput
    /**
     * Limit how many ProductionEntries to update.
     */
    limit?: number
  }

  /**
   * ProductionEntry updateManyAndReturn
   */
  export type ProductionEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * The data used to update ProductionEntries.
     */
    data: XOR<ProductionEntryUpdateManyMutationInput, ProductionEntryUncheckedUpdateManyInput>
    /**
     * Filter which ProductionEntries to update
     */
    where?: ProductionEntryWhereInput
    /**
     * Limit how many ProductionEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductionEntry upsert
   */
  export type ProductionEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductionEntry to update in case it exists.
     */
    where: ProductionEntryWhereUniqueInput
    /**
     * In case the ProductionEntry found by the `where` argument doesn't exist, create a new ProductionEntry with this data.
     */
    create: XOR<ProductionEntryCreateInput, ProductionEntryUncheckedCreateInput>
    /**
     * In case the ProductionEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductionEntryUpdateInput, ProductionEntryUncheckedUpdateInput>
  }

  /**
   * ProductionEntry delete
   */
  export type ProductionEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
    /**
     * Filter which ProductionEntry to delete.
     */
    where: ProductionEntryWhereUniqueInput
  }

  /**
   * ProductionEntry deleteMany
   */
  export type ProductionEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionEntries to delete
     */
    where?: ProductionEntryWhereInput
    /**
     * Limit how many ProductionEntries to delete.
     */
    limit?: number
  }

  /**
   * ProductionEntry.creator
   */
  export type ProductionEntry$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ProductionEntry without action
   */
  export type ProductionEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionEntry
     */
    select?: ProductionEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionEntry
     */
    omit?: ProductionEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionEntryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    ownerName: 'ownerName',
    phone: 'phone',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    photoUrl: 'photoUrl',
    regionId: 'regionId',
    createdBy: 'createdBy',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    unit: 'unit',
    category: 'category',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    preventistaId: 'preventistaId',
    distributorId: 'distributorId',
    regionId: 'regionId',
    status: 'status',
    notes: 'notes',
    deliveredAt: 'deliveredAt',
    discount: 'discount',
    createdAt: 'createdAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    unitPrice: 'unitPrice',
    deliveredQuantity: 'deliveredQuantity',
    isBonification: 'isBonification'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const UserRegionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    regionId: 'regionId',
    createdAt: 'createdAt'
  };

  export type UserRegionScalarFieldEnum = (typeof UserRegionScalarFieldEnum)[keyof typeof UserRegionScalarFieldEnum]


  export const OrderHistoryScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    changedBy: 'changedBy',
    action: 'action',
    previousStatus: 'previousStatus',
    newStatus: 'newStatus',
    snapshotData: 'snapshotData',
    createdAt: 'createdAt'
  };

  export type OrderHistoryScalarFieldEnum = (typeof OrderHistoryScalarFieldEnum)[keyof typeof OrderHistoryScalarFieldEnum]


  export const DistributionSessionScalarFieldEnum: {
    id: 'id',
    distributorId: 'distributorId',
    status: 'status',
    openedAt: 'openedAt',
    closedAt: 'closedAt',
    closedByAdminId: 'closedByAdminId',
    notes: 'notes',
    snapshotData: 'snapshotData'
  };

  export type DistributionSessionScalarFieldEnum = (typeof DistributionSessionScalarFieldEnum)[keyof typeof DistributionSessionScalarFieldEnum]


  export const ProductionEntryScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    quantity: 'quantity',
    notes: 'notes',
    createdBy: 'createdBy',
    date: 'date',
    createdAt: 'createdAt'
  };

  export type ProductionEntryScalarFieldEnum = (typeof ProductionEntryScalarFieldEnum)[keyof typeof ProductionEntryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'OrderAction'
   */
  export type EnumOrderActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderAction'>
    


  /**
   * Reference to a field of type 'OrderAction[]'
   */
  export type ListEnumOrderActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'SessionStatus'
   */
  export type EnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus'>
    


  /**
   * Reference to a field of type 'SessionStatus[]'
   */
  export type ListEnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    clientsCreated?: ClientListRelationFilter
    ordersCreated?: OrderListRelationFilter
    ordersDelivery?: OrderListRelationFilter
    historyActions?: OrderHistoryListRelationFilter
    regionsCreated?: RegionListRelationFilter
    assignedRegions?: UserRegionListRelationFilter
    distributionSessions?: DistributionSessionListRelationFilter
    sessionsClosedByMe?: DistributionSessionListRelationFilter
    productionEntries?: ProductionEntryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    clientsCreated?: ClientOrderByRelationAggregateInput
    ordersCreated?: OrderOrderByRelationAggregateInput
    ordersDelivery?: OrderOrderByRelationAggregateInput
    historyActions?: OrderHistoryOrderByRelationAggregateInput
    regionsCreated?: RegionOrderByRelationAggregateInput
    assignedRegions?: UserRegionOrderByRelationAggregateInput
    distributionSessions?: DistributionSessionOrderByRelationAggregateInput
    sessionsClosedByMe?: DistributionSessionOrderByRelationAggregateInput
    productionEntries?: ProductionEntryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    clientsCreated?: ClientListRelationFilter
    ordersCreated?: OrderListRelationFilter
    ordersDelivery?: OrderListRelationFilter
    historyActions?: OrderHistoryListRelationFilter
    regionsCreated?: RegionListRelationFilter
    assignedRegions?: UserRegionListRelationFilter
    distributionSessions?: DistributionSessionListRelationFilter
    sessionsClosedByMe?: DistributionSessionListRelationFilter
    productionEntries?: ProductionEntryListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: IntFilter<"Region"> | number
    name?: StringFilter<"Region"> | string
    color?: StringFilter<"Region"> | string
    createdBy?: IntFilter<"Region"> | number
    createdAt?: DateTimeFilter<"Region"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    clients?: ClientListRelationFilter
    orders?: OrderListRelationFilter
    assignedUsers?: UserRegionListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    creator?: UserOrderByWithRelationInput
    clients?: ClientOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    assignedUsers?: UserRegionOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    name?: StringFilter<"Region"> | string
    color?: StringFilter<"Region"> | string
    createdBy?: IntFilter<"Region"> | number
    createdAt?: DateTimeFilter<"Region"> | Date | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    clients?: ClientListRelationFilter
    orders?: OrderListRelationFilter
    assignedUsers?: UserRegionListRelationFilter
  }, "id">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Region"> | number
    name?: StringWithAggregatesFilter<"Region"> | string
    color?: StringWithAggregatesFilter<"Region"> | string
    createdBy?: IntWithAggregatesFilter<"Region"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: IntFilter<"Client"> | number
    name?: StringFilter<"Client"> | string
    ownerName?: StringFilter<"Client"> | string
    phone?: StringFilter<"Client"> | string
    address?: StringFilter<"Client"> | string
    latitude?: FloatFilter<"Client"> | number
    longitude?: FloatFilter<"Client"> | number
    photoUrl?: StringNullableFilter<"Client"> | string | null
    regionId?: IntNullableFilter<"Client"> | number | null
    createdBy?: IntFilter<"Client"> | number
    isActive?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
    region?: XOR<RegionNullableScalarRelationFilter, RegionWhereInput> | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    regionId?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    region?: RegionOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    ownerName?: StringFilter<"Client"> | string
    phone?: StringFilter<"Client"> | string
    address?: StringFilter<"Client"> | string
    latitude?: FloatFilter<"Client"> | number
    longitude?: FloatFilter<"Client"> | number
    photoUrl?: StringNullableFilter<"Client"> | string | null
    regionId?: IntNullableFilter<"Client"> | number | null
    createdBy?: IntFilter<"Client"> | number
    isActive?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
    region?: XOR<RegionNullableScalarRelationFilter, RegionWhereInput> | null
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
  }, "id">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    regionId?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Client"> | number
    name?: StringWithAggregatesFilter<"Client"> | string
    ownerName?: StringWithAggregatesFilter<"Client"> | string
    phone?: StringWithAggregatesFilter<"Client"> | string
    address?: StringWithAggregatesFilter<"Client"> | string
    latitude?: FloatWithAggregatesFilter<"Client"> | number
    longitude?: FloatWithAggregatesFilter<"Client"> | number
    photoUrl?: StringNullableWithAggregatesFilter<"Client"> | string | null
    regionId?: IntNullableWithAggregatesFilter<"Client"> | number | null
    createdBy?: IntWithAggregatesFilter<"Client"> | number
    isActive?: BoolWithAggregatesFilter<"Client"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    unit?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    orderItems?: OrderItemListRelationFilter
    productionEntries?: ProductionEntryListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    unit?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    orderItems?: OrderItemOrderByRelationAggregateInput
    productionEntries?: ProductionEntryOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    unit?: StringFilter<"Product"> | string
    category?: StringFilter<"Product"> | string
    isActive?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    orderItems?: OrderItemListRelationFilter
    productionEntries?: ProductionEntryListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    unit?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: FloatWithAggregatesFilter<"Product"> | number
    unit?: StringWithAggregatesFilter<"Product"> | string
    category?: StringWithAggregatesFilter<"Product"> | string
    isActive?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: IntFilter<"Order"> | number
    clientId?: IntFilter<"Order"> | number
    preventistaId?: IntFilter<"Order"> | number
    distributorId?: IntNullableFilter<"Order"> | number | null
    regionId?: IntNullableFilter<"Order"> | number | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    notes?: StringNullableFilter<"Order"> | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    discount?: FloatFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    preventista?: XOR<UserScalarRelationFilter, UserWhereInput>
    distributor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    region?: XOR<RegionNullableScalarRelationFilter, RegionWhereInput> | null
    items?: OrderItemListRelationFilter
    history?: OrderHistoryListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrderInput | SortOrder
    regionId?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    discount?: SortOrder
    createdAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    preventista?: UserOrderByWithRelationInput
    distributor?: UserOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
    history?: OrderHistoryOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    clientId?: IntFilter<"Order"> | number
    preventistaId?: IntFilter<"Order"> | number
    distributorId?: IntNullableFilter<"Order"> | number | null
    regionId?: IntNullableFilter<"Order"> | number | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    notes?: StringNullableFilter<"Order"> | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    discount?: FloatFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    preventista?: XOR<UserScalarRelationFilter, UserWhereInput>
    distributor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    region?: XOR<RegionNullableScalarRelationFilter, RegionWhereInput> | null
    items?: OrderItemListRelationFilter
    history?: OrderHistoryListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrderInput | SortOrder
    regionId?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    discount?: SortOrder
    createdAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Order"> | number
    clientId?: IntWithAggregatesFilter<"Order"> | number
    preventistaId?: IntWithAggregatesFilter<"Order"> | number
    distributorId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    regionId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    notes?: StringNullableWithAggregatesFilter<"Order"> | string | null
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    discount?: FloatWithAggregatesFilter<"Order"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    deliveredQuantity?: IntNullableFilter<"OrderItem"> | number | null
    isBonification?: BoolFilter<"OrderItem"> | boolean
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrderInput | SortOrder
    isBonification?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    deliveredQuantity?: IntNullableFilter<"OrderItem"> | number | null
    isBonification?: BoolFilter<"OrderItem"> | boolean
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrderInput | SortOrder
    isBonification?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderItem"> | number
    orderId?: IntWithAggregatesFilter<"OrderItem"> | number
    productId?: IntWithAggregatesFilter<"OrderItem"> | number
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    unitPrice?: FloatWithAggregatesFilter<"OrderItem"> | number
    deliveredQuantity?: IntNullableWithAggregatesFilter<"OrderItem"> | number | null
    isBonification?: BoolWithAggregatesFilter<"OrderItem"> | boolean
  }

  export type UserRegionWhereInput = {
    AND?: UserRegionWhereInput | UserRegionWhereInput[]
    OR?: UserRegionWhereInput[]
    NOT?: UserRegionWhereInput | UserRegionWhereInput[]
    id?: IntFilter<"UserRegion"> | number
    userId?: IntFilter<"UserRegion"> | number
    regionId?: IntFilter<"UserRegion"> | number
    createdAt?: DateTimeFilter<"UserRegion"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type UserRegionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
  }

  export type UserRegionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_regionId?: UserRegionUserIdRegionIdCompoundUniqueInput
    AND?: UserRegionWhereInput | UserRegionWhereInput[]
    OR?: UserRegionWhereInput[]
    NOT?: UserRegionWhereInput | UserRegionWhereInput[]
    userId?: IntFilter<"UserRegion"> | number
    regionId?: IntFilter<"UserRegion"> | number
    createdAt?: DateTimeFilter<"UserRegion"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id" | "userId_regionId">

  export type UserRegionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    _count?: UserRegionCountOrderByAggregateInput
    _avg?: UserRegionAvgOrderByAggregateInput
    _max?: UserRegionMaxOrderByAggregateInput
    _min?: UserRegionMinOrderByAggregateInput
    _sum?: UserRegionSumOrderByAggregateInput
  }

  export type UserRegionScalarWhereWithAggregatesInput = {
    AND?: UserRegionScalarWhereWithAggregatesInput | UserRegionScalarWhereWithAggregatesInput[]
    OR?: UserRegionScalarWhereWithAggregatesInput[]
    NOT?: UserRegionScalarWhereWithAggregatesInput | UserRegionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserRegion"> | number
    userId?: IntWithAggregatesFilter<"UserRegion"> | number
    regionId?: IntWithAggregatesFilter<"UserRegion"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserRegion"> | Date | string
  }

  export type OrderHistoryWhereInput = {
    AND?: OrderHistoryWhereInput | OrderHistoryWhereInput[]
    OR?: OrderHistoryWhereInput[]
    NOT?: OrderHistoryWhereInput | OrderHistoryWhereInput[]
    id?: IntFilter<"OrderHistory"> | number
    orderId?: IntFilter<"OrderHistory"> | number
    changedBy?: IntFilter<"OrderHistory"> | number
    action?: EnumOrderActionFilter<"OrderHistory"> | $Enums.OrderAction
    previousStatus?: EnumOrderStatusNullableFilter<"OrderHistory"> | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFilter<"OrderHistory"> | $Enums.OrderStatus
    snapshotData?: JsonFilter<"OrderHistory">
    createdAt?: DateTimeFilter<"OrderHistory"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    changer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OrderHistoryOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
    action?: SortOrder
    previousStatus?: SortOrderInput | SortOrder
    newStatus?: SortOrder
    snapshotData?: SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    changer?: UserOrderByWithRelationInput
  }

  export type OrderHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderHistoryWhereInput | OrderHistoryWhereInput[]
    OR?: OrderHistoryWhereInput[]
    NOT?: OrderHistoryWhereInput | OrderHistoryWhereInput[]
    orderId?: IntFilter<"OrderHistory"> | number
    changedBy?: IntFilter<"OrderHistory"> | number
    action?: EnumOrderActionFilter<"OrderHistory"> | $Enums.OrderAction
    previousStatus?: EnumOrderStatusNullableFilter<"OrderHistory"> | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFilter<"OrderHistory"> | $Enums.OrderStatus
    snapshotData?: JsonFilter<"OrderHistory">
    createdAt?: DateTimeFilter<"OrderHistory"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    changer?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OrderHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
    action?: SortOrder
    previousStatus?: SortOrderInput | SortOrder
    newStatus?: SortOrder
    snapshotData?: SortOrder
    createdAt?: SortOrder
    _count?: OrderHistoryCountOrderByAggregateInput
    _avg?: OrderHistoryAvgOrderByAggregateInput
    _max?: OrderHistoryMaxOrderByAggregateInput
    _min?: OrderHistoryMinOrderByAggregateInput
    _sum?: OrderHistorySumOrderByAggregateInput
  }

  export type OrderHistoryScalarWhereWithAggregatesInput = {
    AND?: OrderHistoryScalarWhereWithAggregatesInput | OrderHistoryScalarWhereWithAggregatesInput[]
    OR?: OrderHistoryScalarWhereWithAggregatesInput[]
    NOT?: OrderHistoryScalarWhereWithAggregatesInput | OrderHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderHistory"> | number
    orderId?: IntWithAggregatesFilter<"OrderHistory"> | number
    changedBy?: IntWithAggregatesFilter<"OrderHistory"> | number
    action?: EnumOrderActionWithAggregatesFilter<"OrderHistory"> | $Enums.OrderAction
    previousStatus?: EnumOrderStatusNullableWithAggregatesFilter<"OrderHistory"> | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusWithAggregatesFilter<"OrderHistory"> | $Enums.OrderStatus
    snapshotData?: JsonWithAggregatesFilter<"OrderHistory">
    createdAt?: DateTimeWithAggregatesFilter<"OrderHistory"> | Date | string
  }

  export type DistributionSessionWhereInput = {
    AND?: DistributionSessionWhereInput | DistributionSessionWhereInput[]
    OR?: DistributionSessionWhereInput[]
    NOT?: DistributionSessionWhereInput | DistributionSessionWhereInput[]
    id?: IntFilter<"DistributionSession"> | number
    distributorId?: IntFilter<"DistributionSession"> | number
    status?: EnumSessionStatusFilter<"DistributionSession"> | $Enums.SessionStatus
    openedAt?: DateTimeFilter<"DistributionSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"DistributionSession"> | Date | string | null
    closedByAdminId?: IntNullableFilter<"DistributionSession"> | number | null
    notes?: StringNullableFilter<"DistributionSession"> | string | null
    snapshotData?: JsonNullableFilter<"DistributionSession">
    distributor?: XOR<UserScalarRelationFilter, UserWhereInput>
    closedByAdmin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type DistributionSessionOrderByWithRelationInput = {
    id?: SortOrder
    distributorId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    closedByAdminId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    snapshotData?: SortOrderInput | SortOrder
    distributor?: UserOrderByWithRelationInput
    closedByAdmin?: UserOrderByWithRelationInput
  }

  export type DistributionSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DistributionSessionWhereInput | DistributionSessionWhereInput[]
    OR?: DistributionSessionWhereInput[]
    NOT?: DistributionSessionWhereInput | DistributionSessionWhereInput[]
    distributorId?: IntFilter<"DistributionSession"> | number
    status?: EnumSessionStatusFilter<"DistributionSession"> | $Enums.SessionStatus
    openedAt?: DateTimeFilter<"DistributionSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"DistributionSession"> | Date | string | null
    closedByAdminId?: IntNullableFilter<"DistributionSession"> | number | null
    notes?: StringNullableFilter<"DistributionSession"> | string | null
    snapshotData?: JsonNullableFilter<"DistributionSession">
    distributor?: XOR<UserScalarRelationFilter, UserWhereInput>
    closedByAdmin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type DistributionSessionOrderByWithAggregationInput = {
    id?: SortOrder
    distributorId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    closedByAdminId?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    snapshotData?: SortOrderInput | SortOrder
    _count?: DistributionSessionCountOrderByAggregateInput
    _avg?: DistributionSessionAvgOrderByAggregateInput
    _max?: DistributionSessionMaxOrderByAggregateInput
    _min?: DistributionSessionMinOrderByAggregateInput
    _sum?: DistributionSessionSumOrderByAggregateInput
  }

  export type DistributionSessionScalarWhereWithAggregatesInput = {
    AND?: DistributionSessionScalarWhereWithAggregatesInput | DistributionSessionScalarWhereWithAggregatesInput[]
    OR?: DistributionSessionScalarWhereWithAggregatesInput[]
    NOT?: DistributionSessionScalarWhereWithAggregatesInput | DistributionSessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DistributionSession"> | number
    distributorId?: IntWithAggregatesFilter<"DistributionSession"> | number
    status?: EnumSessionStatusWithAggregatesFilter<"DistributionSession"> | $Enums.SessionStatus
    openedAt?: DateTimeWithAggregatesFilter<"DistributionSession"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"DistributionSession"> | Date | string | null
    closedByAdminId?: IntNullableWithAggregatesFilter<"DistributionSession"> | number | null
    notes?: StringNullableWithAggregatesFilter<"DistributionSession"> | string | null
    snapshotData?: JsonNullableWithAggregatesFilter<"DistributionSession">
  }

  export type ProductionEntryWhereInput = {
    AND?: ProductionEntryWhereInput | ProductionEntryWhereInput[]
    OR?: ProductionEntryWhereInput[]
    NOT?: ProductionEntryWhereInput | ProductionEntryWhereInput[]
    id?: IntFilter<"ProductionEntry"> | number
    productId?: IntFilter<"ProductionEntry"> | number
    quantity?: IntFilter<"ProductionEntry"> | number
    notes?: StringNullableFilter<"ProductionEntry"> | string | null
    createdBy?: IntNullableFilter<"ProductionEntry"> | number | null
    date?: DateTimeFilter<"ProductionEntry"> | Date | string
    createdAt?: DateTimeFilter<"ProductionEntry"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ProductionEntryOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
  }

  export type ProductionEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductionEntryWhereInput | ProductionEntryWhereInput[]
    OR?: ProductionEntryWhereInput[]
    NOT?: ProductionEntryWhereInput | ProductionEntryWhereInput[]
    productId?: IntFilter<"ProductionEntry"> | number
    quantity?: IntFilter<"ProductionEntry"> | number
    notes?: StringNullableFilter<"ProductionEntry"> | string | null
    createdBy?: IntNullableFilter<"ProductionEntry"> | number | null
    date?: DateTimeFilter<"ProductionEntry"> | Date | string
    createdAt?: DateTimeFilter<"ProductionEntry"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ProductionEntryOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    _count?: ProductionEntryCountOrderByAggregateInput
    _avg?: ProductionEntryAvgOrderByAggregateInput
    _max?: ProductionEntryMaxOrderByAggregateInput
    _min?: ProductionEntryMinOrderByAggregateInput
    _sum?: ProductionEntrySumOrderByAggregateInput
  }

  export type ProductionEntryScalarWhereWithAggregatesInput = {
    AND?: ProductionEntryScalarWhereWithAggregatesInput | ProductionEntryScalarWhereWithAggregatesInput[]
    OR?: ProductionEntryScalarWhereWithAggregatesInput[]
    NOT?: ProductionEntryScalarWhereWithAggregatesInput | ProductionEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductionEntry"> | number
    productId?: IntWithAggregatesFilter<"ProductionEntry"> | number
    quantity?: IntWithAggregatesFilter<"ProductionEntry"> | number
    notes?: StringNullableWithAggregatesFilter<"ProductionEntry"> | string | null
    createdBy?: IntNullableWithAggregatesFilter<"ProductionEntry"> | number | null
    date?: DateTimeWithAggregatesFilter<"ProductionEntry"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductionEntry"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionCreateInput = {
    name: string
    color?: string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutRegionsCreatedInput
    clients?: ClientCreateNestedManyWithoutRegionInput
    orders?: OrderCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateInput = {
    id?: number
    name: string
    color?: string
    createdBy: number
    createdAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutRegionInput
    orders?: OrderUncheckedCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutRegionsCreatedNestedInput
    clients?: ClientUpdateManyWithoutRegionNestedInput
    orders?: OrderUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutRegionNestedInput
    orders?: OrderUncheckedUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateManyInput = {
    id?: number
    name: string
    color?: string
    createdBy: number
    createdAt?: Date | string
  }

  export type RegionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    region?: RegionCreateNestedOneWithoutClientsInput
    creator: UserCreateNestedOneWithoutClientsCreatedInput
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    regionId?: number | null
    createdBy: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneWithoutClientsNestedInput
    creator?: UserUpdateOneRequiredWithoutClientsCreatedNestedInput
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    regionId?: number | null
    createdBy: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    preventista: UserCreateNestedOneWithoutOrdersCreatedInput
    distributor?: UserCreateNestedOneWithoutOrdersDeliveryInput
    region?: RegionCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    history?: OrderHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: number
    clientId: number
    preventistaId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    history?: OrderHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    preventista?: UserUpdateOneRequiredWithoutOrdersCreatedNestedInput
    distributor?: UserUpdateOneWithoutOrdersDeliveryNestedInput
    region?: RegionUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: number
    clientId: number
    preventistaId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
  }

  export type OrderItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemCreateManyInput = {
    id?: number
    orderId: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
  }

  export type OrderItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserRegionCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAssignedRegionsInput
    region: RegionCreateNestedOneWithoutAssignedUsersInput
  }

  export type UserRegionUncheckedCreateInput = {
    id?: number
    userId: number
    regionId: number
    createdAt?: Date | string
  }

  export type UserRegionUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssignedRegionsNestedInput
    region?: RegionUpdateOneRequiredWithoutAssignedUsersNestedInput
  }

  export type UserRegionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRegionCreateManyInput = {
    id?: number
    userId: number
    regionId: number
    createdAt?: Date | string
  }

  export type UserRegionUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRegionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderHistoryCreateInput = {
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutHistoryInput
    changer: UserCreateNestedOneWithoutHistoryActionsInput
  }

  export type OrderHistoryUncheckedCreateInput = {
    id?: number
    orderId: number
    changedBy: number
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderHistoryUpdateInput = {
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutHistoryNestedInput
    changer?: UserUpdateOneRequiredWithoutHistoryActionsNestedInput
  }

  export type OrderHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    changedBy?: IntFieldUpdateOperationsInput | number
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderHistoryCreateManyInput = {
    id?: number
    orderId: number
    changedBy: number
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderHistoryUpdateManyMutationInput = {
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    changedBy?: IntFieldUpdateOperationsInput | number
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionSessionCreateInput = {
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
    distributor: UserCreateNestedOneWithoutDistributionSessionsInput
    closedByAdmin?: UserCreateNestedOneWithoutSessionsClosedByMeInput
  }

  export type DistributionSessionUncheckedCreateInput = {
    id?: number
    distributorId: number
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    closedByAdminId?: number | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionUpdateInput = {
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
    distributor?: UserUpdateOneRequiredWithoutDistributionSessionsNestedInput
    closedByAdmin?: UserUpdateOneWithoutSessionsClosedByMeNestedInput
  }

  export type DistributionSessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    distributorId?: IntFieldUpdateOperationsInput | number
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionCreateManyInput = {
    id?: number
    distributorId: number
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    closedByAdminId?: number | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionUpdateManyMutationInput = {
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    distributorId?: IntFieldUpdateOperationsInput | number
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProductionEntryCreateInput = {
    quantity: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutProductionEntriesInput
    creator?: UserCreateNestedOneWithoutProductionEntriesInput
  }

  export type ProductionEntryUncheckedCreateInput = {
    id?: number
    productId: number
    quantity: number
    notes?: string | null
    createdBy?: number | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type ProductionEntryUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutProductionEntriesNestedInput
    creator?: UserUpdateOneWithoutProductionEntriesNestedInput
  }

  export type ProductionEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductionEntryCreateManyInput = {
    id?: number
    productId: number
    quantity: number
    notes?: string | null
    createdBy?: number | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type ProductionEntryUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductionEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderHistoryListRelationFilter = {
    every?: OrderHistoryWhereInput
    some?: OrderHistoryWhereInput
    none?: OrderHistoryWhereInput
  }

  export type RegionListRelationFilter = {
    every?: RegionWhereInput
    some?: RegionWhereInput
    none?: RegionWhereInput
  }

  export type UserRegionListRelationFilter = {
    every?: UserRegionWhereInput
    some?: UserRegionWhereInput
    none?: UserRegionWhereInput
  }

  export type DistributionSessionListRelationFilter = {
    every?: DistributionSessionWhereInput
    some?: DistributionSessionWhereInput
    none?: DistributionSessionWhereInput
  }

  export type ProductionEntryListRelationFilter = {
    every?: ProductionEntryWhereInput
    some?: ProductionEntryWhereInput
    none?: ProductionEntryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserRegionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DistributionSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductionEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type RegionNullableScalarRelationFilter = {
    is?: RegionWhereInput | null
    isNot?: RegionWhereInput | null
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrder
    regionId?: SortOrder
    createdBy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    regionId?: SortOrder
    createdBy?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrder
    regionId?: SortOrder
    createdBy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ownerName?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    photoUrl?: SortOrder
    regionId?: SortOrder
    createdBy?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    regionId?: SortOrder
    createdBy?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrder
    regionId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    deliveredAt?: SortOrder
    discount?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrder
    regionId?: SortOrder
    discount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrder
    regionId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    deliveredAt?: SortOrder
    discount?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrder
    regionId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    deliveredAt?: SortOrder
    discount?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    preventistaId?: SortOrder
    distributorId?: SortOrder
    regionId?: SortOrder
    discount?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrder
    isBonification?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrder
    isBonification?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrder
    isBonification?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    deliveredQuantity?: SortOrder
  }

  export type RegionScalarRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type UserRegionUserIdRegionIdCompoundUniqueInput = {
    userId: number
    regionId: number
  }

  export type UserRegionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRegionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
  }

  export type UserRegionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRegionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserRegionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    regionId?: SortOrder
  }

  export type EnumOrderActionFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderAction | EnumOrderActionFieldRefInput<$PrismaModel>
    in?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderActionFilter<$PrismaModel> | $Enums.OrderAction
  }

  export type EnumOrderStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrderStatusNullableFilter<$PrismaModel> | $Enums.OrderStatus | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OrderHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
    action?: SortOrder
    previousStatus?: SortOrder
    newStatus?: SortOrder
    snapshotData?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
  }

  export type OrderHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
    action?: SortOrder
    previousStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
    action?: SortOrder
    previousStatus?: SortOrder
    newStatus?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderHistorySumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    changedBy?: SortOrder
  }

  export type EnumOrderActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderAction | EnumOrderActionFieldRefInput<$PrismaModel>
    in?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderActionWithAggregatesFilter<$PrismaModel> | $Enums.OrderAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderActionFilter<$PrismaModel>
    _max?: NestedEnumOrderActionFilter<$PrismaModel>
  }

  export type EnumOrderStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrderStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DistributionSessionCountOrderByAggregateInput = {
    id?: SortOrder
    distributorId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    closedByAdminId?: SortOrder
    notes?: SortOrder
    snapshotData?: SortOrder
  }

  export type DistributionSessionAvgOrderByAggregateInput = {
    id?: SortOrder
    distributorId?: SortOrder
    closedByAdminId?: SortOrder
  }

  export type DistributionSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    distributorId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    closedByAdminId?: SortOrder
    notes?: SortOrder
  }

  export type DistributionSessionMinOrderByAggregateInput = {
    id?: SortOrder
    distributorId?: SortOrder
    status?: SortOrder
    openedAt?: SortOrder
    closedAt?: SortOrder
    closedByAdminId?: SortOrder
    notes?: SortOrder
  }

  export type DistributionSessionSumOrderByAggregateInput = {
    id?: SortOrder
    distributorId?: SortOrder
    closedByAdminId?: SortOrder
  }

  export type EnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ProductionEntryCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    notes?: SortOrder
    createdBy?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductionEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdBy?: SortOrder
  }

  export type ProductionEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    notes?: SortOrder
    createdBy?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductionEntryMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    notes?: SortOrder
    createdBy?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductionEntrySumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    createdBy?: SortOrder
  }

  export type ClientCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ClientCreateWithoutCreatorInput, ClientUncheckedCreateWithoutCreatorInput> | ClientCreateWithoutCreatorInput[] | ClientUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCreatorInput | ClientCreateOrConnectWithoutCreatorInput[]
    createMany?: ClientCreateManyCreatorInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutPreventistaInput = {
    create?: XOR<OrderCreateWithoutPreventistaInput, OrderUncheckedCreateWithoutPreventistaInput> | OrderCreateWithoutPreventistaInput[] | OrderUncheckedCreateWithoutPreventistaInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPreventistaInput | OrderCreateOrConnectWithoutPreventistaInput[]
    createMany?: OrderCreateManyPreventistaInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutDistributorInput = {
    create?: XOR<OrderCreateWithoutDistributorInput, OrderUncheckedCreateWithoutDistributorInput> | OrderCreateWithoutDistributorInput[] | OrderUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDistributorInput | OrderCreateOrConnectWithoutDistributorInput[]
    createMany?: OrderCreateManyDistributorInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderHistoryCreateNestedManyWithoutChangerInput = {
    create?: XOR<OrderHistoryCreateWithoutChangerInput, OrderHistoryUncheckedCreateWithoutChangerInput> | OrderHistoryCreateWithoutChangerInput[] | OrderHistoryUncheckedCreateWithoutChangerInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutChangerInput | OrderHistoryCreateOrConnectWithoutChangerInput[]
    createMany?: OrderHistoryCreateManyChangerInputEnvelope
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
  }

  export type RegionCreateNestedManyWithoutCreatorInput = {
    create?: XOR<RegionCreateWithoutCreatorInput, RegionUncheckedCreateWithoutCreatorInput> | RegionCreateWithoutCreatorInput[] | RegionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCreatorInput | RegionCreateOrConnectWithoutCreatorInput[]
    createMany?: RegionCreateManyCreatorInputEnvelope
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
  }

  export type UserRegionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRegionCreateWithoutUserInput, UserRegionUncheckedCreateWithoutUserInput> | UserRegionCreateWithoutUserInput[] | UserRegionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutUserInput | UserRegionCreateOrConnectWithoutUserInput[]
    createMany?: UserRegionCreateManyUserInputEnvelope
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
  }

  export type DistributionSessionCreateNestedManyWithoutDistributorInput = {
    create?: XOR<DistributionSessionCreateWithoutDistributorInput, DistributionSessionUncheckedCreateWithoutDistributorInput> | DistributionSessionCreateWithoutDistributorInput[] | DistributionSessionUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutDistributorInput | DistributionSessionCreateOrConnectWithoutDistributorInput[]
    createMany?: DistributionSessionCreateManyDistributorInputEnvelope
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
  }

  export type DistributionSessionCreateNestedManyWithoutClosedByAdminInput = {
    create?: XOR<DistributionSessionCreateWithoutClosedByAdminInput, DistributionSessionUncheckedCreateWithoutClosedByAdminInput> | DistributionSessionCreateWithoutClosedByAdminInput[] | DistributionSessionUncheckedCreateWithoutClosedByAdminInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutClosedByAdminInput | DistributionSessionCreateOrConnectWithoutClosedByAdminInput[]
    createMany?: DistributionSessionCreateManyClosedByAdminInputEnvelope
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
  }

  export type ProductionEntryCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ProductionEntryCreateWithoutCreatorInput, ProductionEntryUncheckedCreateWithoutCreatorInput> | ProductionEntryCreateWithoutCreatorInput[] | ProductionEntryUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutCreatorInput | ProductionEntryCreateOrConnectWithoutCreatorInput[]
    createMany?: ProductionEntryCreateManyCreatorInputEnvelope
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ClientCreateWithoutCreatorInput, ClientUncheckedCreateWithoutCreatorInput> | ClientCreateWithoutCreatorInput[] | ClientUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCreatorInput | ClientCreateOrConnectWithoutCreatorInput[]
    createMany?: ClientCreateManyCreatorInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutPreventistaInput = {
    create?: XOR<OrderCreateWithoutPreventistaInput, OrderUncheckedCreateWithoutPreventistaInput> | OrderCreateWithoutPreventistaInput[] | OrderUncheckedCreateWithoutPreventistaInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPreventistaInput | OrderCreateOrConnectWithoutPreventistaInput[]
    createMany?: OrderCreateManyPreventistaInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutDistributorInput = {
    create?: XOR<OrderCreateWithoutDistributorInput, OrderUncheckedCreateWithoutDistributorInput> | OrderCreateWithoutDistributorInput[] | OrderUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDistributorInput | OrderCreateOrConnectWithoutDistributorInput[]
    createMany?: OrderCreateManyDistributorInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderHistoryUncheckedCreateNestedManyWithoutChangerInput = {
    create?: XOR<OrderHistoryCreateWithoutChangerInput, OrderHistoryUncheckedCreateWithoutChangerInput> | OrderHistoryCreateWithoutChangerInput[] | OrderHistoryUncheckedCreateWithoutChangerInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutChangerInput | OrderHistoryCreateOrConnectWithoutChangerInput[]
    createMany?: OrderHistoryCreateManyChangerInputEnvelope
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
  }

  export type RegionUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<RegionCreateWithoutCreatorInput, RegionUncheckedCreateWithoutCreatorInput> | RegionCreateWithoutCreatorInput[] | RegionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCreatorInput | RegionCreateOrConnectWithoutCreatorInput[]
    createMany?: RegionCreateManyCreatorInputEnvelope
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
  }

  export type UserRegionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRegionCreateWithoutUserInput, UserRegionUncheckedCreateWithoutUserInput> | UserRegionCreateWithoutUserInput[] | UserRegionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutUserInput | UserRegionCreateOrConnectWithoutUserInput[]
    createMany?: UserRegionCreateManyUserInputEnvelope
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
  }

  export type DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput = {
    create?: XOR<DistributionSessionCreateWithoutDistributorInput, DistributionSessionUncheckedCreateWithoutDistributorInput> | DistributionSessionCreateWithoutDistributorInput[] | DistributionSessionUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutDistributorInput | DistributionSessionCreateOrConnectWithoutDistributorInput[]
    createMany?: DistributionSessionCreateManyDistributorInputEnvelope
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
  }

  export type DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput = {
    create?: XOR<DistributionSessionCreateWithoutClosedByAdminInput, DistributionSessionUncheckedCreateWithoutClosedByAdminInput> | DistributionSessionCreateWithoutClosedByAdminInput[] | DistributionSessionUncheckedCreateWithoutClosedByAdminInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutClosedByAdminInput | DistributionSessionCreateOrConnectWithoutClosedByAdminInput[]
    createMany?: DistributionSessionCreateManyClosedByAdminInputEnvelope
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
  }

  export type ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ProductionEntryCreateWithoutCreatorInput, ProductionEntryUncheckedCreateWithoutCreatorInput> | ProductionEntryCreateWithoutCreatorInput[] | ProductionEntryUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutCreatorInput | ProductionEntryCreateOrConnectWithoutCreatorInput[]
    createMany?: ProductionEntryCreateManyCreatorInputEnvelope
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClientUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ClientCreateWithoutCreatorInput, ClientUncheckedCreateWithoutCreatorInput> | ClientCreateWithoutCreatorInput[] | ClientUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCreatorInput | ClientCreateOrConnectWithoutCreatorInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutCreatorInput | ClientUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ClientCreateManyCreatorInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutCreatorInput | ClientUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutCreatorInput | ClientUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutPreventistaNestedInput = {
    create?: XOR<OrderCreateWithoutPreventistaInput, OrderUncheckedCreateWithoutPreventistaInput> | OrderCreateWithoutPreventistaInput[] | OrderUncheckedCreateWithoutPreventistaInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPreventistaInput | OrderCreateOrConnectWithoutPreventistaInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPreventistaInput | OrderUpsertWithWhereUniqueWithoutPreventistaInput[]
    createMany?: OrderCreateManyPreventistaInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPreventistaInput | OrderUpdateWithWhereUniqueWithoutPreventistaInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPreventistaInput | OrderUpdateManyWithWhereWithoutPreventistaInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutDistributorNestedInput = {
    create?: XOR<OrderCreateWithoutDistributorInput, OrderUncheckedCreateWithoutDistributorInput> | OrderCreateWithoutDistributorInput[] | OrderUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDistributorInput | OrderCreateOrConnectWithoutDistributorInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDistributorInput | OrderUpsertWithWhereUniqueWithoutDistributorInput[]
    createMany?: OrderCreateManyDistributorInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDistributorInput | OrderUpdateWithWhereUniqueWithoutDistributorInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDistributorInput | OrderUpdateManyWithWhereWithoutDistributorInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderHistoryUpdateManyWithoutChangerNestedInput = {
    create?: XOR<OrderHistoryCreateWithoutChangerInput, OrderHistoryUncheckedCreateWithoutChangerInput> | OrderHistoryCreateWithoutChangerInput[] | OrderHistoryUncheckedCreateWithoutChangerInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutChangerInput | OrderHistoryCreateOrConnectWithoutChangerInput[]
    upsert?: OrderHistoryUpsertWithWhereUniqueWithoutChangerInput | OrderHistoryUpsertWithWhereUniqueWithoutChangerInput[]
    createMany?: OrderHistoryCreateManyChangerInputEnvelope
    set?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    disconnect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    delete?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    update?: OrderHistoryUpdateWithWhereUniqueWithoutChangerInput | OrderHistoryUpdateWithWhereUniqueWithoutChangerInput[]
    updateMany?: OrderHistoryUpdateManyWithWhereWithoutChangerInput | OrderHistoryUpdateManyWithWhereWithoutChangerInput[]
    deleteMany?: OrderHistoryScalarWhereInput | OrderHistoryScalarWhereInput[]
  }

  export type RegionUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<RegionCreateWithoutCreatorInput, RegionUncheckedCreateWithoutCreatorInput> | RegionCreateWithoutCreatorInput[] | RegionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCreatorInput | RegionCreateOrConnectWithoutCreatorInput[]
    upsert?: RegionUpsertWithWhereUniqueWithoutCreatorInput | RegionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: RegionCreateManyCreatorInputEnvelope
    set?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    disconnect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    delete?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    update?: RegionUpdateWithWhereUniqueWithoutCreatorInput | RegionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: RegionUpdateManyWithWhereWithoutCreatorInput | RegionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: RegionScalarWhereInput | RegionScalarWhereInput[]
  }

  export type UserRegionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRegionCreateWithoutUserInput, UserRegionUncheckedCreateWithoutUserInput> | UserRegionCreateWithoutUserInput[] | UserRegionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutUserInput | UserRegionCreateOrConnectWithoutUserInput[]
    upsert?: UserRegionUpsertWithWhereUniqueWithoutUserInput | UserRegionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRegionCreateManyUserInputEnvelope
    set?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    disconnect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    delete?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    update?: UserRegionUpdateWithWhereUniqueWithoutUserInput | UserRegionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRegionUpdateManyWithWhereWithoutUserInput | UserRegionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRegionScalarWhereInput | UserRegionScalarWhereInput[]
  }

  export type DistributionSessionUpdateManyWithoutDistributorNestedInput = {
    create?: XOR<DistributionSessionCreateWithoutDistributorInput, DistributionSessionUncheckedCreateWithoutDistributorInput> | DistributionSessionCreateWithoutDistributorInput[] | DistributionSessionUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutDistributorInput | DistributionSessionCreateOrConnectWithoutDistributorInput[]
    upsert?: DistributionSessionUpsertWithWhereUniqueWithoutDistributorInput | DistributionSessionUpsertWithWhereUniqueWithoutDistributorInput[]
    createMany?: DistributionSessionCreateManyDistributorInputEnvelope
    set?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    disconnect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    delete?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    update?: DistributionSessionUpdateWithWhereUniqueWithoutDistributorInput | DistributionSessionUpdateWithWhereUniqueWithoutDistributorInput[]
    updateMany?: DistributionSessionUpdateManyWithWhereWithoutDistributorInput | DistributionSessionUpdateManyWithWhereWithoutDistributorInput[]
    deleteMany?: DistributionSessionScalarWhereInput | DistributionSessionScalarWhereInput[]
  }

  export type DistributionSessionUpdateManyWithoutClosedByAdminNestedInput = {
    create?: XOR<DistributionSessionCreateWithoutClosedByAdminInput, DistributionSessionUncheckedCreateWithoutClosedByAdminInput> | DistributionSessionCreateWithoutClosedByAdminInput[] | DistributionSessionUncheckedCreateWithoutClosedByAdminInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutClosedByAdminInput | DistributionSessionCreateOrConnectWithoutClosedByAdminInput[]
    upsert?: DistributionSessionUpsertWithWhereUniqueWithoutClosedByAdminInput | DistributionSessionUpsertWithWhereUniqueWithoutClosedByAdminInput[]
    createMany?: DistributionSessionCreateManyClosedByAdminInputEnvelope
    set?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    disconnect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    delete?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    update?: DistributionSessionUpdateWithWhereUniqueWithoutClosedByAdminInput | DistributionSessionUpdateWithWhereUniqueWithoutClosedByAdminInput[]
    updateMany?: DistributionSessionUpdateManyWithWhereWithoutClosedByAdminInput | DistributionSessionUpdateManyWithWhereWithoutClosedByAdminInput[]
    deleteMany?: DistributionSessionScalarWhereInput | DistributionSessionScalarWhereInput[]
  }

  export type ProductionEntryUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ProductionEntryCreateWithoutCreatorInput, ProductionEntryUncheckedCreateWithoutCreatorInput> | ProductionEntryCreateWithoutCreatorInput[] | ProductionEntryUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutCreatorInput | ProductionEntryCreateOrConnectWithoutCreatorInput[]
    upsert?: ProductionEntryUpsertWithWhereUniqueWithoutCreatorInput | ProductionEntryUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ProductionEntryCreateManyCreatorInputEnvelope
    set?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    disconnect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    delete?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    update?: ProductionEntryUpdateWithWhereUniqueWithoutCreatorInput | ProductionEntryUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ProductionEntryUpdateManyWithWhereWithoutCreatorInput | ProductionEntryUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ProductionEntryScalarWhereInput | ProductionEntryScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ClientUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ClientCreateWithoutCreatorInput, ClientUncheckedCreateWithoutCreatorInput> | ClientCreateWithoutCreatorInput[] | ClientUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutCreatorInput | ClientCreateOrConnectWithoutCreatorInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutCreatorInput | ClientUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ClientCreateManyCreatorInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutCreatorInput | ClientUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutCreatorInput | ClientUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutPreventistaNestedInput = {
    create?: XOR<OrderCreateWithoutPreventistaInput, OrderUncheckedCreateWithoutPreventistaInput> | OrderCreateWithoutPreventistaInput[] | OrderUncheckedCreateWithoutPreventistaInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutPreventistaInput | OrderCreateOrConnectWithoutPreventistaInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutPreventistaInput | OrderUpsertWithWhereUniqueWithoutPreventistaInput[]
    createMany?: OrderCreateManyPreventistaInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutPreventistaInput | OrderUpdateWithWhereUniqueWithoutPreventistaInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutPreventistaInput | OrderUpdateManyWithWhereWithoutPreventistaInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutDistributorNestedInput = {
    create?: XOR<OrderCreateWithoutDistributorInput, OrderUncheckedCreateWithoutDistributorInput> | OrderCreateWithoutDistributorInput[] | OrderUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutDistributorInput | OrderCreateOrConnectWithoutDistributorInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutDistributorInput | OrderUpsertWithWhereUniqueWithoutDistributorInput[]
    createMany?: OrderCreateManyDistributorInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutDistributorInput | OrderUpdateWithWhereUniqueWithoutDistributorInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutDistributorInput | OrderUpdateManyWithWhereWithoutDistributorInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput = {
    create?: XOR<OrderHistoryCreateWithoutChangerInput, OrderHistoryUncheckedCreateWithoutChangerInput> | OrderHistoryCreateWithoutChangerInput[] | OrderHistoryUncheckedCreateWithoutChangerInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutChangerInput | OrderHistoryCreateOrConnectWithoutChangerInput[]
    upsert?: OrderHistoryUpsertWithWhereUniqueWithoutChangerInput | OrderHistoryUpsertWithWhereUniqueWithoutChangerInput[]
    createMany?: OrderHistoryCreateManyChangerInputEnvelope
    set?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    disconnect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    delete?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    update?: OrderHistoryUpdateWithWhereUniqueWithoutChangerInput | OrderHistoryUpdateWithWhereUniqueWithoutChangerInput[]
    updateMany?: OrderHistoryUpdateManyWithWhereWithoutChangerInput | OrderHistoryUpdateManyWithWhereWithoutChangerInput[]
    deleteMany?: OrderHistoryScalarWhereInput | OrderHistoryScalarWhereInput[]
  }

  export type RegionUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<RegionCreateWithoutCreatorInput, RegionUncheckedCreateWithoutCreatorInput> | RegionCreateWithoutCreatorInput[] | RegionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCreatorInput | RegionCreateOrConnectWithoutCreatorInput[]
    upsert?: RegionUpsertWithWhereUniqueWithoutCreatorInput | RegionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: RegionCreateManyCreatorInputEnvelope
    set?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    disconnect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    delete?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    update?: RegionUpdateWithWhereUniqueWithoutCreatorInput | RegionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: RegionUpdateManyWithWhereWithoutCreatorInput | RegionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: RegionScalarWhereInput | RegionScalarWhereInput[]
  }

  export type UserRegionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRegionCreateWithoutUserInput, UserRegionUncheckedCreateWithoutUserInput> | UserRegionCreateWithoutUserInput[] | UserRegionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutUserInput | UserRegionCreateOrConnectWithoutUserInput[]
    upsert?: UserRegionUpsertWithWhereUniqueWithoutUserInput | UserRegionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRegionCreateManyUserInputEnvelope
    set?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    disconnect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    delete?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    update?: UserRegionUpdateWithWhereUniqueWithoutUserInput | UserRegionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRegionUpdateManyWithWhereWithoutUserInput | UserRegionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRegionScalarWhereInput | UserRegionScalarWhereInput[]
  }

  export type DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput = {
    create?: XOR<DistributionSessionCreateWithoutDistributorInput, DistributionSessionUncheckedCreateWithoutDistributorInput> | DistributionSessionCreateWithoutDistributorInput[] | DistributionSessionUncheckedCreateWithoutDistributorInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutDistributorInput | DistributionSessionCreateOrConnectWithoutDistributorInput[]
    upsert?: DistributionSessionUpsertWithWhereUniqueWithoutDistributorInput | DistributionSessionUpsertWithWhereUniqueWithoutDistributorInput[]
    createMany?: DistributionSessionCreateManyDistributorInputEnvelope
    set?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    disconnect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    delete?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    update?: DistributionSessionUpdateWithWhereUniqueWithoutDistributorInput | DistributionSessionUpdateWithWhereUniqueWithoutDistributorInput[]
    updateMany?: DistributionSessionUpdateManyWithWhereWithoutDistributorInput | DistributionSessionUpdateManyWithWhereWithoutDistributorInput[]
    deleteMany?: DistributionSessionScalarWhereInput | DistributionSessionScalarWhereInput[]
  }

  export type DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput = {
    create?: XOR<DistributionSessionCreateWithoutClosedByAdminInput, DistributionSessionUncheckedCreateWithoutClosedByAdminInput> | DistributionSessionCreateWithoutClosedByAdminInput[] | DistributionSessionUncheckedCreateWithoutClosedByAdminInput[]
    connectOrCreate?: DistributionSessionCreateOrConnectWithoutClosedByAdminInput | DistributionSessionCreateOrConnectWithoutClosedByAdminInput[]
    upsert?: DistributionSessionUpsertWithWhereUniqueWithoutClosedByAdminInput | DistributionSessionUpsertWithWhereUniqueWithoutClosedByAdminInput[]
    createMany?: DistributionSessionCreateManyClosedByAdminInputEnvelope
    set?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    disconnect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    delete?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    connect?: DistributionSessionWhereUniqueInput | DistributionSessionWhereUniqueInput[]
    update?: DistributionSessionUpdateWithWhereUniqueWithoutClosedByAdminInput | DistributionSessionUpdateWithWhereUniqueWithoutClosedByAdminInput[]
    updateMany?: DistributionSessionUpdateManyWithWhereWithoutClosedByAdminInput | DistributionSessionUpdateManyWithWhereWithoutClosedByAdminInput[]
    deleteMany?: DistributionSessionScalarWhereInput | DistributionSessionScalarWhereInput[]
  }

  export type ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ProductionEntryCreateWithoutCreatorInput, ProductionEntryUncheckedCreateWithoutCreatorInput> | ProductionEntryCreateWithoutCreatorInput[] | ProductionEntryUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutCreatorInput | ProductionEntryCreateOrConnectWithoutCreatorInput[]
    upsert?: ProductionEntryUpsertWithWhereUniqueWithoutCreatorInput | ProductionEntryUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ProductionEntryCreateManyCreatorInputEnvelope
    set?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    disconnect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    delete?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    update?: ProductionEntryUpdateWithWhereUniqueWithoutCreatorInput | ProductionEntryUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ProductionEntryUpdateManyWithWhereWithoutCreatorInput | ProductionEntryUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ProductionEntryScalarWhereInput | ProductionEntryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRegionsCreatedInput = {
    create?: XOR<UserCreateWithoutRegionsCreatedInput, UserUncheckedCreateWithoutRegionsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutRegionsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedManyWithoutRegionInput = {
    create?: XOR<ClientCreateWithoutRegionInput, ClientUncheckedCreateWithoutRegionInput> | ClientCreateWithoutRegionInput[] | ClientUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutRegionInput | ClientCreateOrConnectWithoutRegionInput[]
    createMany?: ClientCreateManyRegionInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutRegionInput = {
    create?: XOR<OrderCreateWithoutRegionInput, OrderUncheckedCreateWithoutRegionInput> | OrderCreateWithoutRegionInput[] | OrderUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRegionInput | OrderCreateOrConnectWithoutRegionInput[]
    createMany?: OrderCreateManyRegionInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type UserRegionCreateNestedManyWithoutRegionInput = {
    create?: XOR<UserRegionCreateWithoutRegionInput, UserRegionUncheckedCreateWithoutRegionInput> | UserRegionCreateWithoutRegionInput[] | UserRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutRegionInput | UserRegionCreateOrConnectWithoutRegionInput[]
    createMany?: UserRegionCreateManyRegionInputEnvelope
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<ClientCreateWithoutRegionInput, ClientUncheckedCreateWithoutRegionInput> | ClientCreateWithoutRegionInput[] | ClientUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutRegionInput | ClientCreateOrConnectWithoutRegionInput[]
    createMany?: ClientCreateManyRegionInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<OrderCreateWithoutRegionInput, OrderUncheckedCreateWithoutRegionInput> | OrderCreateWithoutRegionInput[] | OrderUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRegionInput | OrderCreateOrConnectWithoutRegionInput[]
    createMany?: OrderCreateManyRegionInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type UserRegionUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<UserRegionCreateWithoutRegionInput, UserRegionUncheckedCreateWithoutRegionInput> | UserRegionCreateWithoutRegionInput[] | UserRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutRegionInput | UserRegionCreateOrConnectWithoutRegionInput[]
    createMany?: UserRegionCreateManyRegionInputEnvelope
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutRegionsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutRegionsCreatedInput, UserUncheckedCreateWithoutRegionsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutRegionsCreatedInput
    upsert?: UserUpsertWithoutRegionsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRegionsCreatedInput, UserUpdateWithoutRegionsCreatedInput>, UserUncheckedUpdateWithoutRegionsCreatedInput>
  }

  export type ClientUpdateManyWithoutRegionNestedInput = {
    create?: XOR<ClientCreateWithoutRegionInput, ClientUncheckedCreateWithoutRegionInput> | ClientCreateWithoutRegionInput[] | ClientUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutRegionInput | ClientCreateOrConnectWithoutRegionInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutRegionInput | ClientUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: ClientCreateManyRegionInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutRegionInput | ClientUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutRegionInput | ClientUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutRegionNestedInput = {
    create?: XOR<OrderCreateWithoutRegionInput, OrderUncheckedCreateWithoutRegionInput> | OrderCreateWithoutRegionInput[] | OrderUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRegionInput | OrderCreateOrConnectWithoutRegionInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutRegionInput | OrderUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: OrderCreateManyRegionInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutRegionInput | OrderUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutRegionInput | OrderUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserRegionUpdateManyWithoutRegionNestedInput = {
    create?: XOR<UserRegionCreateWithoutRegionInput, UserRegionUncheckedCreateWithoutRegionInput> | UserRegionCreateWithoutRegionInput[] | UserRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutRegionInput | UserRegionCreateOrConnectWithoutRegionInput[]
    upsert?: UserRegionUpsertWithWhereUniqueWithoutRegionInput | UserRegionUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: UserRegionCreateManyRegionInputEnvelope
    set?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    disconnect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    delete?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    update?: UserRegionUpdateWithWhereUniqueWithoutRegionInput | UserRegionUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: UserRegionUpdateManyWithWhereWithoutRegionInput | UserRegionUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: UserRegionScalarWhereInput | UserRegionScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<ClientCreateWithoutRegionInput, ClientUncheckedCreateWithoutRegionInput> | ClientCreateWithoutRegionInput[] | ClientUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutRegionInput | ClientCreateOrConnectWithoutRegionInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutRegionInput | ClientUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: ClientCreateManyRegionInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutRegionInput | ClientUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutRegionInput | ClientUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<OrderCreateWithoutRegionInput, OrderUncheckedCreateWithoutRegionInput> | OrderCreateWithoutRegionInput[] | OrderUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutRegionInput | OrderCreateOrConnectWithoutRegionInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutRegionInput | OrderUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: OrderCreateManyRegionInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutRegionInput | OrderUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutRegionInput | OrderUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserRegionUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<UserRegionCreateWithoutRegionInput, UserRegionUncheckedCreateWithoutRegionInput> | UserRegionCreateWithoutRegionInput[] | UserRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: UserRegionCreateOrConnectWithoutRegionInput | UserRegionCreateOrConnectWithoutRegionInput[]
    upsert?: UserRegionUpsertWithWhereUniqueWithoutRegionInput | UserRegionUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: UserRegionCreateManyRegionInputEnvelope
    set?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    disconnect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    delete?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    connect?: UserRegionWhereUniqueInput | UserRegionWhereUniqueInput[]
    update?: UserRegionUpdateWithWhereUniqueWithoutRegionInput | UserRegionUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: UserRegionUpdateManyWithWhereWithoutRegionInput | UserRegionUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: UserRegionScalarWhereInput | UserRegionScalarWhereInput[]
  }

  export type RegionCreateNestedOneWithoutClientsInput = {
    create?: XOR<RegionCreateWithoutClientsInput, RegionUncheckedCreateWithoutClientsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutClientsInput
    connect?: RegionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClientsCreatedInput = {
    create?: XOR<UserCreateWithoutClientsCreatedInput, UserUncheckedCreateWithoutClientsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutClientInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RegionUpdateOneWithoutClientsNestedInput = {
    create?: XOR<RegionCreateWithoutClientsInput, RegionUncheckedCreateWithoutClientsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutClientsInput
    upsert?: RegionUpsertWithoutClientsInput
    disconnect?: RegionWhereInput | boolean
    delete?: RegionWhereInput | boolean
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutClientsInput, RegionUpdateWithoutClientsInput>, RegionUncheckedUpdateWithoutClientsInput>
  }

  export type UserUpdateOneRequiredWithoutClientsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutClientsCreatedInput, UserUncheckedCreateWithoutClientsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientsCreatedInput
    upsert?: UserUpsertWithoutClientsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientsCreatedInput, UserUpdateWithoutClientsCreatedInput>, UserUncheckedUpdateWithoutClientsCreatedInput>
  }

  export type OrderUpdateManyWithoutClientNestedInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClientInput | OrderUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClientInput | OrderUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClientInput | OrderUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClientInput | OrderUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClientInput | OrderUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClientInput | OrderUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductionEntryCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductionEntryCreateWithoutProductInput, ProductionEntryUncheckedCreateWithoutProductInput> | ProductionEntryCreateWithoutProductInput[] | ProductionEntryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutProductInput | ProductionEntryCreateOrConnectWithoutProductInput[]
    createMany?: ProductionEntryCreateManyProductInputEnvelope
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductionEntryUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductionEntryCreateWithoutProductInput, ProductionEntryUncheckedCreateWithoutProductInput> | ProductionEntryCreateWithoutProductInput[] | ProductionEntryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutProductInput | ProductionEntryCreateOrConnectWithoutProductInput[]
    createMany?: ProductionEntryCreateManyProductInputEnvelope
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductionEntryUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductionEntryCreateWithoutProductInput, ProductionEntryUncheckedCreateWithoutProductInput> | ProductionEntryCreateWithoutProductInput[] | ProductionEntryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutProductInput | ProductionEntryCreateOrConnectWithoutProductInput[]
    upsert?: ProductionEntryUpsertWithWhereUniqueWithoutProductInput | ProductionEntryUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductionEntryCreateManyProductInputEnvelope
    set?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    disconnect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    delete?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    update?: ProductionEntryUpdateWithWhereUniqueWithoutProductInput | ProductionEntryUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductionEntryUpdateManyWithWhereWithoutProductInput | ProductionEntryUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductionEntryScalarWhereInput | ProductionEntryScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductionEntryUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductionEntryCreateWithoutProductInput, ProductionEntryUncheckedCreateWithoutProductInput> | ProductionEntryCreateWithoutProductInput[] | ProductionEntryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductionEntryCreateOrConnectWithoutProductInput | ProductionEntryCreateOrConnectWithoutProductInput[]
    upsert?: ProductionEntryUpsertWithWhereUniqueWithoutProductInput | ProductionEntryUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductionEntryCreateManyProductInputEnvelope
    set?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    disconnect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    delete?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    connect?: ProductionEntryWhereUniqueInput | ProductionEntryWhereUniqueInput[]
    update?: ProductionEntryUpdateWithWhereUniqueWithoutProductInput | ProductionEntryUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductionEntryUpdateManyWithWhereWithoutProductInput | ProductionEntryUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductionEntryScalarWhereInput | ProductionEntryScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ClientCreateOrConnectWithoutOrdersInput
    connect?: ClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOrdersCreatedInput = {
    create?: XOR<UserCreateWithoutOrdersCreatedInput, UserUncheckedCreateWithoutOrdersCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOrdersDeliveryInput = {
    create?: XOR<UserCreateWithoutOrdersDeliveryInput, UserUncheckedCreateWithoutOrdersDeliveryInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersDeliveryInput
    connect?: UserWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutOrdersInput = {
    create?: XOR<RegionCreateWithoutOrdersInput, RegionUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RegionCreateOrConnectWithoutOrdersInput
    connect?: RegionWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderHistoryCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderHistoryCreateWithoutOrderInput, OrderHistoryUncheckedCreateWithoutOrderInput> | OrderHistoryCreateWithoutOrderInput[] | OrderHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutOrderInput | OrderHistoryCreateOrConnectWithoutOrderInput[]
    createMany?: OrderHistoryCreateManyOrderInputEnvelope
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderHistoryUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderHistoryCreateWithoutOrderInput, OrderHistoryUncheckedCreateWithoutOrderInput> | OrderHistoryCreateWithoutOrderInput[] | OrderHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutOrderInput | OrderHistoryCreateOrConnectWithoutOrderInput[]
    createMany?: OrderHistoryCreateManyOrderInputEnvelope
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ClientUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ClientCreateOrConnectWithoutOrdersInput
    upsert?: ClientUpsertWithoutOrdersInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutOrdersInput, ClientUpdateWithoutOrdersInput>, ClientUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateOneRequiredWithoutOrdersCreatedNestedInput = {
    create?: XOR<UserCreateWithoutOrdersCreatedInput, UserUncheckedCreateWithoutOrdersCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersCreatedInput
    upsert?: UserUpsertWithoutOrdersCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersCreatedInput, UserUpdateWithoutOrdersCreatedInput>, UserUncheckedUpdateWithoutOrdersCreatedInput>
  }

  export type UserUpdateOneWithoutOrdersDeliveryNestedInput = {
    create?: XOR<UserCreateWithoutOrdersDeliveryInput, UserUncheckedCreateWithoutOrdersDeliveryInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersDeliveryInput
    upsert?: UserUpsertWithoutOrdersDeliveryInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersDeliveryInput, UserUpdateWithoutOrdersDeliveryInput>, UserUncheckedUpdateWithoutOrdersDeliveryInput>
  }

  export type RegionUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<RegionCreateWithoutOrdersInput, RegionUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: RegionCreateOrConnectWithoutOrdersInput
    upsert?: RegionUpsertWithoutOrdersInput
    disconnect?: RegionWhereInput | boolean
    delete?: RegionWhereInput | boolean
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutOrdersInput, RegionUpdateWithoutOrdersInput>, RegionUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderHistoryUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderHistoryCreateWithoutOrderInput, OrderHistoryUncheckedCreateWithoutOrderInput> | OrderHistoryCreateWithoutOrderInput[] | OrderHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutOrderInput | OrderHistoryCreateOrConnectWithoutOrderInput[]
    upsert?: OrderHistoryUpsertWithWhereUniqueWithoutOrderInput | OrderHistoryUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderHistoryCreateManyOrderInputEnvelope
    set?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    disconnect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    delete?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    update?: OrderHistoryUpdateWithWhereUniqueWithoutOrderInput | OrderHistoryUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderHistoryUpdateManyWithWhereWithoutOrderInput | OrderHistoryUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderHistoryScalarWhereInput | OrderHistoryScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderHistoryCreateWithoutOrderInput, OrderHistoryUncheckedCreateWithoutOrderInput> | OrderHistoryCreateWithoutOrderInput[] | OrderHistoryUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderHistoryCreateOrConnectWithoutOrderInput | OrderHistoryCreateOrConnectWithoutOrderInput[]
    upsert?: OrderHistoryUpsertWithWhereUniqueWithoutOrderInput | OrderHistoryUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderHistoryCreateManyOrderInputEnvelope
    set?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    disconnect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    delete?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    connect?: OrderHistoryWhereUniqueInput | OrderHistoryWhereUniqueInput[]
    update?: OrderHistoryUpdateWithWhereUniqueWithoutOrderInput | OrderHistoryUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderHistoryUpdateManyWithWhereWithoutOrderInput | OrderHistoryUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderHistoryScalarWhereInput | OrderHistoryScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type UserCreateNestedOneWithoutAssignedRegionsInput = {
    create?: XOR<UserCreateWithoutAssignedRegionsInput, UserUncheckedCreateWithoutAssignedRegionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedRegionsInput
    connect?: UserWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutAssignedUsersInput = {
    create?: XOR<RegionCreateWithoutAssignedUsersInput, RegionUncheckedCreateWithoutAssignedUsersInput>
    connectOrCreate?: RegionCreateOrConnectWithoutAssignedUsersInput
    connect?: RegionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAssignedRegionsNestedInput = {
    create?: XOR<UserCreateWithoutAssignedRegionsInput, UserUncheckedCreateWithoutAssignedRegionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssignedRegionsInput
    upsert?: UserUpsertWithoutAssignedRegionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssignedRegionsInput, UserUpdateWithoutAssignedRegionsInput>, UserUncheckedUpdateWithoutAssignedRegionsInput>
  }

  export type RegionUpdateOneRequiredWithoutAssignedUsersNestedInput = {
    create?: XOR<RegionCreateWithoutAssignedUsersInput, RegionUncheckedCreateWithoutAssignedUsersInput>
    connectOrCreate?: RegionCreateOrConnectWithoutAssignedUsersInput
    upsert?: RegionUpsertWithoutAssignedUsersInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutAssignedUsersInput, RegionUpdateWithoutAssignedUsersInput>, RegionUncheckedUpdateWithoutAssignedUsersInput>
  }

  export type OrderCreateNestedOneWithoutHistoryInput = {
    create?: XOR<OrderCreateWithoutHistoryInput, OrderUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutHistoryInput
    connect?: OrderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutHistoryActionsInput = {
    create?: XOR<UserCreateWithoutHistoryActionsInput, UserUncheckedCreateWithoutHistoryActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHistoryActionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumOrderActionFieldUpdateOperationsInput = {
    set?: $Enums.OrderAction
  }

  export type NullableEnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus | null
  }

  export type OrderUpdateOneRequiredWithoutHistoryNestedInput = {
    create?: XOR<OrderCreateWithoutHistoryInput, OrderUncheckedCreateWithoutHistoryInput>
    connectOrCreate?: OrderCreateOrConnectWithoutHistoryInput
    upsert?: OrderUpsertWithoutHistoryInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutHistoryInput, OrderUpdateWithoutHistoryInput>, OrderUncheckedUpdateWithoutHistoryInput>
  }

  export type UserUpdateOneRequiredWithoutHistoryActionsNestedInput = {
    create?: XOR<UserCreateWithoutHistoryActionsInput, UserUncheckedCreateWithoutHistoryActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHistoryActionsInput
    upsert?: UserUpsertWithoutHistoryActionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHistoryActionsInput, UserUpdateWithoutHistoryActionsInput>, UserUncheckedUpdateWithoutHistoryActionsInput>
  }

  export type UserCreateNestedOneWithoutDistributionSessionsInput = {
    create?: XOR<UserCreateWithoutDistributionSessionsInput, UserUncheckedCreateWithoutDistributionSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDistributionSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionsClosedByMeInput = {
    create?: XOR<UserCreateWithoutSessionsClosedByMeInput, UserUncheckedCreateWithoutSessionsClosedByMeInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsClosedByMeInput
    connect?: UserWhereUniqueInput
  }

  export type EnumSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionStatus
  }

  export type UserUpdateOneRequiredWithoutDistributionSessionsNestedInput = {
    create?: XOR<UserCreateWithoutDistributionSessionsInput, UserUncheckedCreateWithoutDistributionSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDistributionSessionsInput
    upsert?: UserUpsertWithoutDistributionSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDistributionSessionsInput, UserUpdateWithoutDistributionSessionsInput>, UserUncheckedUpdateWithoutDistributionSessionsInput>
  }

  export type UserUpdateOneWithoutSessionsClosedByMeNestedInput = {
    create?: XOR<UserCreateWithoutSessionsClosedByMeInput, UserUncheckedCreateWithoutSessionsClosedByMeInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsClosedByMeInput
    upsert?: UserUpsertWithoutSessionsClosedByMeInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsClosedByMeInput, UserUpdateWithoutSessionsClosedByMeInput>, UserUncheckedUpdateWithoutSessionsClosedByMeInput>
  }

  export type ProductCreateNestedOneWithoutProductionEntriesInput = {
    create?: XOR<ProductCreateWithoutProductionEntriesInput, ProductUncheckedCreateWithoutProductionEntriesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutProductionEntriesInput
    connect?: ProductWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProductionEntriesInput = {
    create?: XOR<UserCreateWithoutProductionEntriesInput, UserUncheckedCreateWithoutProductionEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductionEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutProductionEntriesNestedInput = {
    create?: XOR<ProductCreateWithoutProductionEntriesInput, ProductUncheckedCreateWithoutProductionEntriesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutProductionEntriesInput
    upsert?: ProductUpsertWithoutProductionEntriesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutProductionEntriesInput, ProductUpdateWithoutProductionEntriesInput>, ProductUncheckedUpdateWithoutProductionEntriesInput>
  }

  export type UserUpdateOneWithoutProductionEntriesNestedInput = {
    create?: XOR<UserCreateWithoutProductionEntriesInput, UserUncheckedCreateWithoutProductionEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductionEntriesInput
    upsert?: UserUpsertWithoutProductionEntriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProductionEntriesInput, UserUpdateWithoutProductionEntriesInput>, UserUncheckedUpdateWithoutProductionEntriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumOrderActionFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderAction | EnumOrderActionFieldRefInput<$PrismaModel>
    in?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderActionFilter<$PrismaModel> | $Enums.OrderAction
  }

  export type NestedEnumOrderStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrderStatusNullableFilter<$PrismaModel> | $Enums.OrderStatus | null
  }

  export type NestedEnumOrderActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderAction | EnumOrderActionFieldRefInput<$PrismaModel>
    in?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderAction[] | ListEnumOrderActionFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderActionWithAggregatesFilter<$PrismaModel> | $Enums.OrderAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderActionFilter<$PrismaModel>
    _max?: NestedEnumOrderActionFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumOrderStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ClientCreateWithoutCreatorInput = {
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    region?: RegionCreateNestedOneWithoutClientsInput
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutCreatorInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    regionId?: number | null
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutCreatorInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutCreatorInput, ClientUncheckedCreateWithoutCreatorInput>
  }

  export type ClientCreateManyCreatorInputEnvelope = {
    data: ClientCreateManyCreatorInput | ClientCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutPreventistaInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    distributor?: UserCreateNestedOneWithoutOrdersDeliveryInput
    region?: RegionCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    history?: OrderHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPreventistaInput = {
    id?: number
    clientId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    history?: OrderHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPreventistaInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPreventistaInput, OrderUncheckedCreateWithoutPreventistaInput>
  }

  export type OrderCreateManyPreventistaInputEnvelope = {
    data: OrderCreateManyPreventistaInput | OrderCreateManyPreventistaInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutDistributorInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    preventista: UserCreateNestedOneWithoutOrdersCreatedInput
    region?: RegionCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    history?: OrderHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutDistributorInput = {
    id?: number
    clientId: number
    preventistaId: number
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    history?: OrderHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutDistributorInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutDistributorInput, OrderUncheckedCreateWithoutDistributorInput>
  }

  export type OrderCreateManyDistributorInputEnvelope = {
    data: OrderCreateManyDistributorInput | OrderCreateManyDistributorInput[]
    skipDuplicates?: boolean
  }

  export type OrderHistoryCreateWithoutChangerInput = {
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutHistoryInput
  }

  export type OrderHistoryUncheckedCreateWithoutChangerInput = {
    id?: number
    orderId: number
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderHistoryCreateOrConnectWithoutChangerInput = {
    where: OrderHistoryWhereUniqueInput
    create: XOR<OrderHistoryCreateWithoutChangerInput, OrderHistoryUncheckedCreateWithoutChangerInput>
  }

  export type OrderHistoryCreateManyChangerInputEnvelope = {
    data: OrderHistoryCreateManyChangerInput | OrderHistoryCreateManyChangerInput[]
    skipDuplicates?: boolean
  }

  export type RegionCreateWithoutCreatorInput = {
    name: string
    color?: string
    createdAt?: Date | string
    clients?: ClientCreateNestedManyWithoutRegionInput
    orders?: OrderCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutCreatorInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutRegionInput
    orders?: OrderUncheckedCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutCreatorInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCreatorInput, RegionUncheckedCreateWithoutCreatorInput>
  }

  export type RegionCreateManyCreatorInputEnvelope = {
    data: RegionCreateManyCreatorInput | RegionCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type UserRegionCreateWithoutUserInput = {
    createdAt?: Date | string
    region: RegionCreateNestedOneWithoutAssignedUsersInput
  }

  export type UserRegionUncheckedCreateWithoutUserInput = {
    id?: number
    regionId: number
    createdAt?: Date | string
  }

  export type UserRegionCreateOrConnectWithoutUserInput = {
    where: UserRegionWhereUniqueInput
    create: XOR<UserRegionCreateWithoutUserInput, UserRegionUncheckedCreateWithoutUserInput>
  }

  export type UserRegionCreateManyUserInputEnvelope = {
    data: UserRegionCreateManyUserInput | UserRegionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DistributionSessionCreateWithoutDistributorInput = {
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
    closedByAdmin?: UserCreateNestedOneWithoutSessionsClosedByMeInput
  }

  export type DistributionSessionUncheckedCreateWithoutDistributorInput = {
    id?: number
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    closedByAdminId?: number | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionCreateOrConnectWithoutDistributorInput = {
    where: DistributionSessionWhereUniqueInput
    create: XOR<DistributionSessionCreateWithoutDistributorInput, DistributionSessionUncheckedCreateWithoutDistributorInput>
  }

  export type DistributionSessionCreateManyDistributorInputEnvelope = {
    data: DistributionSessionCreateManyDistributorInput | DistributionSessionCreateManyDistributorInput[]
    skipDuplicates?: boolean
  }

  export type DistributionSessionCreateWithoutClosedByAdminInput = {
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
    distributor: UserCreateNestedOneWithoutDistributionSessionsInput
  }

  export type DistributionSessionUncheckedCreateWithoutClosedByAdminInput = {
    id?: number
    distributorId: number
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionCreateOrConnectWithoutClosedByAdminInput = {
    where: DistributionSessionWhereUniqueInput
    create: XOR<DistributionSessionCreateWithoutClosedByAdminInput, DistributionSessionUncheckedCreateWithoutClosedByAdminInput>
  }

  export type DistributionSessionCreateManyClosedByAdminInputEnvelope = {
    data: DistributionSessionCreateManyClosedByAdminInput | DistributionSessionCreateManyClosedByAdminInput[]
    skipDuplicates?: boolean
  }

  export type ProductionEntryCreateWithoutCreatorInput = {
    quantity: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutProductionEntriesInput
  }

  export type ProductionEntryUncheckedCreateWithoutCreatorInput = {
    id?: number
    productId: number
    quantity: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type ProductionEntryCreateOrConnectWithoutCreatorInput = {
    where: ProductionEntryWhereUniqueInput
    create: XOR<ProductionEntryCreateWithoutCreatorInput, ProductionEntryUncheckedCreateWithoutCreatorInput>
  }

  export type ProductionEntryCreateManyCreatorInputEnvelope = {
    data: ProductionEntryCreateManyCreatorInput | ProductionEntryCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutCreatorInput, ClientUncheckedUpdateWithoutCreatorInput>
    create: XOR<ClientCreateWithoutCreatorInput, ClientUncheckedCreateWithoutCreatorInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutCreatorInput, ClientUncheckedUpdateWithoutCreatorInput>
  }

  export type ClientUpdateManyWithWhereWithoutCreatorInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: IntFilter<"Client"> | number
    name?: StringFilter<"Client"> | string
    ownerName?: StringFilter<"Client"> | string
    phone?: StringFilter<"Client"> | string
    address?: StringFilter<"Client"> | string
    latitude?: FloatFilter<"Client"> | number
    longitude?: FloatFilter<"Client"> | number
    photoUrl?: StringNullableFilter<"Client"> | string | null
    regionId?: IntNullableFilter<"Client"> | number | null
    createdBy?: IntFilter<"Client"> | number
    isActive?: BoolFilter<"Client"> | boolean
    createdAt?: DateTimeFilter<"Client"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutPreventistaInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutPreventistaInput, OrderUncheckedUpdateWithoutPreventistaInput>
    create: XOR<OrderCreateWithoutPreventistaInput, OrderUncheckedCreateWithoutPreventistaInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutPreventistaInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutPreventistaInput, OrderUncheckedUpdateWithoutPreventistaInput>
  }

  export type OrderUpdateManyWithWhereWithoutPreventistaInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutPreventistaInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: IntFilter<"Order"> | number
    clientId?: IntFilter<"Order"> | number
    preventistaId?: IntFilter<"Order"> | number
    distributorId?: IntNullableFilter<"Order"> | number | null
    regionId?: IntNullableFilter<"Order"> | number | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    notes?: StringNullableFilter<"Order"> | string | null
    deliveredAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    discount?: FloatFilter<"Order"> | number
    createdAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutDistributorInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutDistributorInput, OrderUncheckedUpdateWithoutDistributorInput>
    create: XOR<OrderCreateWithoutDistributorInput, OrderUncheckedCreateWithoutDistributorInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutDistributorInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutDistributorInput, OrderUncheckedUpdateWithoutDistributorInput>
  }

  export type OrderUpdateManyWithWhereWithoutDistributorInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutDistributorInput>
  }

  export type OrderHistoryUpsertWithWhereUniqueWithoutChangerInput = {
    where: OrderHistoryWhereUniqueInput
    update: XOR<OrderHistoryUpdateWithoutChangerInput, OrderHistoryUncheckedUpdateWithoutChangerInput>
    create: XOR<OrderHistoryCreateWithoutChangerInput, OrderHistoryUncheckedCreateWithoutChangerInput>
  }

  export type OrderHistoryUpdateWithWhereUniqueWithoutChangerInput = {
    where: OrderHistoryWhereUniqueInput
    data: XOR<OrderHistoryUpdateWithoutChangerInput, OrderHistoryUncheckedUpdateWithoutChangerInput>
  }

  export type OrderHistoryUpdateManyWithWhereWithoutChangerInput = {
    where: OrderHistoryScalarWhereInput
    data: XOR<OrderHistoryUpdateManyMutationInput, OrderHistoryUncheckedUpdateManyWithoutChangerInput>
  }

  export type OrderHistoryScalarWhereInput = {
    AND?: OrderHistoryScalarWhereInput | OrderHistoryScalarWhereInput[]
    OR?: OrderHistoryScalarWhereInput[]
    NOT?: OrderHistoryScalarWhereInput | OrderHistoryScalarWhereInput[]
    id?: IntFilter<"OrderHistory"> | number
    orderId?: IntFilter<"OrderHistory"> | number
    changedBy?: IntFilter<"OrderHistory"> | number
    action?: EnumOrderActionFilter<"OrderHistory"> | $Enums.OrderAction
    previousStatus?: EnumOrderStatusNullableFilter<"OrderHistory"> | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFilter<"OrderHistory"> | $Enums.OrderStatus
    snapshotData?: JsonFilter<"OrderHistory">
    createdAt?: DateTimeFilter<"OrderHistory"> | Date | string
  }

  export type RegionUpsertWithWhereUniqueWithoutCreatorInput = {
    where: RegionWhereUniqueInput
    update: XOR<RegionUpdateWithoutCreatorInput, RegionUncheckedUpdateWithoutCreatorInput>
    create: XOR<RegionCreateWithoutCreatorInput, RegionUncheckedCreateWithoutCreatorInput>
  }

  export type RegionUpdateWithWhereUniqueWithoutCreatorInput = {
    where: RegionWhereUniqueInput
    data: XOR<RegionUpdateWithoutCreatorInput, RegionUncheckedUpdateWithoutCreatorInput>
  }

  export type RegionUpdateManyWithWhereWithoutCreatorInput = {
    where: RegionScalarWhereInput
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyWithoutCreatorInput>
  }

  export type RegionScalarWhereInput = {
    AND?: RegionScalarWhereInput | RegionScalarWhereInput[]
    OR?: RegionScalarWhereInput[]
    NOT?: RegionScalarWhereInput | RegionScalarWhereInput[]
    id?: IntFilter<"Region"> | number
    name?: StringFilter<"Region"> | string
    color?: StringFilter<"Region"> | string
    createdBy?: IntFilter<"Region"> | number
    createdAt?: DateTimeFilter<"Region"> | Date | string
  }

  export type UserRegionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRegionWhereUniqueInput
    update: XOR<UserRegionUpdateWithoutUserInput, UserRegionUncheckedUpdateWithoutUserInput>
    create: XOR<UserRegionCreateWithoutUserInput, UserRegionUncheckedCreateWithoutUserInput>
  }

  export type UserRegionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRegionWhereUniqueInput
    data: XOR<UserRegionUpdateWithoutUserInput, UserRegionUncheckedUpdateWithoutUserInput>
  }

  export type UserRegionUpdateManyWithWhereWithoutUserInput = {
    where: UserRegionScalarWhereInput
    data: XOR<UserRegionUpdateManyMutationInput, UserRegionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRegionScalarWhereInput = {
    AND?: UserRegionScalarWhereInput | UserRegionScalarWhereInput[]
    OR?: UserRegionScalarWhereInput[]
    NOT?: UserRegionScalarWhereInput | UserRegionScalarWhereInput[]
    id?: IntFilter<"UserRegion"> | number
    userId?: IntFilter<"UserRegion"> | number
    regionId?: IntFilter<"UserRegion"> | number
    createdAt?: DateTimeFilter<"UserRegion"> | Date | string
  }

  export type DistributionSessionUpsertWithWhereUniqueWithoutDistributorInput = {
    where: DistributionSessionWhereUniqueInput
    update: XOR<DistributionSessionUpdateWithoutDistributorInput, DistributionSessionUncheckedUpdateWithoutDistributorInput>
    create: XOR<DistributionSessionCreateWithoutDistributorInput, DistributionSessionUncheckedCreateWithoutDistributorInput>
  }

  export type DistributionSessionUpdateWithWhereUniqueWithoutDistributorInput = {
    where: DistributionSessionWhereUniqueInput
    data: XOR<DistributionSessionUpdateWithoutDistributorInput, DistributionSessionUncheckedUpdateWithoutDistributorInput>
  }

  export type DistributionSessionUpdateManyWithWhereWithoutDistributorInput = {
    where: DistributionSessionScalarWhereInput
    data: XOR<DistributionSessionUpdateManyMutationInput, DistributionSessionUncheckedUpdateManyWithoutDistributorInput>
  }

  export type DistributionSessionScalarWhereInput = {
    AND?: DistributionSessionScalarWhereInput | DistributionSessionScalarWhereInput[]
    OR?: DistributionSessionScalarWhereInput[]
    NOT?: DistributionSessionScalarWhereInput | DistributionSessionScalarWhereInput[]
    id?: IntFilter<"DistributionSession"> | number
    distributorId?: IntFilter<"DistributionSession"> | number
    status?: EnumSessionStatusFilter<"DistributionSession"> | $Enums.SessionStatus
    openedAt?: DateTimeFilter<"DistributionSession"> | Date | string
    closedAt?: DateTimeNullableFilter<"DistributionSession"> | Date | string | null
    closedByAdminId?: IntNullableFilter<"DistributionSession"> | number | null
    notes?: StringNullableFilter<"DistributionSession"> | string | null
    snapshotData?: JsonNullableFilter<"DistributionSession">
  }

  export type DistributionSessionUpsertWithWhereUniqueWithoutClosedByAdminInput = {
    where: DistributionSessionWhereUniqueInput
    update: XOR<DistributionSessionUpdateWithoutClosedByAdminInput, DistributionSessionUncheckedUpdateWithoutClosedByAdminInput>
    create: XOR<DistributionSessionCreateWithoutClosedByAdminInput, DistributionSessionUncheckedCreateWithoutClosedByAdminInput>
  }

  export type DistributionSessionUpdateWithWhereUniqueWithoutClosedByAdminInput = {
    where: DistributionSessionWhereUniqueInput
    data: XOR<DistributionSessionUpdateWithoutClosedByAdminInput, DistributionSessionUncheckedUpdateWithoutClosedByAdminInput>
  }

  export type DistributionSessionUpdateManyWithWhereWithoutClosedByAdminInput = {
    where: DistributionSessionScalarWhereInput
    data: XOR<DistributionSessionUpdateManyMutationInput, DistributionSessionUncheckedUpdateManyWithoutClosedByAdminInput>
  }

  export type ProductionEntryUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ProductionEntryWhereUniqueInput
    update: XOR<ProductionEntryUpdateWithoutCreatorInput, ProductionEntryUncheckedUpdateWithoutCreatorInput>
    create: XOR<ProductionEntryCreateWithoutCreatorInput, ProductionEntryUncheckedCreateWithoutCreatorInput>
  }

  export type ProductionEntryUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ProductionEntryWhereUniqueInput
    data: XOR<ProductionEntryUpdateWithoutCreatorInput, ProductionEntryUncheckedUpdateWithoutCreatorInput>
  }

  export type ProductionEntryUpdateManyWithWhereWithoutCreatorInput = {
    where: ProductionEntryScalarWhereInput
    data: XOR<ProductionEntryUpdateManyMutationInput, ProductionEntryUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ProductionEntryScalarWhereInput = {
    AND?: ProductionEntryScalarWhereInput | ProductionEntryScalarWhereInput[]
    OR?: ProductionEntryScalarWhereInput[]
    NOT?: ProductionEntryScalarWhereInput | ProductionEntryScalarWhereInput[]
    id?: IntFilter<"ProductionEntry"> | number
    productId?: IntFilter<"ProductionEntry"> | number
    quantity?: IntFilter<"ProductionEntry"> | number
    notes?: StringNullableFilter<"ProductionEntry"> | string | null
    createdBy?: IntNullableFilter<"ProductionEntry"> | number | null
    date?: DateTimeFilter<"ProductionEntry"> | Date | string
    createdAt?: DateTimeFilter<"ProductionEntry"> | Date | string
  }

  export type UserCreateWithoutRegionsCreatedInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutRegionsCreatedInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutRegionsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRegionsCreatedInput, UserUncheckedCreateWithoutRegionsCreatedInput>
  }

  export type ClientCreateWithoutRegionInput = {
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutClientsCreatedInput
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutRegionInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    createdBy: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutRegionInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutRegionInput, ClientUncheckedCreateWithoutRegionInput>
  }

  export type ClientCreateManyRegionInputEnvelope = {
    data: ClientCreateManyRegionInput | ClientCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutRegionInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    preventista: UserCreateNestedOneWithoutOrdersCreatedInput
    distributor?: UserCreateNestedOneWithoutOrdersDeliveryInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    history?: OrderHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutRegionInput = {
    id?: number
    clientId: number
    preventistaId: number
    distributorId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    history?: OrderHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutRegionInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutRegionInput, OrderUncheckedCreateWithoutRegionInput>
  }

  export type OrderCreateManyRegionInputEnvelope = {
    data: OrderCreateManyRegionInput | OrderCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type UserRegionCreateWithoutRegionInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAssignedRegionsInput
  }

  export type UserRegionUncheckedCreateWithoutRegionInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type UserRegionCreateOrConnectWithoutRegionInput = {
    where: UserRegionWhereUniqueInput
    create: XOR<UserRegionCreateWithoutRegionInput, UserRegionUncheckedCreateWithoutRegionInput>
  }

  export type UserRegionCreateManyRegionInputEnvelope = {
    data: UserRegionCreateManyRegionInput | UserRegionCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRegionsCreatedInput = {
    update: XOR<UserUpdateWithoutRegionsCreatedInput, UserUncheckedUpdateWithoutRegionsCreatedInput>
    create: XOR<UserCreateWithoutRegionsCreatedInput, UserUncheckedCreateWithoutRegionsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRegionsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRegionsCreatedInput, UserUncheckedUpdateWithoutRegionsCreatedInput>
  }

  export type UserUpdateWithoutRegionsCreatedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutRegionsCreatedInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ClientUpsertWithWhereUniqueWithoutRegionInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutRegionInput, ClientUncheckedUpdateWithoutRegionInput>
    create: XOR<ClientCreateWithoutRegionInput, ClientUncheckedCreateWithoutRegionInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutRegionInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutRegionInput, ClientUncheckedUpdateWithoutRegionInput>
  }

  export type ClientUpdateManyWithWhereWithoutRegionInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutRegionInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutRegionInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutRegionInput, OrderUncheckedUpdateWithoutRegionInput>
    create: XOR<OrderCreateWithoutRegionInput, OrderUncheckedCreateWithoutRegionInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutRegionInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutRegionInput, OrderUncheckedUpdateWithoutRegionInput>
  }

  export type OrderUpdateManyWithWhereWithoutRegionInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutRegionInput>
  }

  export type UserRegionUpsertWithWhereUniqueWithoutRegionInput = {
    where: UserRegionWhereUniqueInput
    update: XOR<UserRegionUpdateWithoutRegionInput, UserRegionUncheckedUpdateWithoutRegionInput>
    create: XOR<UserRegionCreateWithoutRegionInput, UserRegionUncheckedCreateWithoutRegionInput>
  }

  export type UserRegionUpdateWithWhereUniqueWithoutRegionInput = {
    where: UserRegionWhereUniqueInput
    data: XOR<UserRegionUpdateWithoutRegionInput, UserRegionUncheckedUpdateWithoutRegionInput>
  }

  export type UserRegionUpdateManyWithWhereWithoutRegionInput = {
    where: UserRegionScalarWhereInput
    data: XOR<UserRegionUpdateManyMutationInput, UserRegionUncheckedUpdateManyWithoutRegionInput>
  }

  export type RegionCreateWithoutClientsInput = {
    name: string
    color?: string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutRegionsCreatedInput
    orders?: OrderCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutClientsInput = {
    id?: number
    name: string
    color?: string
    createdBy: number
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutClientsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutClientsInput, RegionUncheckedCreateWithoutClientsInput>
  }

  export type UserCreateWithoutClientsCreatedInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutClientsCreatedInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutClientsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientsCreatedInput, UserUncheckedCreateWithoutClientsCreatedInput>
  }

  export type OrderCreateWithoutClientInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    preventista: UserCreateNestedOneWithoutOrdersCreatedInput
    distributor?: UserCreateNestedOneWithoutOrdersDeliveryInput
    region?: RegionCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
    history?: OrderHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutClientInput = {
    id?: number
    preventistaId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    history?: OrderHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutClientInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput>
  }

  export type OrderCreateManyClientInputEnvelope = {
    data: OrderCreateManyClientInput | OrderCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type RegionUpsertWithoutClientsInput = {
    update: XOR<RegionUpdateWithoutClientsInput, RegionUncheckedUpdateWithoutClientsInput>
    create: XOR<RegionCreateWithoutClientsInput, RegionUncheckedCreateWithoutClientsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutClientsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutClientsInput, RegionUncheckedUpdateWithoutClientsInput>
  }

  export type RegionUpdateWithoutClientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutRegionsCreatedNestedInput
    orders?: OrderUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutClientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type UserUpsertWithoutClientsCreatedInput = {
    update: XOR<UserUpdateWithoutClientsCreatedInput, UserUncheckedUpdateWithoutClientsCreatedInput>
    create: XOR<UserCreateWithoutClientsCreatedInput, UserUncheckedCreateWithoutClientsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientsCreatedInput, UserUncheckedUpdateWithoutClientsCreatedInput>
  }

  export type UserUpdateWithoutClientsCreatedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutClientsCreatedInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutClientInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutClientInput, OrderUncheckedUpdateWithoutClientInput>
    create: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutClientInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutClientInput, OrderUncheckedUpdateWithoutClientInput>
  }

  export type OrderUpdateManyWithWhereWithoutClientInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutClientInput>
  }

  export type OrderItemCreateWithoutProductInput = {
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: number
    orderId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductionEntryCreateWithoutProductInput = {
    quantity: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
    creator?: UserCreateNestedOneWithoutProductionEntriesInput
  }

  export type ProductionEntryUncheckedCreateWithoutProductInput = {
    id?: number
    quantity: number
    notes?: string | null
    createdBy?: number | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type ProductionEntryCreateOrConnectWithoutProductInput = {
    where: ProductionEntryWhereUniqueInput
    create: XOR<ProductionEntryCreateWithoutProductInput, ProductionEntryUncheckedCreateWithoutProductInput>
  }

  export type ProductionEntryCreateManyProductInputEnvelope = {
    data: ProductionEntryCreateManyProductInput | ProductionEntryCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    unitPrice?: FloatFilter<"OrderItem"> | number
    deliveredQuantity?: IntNullableFilter<"OrderItem"> | number | null
    isBonification?: BoolFilter<"OrderItem"> | boolean
  }

  export type ProductionEntryUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductionEntryWhereUniqueInput
    update: XOR<ProductionEntryUpdateWithoutProductInput, ProductionEntryUncheckedUpdateWithoutProductInput>
    create: XOR<ProductionEntryCreateWithoutProductInput, ProductionEntryUncheckedCreateWithoutProductInput>
  }

  export type ProductionEntryUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductionEntryWhereUniqueInput
    data: XOR<ProductionEntryUpdateWithoutProductInput, ProductionEntryUncheckedUpdateWithoutProductInput>
  }

  export type ProductionEntryUpdateManyWithWhereWithoutProductInput = {
    where: ProductionEntryScalarWhereInput
    data: XOR<ProductionEntryUpdateManyMutationInput, ProductionEntryUncheckedUpdateManyWithoutProductInput>
  }

  export type ClientCreateWithoutOrdersInput = {
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    region?: RegionCreateNestedOneWithoutClientsInput
    creator: UserCreateNestedOneWithoutClientsCreatedInput
  }

  export type ClientUncheckedCreateWithoutOrdersInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    regionId?: number | null
    createdBy: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutOrdersInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
  }

  export type UserCreateWithoutOrdersCreatedInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutOrdersCreatedInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutOrdersCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersCreatedInput, UserUncheckedCreateWithoutOrdersCreatedInput>
  }

  export type UserCreateWithoutOrdersDeliveryInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutOrdersDeliveryInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutOrdersDeliveryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersDeliveryInput, UserUncheckedCreateWithoutOrdersDeliveryInput>
  }

  export type RegionCreateWithoutOrdersInput = {
    name: string
    color?: string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutRegionsCreatedInput
    clients?: ClientCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutOrdersInput = {
    id?: number
    name: string
    color?: string
    createdBy: number
    createdAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutRegionInput
    assignedUsers?: UserRegionUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutOrdersInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutOrdersInput, RegionUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderHistoryCreateWithoutOrderInput = {
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    changer: UserCreateNestedOneWithoutHistoryActionsInput
  }

  export type OrderHistoryUncheckedCreateWithoutOrderInput = {
    id?: number
    changedBy: number
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderHistoryCreateOrConnectWithoutOrderInput = {
    where: OrderHistoryWhereUniqueInput
    create: XOR<OrderHistoryCreateWithoutOrderInput, OrderHistoryUncheckedCreateWithoutOrderInput>
  }

  export type OrderHistoryCreateManyOrderInputEnvelope = {
    data: OrderHistoryCreateManyOrderInput | OrderHistoryCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutOrdersInput = {
    update: XOR<ClientUpdateWithoutOrdersInput, ClientUncheckedUpdateWithoutOrdersInput>
    create: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutOrdersInput, ClientUncheckedUpdateWithoutOrdersInput>
  }

  export type ClientUpdateWithoutOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneWithoutClientsNestedInput
    creator?: UserUpdateOneRequiredWithoutClientsCreatedNestedInput
  }

  export type ClientUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    createdBy?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutOrdersCreatedInput = {
    update: XOR<UserUpdateWithoutOrdersCreatedInput, UserUncheckedUpdateWithoutOrdersCreatedInput>
    create: XOR<UserCreateWithoutOrdersCreatedInput, UserUncheckedCreateWithoutOrdersCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersCreatedInput, UserUncheckedUpdateWithoutOrdersCreatedInput>
  }

  export type UserUpdateWithoutOrdersCreatedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersCreatedInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUpsertWithoutOrdersDeliveryInput = {
    update: XOR<UserUpdateWithoutOrdersDeliveryInput, UserUncheckedUpdateWithoutOrdersDeliveryInput>
    create: XOR<UserCreateWithoutOrdersDeliveryInput, UserUncheckedCreateWithoutOrdersDeliveryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersDeliveryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersDeliveryInput, UserUncheckedUpdateWithoutOrdersDeliveryInput>
  }

  export type UserUpdateWithoutOrdersDeliveryInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersDeliveryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type RegionUpsertWithoutOrdersInput = {
    update: XOR<RegionUpdateWithoutOrdersInput, RegionUncheckedUpdateWithoutOrdersInput>
    create: XOR<RegionCreateWithoutOrdersInput, RegionUncheckedCreateWithoutOrdersInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutOrdersInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutOrdersInput, RegionUncheckedUpdateWithoutOrdersInput>
  }

  export type RegionUpdateWithoutOrdersInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutRegionsCreatedNestedInput
    clients?: ClientUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderHistoryUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderHistoryWhereUniqueInput
    update: XOR<OrderHistoryUpdateWithoutOrderInput, OrderHistoryUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderHistoryCreateWithoutOrderInput, OrderHistoryUncheckedCreateWithoutOrderInput>
  }

  export type OrderHistoryUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderHistoryWhereUniqueInput
    data: XOR<OrderHistoryUpdateWithoutOrderInput, OrderHistoryUncheckedUpdateWithoutOrderInput>
  }

  export type OrderHistoryUpdateManyWithWhereWithoutOrderInput = {
    where: OrderHistoryScalarWhereInput
    data: XOR<OrderHistoryUpdateManyMutationInput, OrderHistoryUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutItemsInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    preventista: UserCreateNestedOneWithoutOrdersCreatedInput
    distributor?: UserCreateNestedOneWithoutOrdersDeliveryInput
    region?: RegionCreateNestedOneWithoutOrdersInput
    history?: OrderHistoryCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: number
    clientId: number
    preventistaId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    history?: OrderHistoryUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemsInput = {
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    productionEntries?: ProductionEntryCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    preventista?: UserUpdateOneRequiredWithoutOrdersCreatedNestedInput
    distributor?: UserUpdateOneWithoutOrdersDeliveryNestedInput
    region?: RegionUpdateOneWithoutOrdersNestedInput
    history?: OrderHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    history?: OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productionEntries?: ProductionEntryUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserCreateWithoutAssignedRegionsInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutAssignedRegionsInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutAssignedRegionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssignedRegionsInput, UserUncheckedCreateWithoutAssignedRegionsInput>
  }

  export type RegionCreateWithoutAssignedUsersInput = {
    name: string
    color?: string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutRegionsCreatedInput
    clients?: ClientCreateNestedManyWithoutRegionInput
    orders?: OrderCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutAssignedUsersInput = {
    id?: number
    name: string
    color?: string
    createdBy: number
    createdAt?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutRegionInput
    orders?: OrderUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutAssignedUsersInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutAssignedUsersInput, RegionUncheckedCreateWithoutAssignedUsersInput>
  }

  export type UserUpsertWithoutAssignedRegionsInput = {
    update: XOR<UserUpdateWithoutAssignedRegionsInput, UserUncheckedUpdateWithoutAssignedRegionsInput>
    create: XOR<UserCreateWithoutAssignedRegionsInput, UserUncheckedCreateWithoutAssignedRegionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssignedRegionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssignedRegionsInput, UserUncheckedUpdateWithoutAssignedRegionsInput>
  }

  export type UserUpdateWithoutAssignedRegionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutAssignedRegionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type RegionUpsertWithoutAssignedUsersInput = {
    update: XOR<RegionUpdateWithoutAssignedUsersInput, RegionUncheckedUpdateWithoutAssignedUsersInput>
    create: XOR<RegionCreateWithoutAssignedUsersInput, RegionUncheckedCreateWithoutAssignedUsersInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutAssignedUsersInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutAssignedUsersInput, RegionUncheckedUpdateWithoutAssignedUsersInput>
  }

  export type RegionUpdateWithoutAssignedUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutRegionsCreatedNestedInput
    clients?: ClientUpdateManyWithoutRegionNestedInput
    orders?: OrderUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutAssignedUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutRegionNestedInput
    orders?: OrderUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type OrderCreateWithoutHistoryInput = {
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    preventista: UserCreateNestedOneWithoutOrdersCreatedInput
    distributor?: UserCreateNestedOneWithoutOrdersDeliveryInput
    region?: RegionCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutHistoryInput = {
    id?: number
    clientId: number
    preventistaId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutHistoryInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutHistoryInput, OrderUncheckedCreateWithoutHistoryInput>
  }

  export type UserCreateWithoutHistoryActionsInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutHistoryActionsInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutHistoryActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHistoryActionsInput, UserUncheckedCreateWithoutHistoryActionsInput>
  }

  export type OrderUpsertWithoutHistoryInput = {
    update: XOR<OrderUpdateWithoutHistoryInput, OrderUncheckedUpdateWithoutHistoryInput>
    create: XOR<OrderCreateWithoutHistoryInput, OrderUncheckedCreateWithoutHistoryInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutHistoryInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutHistoryInput, OrderUncheckedUpdateWithoutHistoryInput>
  }

  export type OrderUpdateWithoutHistoryInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    preventista?: UserUpdateOneRequiredWithoutOrdersCreatedNestedInput
    distributor?: UserUpdateOneWithoutOrdersDeliveryNestedInput
    region?: RegionUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type UserUpsertWithoutHistoryActionsInput = {
    update: XOR<UserUpdateWithoutHistoryActionsInput, UserUncheckedUpdateWithoutHistoryActionsInput>
    create: XOR<UserCreateWithoutHistoryActionsInput, UserUncheckedCreateWithoutHistoryActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHistoryActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHistoryActionsInput, UserUncheckedUpdateWithoutHistoryActionsInput>
  }

  export type UserUpdateWithoutHistoryActionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutHistoryActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateWithoutDistributionSessionsInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutDistributionSessionsInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutDistributionSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDistributionSessionsInput, UserUncheckedCreateWithoutDistributionSessionsInput>
  }

  export type UserCreateWithoutSessionsClosedByMeInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    productionEntries?: ProductionEntryCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutSessionsClosedByMeInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    productionEntries?: ProductionEntryUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutSessionsClosedByMeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsClosedByMeInput, UserUncheckedCreateWithoutSessionsClosedByMeInput>
  }

  export type UserUpsertWithoutDistributionSessionsInput = {
    update: XOR<UserUpdateWithoutDistributionSessionsInput, UserUncheckedUpdateWithoutDistributionSessionsInput>
    create: XOR<UserCreateWithoutDistributionSessionsInput, UserUncheckedCreateWithoutDistributionSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDistributionSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDistributionSessionsInput, UserUncheckedUpdateWithoutDistributionSessionsInput>
  }

  export type UserUpdateWithoutDistributionSessionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutDistributionSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUpsertWithoutSessionsClosedByMeInput = {
    update: XOR<UserUpdateWithoutSessionsClosedByMeInput, UserUncheckedUpdateWithoutSessionsClosedByMeInput>
    create: XOR<UserCreateWithoutSessionsClosedByMeInput, UserUncheckedCreateWithoutSessionsClosedByMeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsClosedByMeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsClosedByMeInput, UserUncheckedUpdateWithoutSessionsClosedByMeInput>
  }

  export type UserUpdateWithoutSessionsClosedByMeInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    productionEntries?: ProductionEntryUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsClosedByMeInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    productionEntries?: ProductionEntryUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type ProductCreateWithoutProductionEntriesInput = {
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutProductionEntriesInput = {
    id?: number
    name: string
    description?: string | null
    price: number
    unit: string
    category?: string
    isActive?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutProductionEntriesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutProductionEntriesInput, ProductUncheckedCreateWithoutProductionEntriesInput>
  }

  export type UserCreateWithoutProductionEntriesInput = {
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionCreateNestedManyWithoutClosedByAdminInput
  }

  export type UserUncheckedCreateWithoutProductionEntriesInput = {
    id?: number
    name: string
    email: string
    phone?: string | null
    password: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    clientsCreated?: ClientUncheckedCreateNestedManyWithoutCreatorInput
    ordersCreated?: OrderUncheckedCreateNestedManyWithoutPreventistaInput
    ordersDelivery?: OrderUncheckedCreateNestedManyWithoutDistributorInput
    historyActions?: OrderHistoryUncheckedCreateNestedManyWithoutChangerInput
    regionsCreated?: RegionUncheckedCreateNestedManyWithoutCreatorInput
    assignedRegions?: UserRegionUncheckedCreateNestedManyWithoutUserInput
    distributionSessions?: DistributionSessionUncheckedCreateNestedManyWithoutDistributorInput
    sessionsClosedByMe?: DistributionSessionUncheckedCreateNestedManyWithoutClosedByAdminInput
  }

  export type UserCreateOrConnectWithoutProductionEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductionEntriesInput, UserUncheckedCreateWithoutProductionEntriesInput>
  }

  export type ProductUpsertWithoutProductionEntriesInput = {
    update: XOR<ProductUpdateWithoutProductionEntriesInput, ProductUncheckedUpdateWithoutProductionEntriesInput>
    create: XOR<ProductCreateWithoutProductionEntriesInput, ProductUncheckedCreateWithoutProductionEntriesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutProductionEntriesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutProductionEntriesInput, ProductUncheckedUpdateWithoutProductionEntriesInput>
  }

  export type ProductUpdateWithoutProductionEntriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutProductionEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    unit?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserUpsertWithoutProductionEntriesInput = {
    update: XOR<UserUpdateWithoutProductionEntriesInput, UserUncheckedUpdateWithoutProductionEntriesInput>
    create: XOR<UserCreateWithoutProductionEntriesInput, UserUncheckedCreateWithoutProductionEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProductionEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProductionEntriesInput, UserUncheckedUpdateWithoutProductionEntriesInput>
  }

  export type UserUpdateWithoutProductionEntriesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUpdateManyWithoutClosedByAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutProductionEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clientsCreated?: ClientUncheckedUpdateManyWithoutCreatorNestedInput
    ordersCreated?: OrderUncheckedUpdateManyWithoutPreventistaNestedInput
    ordersDelivery?: OrderUncheckedUpdateManyWithoutDistributorNestedInput
    historyActions?: OrderHistoryUncheckedUpdateManyWithoutChangerNestedInput
    regionsCreated?: RegionUncheckedUpdateManyWithoutCreatorNestedInput
    assignedRegions?: UserRegionUncheckedUpdateManyWithoutUserNestedInput
    distributionSessions?: DistributionSessionUncheckedUpdateManyWithoutDistributorNestedInput
    sessionsClosedByMe?: DistributionSessionUncheckedUpdateManyWithoutClosedByAdminNestedInput
  }

  export type ClientCreateManyCreatorInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    regionId?: number | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type OrderCreateManyPreventistaInput = {
    id?: number
    clientId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
  }

  export type OrderCreateManyDistributorInput = {
    id?: number
    clientId: number
    preventistaId: number
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
  }

  export type OrderHistoryCreateManyChangerInput = {
    id?: number
    orderId: number
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type RegionCreateManyCreatorInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
  }

  export type UserRegionCreateManyUserInput = {
    id?: number
    regionId: number
    createdAt?: Date | string
  }

  export type DistributionSessionCreateManyDistributorInput = {
    id?: number
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    closedByAdminId?: number | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionCreateManyClosedByAdminInput = {
    id?: number
    distributorId: number
    status?: $Enums.SessionStatus
    openedAt?: Date | string
    closedAt?: Date | string | null
    notes?: string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProductionEntryCreateManyCreatorInput = {
    id?: number
    productId: number
    quantity: number
    notes?: string | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type ClientUpdateWithoutCreatorInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneWithoutClientsNestedInput
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutPreventistaInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    distributor?: UserUpdateOneWithoutOrdersDeliveryNestedInput
    region?: RegionUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPreventistaInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutPreventistaInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutDistributorInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    preventista?: UserUpdateOneRequiredWithoutOrdersCreatedNestedInput
    region?: RegionUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutDistributorInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutDistributorInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderHistoryUpdateWithoutChangerInput = {
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutHistoryNestedInput
  }

  export type OrderHistoryUncheckedUpdateWithoutChangerInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderHistoryUncheckedUpdateManyWithoutChangerInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionUpdateWithoutCreatorInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutRegionNestedInput
    orders?: OrderUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutRegionNestedInput
    orders?: OrderUncheckedUpdateManyWithoutRegionNestedInput
    assignedUsers?: UserRegionUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRegionUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutAssignedUsersNestedInput
  }

  export type UserRegionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRegionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionSessionUpdateWithoutDistributorInput = {
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
    closedByAdmin?: UserUpdateOneWithoutSessionsClosedByMeNestedInput
  }

  export type DistributionSessionUncheckedUpdateWithoutDistributorInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionUncheckedUpdateManyWithoutDistributorInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    closedByAdminId?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionUpdateWithoutClosedByAdminInput = {
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
    distributor?: UserUpdateOneRequiredWithoutDistributionSessionsNestedInput
  }

  export type DistributionSessionUncheckedUpdateWithoutClosedByAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    distributorId?: IntFieldUpdateOperationsInput | number
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type DistributionSessionUncheckedUpdateManyWithoutClosedByAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    distributorId?: IntFieldUpdateOperationsInput | number
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    openedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    snapshotData?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProductionEntryUpdateWithoutCreatorInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutProductionEntriesNestedInput
  }

  export type ProductionEntryUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductionEntryUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateManyRegionInput = {
    id?: number
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    photoUrl?: string | null
    createdBy: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type OrderCreateManyRegionInput = {
    id?: number
    clientId: number
    preventistaId: number
    distributorId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
  }

  export type UserRegionCreateManyRegionInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ClientUpdateWithoutRegionInput = {
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutClientsCreatedNestedInput
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ownerName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutRegionInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    preventista?: UserUpdateOneRequiredWithoutOrdersCreatedNestedInput
    distributor?: UserUpdateOneWithoutOrdersDeliveryNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    clientId?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRegionUpdateWithoutRegionInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssignedRegionsNestedInput
  }

  export type UserRegionUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRegionUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyClientInput = {
    id?: number
    preventistaId: number
    distributorId?: number | null
    regionId?: number | null
    status?: $Enums.OrderStatus
    notes?: string | null
    deliveredAt?: Date | string | null
    discount?: number
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutClientInput = {
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    preventista?: UserUpdateOneRequiredWithoutOrdersCreatedNestedInput
    distributor?: UserUpdateOneWithoutOrdersDeliveryNestedInput
    region?: RegionUpdateOneWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    history?: OrderHistoryUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    preventistaId?: IntFieldUpdateOperationsInput | number
    distributorId?: NullableIntFieldUpdateOperationsInput | number | null
    regionId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    discount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyProductInput = {
    id?: number
    orderId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
  }

  export type ProductionEntryCreateManyProductInput = {
    id?: number
    quantity: number
    notes?: string | null
    createdBy?: number | null
    date?: Date | string
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductionEntryUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutProductionEntriesNestedInput
  }

  export type ProductionEntryUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductionEntryUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: number
    productId: number
    quantity: number
    unitPrice: number
    deliveredQuantity?: number | null
    isBonification?: boolean
  }

  export type OrderHistoryCreateManyOrderInput = {
    id?: number
    changedBy: number
    action: $Enums.OrderAction
    previousStatus?: $Enums.OrderStatus | null
    newStatus: $Enums.OrderStatus
    snapshotData: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    unitPrice?: FloatFieldUpdateOperationsInput | number
    deliveredQuantity?: NullableIntFieldUpdateOperationsInput | number | null
    isBonification?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderHistoryUpdateWithoutOrderInput = {
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changer?: UserUpdateOneRequiredWithoutHistoryActionsNestedInput
  }

  export type OrderHistoryUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    changedBy?: IntFieldUpdateOperationsInput | number
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderHistoryUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    changedBy?: IntFieldUpdateOperationsInput | number
    action?: EnumOrderActionFieldUpdateOperationsInput | $Enums.OrderAction
    previousStatus?: NullableEnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus | null
    newStatus?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    snapshotData?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}