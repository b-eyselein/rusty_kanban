use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::project::{select_all_projects, select_project_by_id, Project};

pub struct Query;

#[graphql_object(Context = MyGraphQLContext)]
impl Query {
    pub async fn projects(context: &MyGraphQLContext) -> FieldResult<Vec<Project>> {
        context
            .connection
            .run(|c| select_all_projects(&c))
            .await
            .map_err(|error| on_graphql_error(error, "TODO!"))
    }

    pub async fn project_by_id(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<Project>> {
        context
            .connection
            .run(move |c| select_project_by_id(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find project with id {id}")))
    }
}
