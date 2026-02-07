// ==========================================
// CORE DATA STRUCTURES
// ==========================================

class Ticket {
    constructor(name, type, priority) {
        this.id = Math.floor(Math.random() * 9000) + 1000; // 4-digit ID
        this.name = name;
        this.type = type; // 'Normal' or 'VIP'
        this.priority = parseInt(priority); // 1, 2, 3
        this.status = 'Pending'; // Pending, Served
        this.timestamp = new Date();
    }
}

class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) { this.items.push(element); }
    dequeue() { return this.items.shift(); }
    isEmpty() { return this.items.length === 0; }
    getAll() { return this.items; }
}

class CircularQueue {
    constructor(size) {
        this.size = size;
        this.items = new Array(size).fill(null);
        this.count = 0;
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        if (this.isFull()) return false;
        this.items[this.tail] = element;
        this.tail = (this.tail + 1) % this.size;
        this.count++;
        return true;
    }
    dequeue() {
        if (this.isEmpty()) return null;
        const item = this.items[this.head];
        this.items[this.head] = null;
        this.head = (this.head + 1) % this.size;
        this.count--;
        return item;
    }
    isEmpty() { return this.count === 0; }
    isFull() { return this.count === this.size; }
    getAll() {
        // Return valid items in order
        let result = [];
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            result.push(this.items[current]);
            current = (current + 1) % this.size;
        }
        return result;
    }
}

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) { this.items.push(element); }
    pop() { return this.items.pop(); }
    isEmpty() { return this.items.length === 0; }
    getAll() { return [...this.items]; } // Return copy
}

// ==========================================
// GLOBAL STATE
// ==========================================
const normalQueue = new Queue();
const vipQueue = new CircularQueue(5);
const resolvedStack = new Stack();

// ==========================================
// MODULE 1: TICKET CREATION
// ==========================================
function createTicket() {
    const nameInput = document.getElementById('customer-name');
    const type = document.getElementById('ticket-type').value;
    const priority = document.getElementById('priority').value;
    const name = nameInput.value.trim();

    if (!name) { alert("Enter Name!"); return; }

    const ticket = new Ticket(name, type, priority);

    if (type === 'VIP') {
        if (!vipQueue.enqueue(ticket)) {
            alert("VIP Queue Full! (Circular Queue Limit Reached)");
            return;
        }
    } else {
        normalQueue.enqueue(ticket);
    }

    nameInput.value = '';
    updateUI();
}

// ==========================================
// MODULE 2: TICKET SERVING
// ==========================================
function serveTicket() {
    let ticket = null;

    // Priority Rule: VIP first, then Normal
    if (!vipQueue.isEmpty()) {
        ticket = vipQueue.dequeue();
    } else if (!normalQueue.isEmpty()) {
        ticket = normalQueue.dequeue();
    } else {
        alert("No tickets to serve!");
        return;
    }

    // Move to Stack (Module 3)
    if (ticket) {
        ticket.status = 'Resolved';
        resolvedStack.push(ticket);
        updateUI();
    }
}

// ==========================================
// MODULE 3: RESOLUTION & UNDO
// ==========================================
function undoResolve() {
    if (resolvedStack.isEmpty()) {
        alert("Stack Underflow! No resolved tickets to undo.");
        return;
    }

    const ticket = resolvedStack.pop();
    ticket.status = 'Pending';

    // Return to original queue
    if (ticket.type === 'VIP') {
        if (!vipQueue.enqueue(ticket)) {
            alert("Cannot Undo: VIP Queue is Full! Ticket lost.");
        }
    } else {
        // Add to FRONT of normal queue (priority restoration)
        normalQueue.items.unshift(ticket);
    }
    updateUI();
}

// ==========================================
// MODULE 4: ADMIN DASHBOARD (Active Sorting)
// ==========================================

function optimizeQueue() {
    // 1. Check if empty
    if (normalQueue.isEmpty()) {
        alert("Pending Queue is empty! Nothing to optimize.");
        return;
    }

    const criteria = document.getElementById('opt-criteria').value;
    const algo = document.getElementById('opt-algo').value;

    // 2. Sort the ACTUAL Queue Items (In-Place)
    // We are modifying normalQueue.items directly
    if (algo === 'bubble') {
        bubbleSort(normalQueue.items, criteria);
    } else if (algo === 'insertion') {
        insertionSort(normalQueue.items, criteria);
    }

    // 3. Update UI to show new order
    updateUI();
    alert(`Queue Optimized by ${criteria} using ${algo}! High priority tickets are now at the front.`);
}

function organizeHistory() {
    // 1. Check if empty
    if (resolvedStack.isEmpty()) {
        alert("History is empty! Nothing to organize.");
        return;
    }

    const criteria = document.getElementById('hist-criteria').value;
    const algo = document.getElementById('hist-algo').value;

    // 2. Sort the ACTUAL Stack Items (In-Place) using selected algorithm
    if (algo === 'bubble') {
        bubbleSort(resolvedStack.items, criteria);
    } else if (algo === 'insertion') {
        insertionSort(resolvedStack.items, criteria);
    } else if (algo === 'selection') {
        selectionSort(resolvedStack.items, criteria);
    }

    // 3. Update UI
    updateUI();
    alert(`History Organized by ${criteria} using ${algo}!`);
}

function compare(a, b, criteria) {
    if (criteria === 'id') return a.id - b.id;
    if (criteria === 'name') return a.name.localeCompare(b.name);
    if (criteria === 'priority') return b.priority - a.priority; // Descending (3 > 1)
    return 0;
}

function bubbleSort(arr, c) {
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (compare(arr[i], arr[i + 1], c) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);
}

function insertionSort(arr, c) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && compare(arr[j], key, c) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function selectionSort(arr, c) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (compare(arr[j], arr[min], c) < 0) min = j;
        }
        if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
    }
}

// ==========================================
// UI RENDERING
// ==========================================
function updateUI() {
    renderQueue('vip-queue-display', vipQueue.getAll());
    renderQueue('normal-queue-display', normalQueue.getAll());
    renderStack('resolved-stack-display', resolvedStack.getAll());
}

function renderQueue(elementId, items) {
    const el = document.getElementById(elementId);
    if (items.length === 0) {
        el.innerHTML = '<div class="empty-placeholder">Empty</div>';
        return;
    }
    el.innerHTML = items.map(t => renderTicketHTML(t)).join('');
}

function renderStack(elementId, items) {
    const el = document.getElementById(elementId);
    if (items.length === 0) {
        el.innerHTML = '<div class="empty-placeholder">Stack Empty</div>';
        return;
    }
    // Stack renders bottom-up via CSS, so just dump items
    el.innerHTML = items.map(t => renderTicketHTML(t)).join('');
}

function renderTicketHTML(t) {
    let typeClass = t.type === 'VIP' ? 'vip' : 'normal';
    if (t.status === 'Resolved') typeClass = 'resolved';

    return `
    <div class="ticket ${typeClass}">
        <span class="ticket-id">#${t.id}</span>
        <div class="ticket-name">${t.name}</div>
        <div class="ticket-meta">Pri: ${t.priority} | ${t.type}</div>
    </div>
    `;
}

// Init
updateUI();
