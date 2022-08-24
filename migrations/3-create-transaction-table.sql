--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

create table transactions
(
    id            string  not null
        constraint transactions_pk
            primary key,
    bankAccountId string  not null
        constraint transactions_bankAccounts_id_fk
            references bankAccounts,
    title         string  not null,
    description   string  not null,
    status        string  not null,
    type          string  not null,
    category      string  not null,
    paymentMethod string  not null,
    currency      string  not null,
    value         integer not null
);

create unique index transactions_id_uindex
    on transactions (id);



--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP INDEX transactions_id_uindex;
DROP TABLE transactions;
