// Book Class : Menggambarkan sebuah buku (dan informasinya)
class BookData {
    constructor(title, author, year, bookId) {
        this.title = title,
        this.author = author,
        this.year = year,
        this.bookId = bookId + new Date() 
    }
}
// UI Class : Menghandle urusan penampilan UI
class UI {
    static displayBooks() {
        const savedBooks = [
            {
                title : 'Harry Potter and The Goblet of Fire',
                author : 'J.K Rowling',
                year : '2000',
                isDone : true,
                bookId : 120120120
            },
            {
                title : 'Example Books 2',
                author : 'Ms Nobody',
                year : '9999', 
                isDone : false,
                bookId : 10000000
            }
        ];
        const books = savedBooks;
        if (savedBooks.isDone == true) {
            books.forEach((book) => UI.addToShelfDone(book));
        } else {
            books.forEach((book) => UI.addToShelfUndone(book));
        }
    }

    // Fungsi untuk menambahkan ke shelf buku belum dibaca
    static addToShelfUndone(book) {
        const bookLists = document.querySelector("#undone-books");

        const bookElement = document.createElement('div');
        bookElement.setAttribute('class', 'book-element');

        bookElement.innerHTML = `
            <h3> ${book.title} </h3>
            <hr />
            <p> Author : ${book.author} </p> 
            <p> Tahun rilis : ${book.year} </p>
            <p> ID : ${book.bookId} </p>
            <hr />
            <button class="btn-delete" id="delete-book">Hapus Buku</button> 
            <button class="btn-move" id="move-book">Sudah selesai <i class="fa-solid fa-check"></i></button>
        `;

        bookLists.appendChild(bookElement);
    }

    static removeBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearInputState() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#year').value = '';
        document.querySelector('#bookId').value = '';
    }

    // Fungsi untuk menambahkan ke shelf buku sudah dibaca
    static addToShelfDone(book) {
        const bookLists = document.querySelector("#done-books");

        const bookElement = document.createElement('div');
        bookElement.setAttribute('class', 'book-element');

        bookElement.innerHTML = `
            <h3> ${book.title} </h3>
            <hr />
            <p> Author : ${book.author} </p> 
            <p> Tahun rilis : ${book.year} </p>
            <p> ID : ${book.bookId} </p>
            <hr />
            <button class="btn-delete" id="delete-book">Hapus Buku <i class="fa-solid fa-trash"></i></button> <button class="btn-move" id="move-book">Belum selesai <i class="fa-solid fa-check"></i></button>
        `;

        bookLists.appendChild(bookElement);
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
    const bookId = document.querySelector('#bookId').value;

    if (title === '' || author === '' || year === '') {
        alert('Kolom input tidak boleh kosong')
    } else {
        const book = new BookData(title, author, year, bookId);

        const checkbox = document.querySelector('#isDone');

            if (checkbox.checked == true) {
                UI.addToShelfDone(book);
            } else {
                UI.addToShelfUndone(book);
            }

    UI.clearInputState();
    }  
});

//  - Menghapus buku
//    1. Hapus buku yang belum dibaca
document.querySelector('#undone-books').addEventListener('click', (e) => {
    UI.removeBook(e.target);
});
//    2. Hapus buku yang sudah dibaca

//  - Memindahkan buku


// Store : Menghandle localStorage


