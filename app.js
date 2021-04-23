/* eslint-disable linebreak-style */
/* eslint-disable prefer-const */
/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    // row.innerHTML = `<td>${book.title}</td>
    // <td>${book.author}</td>
    // <td>${book.isbn}</td>`;

    for (const item of Object.keys(book)) {
      const td = document.createElement('td');
      td.innerHTML = book[item];
      row.appendChild(td);
    }

    const td = document.createElement('td');
    td.innerHTML = '<a href= "#" class= "delete">X</a>';
    row.appendChild(td);

    list.appendChild(row);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showAlert(message, className) {
    const div = document.createElement('div');

    div.className = `alert ${className}`; // iki ayrı class name oldu

    div.innerHTML = message;

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 5000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
      return true;
    }
    return false;
  }
}

class Store {
  static getBooks() {
    let books;
    books = localStorage.getItem('books') === null ? [] : JSON.parse(localStorage.getItem('books'));
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) books.splice(index, 1);
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Fields can not be empty', 'error');
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.clearFields();

    ui.showAlert('Book succesfully added', 'success');
  }
});

document.getElementById('book-list').addEventListener('click', (e) => {
  const ui = new UI();

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  const isDeleted = ui.deleteBook(e.target);

  if (isDeleted) ui.showAlert('Book removed!', 'success');
});

document.addEventListener('DOMContentLoaded', Store.displayBooks);
