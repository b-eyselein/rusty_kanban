-- Your SQL goes here

create table if not exists users (
  username varchar(100) primary key,
  pw_hash  varchar(255) not null
);

create table if not exists projects (
  id    serial primary key,
  title varchar(255) not null unique
);

create table if not exists boards (
  id         serial primary key,
  title      varchar(255) not null,
  project_id integer      not null references projects (id) on update cascade on delete cascade,

  unique (project_id, title)
);

create table if not exists slots (
  id       serial primary key,
  title    varchar(100) not null,
  board_id integer      not null references boards (id) on update cascade on delete cascade,

  unique (board_id, title)
);


create table if not exists cards (
  id      serial primary key,
  title   varchar(255) not null,
  slot_id integer      not null references slots (id) on update cascade on delete cascade,

  unique (slot_id, title)
);

create table if not exists tasks (
  id      serial primary key,
  content varchar(255) not null,
  card_id integer      not null references cards (id) on update cascade on delete cascade,

  unique (card_id, content)
);
