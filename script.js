let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]);
  }
}

const bookLibrary = document.getElementById("bookLibrary");

const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener("click", () => {
  formContainer.style.visibility = "visible";
});

let bookForm = document.getElementById("bookForm");

const formContainer = document.getElementById("formContainer");
formContainer.addEventListener("click", (e) => {
  if (e.target !== formContainer) {
    return;
  }
  formContainer.style.visibility = "hidden";
});

const formAddBookButton = document.getElementById("formAddBookButton");

function createBook(title, author, pages, read, book) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  let bookTitle = document.createElement("p");
  bookTitle.textContent = title;
  let bookAuthor = document.createElement("p");
  bookAuthor.textContent = author;

  let bookPages = document.createElement("p");
  bookPages.textContent = pages;

  let bookRead = document.createElement("p");
  bookRead.classList.add("bookStatus");

  if (read === true) {
    bookRead.textContent = "Read";
    bookCard.classList.add("read");
  } else if (read === false) {
    bookRead.textContent = "Not Read";
    bookCard.classList.add("notRead");
  }

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    book.deleteBook(bookCard);
  });

  let statusButton = document.createElement("button");
  statusButton.textContent = "Change Status";
  statusButton.addEventListener("click", () => {
    book.changeStatus(bookCard, bookRead);
  });

  if (title === "" || author === "" || pages === "") {
    alert("Please complete the form.");
    return;
  }

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookRead);
  bookCard.appendChild(statusButton);
  bookCard.appendChild(deleteButton);
  bookLibrary.appendChild(bookCard);
}

function addBook() {
  const bookTitle = document.getElementById("formBookTitleInput").value;
  const bookAuthor = document.getElementById("formBookAuthorInput").value;
  const bookPages = document.getElementById("formBookPagesInput").value;
  const bookRead = document.getElementById("formBookReadInput").checked;

  let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(book);
  createBook(bookTitle, bookAuthor, bookPages, bookRead, book);
}

formAddBookButton.addEventListener("click", addBook);

Book.prototype.changeStatus = function (bookCard, bookRead) {
  if (this.read === true) {
    bookCard.classList.remove("read");
    bookCard.classList.add("notRead");
    bookRead.textContent = "Not read";
    this.read = false;
  } else if (this.read === false) {
    bookCard.classList.remove("notRead");
    bookCard.classList.add("read");
    bookRead.textContent = "Read";
    this.read = true;
  }
};

Book.prototype.deleteBook = function (bookCard) {
  let bookLibrary = document.getElementById("bookLibrary");
  let bookIndex = myLibrary.indexOf(this);
  myLibrary.splice(bookIndex, 1);
  bookLibrary.removeChild(bookCard);
};
