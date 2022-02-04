-- Your SQL goes here

create table if not exists projects (
  id   serial primary key,
  name varchar(255) unique not null
);

create table if not exists boards (
  project_id integer references projects (id) on update cascade on delete cascade,
  id         integer,
  name       varchar(255) unique not null,

  primary key (project_id, id)
);

create table if not exists cards (
  project_id integer,
  board_id   integer,
  id         integer,

  title      varchar(255) unique,

  primary key (project_id, board_id, id, title),
  foreign key (project_id, board_id) references boards (project_id, id) on update cascade on delete cascade
);
