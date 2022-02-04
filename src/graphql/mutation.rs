use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::project::insert_project;

pub struct Mutation;

#[graphql_object(Context = MyGraphQLContext)]
impl Mutation {
    pub async fn new_project(name: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        context
            .connection
            .run(move |c| insert_project(c, &name))
            .await
            .map_err(|error| on_graphql_error(error, "TODO!"))
    }
}
