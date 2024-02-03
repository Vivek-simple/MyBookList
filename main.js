let title = document.querySelector('#title')
let author = document.querySelector('#author')
let isbn = document.querySelector('#isbn')
let form = document.querySelector('#book-form')
let tbody = document.querySelector('#book-list')

let books
document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem('books') === null) {
        books = [];
    }
    else {
        books = JSON.parse(localStorage.getItem('books'));
        books.forEach((item) => {
            add(item)
        })
    }

});


form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (title.value == '' || author.value == '' || isbn.value == '') {
        showAlert('Please fill all the fields', 'danger')
    }
    else {
        let data =
        {
            title: title.value,
            author: author.value,
            isbn: isbn.value
        }
        books.push(data)
        add(data)
        showAlert('Book Added Successfully', 'success')
        localStorage.setItem('books', JSON.stringify(books))
        pro
        title.value = ''
        author.value = ''
        isbn.value = ''
    }
})


function add(data) {
    console.log(data)
    let row = document.createElement('tr')
    row.innerHTML =
        `<td>${data.title}</td>
    <td>${data.author}</td>
    <td>${data.isbn}</td>
    <td><a href="#" class='btn btn-danger btn-sm delete'>X</a></td>`
    tbody.appendChild(row)

}


tbody.addEventListener('click', (e) => {
    Delete(e.target)
})

function Delete(el) {
    let isbn = el.parentElement.parentElement.childNodes[4].textContent
    if (el.classList.contains('delete'))
        if (confirm('Are you sure want to delete this')) {
            el.parentElement.parentElement.remove()
            for (let i = 0; i < books.length; i++) {
                if (books[i].isbn === isbn)
                    console.log(books.splice(i, 1))
            }
            localStorage.setItem('books', JSON.stringify(books))
        }

}

function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
}
