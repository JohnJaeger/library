const library = {
    books: [],
    addBook: function(){
        if (typeof title !== 'string') {
            throw new Error('title must be a string!');
        }
        if (typeof author !== 'string') {
            throw new Error('author must be a string!');
        }
        if (typeof pages !== 'number') {
            throw new Error('pages must be a number!');
        }
        if (typeof haveRead !== 'boolean') {
            throw new Error('haveRead must be a boolean!');
        }
        library.books.push(new Book(title, author, pages, haveRead));
    }
};

function Book(title, author, pages, haveRead){
    if (!(new.target)){
        throw new Error('function must be used with new keyword!');
    } else {
        if (typeof title !== 'string') {
            throw new Error('title must be a string!');
        }
        if (typeof author !== 'string') {
            throw new Error('author must be a string!');
        }
        if (typeof pages !== 'number') {
            throw new Error('pages must be a number!');
        }
        if (typeof haveRead !== 'boolean') {
            throw new Error('haveRead must be a boolean!');
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

library.books.push(new Book("The Hobbit", 310, true));
library.books.push(new Book("Moby-Dick", 635, false));
library.books.push(new Book("1984", 368, true));
library.books.push(new Book("The Odyssey", 416, false));