/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    username
    rpe10Velocity
    rpe0Velocity
    sessions {
      nextToken
      startedAt
      __typename
    }
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      username
      rpe10Velocity
      rpe0Velocity
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const syncUsers = /* GraphQL */ `query SyncUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      username
      rpe10Velocity
      rpe0Velocity
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncUsersQueryVariables, APITypes.SyncUsersQuery>;
export const getSession = /* GraphQL */ `query GetSession($id: ID!) {
  getSession(id: $id) {
    user {
      username
      rpe10Velocity
      rpe0Velocity
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    date
    rpe
    velocities
    id
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    userSessionsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSessionQueryVariables,
  APITypes.GetSessionQuery
>;
export const listSessions = /* GraphQL */ `query ListSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      date
      rpe
      velocities
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userSessionsId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSessionsQueryVariables,
  APITypes.ListSessionsQuery
>;
export const syncSessions = /* GraphQL */ `query SyncSessions(
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncSessions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      date
      rpe
      velocities
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      userSessionsId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncSessionsQueryVariables,
  APITypes.SyncSessionsQuery
>;
