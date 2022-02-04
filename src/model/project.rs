use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::board::{insert_board, select_boards_for_projects, Board};

#[derive(Debug, Queryable)]
pub struct Project {
    id: i32,
    name: String,
}

// GraphQL

#[graphql_object(Context = MyGraphQLContext)]
impl Project {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn name(&self) -> &String {
        &self.name
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

pub struct ProjectMutations {
    project: Project,
}

impl ProjectMutations {
    pub fn new(project: Project) -> Self {
        Self { project }
    }
}

#[graphql_object(Context = MyGraphQLContext)]
impl ProjectMutations {
    pub async fn create_board(&self, name: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        let project_id = self.project.id;

        context
            .connection
            .run(move |c| insert_board(c, &project_id, &name))
            .await
            .map_err(|error| on_graphql_error(error, "Could not create board!"))
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

pub fn insert_project(conn: &PgConnection, the_name: &str) -> QueryResult<i32> {
    use crate::schema::projects::dsl::*;

    diesel::insert_into(projects).values(name.eq(the_name)).returning(id).get_result(conn)
}
