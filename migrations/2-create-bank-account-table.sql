--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
create table bankAccounts
(
    id     string not null
        constraint bankAccounts_pk
            primary key,
    userId string
        references users
);

create unique index bankAccounts_id_uindex
    on bankAccounts (id);


--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX bankAccounts_id_uindex;
DROP TABLE bankAccounts;
