import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Board = {
  __typename?: 'Board';
  id: Scalars['Int'];
  slots: Array<Slot>;
  title: Scalars['String'];
};

export type BoardMutations = {
  __typename?: 'BoardMutations';
  createSlot: Scalars['Int'];
};


export type BoardMutationsCreateSlotArgs = {
  title: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  boardMutations?: Maybe<BoardMutations>;
  createProject: Scalars['Int'];
  projectMutations?: Maybe<ProjectMutations>;
  slotMutations?: Maybe<SlotMutations>;
};


export type MutationBoardMutationsArgs = {
  id: Scalars['Int'];
};


export type MutationCreateProjectArgs = {
  title: Scalars['String'];
};


export type MutationProjectMutationsArgs = {
  id: Scalars['Int'];
};


export type MutationSlotMutationsArgs = {
  id: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  boards: Array<Board>;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type ProjectMutations = {
  __typename?: 'ProjectMutations';
  createBoard: Scalars['Int'];
  rename: Scalars['String'];
};


export type ProjectMutationsCreateBoardArgs = {
  title: Scalars['String'];
};


export type ProjectMutationsRenameArgs = {
  newTitle: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  projectById?: Maybe<Project>;
  projects: Array<Project>;
};


export type QueryProjectByIdArgs = {
  id: Scalars['Int'];
};

export type Slot = {
  __typename?: 'Slot';
  cards: Array<Card>;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type SlotMutations = {
  __typename?: 'SlotMutations';
  createCard: Scalars['Int'];
};


export type SlotMutationsCreateCardArgs = {
  title: Scalars['String'];
};

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, title: string }> };

export type CardFragment = { __typename?: 'Card', id: number, title: string };

export type SlotFragment = { __typename?: 'Slot', id: number, title: string, cards: Array<{ __typename?: 'Card', id: number, title: string }> };

export type BoardFragment = { __typename?: 'Board', id: number, title: string, slots: Array<{ __typename?: 'Slot', id: number, title: string, cards: Array<{ __typename?: 'Card', id: number, title: string }> }> };

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', title: string, boards: Array<{ __typename?: 'Board', id: number, title: string, slots: Array<{ __typename?: 'Slot', id: number, title: string, cards: Array<{ __typename?: 'Card', id: number, title: string }> }> }> } | null };

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: number };

export type RenameProjectMutationVariables = Exact<{
  id: Scalars['Int'];
  newTitle: Scalars['String'];
}>;


export type RenameProjectMutation = { __typename?: 'Mutation', projectMutations?: { __typename?: 'ProjectMutations', rename: string } | null };

export type CreateBoardMutationVariables = Exact<{
  projectId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', projectMutations?: { __typename?: 'ProjectMutations', createBoard: number } | null };

export type CreateSlotMutationVariables = Exact<{
  boardId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateSlotMutation = { __typename?: 'Mutation', boardMutations?: { __typename?: 'BoardMutations', createSlot: number } | null };

export type CreateCardMutationVariables = Exact<{
  slotId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateCardMutation = { __typename?: 'Mutation', slotMutations?: { __typename?: 'SlotMutations', createCard: number } | null };

export const CardFragmentDoc = gql`
    fragment Card on Card {
  id
  title
}
    `;
export const SlotFragmentDoc = gql`
    fragment Slot on Slot {
  id
  title
  cards {
    ...Card
  }
}
    ${CardFragmentDoc}`;
export const BoardFragmentDoc = gql`
    fragment Board on Board {
  id
  title
  slots {
    ...Slot
  }
}
    ${SlotFragmentDoc}`;
export const AllProjectsDocument = gql`
    query AllProjects {
  projects {
    id
    title
  }
}
    `;

/**
 * __useAllProjectsQuery__
 *
 * To run a query within a React component, call `useAllProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProjectsQuery(baseOptions?: Apollo.QueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
      }
export function useAllProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllProjectsQuery, AllProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, options);
        }
export type AllProjectsQueryHookResult = ReturnType<typeof useAllProjectsQuery>;
export type AllProjectsLazyQueryHookResult = ReturnType<typeof useAllProjectsLazyQuery>;
export type AllProjectsQueryResult = Apollo.QueryResult<AllProjectsQuery, AllProjectsQueryVariables>;
export const ProjectByIdDocument = gql`
    query ProjectById($id: Int!) {
  projectById(id: $id) {
    title
    boards {
      ...Board
    }
  }
}
    ${BoardFragmentDoc}`;

/**
 * __useProjectByIdQuery__
 *
 * To run a query within a React component, call `useProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
      }
export function useProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectByIdQuery, ProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectByIdQuery, ProjectByIdQueryVariables>(ProjectByIdDocument, options);
        }
export type ProjectByIdQueryHookResult = ReturnType<typeof useProjectByIdQuery>;
export type ProjectByIdLazyQueryHookResult = ReturnType<typeof useProjectByIdLazyQuery>;
export type ProjectByIdQueryResult = Apollo.QueryResult<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($title: String!) {
  createProject(title: $title)
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const RenameProjectDocument = gql`
    mutation RenameProject($id: Int!, $newTitle: String!) {
  projectMutations(id: $id) {
    rename(newTitle: $newTitle)
  }
}
    `;
export type RenameProjectMutationFn = Apollo.MutationFunction<RenameProjectMutation, RenameProjectMutationVariables>;

/**
 * __useRenameProjectMutation__
 *
 * To run a mutation, you first call `useRenameProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameProjectMutation, { data, loading, error }] = useRenameProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newTitle: // value for 'newTitle'
 *   },
 * });
 */
export function useRenameProjectMutation(baseOptions?: Apollo.MutationHookOptions<RenameProjectMutation, RenameProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameProjectMutation, RenameProjectMutationVariables>(RenameProjectDocument, options);
      }
export type RenameProjectMutationHookResult = ReturnType<typeof useRenameProjectMutation>;
export type RenameProjectMutationResult = Apollo.MutationResult<RenameProjectMutation>;
export type RenameProjectMutationOptions = Apollo.BaseMutationOptions<RenameProjectMutation, RenameProjectMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($projectId: Int!, $title: String!) {
  projectMutations(id: $projectId) {
    createBoard(title: $title)
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const CreateSlotDocument = gql`
    mutation CreateSlot($boardId: Int!, $title: String!) {
  boardMutations(id: $boardId) {
    createSlot(title: $title)
  }
}
    `;
export type CreateSlotMutationFn = Apollo.MutationFunction<CreateSlotMutation, CreateSlotMutationVariables>;

/**
 * __useCreateSlotMutation__
 *
 * To run a mutation, you first call `useCreateSlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlotMutation, { data, loading, error }] = useCreateSlotMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateSlotMutation(baseOptions?: Apollo.MutationHookOptions<CreateSlotMutation, CreateSlotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSlotMutation, CreateSlotMutationVariables>(CreateSlotDocument, options);
      }
export type CreateSlotMutationHookResult = ReturnType<typeof useCreateSlotMutation>;
export type CreateSlotMutationResult = Apollo.MutationResult<CreateSlotMutation>;
export type CreateSlotMutationOptions = Apollo.BaseMutationOptions<CreateSlotMutation, CreateSlotMutationVariables>;
export const CreateCardDocument = gql`
    mutation CreateCard($slotId: Int!, $title: String!) {
  slotMutations(id: $slotId) {
    createCard(title: $title)
  }
}
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      slotId: // value for 'slotId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;