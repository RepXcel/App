import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly rpe10Velocity?: number | null;
  readonly rpe0velocity?: number | null;
  readonly sessions?: (Session | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly rpe10Velocity?: number | null;
  readonly rpe0velocity?: number | null;
  readonly sessions: AsyncCollection<Session>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerSession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Session, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user?: User | null;
  readonly date: string;
  readonly rpe: number;
  readonly velocities?: (Velocity | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userSessionsId?: string | null;
}

type LazySession = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Session, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly user: AsyncItem<User | undefined>;
  readonly date: string;
  readonly rpe: number;
  readonly velocities: AsyncCollection<Velocity>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userSessionsId?: string | null;
}

export declare type Session = LazyLoading extends LazyLoadingDisabled ? EagerSession : LazySession

export declare const Session: (new (init: ModelInit<Session>) => Session) & {
  copyOf(source: Session, mutator: (draft: MutableModel<Session>) => MutableModel<Session> | void): Session;
}

type EagerVelocity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Velocity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly session?: Session | null;
  readonly velocity: number;
  readonly timestamp: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sessionVelocitiesId?: string | null;
}

type LazyVelocity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Velocity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly session: AsyncItem<Session | undefined>;
  readonly velocity: number;
  readonly timestamp: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly sessionVelocitiesId?: string | null;
}

export declare type Velocity = LazyLoading extends LazyLoadingDisabled ? EagerVelocity : LazyVelocity

export declare const Velocity: (new (init: ModelInit<Velocity>) => Velocity) & {
  copyOf(source: Velocity, mutator: (draft: MutableModel<Velocity>) => MutableModel<Velocity> | void): Velocity;
}