table! {
    boards (project_id, id) {
        project_id -> Int4,
        id -> Int4,
        name -> Varchar,
    }
}

table! {
    cards (project_id, board_id, id, title) {
        project_id -> Int4,
        board_id -> Int4,
        id -> Int4,
        title -> Varchar,
    }
}

table! {
    projects (id) {
        id -> Int4,
        name -> Varchar,
    }
}

joinable!(boards -> projects (project_id));

allow_tables_to_appear_in_same_query!(boards, cards, projects,);
