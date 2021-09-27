let bookmarks = []
const inputElement = document.getElementById('input-element')
const saveInputButton = document.getElementById('save-input-button')
const saveTabButton = document.getElementById('save-tab-button')
const deleteAllButton = document.getElementById('delete-all-button')
const ulElement = document.getElementById('ul-element')
const bookmarksFromLocalStorage = JSON.parse(localStorage.getItem('bookmarks'))

if (bookmarksFromLocalStorage) {
    bookmarks = bookmarksFromLocalStorage
    render(bookmarks)
}

saveTabButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        bookmarks.push(tabs[0].url)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        render(bookmarks)
    })
})

function render(bookmarks) {
    let listItems = ''
    for (let i = 0; i < bookmarks.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href="${bookmarks[i]}" class="d-flex">
                ${bookmarks[i]}
            </a>
        </li>
        `
    }
    ulElement.innerHTML = listItems
}

deleteAllButton.addEventListener('click', function () {
    localStorage.clear()
    bookmarks = []
    render(bookmarks)
})

saveInputButton.addEventListener('click', function () {
    if (inputElement.value) {
        bookmarks.push(inputElement.value)
        inputElement.value = ''
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        render(bookmarks)
    }
})

