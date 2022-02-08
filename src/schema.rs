table! {
    boards (id) {
        id -> Int4,
        title -> Varchar,
        project_id -> Int4,
    }
}

table! {
    cards (id) {
        id -> Int4,
        title -> Varchar,
        slot_id -> Int4,
    }
}

table! {
    projects (id) {
        id -> Int4,
        title -> Varchar,
    }
}

table! {
    slots (id) {
        id -> Int4,
        title -> Varchar,
        board_id -> Int4,
    }
}

table! {
    tasks (id) {
        id -> Int4,
        title -> Varchar,
        card_id -> Int4,
    }
}

table! {
    users (username) {
        username -> Varchar,
        pw_hash -> Varchar,
    }
}

joinable!(boards -> projects (project_id));
joinable!(cards -> slots (slot_id));
joinable!(slots -> boards (board_id));
joinable!(tasks -> cards (card_id));

allow_tables_to_appear_in_same_query!(boards, cards, projects, slots, tasks, users,);
