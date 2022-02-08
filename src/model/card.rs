use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::on_graphql_error;
use crate::model::task::{insert_task, select_tasks_for_card, Task};
use crate::MyGraphQLContext;

#[derive(Debug, Queryable)]
pub struct Card {
    id: i32,
    title: String,
}

// GraphQL

#[graphql_object(Context = MyGraphQLContext)]
impl Card {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn title(&self) -> &str {
        &self.title
    }

    pub async fn tasks(&self, context: &MyGraphQLContext) -> FieldResult<Vec<Task>> {
        let card_id = self.id;

        context
            .connection
            .run(move |c| select_tasks_for_card(c, &card_id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not find tasks for card {card_id}")))
    }
}

pub struct CardMutations(pub Card);

impl std::ops::Deref for CardMutations {
    type Target = Card;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[graphql_object(Context = MyGraphQLContext)]
impl CardMutations {
    pub async fn create_task(&self, content: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        let card_id = self.id;

        context
            .connection
            .run(move |c| insert_task(c, &card_id, &content))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not insert task for card {card_id}")))
    }
}

// Queries

pub fn select_cards_for_slot(conn: &PgConnection, the_slot_id: &i32) -> QueryResult<Vec<Card>> {
    use crate::schema::cards::dsl::*;

    cards.filter(slot_id.eq(the_slot_id)).select((id, title)).load(conn)
}

pub fn select_card(conn: &PgConnection, the_id: &i32) -> QueryResult<Option<Card>> {
    use crate::schema::cards::dsl::*;

    cards.find(the_id).select((id, title)).first(conn).optional()
}

pub fn insert_card(conn: &PgConnection, the_slot_id: &i32, the_title: &str) -> QueryResult<i32> {
    use crate::schema::cards::dsl::*;

    diesel::insert_into(cards)
        .values((slot_id.eq(the_slot_id), title.eq(the_title)))
        .returning(id)
        .get_result(conn)
}
