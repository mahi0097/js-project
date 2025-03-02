function notes_generate(text = "Write your note here...") {
    let container = document.querySelector('.container-box'); // Select container to store notes

    let text_div = document.createElement('div');
    text_div.className = 'notes';

    let text_note = document.createElement('p');
    text_note.className = 'input';
    text_note.contentEditable = "true";
    text_note.innerHTML = text;

    let imgtag = document.createElement('img');
    imgtag.src = 'delete_img.jpg';
    imgtag.className = 'delete_img';

    // Remove placeholder text when user clicks inside
    text_note.addEventListener("focus", function () {
        if (text_note.innerHTML === "Write your note here...") {
            text_note.innerHTML = "";
        }
    });

    // Restore placeholder text if user leaves it empty
    text_note.addEventListener("blur", function () {
        if (text_note.innerHTML.trim() === "") {
            text_note.innerHTML = "Write your note here...";
        }
    });

    // Delete function
    imgtag.onclick = function () {
        text_div.remove();
        saveData();
    };

    // Save data on text change
    text_note.addEventListener("input", saveData);

    text_div.appendChild(text_note);
    text_div.appendChild(imgtag);
    
    container.appendChild(text_div); // Append inside container instead of body

    saveData();
}

// Function to save all notes to localStorage
function saveData() {
    let notes = [];
    document.querySelectorAll(".notes").forEach(noteDiv => {
        let noteText = noteDiv.querySelector(".input").innerHTML;
        notes.push(noteText);
    });
    localStorage.setItem("data", JSON.stringify(notes));
}

// Function to load saved notes on page refresh
function loadData() {
    let savedNotes = localStorage.getItem("data");
    if (savedNotes) {
        JSON.parse(savedNotes).forEach(noteText => notes_generate(noteText));
    }
}

// Load notes when page refreshes
window.onload = loadData;
