// Book Class : Menggambarkan sebuah buku (dan informasinya)
class BookData {
    constructor(title, author, year) {
        this.title = title,
        this.author = author,
        this.year = year
    }
}
// UI Class : Menghandle urusan penampilan UI
class UI {
    static displayBooks() {
        const savedBooks = [
            {
                title : 'Ehe 1',
                author : 'Mr Ehe',
                year : '2001'
            },
            {
                title : 'Ehe 2',
                author : 'Ms Ehe',
                year : '2003'
            }
        ];
        const books = savedBooks;
        books.forEach((book) => UI.addToShelf(book));
    }
    static addToShelf(book) {
        const bookLists = document.querySelector("#undone-books");

        const bookElement = document.createElement('div');
        bookElement.setAttribute('class', 'book-element');

        bookElement.innerHTML = `
            <h3> Judul Buku : ${book.title} <h3>
            <hr />
            <p> Author : ${book.author} <p> 
            <p> Tahun rilis : ${book.year} <p>
        `;

        bookLists.appendChild(bookElement);
    }

    static clearInputState() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#year').value = '';
    }
}

// Event utama : 
//  - Menampilkan buku
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//  - Menambahkan buku
document.querySelector('#main-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;

    const book = new BookData(title, author, year);
    UI.addToShelf(book);
    UI.clearInputState();
});

//  - Menghapus buku
//  - Memindahkan buku


// Store : Menghandle localStorage


