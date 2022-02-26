delete database `blog-2022`;
create database `blog-2022`;
use `blog-2022`;
create table `user` (
	id varchar(200) not null,
	nick varchar(200) not null,
    pwd varchar(30) not null,
    ava varchar(2000) not null,
    primary key ( id )
);
create table `blog` (
  id varchar(200) not null,
  title varchar(200),
  postdate varchar(22),
  content text not null,
  primary key(id)
);
create table `comment` (
  id varchar(200) not null,
  postdate varchar(22),
  content text not null,
  primary key(id)
);
create table `bc-relation` (
	id varchar(200) not null,
    blogid varchar(200) not null,
    commentid varchar(200) not null,
    relation int (2) not null,
    primary key(id)
);
create table `cc-relation` (
	id varchar(200) not null,
	masterid varchar(200) not null,
    slaveid varchar(200) not null,
    relation int (2) not null,
    primary key(id)
);
create table `pc-relation` (
	id varchar(200) not null,
	userid varchar(200) not null,
    commentid varchar(200) not null,
    relation int (2) not null,
    primary key(id)
);
create table `pb-relation` (
	id varchar(200) not null,
	userid varchar(200) not null,
    blogid varchar(200) not null,
    relation int (2) not null,
    primary key(id)
);
create table `pp-relation` (
	id varchar(200) not null,
	masterid varchar(200) not null,
    slaveid varchar(200) not null,
    relation int (2) not null,
    primary key(id)
);