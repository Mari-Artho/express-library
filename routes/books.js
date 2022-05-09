const express = require('express');
const nanoId = require('nanoid');
const { json } = require('express/lib/response');
var router = express.Router();

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

    let printBooks = `
    <div style='display = flex'>
        <h2 style='color:orange'>Our bookshelf</h2>
    `
   
    books.forEach((book)=>{
        printBooks += `
        <section style='display: flex'>
        <div>
        <a href='/books/${book.id}'>
        <p>${book.bookName} </p>
        <img src='/images/${book.images}' width='180px' height='250px'></a>
        </div>
        </section>
        `
    })
    
    printBooks += ` 
    <div><a href = '/books/newBook'>Add a new book</a></div>
    </div>
    `
    res.send(printBooks);
})

router.get('/newBook', (req, res)=>{
    let form = `
    <form action='newBook' method='post'>
    <h2>Add a new book</h2>
    <div><input type='text' name='bookName'>Name</div>
    <div><input type='text' name='author'>Author</div>
    <div><input type='text' name='pages'>Pages</div>
    <div><button type='submit'>SAVE</div>
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

