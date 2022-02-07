use std::ops::Deref;

use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::slot::{insert_slot, select_slots_for_boards, Slot};

#[derive(Debug, Queryable)]
pub struct Board {
    id: i32,
    title: String,
}

// GraphQL

#[graphql_object(Context = MyGraphQLContext)]
impl Board {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn title(&self) -> &str {
        &self.title
    }

    pub async fn slots(&self, context: &MyGraphQLContext) -> FieldResult<Vec<Slot>> {
        let board_id = self.id;

        context
            .connection
            .run(move |c| select_slots_for_boards(c, &board_id))
            .await
            .map_err(|error| on_graphql_error(error, "Could not select boards!"))
    }
}

pub struct BoardMutations(pub Board);

impl Deref for BoardMutations {
    type Target = Board;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[graphql_object(Context = MyGraphQLContext)]
impl BoardMutations {
    pub async fn create_slot(&self, title: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        let board_id = self.id;

        context
            .connection
            .run(move |c| insert_slot(c, &board_id, &title))
            .await
            .map_err(|error| on_graphql_error(error, "Could not insert slot!"))
    }
}

// Queries

pub fn select_boards_for_projects(conn: &PgConnection, the_project_id: &i32) -> QueryResult<Vec<Board>> {
    use crate::schema::boards::dsl::*;

    boards.filter(project_id.eq(the_project_id)).select((id, title)).load(conn)
}

pub fn select_board_by_id(conn: &PgConnection, the_id: &i32) -> QueryResult<Option<Board>> {
    use crate::schema::boards::dsl::*;

    boards.find(the_id).select((id, title)).first(conn).optional()
}

pub fn insert_board(conn: &PgConnection, the_project_id: &i32, the_title: &str) -> QueryResult<i32> {
    use crate::schema::boards::dsl::*;

    diesel::insert_into(boards)
        .values((project_id.eq(the_project_id), title.eq(the_title)))
        .returning(id)
        .get_result(conn)
}
