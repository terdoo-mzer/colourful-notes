const notesContainer = document.querySelector('#notesContainer');
const addNoteButton = notesContainer.querySelector('.add-note')

getNotes().forEach(note => {
    const noteElement = createNote(note.id, note.content, note.date, note.noteColor)
    notesContainer.insertBefore(noteElement,addNoteButton);
})

addNoteButton.addEventListener('click', () => addNote());

function getNotes() {
    return JSON.parse(localStorage.getItem('stickynotes-notes') || '[]')
}

function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes))
}

function createNote(id, content, date, noteBgColor) {
    // Create note / textarea
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Take a note...";
    element.style.backgroundColor = noteBgColor;

    // Create element to hold date
    const dateContainer = document.createElement('div');
    // dateContainer.classList.add('date-container');
    const noteDate = document.createElement("small");
    noteDate.classList.add("note-date");
    noteDate.innerHTML = date;
   // dateContainer.append(noteDate);
    element.append(noteDate);
    console.log(noteDate);


    // Listen for changes made in a note and call the edit
    element.addEventListener('change', () => {
        editNote(id, element.value);
    })

    element.addEventListener('dblclick', () => {
        const doDelete = confirm('Do you want to delete note?')
        if(doDelete) {
            delNote(id, element);
        }
    })

    return element
}

function addNote() {
    
    const notes = getNotes();
    var options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: "",
        date: new Date().toLocaleString('en-US', options),
        noteColor: noteBackgroundColor(),
    }
    // console.log(noteObject.noteColor) // Just testing...

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.date, noteObject.noteColor)
    notesContainer.insertBefore(noteElement,addNoteButton);

    notes.push(noteObject);
    saveNotes(notes)
};

function editNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
};

function delNote(id, element) {
    const notes = getNotes().filter(note => note.id !== id);

    saveNotes(notes);
    notesContainer.removeChild(element);
} ; 

function noteBackgroundColor() {
    const colors = [
        '#c3a2b0',
        '#94bbe9',
        '#dbd5a4',
        '#8ca6db',
        '#f2709c',
        '#a8caba',
        '#ddd6f3'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Dark and light theme

let theme = localStorage.getItem('data-theme');
const checkbox = document.getElementById("switch");
const changeThemeToDark = () =>{
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("data-theme", "dark")
    console.log("I give you dark")
}

const changeThemeToLight = () =>{
    document.documentElement.setAttribute("data-theme", "light")
    localStorage.setItem("data-theme", 'light')
    console.log("I give you light")
}

if(theme === 'dark'){
    changeThemeToDark()
}

checkbox.addEventListener('change', ()=> {
    let theme = localStorage.getItem('data-theme');
    if (theme ==='dark'){
        changeThemeToLight()
    }else{
        changeThemeToDark()
    }
   
});
