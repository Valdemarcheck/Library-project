const addBookButton = document.querySelector(".add-book-button");
const mainSection = document.querySelector(".main");
const formCard = document.querySelector(".form-background");
const formSubmitButton = document.querySelector(".form-submit-button");
const main = document.querySelector("main");

addBookButton.addEventListener("click", () => ShowForm(formCard));
formCard.addEventListener("click", (e) => HideForm(e), { capture: false });
formSubmitButton.addEventListener("click", (e) => CreateBook(e));

function HideForm(e) {
  if (e.target == formCard) {
    formCard.style.display = "none";
  }
}

function ShowForm(form) {
  form.style.display = "flex";
}

function CreateBook(e) {
  e.preventDefault();

  const title = formCard.querySelector("#title").value;
  const author = formCard.querySelector("#author").value;
  const pages = formCard.querySelector("#pages").value;
  const read = formCard.querySelector("#read").checked;
  const book = new Book(title, author, pages, read);

  book.setupRemovalButton();
  book.setupBook();
}

function SetupRows(destination) {
  for (let key in { author: this.author, pages: this.pages, read: this.read }) {
    const row = document.createElement("div");
    row.classList.add("row");

    const keyP = document.createElement("p");
    const separator = document.createElement("div");
    const valueP = document.createElement("p");

    keyP.textContent = key;
    separator.classList.add("separator");
    valueP.textContent = this[key];

    row.appendChild(keyP);
    row.appendChild(separator);
    row.appendChild(valueP);

    destination.appendChild(row);
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.setupRemovalButton = function () {
  this.removalButton = document.createElement("button");
  this.removalButton.classList.add("read-toggle");
  this.removalButton.addEventListener("click", (e) => this.destroyYourself(e));
  this.removalButton.textContent = "Delete this book";
};

Book.prototype.setupBook = function () {
  this.bookCardDiv = document.createElement("div");
  this.bookCardDiv.classList.add("card");

  const cardHeader = document.createElement("h2");
  cardHeader.textContent = this.title;

  const cardMain = document.createElement("div");
  cardMain.classList.add("card-main");

  SetupRows.call(this, cardMain);

  this.bookCardDiv.appendChild(cardHeader);
  this.bookCardDiv.appendChild(cardMain);
  this.bookCardDiv.appendChild(this.removalButton);
  main.appendChild(this.bookCardDiv);
};

Book.prototype.destroyYourself = function () {
  delete this;
  main.removeChild(this.bookCardDiv);
};
