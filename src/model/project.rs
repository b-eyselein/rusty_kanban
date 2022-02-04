use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::MyGraphQLContext;
use crate::model::board::Board;

#[derive(Debug, Queryable)]
pub struct Project {
    id: i32,
    name: String,
}

#[graphql_object(Context = MyGraphQLContext)]
impl Project {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn name(&self) -> &String {
        &self.name
    }

    pub fn boards(&self) -> FieldResult<Vec<Board>> {
        todo!()
    }
}

pub fn select_all_projects(conn: &PgConnection) -> QueryResult<Vec<Project>> {
    use crate::schema::projects::dsl::*;

    projects.load(conn)
}

pub fn insert_project(conn: &PgConnection, the_name: &str) -> QueryResult<i32> {
    use crate::schema::projects::dsl::*;

    diesel::insert_into(projects).values(name.eq(the_name)).returning(id).get_result(conn)
}
