/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

export type CreateMessageInput = {
  /** メッセージ内容（最大1000文字） */
  content: Scalars['String']['input'];
  /** ルームID */
  roomId: Scalars['ID']['input'];
  /** 送信者ID */
  senderId: Scalars['ID']['input'];
};

export type MessageModel = {
  __typename?: 'MessageModel';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  roomId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: MessageModel;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};

export type Query = {
  __typename?: 'Query';
  getMessages: Array<MessageModel>;
};


export type QueryGetMessagesArgs = {
  roomId: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: MessageModel;
};


export type SubscriptionMessageAddedArgs = {
  roomId: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type MessageRequestFragment = { __typename: 'MessageModel', id: string, content: string, roomId: string, createdAt: string, user: { __typename: 'UserModel', id: string, name?: string | null } } & { ' $fragmentName'?: 'MessageRequestFragment' };

export type GetMessagesQueryVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<(
    { __typename?: 'MessageModel' }
    & { ' $fragmentRefs'?: { 'MessageRequestFragment': MessageRequestFragment } }
  )> };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: (
    { __typename?: 'MessageModel' }
    & { ' $fragmentRefs'?: { 'MessageRequestFragment': MessageRequestFragment } }
  ) };

export type OnMessageAddedSubscriptionVariables = Exact<{
  roomId: Scalars['String']['input'];
}>;


export type OnMessageAddedSubscription = { __typename?: 'Subscription', messageAdded: (
    { __typename?: 'MessageModel' }
    & { ' $fragmentRefs'?: { 'MessageRequestFragment': MessageRequestFragment } }
  ) };

export const MessageRequestFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<MessageRequestFragment, unknown>;
export const GetMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageRequest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetMessagesQuery, GetMessagesQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageRequest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const OnMessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnMessageAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageRequest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MessageModel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<OnMessageAddedSubscription, OnMessageAddedSubscriptionVariables>;