# 🎫 Customer Service Ticketing System (DSA Implementation)

A professional web-based ticketing system built to demonstrate core **Data Structures and Algorithms**. This project simulates a real-world customer service desk with priority handling and administrative controls.

## 🚀 Key Features & DSA Implementation

### 1. Multi-Queue Management
* **Normal Queue (FIFO):** Standard linear queue for regular customers.
* **VIP Queue (Circular Queue):** Implemented using a Circular Queue data structure with a fixed size (5) to efficiently manage premium requests without wasting memory.

### 2. Resolution History (Stack)
* **Undo Mechanism (LIFO):** All served tickets are pushed onto a **Stack**. The "Undo" feature uses the stack's pop mechanism to revert the last action.

### 3. Admin Dashboard (Sorting Algorithms)
Optimizes system performance using multiple sorting algorithms:
* **Bubble Sort:** Simple adjacent comparison.
* **Insertion Sort:** Efficient for nearly sorted data.
* **Selection Sort:** Used for organizing history records by Ticket ID or Name.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3 (Custom Variables & Grid Layout)
* **Logic:** Vanilla JavaScript (ES6+ Classes)
* **Deployment:** GitHub Pages / Vercel

## 📸 Screenshots
*(Add your project screenshots here)*

## 📂 Project Structure
- `index.html`: UI Structure & Module Panels.
- `style.css`: Modern UI/UX with responsive grid and animations.
- `script.js`: Core logic containing `Ticket`, `Queue`, `CircularQueue`, and `Stack` classes.

## ⚙️ How to Run
1. Clone the repo: https://github.com/Sohaib-Arshid/Customer-Service-Ticketing-System`
2. Open `index.html` in any modern web browser.

---
Developed as a DSA Semester Project.
