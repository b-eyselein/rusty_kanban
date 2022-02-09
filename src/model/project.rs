use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::board::{insert_board, select_boards_for_projects, Board};
use crate::model::slot::insert_slots;

#[derive(Debug, Queryable)]
pub struct Project {
    id: i32,
    title: String,
}

const DEFAULT_SLOT_NAMES: [&str; 4] = ["Planned", "In Process", "Ready to test", "Complete"];

// GraphQL

#[graphql_object(Context = MyGraphQLContext)]
impl Project {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn title(&self) -> &String {
        &self.title
    }

    pub async fn boards(&self, context: &MyGraphQLContext) -> FieldResult<Vec<Board>> {
        let project_id = self.id;

        context
            .connection
            .run(move |c| select_boards_for_projects(c, &project_id))
            .await
            .map_err(|error| on_graphql_error(error, "Could not select boards for project!"))
    }
}

pub struct ProjectMutations(pub Project);

impl std::ops::Deref for ProjectMutations {
    type Target = Project;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[graphql_object(Context = MyGraphQLContext)]
impl ProjectMutations {
    pub async fn create_board(&self, title: String, with_default_slots: Option<bool>, context: &MyGraphQLContext) -> FieldResult<i32> {
        let project_id = self.id;

        let with_default_slots = with_default_slots.unwrap_or(false);

        context
            .connection
            .run(move |c| {
                c.transaction::<_, diesel::result::Error, _>(|| {
                    let board_id = insert_board(c, &project_id, &title)?;

                    if with_default_slots {
                        insert_slots(c, &board_id, &DEFAULT_SLOT_NAMES)?;
                    }

                    Ok(board_id)
                })
            })
            .await
            .map_err(|error| on_graphql_error(error, "Could not create board!"))
    }

    pub async fn rename(&self, new_title: String, context: &MyGraphQLContext) -> FieldResult<String> {
        let project_id = self.id;

        context
            .connection
            .run(move |c| update_project_title(c, &project_id, &new_title))
            .await
            .map_err(|error| on_graphql_error(error, "Could not update project title!"))
    }
}

// Queries

pub fn select_all_projects(conn: &PgConnection) -> QueryResult<Vec<Project>> {
    use crate::schema::projects::dsl::*;

    projects.load(conn)
}

pub fn select_project_by_id(conn: &PgConnection, the_id: &i32) -> QueryResult<Option<Project>> {
    use crate::schema::projects::dsl::*;

    projects.find(the_id).first(conn).optional()
}

pub fn insert_project(conn: &PgConnection, the_title: &str) -> QueryResult<i32> {
    use crate::schema::projects::dsl::*;

    diesel::insert_into(projects).values(title.eq(the_title)).returning(id).get_result(conn)
}

pub fn update_project_title(conn: &PgConnection, the_id: &i32, new_title: &str) -> QueryResult<String> {
    use crate::schema::projects::dsl::*;

    diesel::update(projects.find(the_id)).set(title.eq(new_title)).returning(title).get_result(conn)
}
