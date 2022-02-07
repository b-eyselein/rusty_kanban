use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::board::{select_board_by_id, BoardMutations};
use crate::model::project::{insert_project, select_project_by_id, ProjectMutations};
use crate::model::slot::{select_slot, SlotMutations};

pub struct Mutation;

#[graphql_object(Context = MyGraphQLContext)]
impl Mutation {
    pub async fn create_project(title: String, context: &MyGraphQLContext) -> FieldResult<i32> {
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
            .map_err(|error| on_graphql_error(error, &format!("Could not select project with id {id}!")))?;

        Ok(maybe_project.map(|p| ProjectMutations(p)))
    }

    pub async fn board_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<BoardMutations>> {
        let maybe_board = context
            .connection
            .run(move |c| select_board_by_id(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not select board with id {id}!")))?;

        Ok(maybe_board.map(|b| BoardMutations(b)))
    }

    pub async fn slot_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<SlotMutations>> {
        let maybe_slot = context
            .connection
            .run(move |c| select_slot(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not select slot with id {id}!")))?;

        Ok(maybe_slot.map(|s| SlotMutations(s)))
    }
}
