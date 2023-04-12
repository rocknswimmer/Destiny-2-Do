-- will add schema and seed here

DROP TABLE IF EXISTS missions;
DROP TABLE IF EXISTS guardians; --already have a deployed users table

CREATE TABLE guardians (
  id SERIAL,
  user_name VARCHAR(20) NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE missions (
  mission VARCHAR(60) NOT NULL DEFAULT NULL,
  complete BOOLEAN NOT NULL DEFAULT false,
  category VARCHAR(60) NOT NULL DEFAULT NULL,
  note TEXT DEFAULT NULL,
  user INTEGER NOT NULL DEFAULT NULL REFERENCES guardians(id)
);

insert into guardians (user_name) values ('andyTest') returning *;

insert into missions (mission, category, user) values ('Vex Calibur/not mission title', 'exotic', 1);

insert into missions (mission, category, user) values ('Beyond Light', 'story', 1);

insert into missions (mission, category, user) values ('Place for vaiour endgame', 'other', 1);

insert into missions (mission, category, user) values ('Crucible Pin', 'weekly', 1);
insert into missions (mission, category, user) values ('NightFall', 'weekly', 1);
