var express = require('express');
var router = express.Router();

console.log("Hello Borrow!");

//Borrow a book.
router.get("/", (req, res, next)=> {
  //Book can be borrow 2weeks
  let day = new Date();
  day.setDate(day.getDate() + 14);
 
  function returnDate(day, format) {
    format = format.replace(/YYYY/, day.getFullYear());
    format = format.replace(/MM/, day.getMonth() + 1);
    format = format.replace(/DD/, day.getDate());
 
    return format;
  }

  console.log(req);

  //add css
  let htmlHead = `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/stylesheets/style.css">`

  let borrow = `
    <body style="background-color:#e9bdaf;">
    <div style="text-align:center; font:Helvetica; padding:30px; height:50px;">
    <h1>You borrowed a book</h1><h2>Books can be borrowed for 2 weeks.</h2><h2>Please return the book before</h2>
    <h2 style="color:red;">${returnDate(day,'YYYY-MM-DD')}</h2>
    <div class='back-page'><a href="/">Back to home</a></div>
    </div>
    </body>
  `
  res.send(htmlHead + borrow);
})

  module.exports = router;
  