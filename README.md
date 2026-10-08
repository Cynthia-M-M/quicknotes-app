# 📝 QuickNotes

> **Capture ideas before they disappear.**

**Author:** Cynthia Moraa  
**Company:** Power Learn Project

A responsive, lightweight note-taking web application built with vanilla HTML, CSS, and JavaScript. Designed with accessibility, real-time feedback, and persistent local storage.

---

## ✨ Features

- **⚡ Instant Note Creation**: Quickly capture thoughts with assigned categories (**Personal**, **Work**, **Study**).
- **🏷️ Color-Coded Categories**: Distinct accent borders for each category with enhanced contrast in both light and dark modes.
- **🕒 Timestamps**: Automatically records and displays the date and time each note was created.
- **🔍 Real-Time Search**: Instant, case-insensitive search across note content and categories, complete with dynamic result counts.
- **🔢 Live Counters & Validation**:
  - Live character count with color-coded warnings (`> 180` chars) and limits (`200` chars max).
  - Live word count.
  - Contextual error messages that automatically clear as you type.
- **🌙 Dark / Light Mode**: Seamless theme switcher that remembers user preference in `localStorage`.
- **⌨️ Keyboard Shortcuts**:
  - `Ctrl + Enter` (or `Cmd + Enter` on macOS): Focus the note input from anywhere on the page.
  - `Escape`: Clear the note input, reset counters, and dismiss errors.
- **🗑️ Delete & Clear All**: Remove individual notes or clear the entire board with a single confirmation.
- **💾 Local Persistence**: Saves all notes and preferences in the browser's `localStorage` so data survives page refreshes.
- **📱 Fully Responsive & Accessible**: Mobile-optimized layout and screen-reader-friendly semantic markup.

---

## 🚀 Getting Started

### Prerequisites

No build tools or package installations required! All you need is a modern web browser.

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Cynthia-M-M/quicknotes-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd quicknotes-app
   ```
3. Open `index.html` in your web browser, or launch it with a live server (e.g. VS Code Live Server).

---

## 📁 Project Structure

```plaintext
quicknotes-app/
├── index.html        # Semantic HTML structure & accessible form elements
├── style.css         # Responsive styles, theme variables, & layout
├── script.js         # State management, event handlers, & LocalStorage sync
└── README.md         # Project documentation
```

---

## 🛠️ Built With

- **HTML5**: Semantic tags, accessible forms, and screen-reader support (`.sr-only`).
- **CSS3**: Flexbox, media queries for responsive design, custom color palettes, and Dark Mode styling.
- **JavaScript (ES6+)**: DOM manipulation, event listeners, array filtering, and `localStorage` API.

---

## 📄 License

This project is licensed under the MIT License. Built during Web Foundations.
