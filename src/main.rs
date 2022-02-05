#[macro_use]
extern crate diesel;

use diesel::PgConnection;
use juniper::EmptySubscription;
use juniper_rocket::{graphiql_source, GraphQLRequest, GraphQLResponse};
use rocket::{get, launch, post, routes, State};
use rocket_cors::CorsOptions;
use rocket_sync_db_pools::database;

use crate::graphql::{Mutation, MyGraphQLContext, Query, Schema};

mod graphql;
mod model;
mod schema;

#[database("kanban")]
pub struct DbConn(PgConnection);

#[get("/graphiql")]
fn route_graphiql() -> rocket::response::content::Html<String> {
    graphiql_source("/graphql", None)
}

#[post("/graphql", data = "<request>")]
async fn route_post_graphql(connection: DbConn, request: GraphQLRequest, schema: &State<Schema>) -> GraphQLResponse {
    request.execute(schema, &MyGraphQLContext::new(connection)).await
}

#[launch]
fn rocket() -> _ {
    let cors = CorsOptions { ..CorsOptions::default() }.to_cors().expect("Could not build CORS!");

    rocket::build()
        .attach(DbConn::fairing())
        .attach(cors)
        .manage(Schema::new(Query, Mutation, EmptySubscription::new()))
        .mount("/", routes![route_graphiql, route_post_graphql])
}
