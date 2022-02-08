#[macro_use]
extern crate diesel;

use std::path::Path;
#[cfg(not(debug_assertions))]
use std::path::PathBuf;

use diesel::PgConnection;
use juniper::EmptySubscription;
use juniper_rocket::{GraphQLRequest, GraphQLResponse};
#[cfg(debug_assertions)]
use juniper_rocket::graphiql_source;
use lazy_static::lazy_static;
use rocket::{get, launch, post, Route, routes, State};
#[cfg(debug_assertions)]
use rocket::{response::Redirect, uri};
#[cfg(not(debug_assertions))]
use rocket::fs::NamedFile;
#[cfg(not(debug_assertions))]
use rocket::response::status::NotFound;
use rocket_cors::CorsOptions;
use rocket_sync_db_pools::database;

use crate::graphql::{Mutation, MyGraphQLContext, Query, Schema};

mod graphql;
mod model;
mod schema;

lazy_static! {
    static ref STATIC_BASE_PATH: &'static Path = Path::new("static");
}

#[database("kanban")]
pub struct DbConn(PgConnection);

#[cfg(debug_assertions)]
#[get("/")]
fn route_index() -> Redirect {
    Redirect::to(uri!(route_graphiql))
}

#[cfg(not(debug_assertions))]
#[get("/")]
async fn route_index() -> Result<NamedFile, NotFound<String>> {
    route_get_file("index.html".into()).await
}

#[cfg(not(debug_assertions))]
#[get("/<file..>", rank = 2)]
async fn route_get_file(file: PathBuf) -> Result<NamedFile, NotFound<String>> {
    let file_path = STATIC_BASE_PATH.join(&file);

    let named_file_result = if file_path.exists() {
        NamedFile::open(file_path)
    } else {
        NamedFile::open(STATIC_BASE_PATH.join("index.html"))
    };

    named_file_result
        .await
        .map_err(|_error| NotFound(format!("file {} could not be found!", &file.display())))
}

#[cfg(debug_assertions)]
#[get("/graphiql")]
fn route_graphiql() -> rocket::response::content::Html<String> {
    graphiql_source("/graphql", None)
}

#[post("/graphql", data = "<request>")]
async fn route_post_graphql(connection: DbConn, request: GraphQLRequest, schema: &State<Schema>) -> GraphQLResponse {
    request.execute(schema, &MyGraphQLContext::new(connection)).await
}

#[cfg(debug_assertions)]
fn gather_routes() -> Vec<Route> {
    routes![route_index, route_post_graphql, route_graphiql]
}

#[cfg(not(debug_assertions))]
fn gather_routes() -> Vec<Route> {
    routes![route_index, route_post_graphql, route_get_file]
}

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions { ..CorsOptions::default() }.to_cors().expect("Could not build CORS!");

    rocket::build()
        .attach(DbConn::fairing())
        .attach(cors)
        .manage(Schema::new(Query, Mutation, EmptySubscription::new()))
        .mount("/", gather_routes())
}
