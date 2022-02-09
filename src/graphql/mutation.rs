use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::board::{select_board_by_id, BoardMutations};
use crate::model::card::{select_card, CardMutations};
use crate::model::project::{insert_project, select_project_by_id, ProjectMutations};
use crate::model::slot::{select_slot, SlotMutations};
use crate::model::task::{select_task, TaskMutations};

pub struct Mutation;

#[graphql_object(Context = MyGraphQLContext)]
impl Mutation {
    pub async fn create_project(title: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        // TODO: add default board?
        context
            .connection
            .run(move |c| insert_project(c, &title))
            .await
            .map_err(|error| on_graphql_error(error, "Could not create project!"))
    }

    pub async fn project_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<ProjectMutations>> {
        let maybe_project = context
            .connection
            .run(move |c| select_project_by_id(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find project with id {id}!")))?;

        Ok(maybe_project.map(ProjectMutations))
    }

    pub async fn board_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<BoardMutations>> {
        let maybe_board = context
            .connection
            .run(move |c| select_board_by_id(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find board with id {id}!")))?;

        Ok(maybe_board.map(BoardMutations))
    }

    pub async fn slot_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<SlotMutations>> {
        let maybe_slot = context
            .connection
            .run(move |c| select_slot(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find slot with id {id}!")))?;

        Ok(maybe_slot.map(SlotMutations))
    }

    pub async fn card_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<CardMutations>> {
        let maybe_card = context
            .connection
            .run(move |c| select_card(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find card with id {id}")))?;

        Ok(maybe_card.map(CardMutations))
    }

    pub async fn task_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<TaskMutations>> {
        let maybe_task = context
            .connection
            .run(move |c| select_task(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find task with id {id}")))?;

        Ok(maybe_task.map(TaskMutations))
    }
}
