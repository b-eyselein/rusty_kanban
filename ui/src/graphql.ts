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
  rename: Scalars['String'];
};


export type BoardMutationsCreateSlotArgs = {
  title: Scalars['String'];
};


export type BoardMutationsRenameArgs = {
  newTitle: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['Int'];
  tasks: Array<Task>;
  title: Scalars['String'];
};

export type CardMutations = {
  __typename?: 'CardMutations';
  createTask: Scalars['Int'];
  moveSlot: Scalars['Int'];
  rename: Scalars['String'];
};


export type CardMutationsCreateTaskArgs = {
  title: Scalars['String'];
};


export type CardMutationsMoveSlotArgs = {
  newSlotId: Scalars['Int'];
};


export type CardMutationsRenameArgs = {
  newTitle: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  boardMutations?: Maybe<BoardMutations>;
  cardMutations?: Maybe<CardMutations>;
  createProject: Scalars['Int'];
  projectMutations?: Maybe<ProjectMutations>;
  slotMutations?: Maybe<SlotMutations>;
  taskMutations?: Maybe<TaskMutations>;
};


export type MutationBoardMutationsArgs = {
  id: Scalars['Int'];
};


export type MutationCardMutationsArgs = {
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


export type MutationTaskMutationsArgs = {
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
  rename: Scalars['String'];
};


export type SlotMutationsCreateCardArgs = {
  title: Scalars['String'];
};


export type SlotMutationsRenameArgs = {
  newTitle: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  finished: Scalars['Boolean'];
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type TaskMutations = {
  __typename?: 'TaskMutations';
  finish: Scalars['Boolean'];
  update: Scalars['String'];
};


export type TaskMutationsUpdateArgs = {
  newTitle: Scalars['String'];
};

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: number };

export type RenameProjectMutationVariables = Exact<{
  projectId: Scalars['Int'];
  newTitle: Scalars['String'];
}>;


export type RenameProjectMutation = { __typename?: 'Mutation', projectMutations?: { __typename?: 'ProjectMutations', rename: string } | null };

export type CreateBoardMutationVariables = Exact<{
  projectId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', projectMutations?: { __typename?: 'ProjectMutations', createBoard: number } | null };

export type RenameBoardsMutationVariables = Exact<{
  boardId: Scalars['Int'];
  newTitle: Scalars['String'];
}>;


export type RenameBoardsMutation = { __typename?: 'Mutation', boardMutations?: { __typename?: 'BoardMutations', rename: string } | null };

export type CreateSlotMutationVariables = Exact<{
  boardId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateSlotMutation = { __typename?: 'Mutation', boardMutations?: { __typename?: 'BoardMutations', createSlot: number } | null };

export type RenameSlotMutationVariables = Exact<{
  slotId: Scalars['Int'];
  newTitle: Scalars['String'];
}>;


export type RenameSlotMutation = { __typename?: 'Mutation', slotMutations?: { __typename?: 'SlotMutations', rename: string } | null };

export type CreateCardMutationVariables = Exact<{
  slotId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateCardMutation = { __typename?: 'Mutation', slotMutations?: { __typename?: 'SlotMutations', createCard: number } | null };

export type RenameCardMutationVariables = Exact<{
  cardId: Scalars['Int'];
  newTitle: Scalars['String'];
}>;


export type RenameCardMutation = { __typename?: 'Mutation', cardMutations?: { __typename?: 'CardMutations', rename: string } | null };

export type MoveCardMutationVariables = Exact<{
  cardId: Scalars['Int'];
  newSlotId: Scalars['Int'];
}>;


export type MoveCardMutation = { __typename?: 'Mutation', cardMutations?: { __typename?: 'CardMutations', moveSlot: number } | null };

export type CreateTaskMutationVariables = Exact<{
  cardId: Scalars['Int'];
  title: Scalars['String'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', cardMutations?: { __typename?: 'CardMutations', createTask: number } | null };

export type RenameTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
  newTitle: Scalars['String'];
}>;


export type RenameTaskMutation = { __typename?: 'Mutation', taskMutations?: { __typename?: 'TaskMutations', update: string } | null };

export type FinishTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type FinishTaskMutation = { __typename?: 'Mutation', taskMutations?: { __typename?: 'TaskMutations', finish: boolean } | null };

export type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: number, title: string }> };

export type TaskFragment = { __typename?: 'Task', id: number, title: string, finished: boolean };

export type CardFragment = { __typename?: 'Card', id: number, title: string, tasks: Array<{ __typename?: 'Task', id: number, title: string, finished: boolean }> };

export type SlotFragment = { __typename?: 'Slot', id: number, title: string, cards: Array<{ __typename?: 'Card', id: number, title: string, tasks: Array<{ __typename?: 'Task', id: number, title: string, finished: boolean }> }> };

export type BoardFragment = { __typename?: 'Board', id: number, title: string, slots: Array<{ __typename?: 'Slot', id: number, title: string, cards: Array<{ __typename?: 'Card', id: number, title: string, tasks: Array<{ __typename?: 'Task', id: number, title: string, finished: boolean }> }> }> };

export type ProjectByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById?: { __typename?: 'Project', title: string, boards: Array<{ __typename?: 'Board', id: number, title: string, slots: Array<{ __typename?: 'Slot', id: number, title: string, cards: Array<{ __typename?: 'Card', id: number, title: string, tasks: Array<{ __typename?: 'Task', id: number, title: string, finished: boolean }> }> }> }> } | null };

export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  title
  finished
}
    `;
export const CardFragmentDoc = gql`
    fragment Card on Card {
  id
  title
  tasks {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
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
    mutation RenameProject($projectId: Int!, $newTitle: String!) {
  projectMutations(id: $projectId) {
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
 *      projectId: // value for 'projectId'
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
export const RenameBoardsDocument = gql`
    mutation RenameBoards($boardId: Int!, $newTitle: String!) {
  boardMutations(id: $boardId) {
    rename(newTitle: $newTitle)
  }
}
    `;
export type RenameBoardsMutationFn = Apollo.MutationFunction<RenameBoardsMutation, RenameBoardsMutationVariables>;

/**
 * __useRenameBoardsMutation__
 *
 * To run a mutation, you first call `useRenameBoardsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameBoardsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameBoardsMutation, { data, loading, error }] = useRenameBoardsMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      newTitle: // value for 'newTitle'
 *   },
 * });
 */
export function useRenameBoardsMutation(baseOptions?: Apollo.MutationHookOptions<RenameBoardsMutation, RenameBoardsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameBoardsMutation, RenameBoardsMutationVariables>(RenameBoardsDocument, options);
      }
export type RenameBoardsMutationHookResult = ReturnType<typeof useRenameBoardsMutation>;
export type RenameBoardsMutationResult = Apollo.MutationResult<RenameBoardsMutation>;
export type RenameBoardsMutationOptions = Apollo.BaseMutationOptions<RenameBoardsMutation, RenameBoardsMutationVariables>;
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
export const RenameSlotDocument = gql`
    mutation RenameSlot($slotId: Int!, $newTitle: String!) {
  slotMutations(id: $slotId) {
    rename(newTitle: $newTitle)
  }
}
    `;
export type RenameSlotMutationFn = Apollo.MutationFunction<RenameSlotMutation, RenameSlotMutationVariables>;

/**
 * __useRenameSlotMutation__
 *
 * To run a mutation, you first call `useRenameSlotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameSlotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameSlotMutation, { data, loading, error }] = useRenameSlotMutation({
 *   variables: {
 *      slotId: // value for 'slotId'
 *      newTitle: // value for 'newTitle'
 *   },
 * });
 */
export function useRenameSlotMutation(baseOptions?: Apollo.MutationHookOptions<RenameSlotMutation, RenameSlotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameSlotMutation, RenameSlotMutationVariables>(RenameSlotDocument, options);
      }
export type RenameSlotMutationHookResult = ReturnType<typeof useRenameSlotMutation>;
export type RenameSlotMutationResult = Apollo.MutationResult<RenameSlotMutation>;
export type RenameSlotMutationOptions = Apollo.BaseMutationOptions<RenameSlotMutation, RenameSlotMutationVariables>;
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
export const RenameCardDocument = gql`
    mutation RenameCard($cardId: Int!, $newTitle: String!) {
  cardMutations(id: $cardId) {
    rename(newTitle: $newTitle)
  }
}
    `;
export type RenameCardMutationFn = Apollo.MutationFunction<RenameCardMutation, RenameCardMutationVariables>;

/**
 * __useRenameCardMutation__
 *
 * To run a mutation, you first call `useRenameCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameCardMutation, { data, loading, error }] = useRenameCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      newTitle: // value for 'newTitle'
 *   },
 * });
 */
export function useRenameCardMutation(baseOptions?: Apollo.MutationHookOptions<RenameCardMutation, RenameCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameCardMutation, RenameCardMutationVariables>(RenameCardDocument, options);
      }
export type RenameCardMutationHookResult = ReturnType<typeof useRenameCardMutation>;
export type RenameCardMutationResult = Apollo.MutationResult<RenameCardMutation>;
export type RenameCardMutationOptions = Apollo.BaseMutationOptions<RenameCardMutation, RenameCardMutationVariables>;
export const MoveCardDocument = gql`
    mutation MoveCard($cardId: Int!, $newSlotId: Int!) {
  cardMutations(id: $cardId) {
    moveSlot(newSlotId: $newSlotId)
  }
}
    `;
export type MoveCardMutationFn = Apollo.MutationFunction<MoveCardMutation, MoveCardMutationVariables>;

/**
 * __useMoveCardMutation__
 *
 * To run a mutation, you first call `useMoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCardMutation, { data, loading, error }] = useMoveCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      newSlotId: // value for 'newSlotId'
 *   },
 * });
 */
export function useMoveCardMutation(baseOptions?: Apollo.MutationHookOptions<MoveCardMutation, MoveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveCardMutation, MoveCardMutationVariables>(MoveCardDocument, options);
      }
export type MoveCardMutationHookResult = ReturnType<typeof useMoveCardMutation>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<MoveCardMutation, MoveCardMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($cardId: Int!, $title: String!) {
  cardMutations(id: $cardId) {
    createTask(title: $title)
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const RenameTaskDocument = gql`
    mutation RenameTask($taskId: Int!, $newTitle: String!) {
  taskMutations(id: $taskId) {
    update(newTitle: $newTitle)
  }
}
    `;
export type RenameTaskMutationFn = Apollo.MutationFunction<RenameTaskMutation, RenameTaskMutationVariables>;

/**
 * __useRenameTaskMutation__
 *
 * To run a mutation, you first call `useRenameTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameTaskMutation, { data, loading, error }] = useRenameTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      newTitle: // value for 'newTitle'
 *   },
 * });
 */
export function useRenameTaskMutation(baseOptions?: Apollo.MutationHookOptions<RenameTaskMutation, RenameTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameTaskMutation, RenameTaskMutationVariables>(RenameTaskDocument, options);
      }
export type RenameTaskMutationHookResult = ReturnType<typeof useRenameTaskMutation>;
export type RenameTaskMutationResult = Apollo.MutationResult<RenameTaskMutation>;
export type RenameTaskMutationOptions = Apollo.BaseMutationOptions<RenameTaskMutation, RenameTaskMutationVariables>;
export const FinishTaskDocument = gql`
    mutation FinishTask($taskId: Int!) {
  taskMutations(id: $taskId) {
    finish
  }
}
    `;
export type FinishTaskMutationFn = Apollo.MutationFunction<FinishTaskMutation, FinishTaskMutationVariables>;

/**
 * __useFinishTaskMutation__
 *
 * To run a mutation, you first call `useFinishTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishTaskMutation, { data, loading, error }] = useFinishTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useFinishTaskMutation(baseOptions?: Apollo.MutationHookOptions<FinishTaskMutation, FinishTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishTaskMutation, FinishTaskMutationVariables>(FinishTaskDocument, options);
      }
export type FinishTaskMutationHookResult = ReturnType<typeof useFinishTaskMutation>;
export type FinishTaskMutationResult = Apollo.MutationResult<FinishTaskMutation>;
export type FinishTaskMutationOptions = Apollo.BaseMutationOptions<FinishTaskMutation, FinishTaskMutationVariables>;
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