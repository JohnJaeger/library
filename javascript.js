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
    deleteBook: function(event) {
        if (event.target.classList.contains('delete-book-button')){
            const libraryIndex = event.target.parentElement.parentElement.dataset.index;
            this.books.splice(libraryIndex, 1);
        //without else if statement path will sometimes block svg from being the target
        } else if (event.target.parentElement.classList.contains('delete-book-button')){
            const libraryIndex = event.target.parentElement.parentElement.parentElement.dataset.index;
            this.books.splice(libraryIndex, 1);
        }
        this.updateLibrary();
    },
    updateLibrary: function(){
        const main = document.querySelector('main');
        const addBookButton = document.querySelector('.add-book-button');
    
        //Remove book html elements
        Array.from(main.children)
            .filter(child => child !== addBookButton)
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
            const bookReadIndicatorTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            const bookReadIndicatorPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const deleteBookButton = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            const deleteBookButtonTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            const deleteBookButtonPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
            book.classList.add('book');
            bookCover.classList.add('book-cover');
            bookInformation.classList.add('book-information');
            bookTitle.classList.add('book-title');
            bookAuthor.classList.add('book-author');
            bookPages.classList.add('book-pages');
            bookReadIndicator.classList.add('book-read-indicator');
            deleteBookButton.classList.add('delete-book-button');
    
            if (object.haveRead === true){
                bookReadIndicator.classList.add('read');
            }
            
            const libraryIndex = this.books.indexOf(object);

            book.setAttribute('data-index', libraryIndex)
            bookCover.setAttribute('src', 'SVG/book-cover.svg');
            bookCover.setAttribute('alt', 'Default book cover');
            bookReadIndicator.setAttribute('viewBox', '0 0 24 24');
            bookReadIndicatorPath.setAttribute('d', 'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z');
            deleteBookButton.setAttribute('viewBox', '0 0 24 24');
            deleteBookButtonPath.setAttribute('d', 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z');
    
            bookTitle.textContent = object.title;
            bookAuthor.textContent = object.author;
            bookPages.textContent = object.pages + " Pages";
            bookReadIndicatorTitle.textContent = "Toggle Read";
            deleteBookButtonTitle.textContent = "Delete Book";
    
            bookReadIndicator.appendChild(bookReadIndicatorTitle);
            bookReadIndicator.appendChild(bookReadIndicatorPath);
            deleteBookButton.appendChild(deleteBookButtonTitle);
            deleteBookButton.appendChild(deleteBookButtonPath);
            bookInformation.appendChild(bookTitle);
            bookInformation.appendChild(bookAuthor);
            bookInformation.appendChild(bookPages);
            bookInformation.appendChild(bookReadIndicator);
            bookInformation.appendChild(deleteBookButton);
            book.appendChild(bookCover);
            book.appendChild(bookInformation);
            main.insertBefore(book, addBookButton);
        }
    },
};

const addBookDialogComponents = {
    elements: Object.freeze({
        addBookButton: document.querySelector(".add-book-button"),
        dialog: document.querySelector("#add-book-dialog"),
        form: document.querySelector("#add-book-form"),
        titleInput: document.querySelector("#title-input"),
        authorInput: document.querySelector("#author-input"),
        pagesInput: document.querySelector("#pages-input"),
        cancelButton: document.querySelector("#cancel-button"),
        confirmButton: document.querySelector("#confirm-button")
    }),
    showDialog: function() {
        this.elements.dialog.showModal();
        
    },
    closeDialog: function(event) {
        event.preventDefault();
        this.elements.form.reset();
        this.elements.dialog.close();
    },
    confirmDialog: function(event) {
        event.preventDefault();

        const titleInputValue = this.elements.titleInput.value;
        const authorInputValue = this.elements.authorInput.value;
        const pagesInputValue = Number(this.elements.pagesInput.value);
        const haveReadInputValue = Boolean(Number(document.querySelector('input[name="have-read"]:checked').value));
                                    //HTML value is string by default with a value of either "0" or "1". This needs to 
                                    //be changed to a number before it can be changed to a boolean otherwise it will
                                    //always be true.

        library.addBook(titleInputValue, authorInputValue, pagesInputValue, haveReadInputValue);

        library.updateLibrary();

        this.closeDialog(event);
    },
}

const eventListeners = {
    initialize: function(){
        const body = document.querySelector('body');

        body.addEventListener('click', (event) => {
            switch (true){
                case (event.target === addBookDialogComponents.elements.addBookButton ||
                event.target.parentElement === addBookDialogComponents.elements.addBookButton):
                    addBookDialogComponents.showDialog();
                    break;
                case (event.target === addBookDialogComponents.elements.cancelButton):
                    addBookDialogComponents.closeDialog(event);
                    break;
                case (event.target === addBookDialogComponents.elements.confirmButton):
                    addBookDialogComponents.confirmDialog(event);
                    break;
                case event.target.classList.contains('book-read-indicator'):
                    event.target.classList.toggle('read');
                    library.books[event.target.parentElement.parentElement.dataset.index].toggleRead();
                    break;
                case event.target.parentElement.classList.contains('book-read-indicator'):
                    event.target.parentElement.classList.toggle('read');
                    library.books[event.target.parentElement.parentElement.parentElement.dataset.index].toggleRead();
                    break;
                case (event.target.classList.contains('delete-book-button') ||
                event.target.parentElement.classList.contains('delete-book-button')):
                    library.deleteBook(event);
                    break;
            }
        });
    }
}

class Book{
    title;
    author;
    pages;
    haveRead;

    constructor(title, author, pages, haveRead){
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

        if (this.title === ""){
            this.title = "Unknown";
        }
        if (this.author === ""){
            this.author = "Unknown";
        }
        if (Number.isNaN(this.pages) === true || Number(this.pages) === 0){
            this.pages = "Unknown";
        }
    }

    toggleRead(){
        this.haveRead = !this.haveRead;
    }
}

library.books.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
library.books.push(new Book("Moby-Dick", "Herman Melville", 635, false));
library.books.push(new Book("1984", "George Orwell", 368, true));
library.books.push(new Book("The Odyssey", "Homer", 416, false));

library.updateLibrary();

eventListeners.initialize();