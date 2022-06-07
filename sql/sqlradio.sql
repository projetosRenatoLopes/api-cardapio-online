CREATE TABLE IF NOT EXISTS media(
    id VARCHAR DEFAULT uuid_generate_v4(),
    iduser VARCHAR NOT NULL,
    media VARCHAR NOT NULL,
    date VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

