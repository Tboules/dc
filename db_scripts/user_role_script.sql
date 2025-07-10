select * from "user";
select * from account;
select * from session;
select * from "verificationToken";
select * from user_role;

delete from account;
truncate table "user" cascade;

insert into user_role (id, name)
values
    (1, 'user'),
    (2, 'admin');

update "user"
    set role = 1;

update "user"
    set role = 2
where name = 'Anthony Boules';

alter table "user"
add column role int;

