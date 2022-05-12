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
    logo VARCHAR NOT NULL,
    tel VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

ALTER TABLE company ALTER COLUMN tag VARCHAR NOT NULL UNIQUE;

INSERT INTO company (name, tag, funcDOM, funcSEG, funcTER, funcQUA, funcQUI, funcSEX, funcSAB, adrRUA, adrNUM, adrCOM, adrBAI, adrCID, adrEST, txENTREGA) VALUES ('Renato Lanches', 'renato-lanches', 'Fechado', 'Fechado', '18:00-23:00', '18:00-23:00', '18:00-23:00', '18:00-23:00', '18:00-23:00', 'Rua dos Pessegueiros', '196', 'Casa 2', 'Serra Negra', 'São Gotardo', 'MG', '7.0');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('X-Tudo','24.90','https://www.manollopizzaria.com.br/wp-content/uploads/2021/02/X_TUDO_DE_HAMBURGUER1-1.jpg','Hamburger, Bacon, Ovo, Presunto, Queijo, Alface, Milho, Bata Palha, Maionese.','Sanduiches','renato-lanches');
INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('X-Nada','9.90','https://img.freepik.com/fotos-gratis/tela-vazia-branca_1194-7555.jpg?w=740&t=st=1651028389~exp=1651028989~hmac=47d112cd2480578817b2d6fee893a78860164f73b784bad8bc83192f489906fb','Nada','Sanduiches','renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('X-Ovo',
'16.50',
'https://www.manollopizzaria.com.br/wp-content/uploads/2021/02/xbacon.jpg',
'Ovo, Presunto, Queijo, Maionese.',
'Sanduiches',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('X-Pão',
'14.90',
'https://cdn.casacarne.com.br/media/catalog/product/cache/1/image/1540x1540/3cf1b12246cd9d610f04d92f01db0c71/p/a/pa_o_brioche_max_-_aryzta.jpeg',
'Pão Brioche.',
'Sanduiches',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Hot-Dog Completo',
'9.90',
'https://www.rbsdirect.com.br/imagesrc/35483374.jpg?w=700',
'Pão, Salsicha, Molho de Tomate, Bata Palha, Milho, Maionese, KetChup, Mostarda, Vinagrete.',
'HotDog',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Hot-Dog Basico',
'6.90',
'https://st2.depositphotos.com/1692343/7395/i/450/depositphotos_73953881-stock-photo-barbecue-grilled-hot-dog.jpg',
'Pão, Salsicha, Molho de Tomate, Bata Palha, Milho',
'HotDog',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Fanta Lata 310ml',
'5.00',
'https://differs-api-production.s3-sa-east-1.amazonaws.com/_fanta310_fd77fbc5-c864-44ca-a1a4-17ce5c5891eb.webp',
'Fanta Lata 310ml',
'Bebidas',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Coca Cola Lata 310ml',
'5.00',
'https://differs-api-production.s3-sa-east-1.amazonaws.com/_coca_cola_310ml_aa9d0daa-dbb7-4600-afeb-1b9f118ba9f0.jpeg',
'Coca Cola Lata 310ml',
'Bebidas',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Suco Del Valle Lata 310ml',
'4.00',
'https://differs-api-production.s3-sa-east-1.amazonaws.com/_suco_del_valle_d3a1e166-c3a8-46ad-af9d-b43d584e42c8.jpeg',
'Suco Del Valle Lata 310ml',
'Bebidas',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Água com Gás 500ml',
'4.00',
'https://differs-api-production.s3-sa-east-1.amazonaws.com/_transferir_a65f1318-b30b-4139-9123-fae83d3ce649.jpeg',
'Água com Gás 500ml',
'Bebidas',
'renato-lanches');

INSERT INTO products (nomeprod, preco, img, ingr, categ, tagcompany) VALUES ('Água sem Gás 500ml',
'4.00',
'https://differs-api-production.s3-sa-east-1.amazonaws.com/_transferir_a65f1318-b30b-4139-9123-fae83d3ce649.jpeg',
'Água sem Gás 500ml',
'Bebidas',
'renato-lanches');

