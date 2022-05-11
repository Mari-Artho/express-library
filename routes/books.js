const express = require('express');
const nanoId = require('nanoid');
const { json } = require('express/lib/response');
var router = express.Router();

//Book list
let books = [
    {
    id:nanoId.nanoid(),
    bookName: 'Cooking for Mr. Latte',
    author: ' Amanda Hesser',
    pages: 336,
    images: 'amanda.jpg',
    rented: false
    },
    {
    id:nanoId.nanoid(),
    bookName: 'Spark Joy: ',
    author: 'Marie Kondo',
    pages: 304,
    images: 'konmari.jpg',
    rented: false   
    },
    {
    id:nanoId.nanoid(),
    bookName: 'The Children on the Hill ',
    author: 'Jennifer McMahon ',
    pages: 349,
    images: 'children.jpg',
    rented: false   
    },
    {
    id:nanoId.nanoid(),
    bookName: 'A Man Called Ove:',
    author: 'Fredrik Backman  ',
    pages: 337,
    images: 'ove.jpg',
    rented: true   
    },
]

router.get('/', (req, res)=>{
    //add css
    let htmlHead = '<link rel="stylesheet" href="/stylesheets/style.css">'
    
    //print books.
    let printBooks = `
    <div>
        <h2 class='books-h2'>Our bookhelf</h2>
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
    <form style="text-align:center; font:Helvetica; padding:30px; height:50px;" action='newBook' method='post'>
    <h2>Add a new book</h2>
    <div>Name <input type='text' name='bookName'></div>
    <div>Author <input type='text' name='author'></div>
    <div>Pages <input type='text' name='pages'></div>
    <img alt="Books image">
    <div style="margin:30px;"><button type='submit'>SAVE</div>
    <div class='back-page'><a href="/books">Back to bookhelf</a></div>
    `

    res.send(form);
})

router.get('/:id', (req, res)=>{
    let foundBook = books.find((book)=> book.id == req.params.id)
    if(!foundBook){
        return res.send('No book found with id ' + req.params.id)
    }

    let bookInfo = `
    <div>
    <img src='/images/${foundBook.images}' width='180px' height='250px'></a>
    <h3>Title: ${foundBook.bookName}</h3>
    <h3>Author: ${foundBook.author}</h3>
    <h3>${foundBook.pages} pages</h3>
    <h3>${foundBook.rented ? 'Loan' : "Available"}</h3>
    <h3>${foundBook.rented ? 'This book is not available' : `<button>Borrow</button>`}</h3>
    
    </div>
    `

    res.send(bookInfo);
})

router.post('/newBook', (req, res)=>{
    let newBook = {...req.body, id: nanoId.nanoid(), rented:false}
    books.push(newBook)

    res.redirect('/books')
})

module.exports = router

