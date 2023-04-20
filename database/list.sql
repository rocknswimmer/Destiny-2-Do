-- will add schema and seed here

DROP TABLE IF EXISTS missions;
DROP TABLE IF EXISTS guardians; --already have a deployed users table

CREATE TABLE guardians (
  id SERIAL,
  user_name VARCHAR(20) NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE missions (
  id SERIAL,
  mission VARCHAR(60) NOT NULL DEFAULT NULL,
  complete BOOLEAN NOT NULL DEFAULT false,
  category VARCHAR(60) NOT NULL DEFAULT NULL,
  note TEXT DEFAULT NULL,
  -- need a proirity column once I see if theres a convenient way
  user_id INTEGER NOT NULL DEFAULT NULL REFERENCES guardians(id)
);

insert into guardians (user_name) values ('andyTest') returning *;

insert into missions (mission, category, user_id) values ('Vex Calibur', 'exotic', 1);

insert into missions (mission, category, user_id) values ('Witch Queen', 'story', 1);
insert into missions (mission, category, user_id) values ('Beyond Light', 'story', 1);
insert into missions (mission, category, user_id) values ('Shadow keep', 'story', 1);

insert into missions (mission, category, user_id) values ('Queens Guard', 'other', 1);
insert into missions (mission, category, user_id) values ('Neomuna Archive Monuments', 'other', 1);
insert into missions (mission, category, user_id) values ('Weapon Crafting Intro', 'other', 1);

insert into missions (mission, category, user_id) values ('Crucible Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Crucible Pinnacle (Trials or Iron)', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Crucible Bounties Powerful', 'weekly', 1);

insert into missions (mission, category, user_id) values ('NightFall Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Strike Playlist Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Vanguard Bounties Powerful', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Story Mission Pinnacle', 'weekly', 1);

insert into missions (mission, category, user_id) values ('Defiant Battlegrounds Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Defiant Battlegrounds Legendary Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('War Table Bounties Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Defiant Battlegrounds Powerful, tier 2 ', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Defiant Battlegrounds Powerful, tier 3 ', 'weekly', 1);

insert into missions (mission, category, user_id) values ('Gunsmith Boutnies Powerful', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Commendations Powerful', 'weekly', 1);

insert into missions (mission, category, user_id) values ('Gambit Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Gambit Bounties Powerful', 'weekly', 1);

insert into missions (mission, category, user_id) values ('Dares Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Dares Powerful, playlist ', 'weekly', 1);

insert into missions (mission, category, user_id) values ('Current Raid Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Weekly Raid Pinnacle', 'weekly', 1);

insert into missions (mission, category, user_id) values ('Current Dungeon Pinnacle', 'weekly', 1);
insert into missions (mission, category, user_id) values ('Weekly Dungeon Pinnacle', 'weekly', 1);