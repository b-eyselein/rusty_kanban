use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::project::{insert_project, select_project_by_id, ProjectMutations};

pub struct Mutation;

#[graphql_object(Context = MyGraphQLContext)]
impl Mutation {
    pub async fn new_project(name: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        context
            .connection
            .run(move |c| insert_project(c, &name))
            .await
            .map_err(|error| on_graphql_error(error, "Could not create project!"))
    }

    pub async fn project_mutations(id: i32, context: &MyGraphQLContext) -> FieldResult<Option<ProjectMutations>> {
        let project = context
            .connection
            .run(move |c| select_project_by_id(c, &id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not select project with id {id}!")))?;

        Ok(project.map(|p| ProjectMutations(p)))
    }
}
