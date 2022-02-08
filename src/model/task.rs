use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};

#[derive(Debug, Queryable)]
pub struct Task {
    id: i32,
    title: String,
}

// GraphQL

#[graphql_object(/*Context = MyGraphQLContext*/)]
impl Task {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn title(&self) -> &str {
        &self.title
    }
}

pub struct TaskMutations(pub Task);

impl std::ops::Deref for TaskMutations {
    type Target = Task;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[graphql_object(Context = MyGraphQLContext)]
impl TaskMutations {
    pub async fn update(&self, new_title: String, context: &MyGraphQLContext) -> FieldResult<String> {
        let task_id = self.id;

        context
            .connection
            .run(move |c| update_task_title(c, &task_id, &new_title))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not update title of task with id {task_id}")))
    }
}

// Queries

pub fn select_tasks_for_card(conn: &PgConnection, the_card_id: &i32) -> QueryResult<Vec<Task>> {
    use crate::schema::tasks::dsl::*;

    tasks.filter(card_id.eq(the_card_id)).select((id, title)).load(conn)
}

pub fn select_task(conn: &PgConnection, the_id: &i32) -> QueryResult<Option<Task>> {
    use crate::schema::tasks::dsl::*;

    tasks.find(the_id).select((id, title)).first(conn).optional()
}

pub fn insert_task(conn: &PgConnection, the_card_id: &i32, the_title: &str) -> QueryResult<i32> {
    use crate::schema::tasks::dsl::*;

    diesel::insert_into(tasks)
        .values((card_id.eq(the_card_id), title.eq(the_title)))
        .returning(id)
        .get_result(conn)
}

pub fn update_task_title(conn: &PgConnection, the_id: &i32, new_title: &str) -> QueryResult<String> {
    use crate::schema::tasks::dsl::*;

    diesel::update(tasks.find(the_id)).set(title.eq(new_title)).returning(title).get_result(conn)
}
