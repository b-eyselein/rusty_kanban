use juniper::graphql_object;

use crate::graphql::MyGraphQLContext;

pub struct Board {
    project_id: i32,
    id: i32,
    name: String,
}

#[graphql_object(Context = MyGraphQLContext)]
impl Board {
    pub fn id(&self) -> &i32 {
        &self.id
    }
}
