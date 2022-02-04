use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::project::{select_all_projects, Project};

pub struct Query;

#[graphql_object(Context = MyGraphQLContext)]
impl Query {
    pub fn hello() -> &str {
        "world"
    }

    pub async fn projects(context: &MyGraphQLContext) -> FieldResult<Vec<Project>> {
        context
            .connection
            .run(|c| select_all_projects(&c))
            .await
            .map_err(|error| on_graphql_error(error, "TODO!"))
    }
}
