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
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newProject: Scalars['Int'];
  projectMutations?: Maybe<ProjectMutations>;
};


export type MutationNewProjectArgs = {
  name: Scalars['String'];
};


export type MutationProjectMutationsArgs = {
  id: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  boards: Array<Board>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ProjectMutations = {
  __typename?: 'ProjectMutations';
  createBoard: Scalars['Int'];
};


export type ProjectMutationsCreateBoardArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  projectById?: Maybe<Project>;
  projects: Array<Project>;
};


export type QueryProjectByIdArgs = {
  id: Scalars['Int'];
};

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, name: string }> };

export type NewProjectMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type NewProjectMutation = { __typename?: 'Mutation', newProject: number };

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', id: number, name: string } | null };


export const AllProjectsDocument = gql`
    query AllProjects {
  projects {
    id
    name
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
export const NewProjectDocument = gql`
    mutation NewProject($name: String!) {
  newProject(name: $name)
}
    `;
export type NewProjectMutationFn = Apollo.MutationFunction<NewProjectMutation, NewProjectMutationVariables>;

/**
 * __useNewProjectMutation__
 *
 * To run a mutation, you first call `useNewProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newProjectMutation, { data, loading, error }] = useNewProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useNewProjectMutation(baseOptions?: Apollo.MutationHookOptions<NewProjectMutation, NewProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewProjectMutation, NewProjectMutationVariables>(NewProjectDocument, options);
      }
export type NewProjectMutationHookResult = ReturnType<typeof useNewProjectMutation>;
export type NewProjectMutationResult = Apollo.MutationResult<NewProjectMutation>;
export type NewProjectMutationOptions = Apollo.BaseMutationOptions<NewProjectMutation, NewProjectMutationVariables>;
export const ProjectByIdDocument = gql`
    query ProjectById($id: Int!) {
  projectById(id: $id) {
    id
    name
  }
}
    `;

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