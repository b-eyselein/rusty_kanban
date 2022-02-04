-- Your SQL goes here

create table if not exists users (
  username varchar(100) primary key,
  pw_hash  varchar(255) not null
);

create table if not exists projects (
  id   serial primary key,
  name varchar(255) not null unique
);

create table if not exists boards (
  id         serial primary key,
  name       varchar(255) not null,
  project_id integer      not null references projects (id) on update cascade on delete cascade,

  unique (project_id, id),
  unique (project_id, name)
);

create table if not exists slots (
  id         serial primary key,
  name       varchar(100) not null,

  board_id   integer      not null references boards (id) on update cascade on delete cascade,
  project_id integer      not null references projects (id) on update cascade on delete cascade,

  unique (project_id, board_id, id),
  unique (project_id, board_id, name),

  foreign key (project_id, board_id) references boards (project_id, id) on update cascade on delete cascade
);


create table if not exists cards (
  id         serial primary key,
  title      varchar(255) not null,

  slot_id    integer      not null references slots (id) on update cascade on delete cascade,
  board_id   integer      not null references boards (id) on update cascade on delete cascade,
  project_id integer      not null references projects (id) on update cascade on delete cascade,

  unique (project_id, board_id, id),
  unique (project_id, board_id, title),

  foreign key (project_id, board_id, slot_id) references slots (project_id, board_id, id) on update cascade on delete cascade
);
