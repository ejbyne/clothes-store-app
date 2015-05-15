# Clothes Shop Application

## Summary

The is a shopping website built using Node.js and AngularJS.

The Node.js server-side files are contained in the app directory. In accordance with the brief, I have stored the mock product data in a Javascript object (app/models/productDB.js), rather than create a database. The object is intended to simulate a MongoDB database and also contains some basic search functions to mimic the functions of the Mongoose ORM.

For security reasons I also decided to store the shopping cart logic on the server side (app/models/shoppingCart.js), thereby keeping price calculations and other sensitive data/processes secure and minimising the risk of fraudulent activity by users. The files in the routes sub-directory set up an API in order to pass permitted product and cart data back and forth between the server and the front end.

The front-end AngularJS code is stored in the public/app directory. The code is separated into controller, route, services and views sub-directories. The application is single-page and makes use of Angular's two-way data binding to ensure that the product/cart information is constantly updated on screen.

## Features 

- As a User I can add a product to my shopping cart.
- As a User I can remove a product from my shopping cart.
- As a User I can view the total price for the products in my shopping cart.
- As a User I can apply a voucher to my shopping cart.
- As a User I can view the total price for the products in my shopping cart with discounts applied.
- As a User I am alerted when I apply an invalid voucher to my shopping cart.
- As a User I am unable to Out of Stock products to the shopping cart.
- As a User I can select item quantity.
- As a User I can change item quantity.
- As a user I can filter items by category.
- As a user I can sort items by category, alphabet, ascending price or descending price.

## Technologies used

- Web frameworks/libraries: Node.js, Express.js, AngularJS, JQuery, Bootstrap
- Languages: JavaScript, HTML, CSS
- Testing frameworks: Jasmine Node, Karma, Mocha, CasperJS, Chai, JSHint
- Other tools: Grunt

## Instructions

### Installation

This readme assumes you already have Node.js installed.

Once you have copied this directory onto your machine, please change into that directory and install the application's dependencies:
```
$ cd clothes-shop
$ npm install
```

### Run the application

Start the server:
```
$ npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Run the test suite

In order to run the full test suite, you will need to have PhantomJS, Karma and Grunt installed globally on your machine. These can be installed as follows:
```
$ npm install -g phantomjs
$ npm install -g karma-cli
$ npm install -g grunt-cli
```
You can then run all of the tests in one go by typing:
```
$ npm test
```

## To do list

- The application currently only generates one shopping cart each time the server is started. This could be rectified by implementing sessions so that each user has their own cart
- Add persistence for product/shopping cart data using a MongoDB database
- Add individual images for each product
- Add order button and order payment/confirmation screen
- Improve CSS/page design
