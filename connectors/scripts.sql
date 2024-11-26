-- create new scheme backendTutorial inside postgres database 
-- create this table inside postgres using pgadmin4

-- DROP TABLE IF EXISTS "backendTutorial"."Employee";

create table if not exists "backendTutorial"."Employee"(

id serial primary key, 
firstName text not null,
middleName text not null,
lastName text not null,
country text not null,
salary integer not null,
birthDate date not null 
);

-- since I didn't add "" to each column 
-- we don't care about case sensitivity of column name 
-- Knex library will return an array of object 
-- where each object is having properties of table column as lowercase



