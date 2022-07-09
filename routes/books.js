const express = require('express');
const nanoId = require('nanoid');
const { json } = require('express/lib/response');
var router = express.Router();
// use local storage API to save data in files on the server side
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./books');

//Book list
let booksDefault = [
    {
    id:nanoId.nanoid(),
    bookName: 'Cooking for Mr. Latte',
    author: ' Amanda Hesser',
    pages: 336,
    images: 'amanda.jpg',
    borrowed: false
    },
    {
    id:nanoId.nanoid(),
    bookName: 'Spark Joy: ',
    author: 'Marie Kondo',
    pages: 304,
    images: 'konmari.jpg',
    borrowed: false   
    },
    {
    id:nanoId.nanoid(),
    bookName: 'The Children on the Hill ',
    author: 'Jennifer McMahon ',
    pages: 349,
    images: 'children.jpg',
    borrowed: false   
    },
    {
    id:nanoId.nanoid(),
    bookName: 'A Man Called Ove:',
    author: 'Fredrik Backman  ',
    pages: 337,
    images: 'ove.jpg',
    borrowed: true   
    },
]

let books;
let bookJSON = localStorage.getItem("key");
if (bookJSON != null){
    let jsObj = JSON.parse(bookJSON);
    console.log(jsObj);
    books = jsObj;
} else {
    books = booksDefault;
}
console.log(books);

//Print books
router.get('/', (req, res)=>{
    //add css
    let htmlHead = '<link rel="stylesheet" href="/stylesheets/style.css">'
    
    //print books.
    let printBooks = `
    <div>
        <h2 class='books-h2'>Our bookshelf📚</h2>
    `

    //Link to add new book.
    printBooks += ` 
    <div class='add-newBook'><a href = '/books/newBook'>Add a new book</a></div>
    </div>
    `
    //Print books.
    books.forEach((book)=>{
        printBooks += `
        <div class='books-list'>
        <div>
        <a href='/books/${book.id}'>
        <img src='/images/${book.images}' width='180px' height='250px'>
        <p>${book.bookName} </p></a>
        <p>${book.borrowed?"Not available":"Available"}</p>
        </div>
        </div>
        `
    })

    //Link to previous page.
    printBooks += `
    <div class='back-page'><a href="/">Back to home</a></div>
    `
    res.send(htmlHead + printBooks);
})

//Form add new book.
router.get('/newBook', (req, res)=>{
    let form = `
    <body style="background-image:url('/images/white2.jpg');">
    <form style="text-align:center; font:Helvetica; margin:30px; height:60px;" action='newBook' method='post'>
    <h2>Add a new book</h2>
    <p>NAME <input type='text' name='bookName'></p>
    <p>AUTHOR <input type='text' name='author'></p>
    <p>PAGES<input type='text' name='pages'></p>
    <img alt="Books image">
    <div style="margin:30px;"><button style="height:30px; width:100px;" type='submit'>SAVE</div>
    <div class='back-page'><a href="/books">Back to bookshelf</a></div>
    <body style="background-color:#e9bdaf;">
    `
    res.send(form);
})

//Print book's detail
router.get('/:id', (req, res)=>{
    let foundBook = books.find((book)=> book.id == req.params.id)
    if(!foundBook){
        return res.send('No book found with id ' + req.params.id)
    }

    let bookInfo = `
    <div style="text-align:center; font:Helvetica; padding:30px; height:50px;">
    <img src='/images/${foundBook.images}' width='180px' height='250px'></a>
    <h3>Title: ${foundBook.bookName}</h3>
    <h3>Author: ${foundBook.author}</h3>
    <h3>${foundBook.pages} pages</h3>

    <h3><form action="/books/borrow/${foundBook.id}" method="POST">
    <button type="submit">${foundBook.borrowed ? 'RETURN' : 'BORROW'}</button>
    </h3>
    <div class='back-page'><a href="/books">Back to bookshelf</a></div>
    </div>`

    res.send(bookInfo);
})

//Save new book
router.post('/newBook', (req, res)=>{
    let newBook = {...req.body, id: nanoId.nanoid(), borrowed:false}
    books.push(newBook)

    res.redirect('/books')
});

//Borrow a book
router.post('/borrow/:id', (req, res)=>{
    let foundBook = books.find((book)=> book.id == req.params.id)
    foundBook.borrowed = !foundBook.borrowed;

    let obj = JSON.stringify(books);
    localStorage.setItem('key', obj)
  
    res.redirect('/books');
    console.log("============================")
    console.log(obj);
  });
  
module.exports = router;

