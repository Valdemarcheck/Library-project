const addBookButton = document.querySelector(".add-book-button");
const mainSection = document.querySelector(".main");
const formCard = document.querySelector(".form-background");
const booksList = [];

addBookButton.onclick = ShowForm.bind(formCard);

function ShowForm() {
  this.style.display = "flex";
}

function Book(title, author, pages, read = false) {
  self.title = title;
  self.author = author;
  self.pages = pages;
  self.read = read;
}
