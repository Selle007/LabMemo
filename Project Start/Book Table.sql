create database Bookstore
use Bookstore

create table Books(
ISBN int not null,
BookName varchar(100) not null,
AuthorName varchar(100) not null,
BookDescription varchar(100) not null,
Category varchar(100) not null,
Amount int not null,
Price int not null
)

insert into Books values ('123456789','Think and Grow Rich','Napoleon Hill','A book about being rich','Finance','15','40')

select * from Book

drop table Book
