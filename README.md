# Contacts Database
We need to keep track of a person's contacts - their names, phone numbers, and emails. Each phone number and email needs a label to show its type, which should be customizable.

## ER Design
<img src="https://docs.google.com/drawings/d/1xIJdWtBO2F4-xoLhN2m_FogfX2iqobTM4iFs8sd0HoU/export/png"
alt="image alt text"/>

[embed Google drawings in markdown](https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference)

## Relational Schema
* Persons(<u>id</u>, name)
* Phones(<u>id</u>, person_id, number, label)
* Emails(<u>id</u>, person_id, address, label)

## Create Tables
```
CREATE DATABASE contacts;

CREATE TABLE Persons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE Phones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT,
  number VARCHAR(255) NOT NULL,
  label VARCHAR(255),
  FOREIGN KEY (person_id) REFERENCES Persons(id)
);

CREATE TABLE Emails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT,
  address VARCHAR(255) NOT NULL,
  label VARCHAR(255),
  FOREIGN KEY (person_id) REFERENCES Persons(id)
);
```
You can use [db_script.sql](./db_script.sql) to re-create the tables as needed.

## Generate Test Data
Your generate random but relistic looking data using tools like
[mockroo](https://www.mockaroo.com/), which supports exporting data to
CSV files.

Here are a set of CSV files each for a table:
* [Persons](./Persons.csv)
* [Phones](./Phones.csv)
* [Emails](./Emails.csv)

## Populate Database with Test Data
You can use the following commands to bulk load data from the CSV files
to corresponding database tables.
```
mysqlimport -u user_name --ignore-lines=1 --fields-terminated-by=, --verbose --local contacts Persons.csv
mysqlimport -u user_name --ignore-lines=1 --fields-terminated-by=, --verbose --local contacts Phones.csv
mysqlimport -u user_name --ignore-lines=1 --fields-terminated-by=, --verbose --local contacts Emails.csv
```
Note:
* You will need to replace "user_name" with your actual Cloud9 user name,
which can be found under "accout settings".
* You need to run the commands in the directory, under which the CSV files are
  stored.

## Query Database
Try some queries on this "contacts" database to see if it works as expected.

For example:
* Find persons who has a home phone number.
* Find persons who has more than two email addresses.
