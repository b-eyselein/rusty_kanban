use diesel::prelude::*;
use juniper::graphql_object;

#[derive(Debug, Queryable)]
pub struct Card {
    id: i32,
    title: String,
    #[allow(dead_code)]
    slot_id: i32,
}

// GraphQL

#[graphql_object()]
impl Card {
    pub fn id(&self) -> &i32 {
        &self.id
    }

    pub fn title(&self) -> &str {
        &self.title
    }
}

// Queries

pub fn select_cards_for_slot(conn: &PgConnection, the_slot_id: &i32) -> QueryResult<Vec<Card>> {
    use crate::schema::cards::dsl::*;

    cards.filter(slot_id.eq(the_slot_id)).load(conn)
}

pub fn insert_card(conn: &PgConnection, the_slot_id: &i32, the_title: &str) -> QueryResult<i32> {
    use crate::schema::cards::dsl::*;

    diesel::insert_into(cards)
        .values((slot_id.eq(the_slot_id), title.eq(the_title)))
        .returning(id)
        .get_result(conn)
}
