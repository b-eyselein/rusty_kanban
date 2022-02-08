use diesel::prelude::*;
use juniper::graphql_object;

// use crate::graphql::MyGraphQLContext;

#[derive(Debug, Queryable)]
pub struct Task {
    id: i32,
    content: String,
}

#[graphql_object(/*Context = MyGraphQLContext*/)]
impl Task {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn content(&self) -> &str {
        &self.content
    }
}

// Queries

pub fn select_tasks_for_card(conn: &PgConnection, the_card_id: &i32) -> QueryResult<Vec<Task>> {
    use crate::schema::tasks::dsl::*;

    tasks.filter(card_id.eq(the_card_id)).select((id, content)).load(conn)
}

pub fn insert_task(conn: &PgConnection, the_card_id: &i32, the_content: &str) -> QueryResult<i32> {
    use crate::schema::tasks::dsl::*;

    diesel::insert_into(tasks)
        .values((card_id.eq(the_card_id), content.eq(the_content)))
        .returning(id)
        .get_result(conn)
}
