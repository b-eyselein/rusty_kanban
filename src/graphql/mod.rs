use juniper::{EmptySubscription, FieldError};

pub use crate::graphql::mutation::Mutation;
pub use crate::graphql::query::Query;
use crate::DbConn;

mod mutation;
mod query;

pub struct MyGraphQLContext {
    pub connection: DbConn,
    // pub maybe_user: Option<User>
}

impl MyGraphQLContext {
    pub fn new(connection: DbConn) -> Self {
        Self { connection }
    }
}

impl juniper::Context for MyGraphQLContext {}

pub fn on_graphql_error<E: std::fmt::Display>(error: E, msg: &str) -> FieldError {
    eprintln!("{error}");
    FieldError::from(msg)
}

pub type Schema = juniper::RootNode<'static, Query, Mutation, EmptySubscription<MyGraphQLContext>>;
