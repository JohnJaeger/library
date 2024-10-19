const myLibrary = [];

myLibrary.push(new Book("The Hobbit", 310, true));
myLibrary.push(new Book("Moby-Dick", 635, false));
myLibrary.push(new Book("1984", 368, true));
myLibrary.push(new Book("The Odyssey", 416, false));

function Book(name, pages, haveRead){
    if (!(new.target)){
        throw new Error('function must be used with new keyword!');
    } else {
        if (typeof name !== 'string') {
            throw new Error('name must be a string!');
        }
        if (typeof pages !== 'number') {
            throw new Error('pages must be a number!');
        }
        if (typeof haveRead !== 'boolean') {
            throw new Error('haveRead must be a boolean!');
        }
        this.name = name;
        this.pages = pages;
        this.haveRead = haveRead;
        this.info = function(){
            haveRead === true ? console.log(`${name}, ${pages} long, user has read book`)
                            : console.log(`${name}, ${pages} long, user has not read book`);
        }
    }
}