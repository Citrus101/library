/* eslint-disable no-param-reassign */

const add = document.querySelector('div > button');
const form = document.querySelector('form');
const container = document.querySelector('.container');
const opacity = document.querySelectorAll('body > :not(form)');
const submit = document.querySelector('form > :last-child');
const cardRead = document.querySelectorAll('.cards >:nth-child(4)');

const formName = document.querySelector('#name');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formRead = document.querySelector('#read');
const formExit = document.querySelector('.exit');

function readFeature(node) {
    node.addEventListener('click', () => {
        if (node.style.backgroundColor === 'rgb(193, 18, 31)') {
            node.style.backgroundColor = '#2b9348';
        } else {
            node.style.backgroundColor = '#c1121f';
        }
    });
}

function removeFeature(node) {
    node.addEventListener('click', () => {
        node.parentElement.remove();
    });
}

// eslint-disable-next-line no-unused-vars
const library = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(name, author, pages, read) {
    if (
        name === ''
        || author === ''
        || pages === ''
        || read === ''
        || !Number.isInteger(parseInt(pages, 10))
    ) {
        console.log(Number.isInteger(pages));
        // eslint-disable-next-line no-alert
        alert('Please fill out the form properly');
        return;
    }
    const book = new Book(name, author, pages, read);
    library.push(book);

    const card = document.createElement('div');
    card.className = 'cards';

    const cardName = document.createElement('h2');
    const cardAuthor = document.createElement('p');
    const cardPages = document.createElement('p');
    // eslint-disable-next-line no-shadow
    const cardRead = document.createElement('p');
    const btnRemove = document.createElement('button');
    cardName.textContent = book.name;
    cardAuthor.textContent = `By: ${book.author}`;
    cardPages.textContent = `No. of pages: ${book.pages}`;
    cardRead.textContent = 'READ';
    btnRemove.textContent = 'Remove';

    if (read === 'Y') {
        cardRead.style.backgroundColor = '#2b9348';
    } else {
        cardRead.style.backgroundColor = '#c1121f';
    }

    card.append(cardName, cardAuthor, cardPages, cardRead, btnRemove);
    container.appendChild(card);

    readFeature(cardRead);
    removeFeature(btnRemove);

    // eslint-disable-next-line consistent-return
    return 1;
}

function Opacity(percentage) {
    // eslint-disable-next-line no-restricted-syntax
    for (const elements of opacity) {
        elements.style.opacity = `${percentage}`;
    }
}

function formSwitch() {
    if (form.style.visibility === 'visible') {
        Opacity(1);
        form.style.visibility = 'hidden';
    } else {
        Opacity(0.1);
        form.style.visibility = 'visible';
    }
}

add.addEventListener('click', formSwitch);

submit.addEventListener('click', (e) => {
    if (
        addBook(
            formName.value,
            formAuthor.value,
            formPages.value,
            formRead.value,
        )
    ) {
        formName.value = '';
        formAuthor.value = '';
        formPages.value = '';
        formRead.value = '';
        formSwitch();
    }
    e.preventDefault();
});

// eslint-disable-next-line no-restricted-syntax
for (const p of cardRead) {
    readFeature(p);
}

formExit.addEventListener('click', (e) => {
    formSwitch();
    e.preventDefault();
});
