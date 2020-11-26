// ID for each note
let noteId = function (note) {
    return Math.random().toString(36).substr(2, 99)
}

let notes = [{
        id: noteId(),
        title: "My first note ",
        body: " "
    }]

// document.querySelector('#create-note').addEventListener('click', function (e) {
// saveNotes(notes)
// /  location.assign(`/edit.html#${id}`)
// })

let newNote;
let newBody;
// Object to search for notes
const filters = {
    searchText: ''
}

// Save notes to Local storage
let storedNotes = function () {
    let notesJSON = localStorage.getItem('.notes')
    if (notesJSON !== null) {
        notes = JSON.parse(notesJSON)
    }
}
storedNotes()

// Show notes on page and filter through each
const showNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        const searchTextMatch = note.title.toLowerCase().includes(filters.searchText.toLowerCase())
        return searchTextMatch
    })

    document.querySelector('#notes').innerHTML = ''

    // Add note title as a p tag to page
    filteredNotes.forEach(function (note) {
        const p = document.createElement('a')
        const b = [{
                body: ''
            }]
        p.textContent = note.title
        let id;
        p.id = note.id
        b.body = note.body

        // Create icon to delete single note
        let trashIt = document.createElement('span')
        trashIt.innerHTML = '<i class="fas fa-minus-square aria-hidden="true"></i>'


        // If title is empty add as untitled note
        if (note.title === "") {
            p.textContent = "Untitled Note"
        }

        // Create link for each note to be edited later as a modal
        p.href = '#'
        p.dataset.toggle = "modal"
        p.dataset.target = "#myModal"

        // Add each elemenet to the end of the body is
        document.querySelector('#notes').appendChild(p)
        document.querySelector('#notes').appendChild(trashIt)
        const br = document.createElement('br')
        document.querySelector('#notes').appendChild(br)

       
        // Each link opens modal with note title and body
        p.addEventListener('click', function () {

//For each p - add modal title and modal body 

let eachTitle = document.querySelector('#modalTitle')
eachTitle.innerHTML = p.textContent
const modalBody = document.querySelector('#modalBody')
modalBody.textContent = b.body

const editNote = document.createElement('input')
editNote.id = p.id
 editNote.value = eachTitle.textContent             
 
               // Edit Note in modal
document.querySelector('#edit-note').addEventListener('click', function (e) {
        if (p.id != editNote.id)   {
      eachTitle.parentNode.replaceChild(editNote, eachTitle)
              
 }   
      
               
              
             })

     })
// const editBody = document.createElement('textarea')
// editBody.textContent = modalBody.textContent
// modalBody.parentNode.replaceChild(modalBody, editBody)

 // Save note in modal
       // document.querySelector('#saveChanges').addEventListener('click', function () {
        //         modalBody.dataset.type = 'input'


      
   // })

        // Remove a note from the list
        const removeNote = function (p) {
            const noteIndex = notes.findIndex(function (note) {
                return p.id === id

            })

            if (noteIndex > -1) {
                notes.splice(noteIndex, 1)
            }
        }

        // Span element deletes single note on click
        trashIt.addEventListener('click', function () {
            removeNote(p.id)
            showNotes(notes, filters)
        })

        // Delete all notes and clear storage
        document.querySelector('#deleteNotes').addEventListener('click', function () {
            localStorage.clear()
            p.remove()
            trashIt.remove()
            br.remove()

        })
    })
}


showNotes(notes, filters)

// Edit Note in modal


// Add note title as a p tag to page

// Create New note with title and body, save to notes array
document.querySelector('#new-note').addEventListener('submit', function (e) {
    e.preventDefault()

    newNote = e.target.elements.text.value
    newBody = e.target.elements.noteBody.value

    notes.push({id: noteId(), title: newNote, body: newBody})
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes(notes, filters)

    e.target.elements.text.value = ''
    e.target.elements.noteBody.value = ''


})


// Search Note
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    showNotes(notes, filters)
})
