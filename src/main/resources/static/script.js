const API_URL = "/api";

let editMode = false;
let editingNoteId = null;

// SIGNUP
async function signup() {

    const username =
        document.getElementById("signupUsername").value.trim();

    const password =
        document.getElementById("signupPassword").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

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
            response.ok ||
            data.toLowerCase().includes("success")
        ) {

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }

    } catch (error) {

        console.error(error);

        alert("Signup failed");
    }
}

// LOGIN
async function login() {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    if (!username || !password) {

        alert("Please fill all fields");

        return;
    }

    try {

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

        if (!response.ok) {

            alert(data);

            return;
        }

        // Store JWT token
        localStorage.setItem("token", data);

        // Store username
        localStorage.setItem("username", username);

        // Redirect
        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);

        alert("Login failed");
    }
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
                    
                    <div class="note-time">
                    
                        Created:
                        ${new Date(note.createdAt).toLocaleString()}
                    
                    </div>
                    
                    <div class="note-time">
                    
                        Updated:
                        ${new Date(note.updatedAt).toLocaleString()}
                    
                    </div>

                </div>
            `;
        });

        notesContainer.innerHTML = notesHTML;

    } catch (error) {

        console.error(error);

        alert("Failed to load notes");
    }
}
// SEARCH NOTES
async function searchNotes() {

    const username = localStorage.getItem("username");

    const token = localStorage.getItem("token");

    const keyword =
        document.getElementById("searchInput").value.trim();

    // If empty → load all notes
    if (keyword === "") {

        loadNotes();

        return;
    }

    try {

        const response = await fetch(

            `${API_URL}/notes/search/${username}?keyword=${keyword}`,

            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const notes = await response.json();

        const notesContainer =
            document.getElementById("notesContainer");

        if (notes.length === 0) {

            notesContainer.innerHTML = `
                <div class="empty-state">
                    No matching notes found
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
                    
                    <div class="note-time">
                    
                        Created:
                        ${new Date(note.createdAt).toLocaleString()}
                    
                    </div>
                    
                    <div class="note-time">
                    
                        Updated:
                        ${new Date(note.updatedAt).toLocaleString()}
                    
                    </div>

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

    const title =
        document.getElementById("title").value.trim();

    const content =
        document.getElementById("content").value.trim();

    const token = localStorage.getItem("token");

    if (!title || !content) {

        alert("Please fill all fields");

        return;
    }

    try {

        if (editMode) {

            await fetch(`${API_URL}/notes/${editingNoteId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    title,
                    content
                })
            });

            editMode = false;

            editingNoteId = null;

            document.getElementById("mainBtn").innerText =
                "+ Add Note";

        } else {

            await fetch(`${API_URL}/notes/${username}`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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

    } catch (error) {

        console.error(error);

        alert("Failed to save note");
    }
}

// EDIT NOTE
function editNote(id, title, content) {

    document.getElementById("title").value = title;

    document.getElementById("content").value = content;

    editMode = true;

    editingNoteId = id;

    document.getElementById("mainBtn").innerText =
        "Update Note";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function deleteNote(id) {

    const confirmDelete =
        confirm("Delete this note?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(

            `${API_URL}/notes/${id}`,

            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        const data = await response.text();

        alert(data);

        await loadNotes();

    } catch (error) {

        console.error(error);

        alert("Delete failed");
    }
}

// LOGOUT
function logout() {

    localStorage.removeItem("username");

    localStorage.removeItem("token");

    window.location.href = "index.html";
}

// AUTO LOAD NOTES
if (
    window.location.pathname.includes("dashboard.html")
) {
    loadNotes();
}
