use std::ops::Deref;

use diesel::prelude::*;
use juniper::{graphql_object, FieldResult};

use crate::graphql::{on_graphql_error, MyGraphQLContext};
use crate::model::card::{insert_card, select_cards_for_slot, Card};

#[derive(Debug, Queryable)]
pub struct Slot {
    id: i32,
    title: String,
}

// GraphQL

#[graphql_object(Context = MyGraphQLContext)]
impl Slot {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn title(&self) -> &str {
        &self.title
    }

    pub async fn cards(&self, context: &MyGraphQLContext) -> FieldResult<Vec<Card>> {
        let slot_id = self.id;

        context
            .connection
            .run(move |c| select_cards_for_slot(c, &slot_id))
            .await
            .map_err(|error| on_graphql_error(error, &format!("Could not select cards for slot {slot_id}")))
    }
}

pub struct SlotMutations(pub Slot);

impl Deref for SlotMutations {
    type Target = Slot;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[graphql_object(Context = MyGraphQLContext)]
impl SlotMutations {
    pub async fn create_card(&self, title: String, context: &MyGraphQLContext) -> FieldResult<i32> {
        let slot_id = self.id;

        context
            .connection
            .run(move |c| insert_card(c, &slot_id, &title))
            .await
            .map_err(|error| on_graphql_error(error, "Could not insert card!"))
    }
}

// Queries

pub fn select_slots_for_boards(conn: &PgConnection, the_board_id: &i32) -> QueryResult<Vec<Slot>> {
    use crate::schema::slots::dsl::*;

    slots.filter(board_id.eq(the_board_id)).select((id, title)).load(conn)
}

pub fn select_slot(conn: &PgConnection, the_slot_id: &i32) -> QueryResult<Option<Slot>> {
    use crate::schema::slots::dsl::*;

    slots.find(the_slot_id).select((id, title)).first(conn).optional()
}

pub fn insert_slot(conn: &PgConnection, the_board_id: &i32, the_title: &str) -> QueryResult<i32> {
    use crate::schema::slots::dsl::*;

    diesel::insert_into(slots)
        .values((board_id.eq(the_board_id), title.eq(the_title)))
        .returning(id)
        .get_result(conn)
}
