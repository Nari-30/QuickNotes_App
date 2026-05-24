const API_URL = "http://localhost:8080/api";

let editMode = false;
let editingNoteId = null;

// SIGNUP
async function signup() {

    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.text();

    alert(data);

    if (
        data.toLowerCase().includes("successfully") ||
        data.toLowerCase().includes("already exists")
    ) {

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    }
}

// LOGIN
async function login() {

    const username = document.getElementById("loginUsername").value.trim();

    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {

        alert("Please fill all fields");

        return;
    }

    const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.text();

    // If backend returns errors
    if (
        data.includes("Invalid") ||
        data.includes("not found")
    ) {

        alert(data);

        return;
    }

    // Store JWT token
    localStorage.setItem("token", data);

    // Store username separately
    localStorage.setItem("username", username);

    // Redirect
    window.location.href = "dashboard.html";
}

// LOAD NOTES
async function loadNotes() {

    const username = localStorage.getItem("username");

    const token = localStorage.getItem("token");

    if (!username || !token) {

        window.location.href = "index.html";

        return;
    }

    try {

        const response = await fetch(`${API_URL}/notes/${username}`, {

            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Unauthorized
        if (response.status === 401) {

            alert("Session expired. Please login again.");

            logout();

            return;
        }

        const notes = await response.json();

        const notesContainer =
            document.getElementById("notesContainer");

        if (notes.length === 0) {

            notesContainer.innerHTML = `
                <div class="empty-state">
                    No notes available
                </div>
            `;

            return;
        }

        let notesHTML = "";

        notes.forEach(note => {

            notesHTML += `
                <div class="note-card">

                    <div class="card-actions">

                        <button class="icon-btn edit-btn"
                            onclick='editNote(
                                ${note.id},
                                ${JSON.stringify(note.title)},
                                ${JSON.stringify(note.content)}
                            )'>
                            📝
                        </button>

                        <button class="icon-btn delete-btn"
                            onclick="deleteNote(${note.id})">
                            ❌
                        </button>

                    </div>

                    <div class="note-title">${note.title}</div>

                    <div class="note-content">${note.content}</div>

                </div>
            `;
        });

        notesContainer.innerHTML = notesHTML;

    } catch (error) {

        console.error(error);
    }
}
// ADD / UPDATE NOTE
async function addNote() {

    const username = localStorage.getItem("username");

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Please fill all fields");
        return;
    }

    if (editMode) {

        await fetch(`${API_URL}/notes/${editingNoteId}`, {
            method: "PUT",
            headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
},
            body: JSON.stringify({
                title,
                content
            })
        });

        editMode = false;
        editingNoteId = null;

        document.getElementById("mainBtn").innerText = "+ Add Note";

    } else {

        await fetch(`${API_URL}/notes/${username}`, {
            method: "POST",
            headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
},
            body: JSON.stringify({
                title,
                content
            })
        });
    }

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    loadNotes();
}

// EDIT NOTE
function editNote(id, title, content) {

    document.getElementById("title").value = title;

    document.getElementById("content").value = content;

    editMode = true;

    editingNoteId = id;

    document.getElementById("mainBtn").innerText = "Update Note";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// DELETE NOTE
async function deleteNote(id) {

    const confirmDelete = confirm("Delete this note?");

    if (!confirmDelete) return;

    await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization":
                `Bearer ${localStorage.getItem("token")}`
        }
    });
    loadNotes();
}

// LOGOUT
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// AUTO LOAD NOTES
if (window.location.pathname.includes("dashboard.html")) {
    loadNotes();
}