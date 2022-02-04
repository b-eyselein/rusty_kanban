use diesel::prelude::*;
use juniper::graphql_object;

use crate::graphql::MyGraphQLContext;

#[derive(Debug, Queryable)]
pub struct Board {
    id: i32,
    name: String,
    #[allow(dead_code)]
    project_id: i32,
}

#[graphql_object(Context = MyGraphQLContext)]
impl Board {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn name(&self) -> &str {
        &self.name
    }
}

pub fn select_boards_for_projects(conn: &PgConnection, the_project_id: &i32) -> QueryResult<Vec<Board>> {
    use crate::schema::boards::dsl::*;

    boards.filter(project_id.eq(the_project_id)).load(conn)
}

pub fn insert_board(conn: &PgConnection, the_project_id: &i32, the_name: &str) -> QueryResult<i32> {
    use crate::schema::boards::dsl::*;

    diesel::insert_into(boards)
        .values((project_id.eq(the_project_id), name.eq(the_name)))
        .returning(id)
        .get_result(conn)
}
