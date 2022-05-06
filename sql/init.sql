CREATE TABLE IF NOT EXISTS company (
    uuid uuid DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    tag VARCHAR NOT NULL UNIQUE,
    funcDOM VARCHAR NOT NULL,
    funcSEG VARCHAR NOT NULL,
    funcTER VARCHAR NOT NULL,
    funcQUA VARCHAR NOT NULL,
    funcQUI VARCHAR NOT NULL,
    funcSEX VARCHAR NOT NULL,
    funcSAB VARCHAR NOT NULL,
    adrRUA VARCHAR NOT NULL,
    adrNUM VARCHAR NOT NULL,
    adrCOM VARCHAR NOT NULL,
    adrBAI VARCHAR NOT NULL,
    adrCID VARCHAR NOT NULL,
    adrEST VARCHAR NOT NULL,
    txENTREGA VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

ALTER TABLE company ALTER COLUMN tag VARCHAR NOT NULL UNIQUE;

INSERT INTO company (name, tag, funcDOM, funcSEG, funcTER, funcQUA, funcQUI, funcSEX, funcSAB, adrRUA, adrNUM, adrCOM, adrBAI, adrCID, adrEST, txENTREGA) VALUES ('Renato Lanches', 'renato-lanches', 'Fechado', 'Fechado', '18:00-23:00', '18:00-23:00', '18:00-23:00', '18:00-23:00', '18:00-23:00', 'Rua dos Pessegueiros', '196', 'Casa 2', 'Serra Negra', 'São Gotardo', 'MG', '7.0');


