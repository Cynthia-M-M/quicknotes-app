// 1. Select the elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");
const clearAllBtn = document.querySelector("#clear-all-btn");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");

const STORAGE_KEY = "quicknotes_data";

// 2. Load saved notes
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// 3. Render the notes on the page
function render(filterText = "") {
  // Clear the list
  notesList.innerHTML = "";

  const query = filterText.trim().toLowerCase();

  // Filter notes if there is a search term (matches note text or category)
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(query) ||
    note.category.toLowerCase().includes(query)
  );

  // Handle empty search results vs empty notes
  if (filteredNotes.length === 0 && query !== "") {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No notes match your search.";
    emptyMsg.classList.add("empty-search-msg");
    notesList.appendChild(emptyMsg);
  } else {
    // Build each note card
    filteredNotes.forEach((note) => {
      const li = document.createElement("li");
      li.classList.add("note-card");

      // Assign category border color dynamically
      if (note.category === "Personal") li.classList.add("category-personal");
      if (note.category === "Work") li.classList.add("category-work");
      if (note.category === "Study") li.classList.add("category-study");

      // Header area (category + date)
      const headerDiv = document.createElement("div");
      headerDiv.classList.add("note-header");

      const catLabel = document.createElement("span");
      catLabel.textContent = note.category;
      catLabel.classList.add("note-category-label");

      const dateLabel = document.createElement("span");
      dateLabel.textContent = note.createdAt;
      dateLabel.classList.add("note-date");

      headerDiv.appendChild(catLabel);
      headerDiv.appendChild(dateLabel);

      // Body area (text + delete button)
      const bodyDiv = document.createElement("div");
      bodyDiv.classList.add("note-body");

      const textSpan = document.createElement("p");
      textSpan.textContent = note.text;
      textSpan.classList.add("note-text");

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => deleteNote(note.id));

      bodyDiv.appendChild(textSpan);
      bodyDiv.appendChild(deleteBtn);

      // Assemble card
      li.appendChild(headerDiv);
      li.appendChild(bodyDiv);
      notesList.appendChild(li);
    });
  }

  // Update count message based on search state & total notes
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
    clearAllBtn.style.display = "none";
  } else {
    clearAllBtn.style.display = "block";
    if (query !== "") {
      if (filteredNotes.length === 0) {
        noteCount.textContent = `No notes found (out of ${notes.length} total).`;
      } else if (filteredNotes.length === 1) {
        noteCount.textContent = `Showing 1 of ${notes.length} note${notes.length > 1 ? "s" : ""}.`;
      } else {
        noteCount.textContent = `Showing ${filteredNotes.length} of ${notes.length} notes.`;
      }
    } else {
      if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
      } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
      }
    }
  }
}

// 4. Add and Delete functions
function addNote(text, category) {
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  };
  notes.push(newNote);
  saveNotes();
  render(searchInput.value);
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render(searchInput.value);
}

// --- LIVE COUNTER LOGIC ---
function updateCounts() {
  const text = input.value;
  const length = text.length;

  // Calculate words: trim spaces and split by whitespace
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  charCount.textContent = `${length} / 200 characters`;
  wordCount.textContent = `${words} words`;

  // Reset limit classes
  charCount.classList.remove("warning", "over");

  // Apply limit classes
  if (length > 200) {
    charCount.classList.add("over");
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
  } else {
    if (length > 180) {
      charCount.classList.add("warning");
    }
    // Clear error if text is within bounds and not empty
    if (text.trim().length > 0) {
      errorMessage.textContent = "";
    }
  }
}

// 5. Event Listeners

// FIX: Listen for typing to update the counter live
input.addEventListener("input", updateCounts);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const category = categorySelect.value;

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear error, add note, and reset input
  errorMessage.textContent = "";
  addNote(text, category);

  input.value = "";
  updateCounts(); // FIX: Reset counts to 0 after submitting a note
  input.focus();
});

searchInput.addEventListener("input", (event) => {
  render(event.target.value);
});

// Bonus: Clear all functionality
clearAllBtn.addEventListener("click", () => {
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    searchInput.value = ""; // Reset search if clearing all
    render();
  }
});

// 6. Initial render on page load
render();

// --- NEW FEATURES: DARK MODE & KEYBOARD SHORTCUTS ---

// 1. Select the theme button
const themeToggleBtn = document.querySelector("#theme-toggle");
const THEME_STORAGE_KEY = "quicknotes_theme";

// 2. Load Dark Mode preference on page load
if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀️ Light Mode";
}

// 3. Listen for clicks to toggle theme
themeToggleBtn.addEventListener("click", () => {
  // Toggle the class on the body element
  document.body.classList.toggle("dark-mode");

  // Save the user's choice to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    themeToggleBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
});

// 4. Keyboard Shortcuts
// Pressing 'Escape' while in the input box clears it
input.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    input.value = "";
    errorMessage.textContent = "";
    updateCounts(); // FIX: Reset counts to 0 after clearing via Escape key
  }
});

// Pressing 'Ctrl + Enter' (or Cmd + Enter on Mac) anywhere on the page focuses the input
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    input.focus();
  }
});
