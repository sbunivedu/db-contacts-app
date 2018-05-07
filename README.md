# Contacts Database
We need to keep track of a person's contacts - their names, phone numbers, and emails. Each phone number and email needs a label to show its type, which should be customizable.

## ER Design
<img src="https://docs.google.com/drawings/d/1xIJdWtBO2F4-xoLhN2m_FogfX2iqobTM4iFs8sd0HoU/export/png"
alt="image alt text"/>

[embed Google drawings in markdown](https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference)

## Relational Schema
* Persons(__id__, name)
* Phones(__id__, person_id, number, label)
* Emails(__id__, person_id, address, label)

Note: key attributes are in __bold face__.

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
which can be found under "account settings".
* You need to run the commands in the directory, under which the CSV files are
  stored.

## Query Database
Try some queries on this "contacts" database to see if it works as expected.

For example:
* Find persons who has a home phone number.
* Find persons who has more than two email addresses.

## Access MySQL from Node
### Install `mysql` Module
Install the `mysql` module for Node JS.
```
npm install mysql
```
### Connect to Database
Connected to the "contacts" database as shown in [test1.js](./test1.js). Test
the script with the following command:
```
node test1.js
```
You can copy and paste the result JSON into an [JSON formatter](https://jsoneditoronline.org/)
to examine its content.

### Create `db.js`
For apps with complex need it is a good practice to handle database connections
in a separate file as shown in [db.js](./db.js).

Install `async` module as follows:
```
npm install async
```
Test `db.js` with [`test2.js`](./test2.js).

### Build Models with SQL
With `db.js` we can build any kind of data models without worrying about
connecting the database. See files in `models` for details.

### Build a REST API

```
npm install express --save
npm install body-parser --save
```
You can use online API testing tools, such as https://www.hurl.it, to test the API.

'app.js' starts the API server and 'routes/routes.js' defines the routes. Run
`node app.js` and go to `https://https://database-baochuan.c9users.io:8080/persons`
to see all persons in our database.

Soures:
* https://www.terlici.com/2015/08/13/mysql-node-express.html
* https://www.codementor.io/wapjude/creating-a-simple-rest-api-with-expressjs-in-5min-bbtmk51mq
* https://codeburst.io/build-a-rest-api-for-node-mysql-2018-jwt-6957bcfc7ac9
* https://www.andreasreiterer.at/web-development/connect-react-app-rest-api/
* https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

