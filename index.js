const addBookButton = document.querySelector(".add-book-button");
const mainSection = document.querySelector(".main");
const formCard = document.querySelector(".form-background");
const formSubmitButton = document.querySelector(".form-submit-button");
const main = document.querySelector("main");

addBookButton.addEventListener("click", () => ShowForm(formCard));
formCard.addEventListener("click", (e) => HideForm(e), { capture: false });
formSubmitButton.addEventListener("click", (e) => CreateBook(e, formCard));

function HideForm(e) {
  if (e.target == formCard) {
    formCard.style.display = "none";
  }
}

function ShowForm(form) {
  form.style.display = "flex";
}

function areAllInputsFilled(form) {
  const inputFields = [
    ...form.querySelectorAll('input:not([type="checkbox"])'),
  ];

  const requiredFields = inputFields.filter((input) => {
    return input.hasAttribute("required");
  });

  return requiredFields.every((input) => {
    return input.value.length > 0;
  });
}

function CreateBook(e, form) {
  if (areAllInputsFilled(form)) {
    e.preventDefault();

    const title = formCard.querySelector("#title").value;
    const author = formCard.querySelector("#author").value;
    const pages = formCard.querySelector("#pages").value;
    const read = formCard.querySelector("#read").checked;
    const book = new Book(title, author, pages, read);

    book.setupRemovalButton();
    book.setupBook();
  }
}

function SetupRows(destination) {
  const template = { author: this.author, pages: this.pages, read: this.read };
  for (let key in template) {
    if (key === "read") {
      this[key] = replaceBoolWithString(this[key]);
    }

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

function replaceBoolWithString(value) {
  if (value === false) {
    return "No";
  } else {
    return "Yes";
  }
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.setupRemovalButton = function () {
  const removalButton = document.createElement("button");
  removalButton.classList.add("read-toggle");
  removalButton.addEventListener("click", (e) => this.destroyYourself(e));
  removalButton.textContent = "Delete this book";
  this.removalButton = removalButton;
};

Book.prototype.setupBook = function () {
  const bookCardDiv = document.createElement("div");
  bookCardDiv.classList.add("card");

  const cardHeader = document.createElement("h2");
  cardHeader.textContent = this.title;

  const cardMain = document.createElement("div");
  cardMain.classList.add("card-main");

  SetupRows.call(this, cardMain);

  bookCardDiv.appendChild(cardHeader);
  bookCardDiv.appendChild(cardMain);
  bookCardDiv.appendChild(this.removalButton);
  main.appendChild(bookCardDiv);
  this.bookCardDiv = bookCardDiv;
};

Book.prototype.destroyYourself = function () {
  delete this;
  main.removeChild(this.bookCardDiv);
};
