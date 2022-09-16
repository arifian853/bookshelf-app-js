// Book Class : Menggambarkan sebuah buku (dan informasinya)
class BookData {
    constructor(title, author, year, bookId, isDone) {
        this.title = title,
        this.author = author,
        this.year = year,
        this.isDone = isDone,
        this.bookId = bookId
    }
}
// UI Class : Menghandle urusan penampilan UI elemen/objek
class UI {
    static displayBooks() {
        const books = Store.getBookInfo();

            books.forEach((book) => {
            if (book.isDone == 'true') {
                UI.addToShelfDone(book)
            } else {
                UI.addToShelfUndone(book)
            }
            
        });
        
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
            <button class="btn-delete" id="delete-book" onclick="removeTheBook(${book.bookId})">Hapus Buku <i class="fa-solid fa-trash"></i></button>
            <button class="btn-move" onclick="movingBook(${book.bookId})">Sudah selesai <i class="fa-solid fa-check"></i></button>
        `;

        bookLists.appendChild(bookElement);
    }

    static removeBook(el) {
        if (el.classList.contains('btn-delete')) {
            el.parentElement.remove();
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
            <button class="btn-delete" id="delete-book" onclick="removeTheBook(${book.bookId})">Hapus Buku <i class="fa-solid fa-trash"></i></button> 
            <button class="btn-move" onclick="movingBookToUndone(${book.bookId})">Belum selesai <i class="fa-solid fa-file-export"></i></button>
        `;

        bookLists.appendChild(bookElement);
    }

    static removeDoneBook(ele) {
        if (ele.classList.contains('btn-delete')) {
            ele.parentElement.remove();
        }
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
    const isDone = document.querySelector('#isDone');

    if (title === '' || author === '' || year === '' || bookId === '') {
        alert('Kolom input tidak boleh kosong')
    } else {
            let book;
            
            if (isDone.checked == true) {
                let bookStatus = 'true';
                book = new BookData(title, author, year, bookId, bookStatus);
                UI.addToShelfDone(book);
            } else {
                let bookStatus = 'false';
                book = new BookData(title, author, year, bookId, bookStatus);
                UI.addToShelfUndone(book);
            }

    UI.clearInputState();
    Store.addBook(book);
    }  
});

//  - Menghapus buku
//    1. Hapus buku yang belum dibaca
document.querySelector('#undone-books').addEventListener('click', (e) => {
    UI.removeBook(e.target);
});

//    2. Hapus buku yang sudah dibaca
document.querySelector('#done-books').addEventListener('click', (f) => {
    UI.removeDoneBook(f.target);
});
//    3. Hapus buku universal (dari localStorage)
function removeTheBook(id) {
    Store.removeBook(id);
}
//    4. Hapus seluruh data buku di localStorage (butuh reload web)
document.querySelector('#deleteAll').addEventListener('click', () => {
    Store.removeAllData();
    alert('Seluruh data di localStorage dihapus. \nSilakan reload untuk melihat perubahan');
})

//  - Memindahkan buku
class Move {
    static moveBookToDone(bookId) {
        const books = Store.getBookInfo();

            books.forEach((book) => {
            if (book.bookId == bookId) {
                book.isDone = 'true'
            } 
            localStorage.setItem('books', JSON.stringify(books)); 
        });
    }

    static moveBookToUndone(bookId) {
        const books = Store.getBookInfo();

            books.forEach((book) => {
            if (book.bookId == bookId) {
                book.isDone = 'false'
            } 
            localStorage.setItem('books', JSON.stringify(books)); 
        });
    }
}
// Pindahkan buku dari beum dibaca ke sudah dibaca
function movingBook(done) {
    Move.moveBookToDone(done)
    alert('Buku dipindahkan ke rak sudah dibaca. \nSilakan reload untuk melihat perubahan :)')
}
// Pindahkan buku dari sudah dibaca ke belum dibaca
function movingBookToUndone(dones) {
    Move.moveBookToUndone(dones)
    alert('Buku dipindahkan ke rak belum dibaca. \nSilakan reload untuk melihat perubahan :)')
}

// Store : Menghandle localStorage
class Store {
    static getBookInfo() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBookInfo();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(bookId) {
        const books = Store.getBookInfo();
        books.forEach((book, index) => {
            if (book.bookId == bookId) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
    //Hapus seluruh data
    static removeAllData = () => {
        localStorage.removeItem('books');
    }
}


