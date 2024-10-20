const library = {
    books: [],
    addBook: function(title, author, pages, haveRead){
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
        this.books.push(new Book(title, author, pages, haveRead));
    },
    updateLibrary: function(){
        const main = document.querySelector('main');
        const addBook = document.querySelector('.add-book');
    
        //Remove book html elements
        Array.from(main.children)
            .filter(child => child !== addBook)
            .forEach(child => child.remove());

        //Iterate through books and add book html elements
        for (const object of this.books){
            const book = document.createElement('div');
            const bookCover = document.createElement('img');
            const bookInformation = document.createElement('div');
            const bookTitle = document.createElement('span');
            const bookAuthor = document.createElement('span');
            const bookPages = document.createElement('span');
            const bookReadIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
            book.classList.add('book');
            bookCover.classList.add('book-cover');
            bookInformation.classList.add('book-information');
            bookTitle.classList.add('book-title');
            bookAuthor.classList.add('book-author');
            bookPages.classList.add('book-pages');
            bookReadIndicator.classList.add('book-read-indicator');
    
            if (object.haveRead === true){
                bookReadIndicator.classList.add('read');
            }
    
            bookCover.setAttribute('src', 'SVG/book-cover.svg');
            bookCover.setAttribute('alt', 'Default book cover');
            bookReadIndicator.setAttribute('viewBox', '0 0 24 24');
            path.setAttribute('d', 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z');
    
            bookTitle.textContent = object.title;
            bookAuthor.textContent = object.author;
            bookPages.textContent = object.pages + " Pages";
    
            bookReadIndicator.appendChild(path);
            bookInformation.appendChild(bookTitle);
            bookInformation.appendChild(bookAuthor);
            bookInformation.appendChild(bookPages);
            bookInformation.appendChild(bookReadIndicator);
            book.appendChild(bookCover);
            book.appendChild(bookInformation);
            main.insertBefore(book, addBook);
        }
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

library.books.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
library.books.push(new Book("Moby-Dick", "Herman Melville", 635, false));
library.books.push(new Book("1984", "George Orwell", 368, true));
library.books.push(new Book("The Odyssey", "Homer", 416, false));