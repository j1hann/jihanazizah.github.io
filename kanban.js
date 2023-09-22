// Menangkap elemen-elemen yang dapat ditarik (drag)
const kanbanTasks = document.querySelectorAll('.list-group-item');
const kanbanColumns = document.querySelectorAll('.list-group');

let draggedTask = null;

// Event listener untuk memulai operasi drag
kanbanTasks.forEach(task => {
  task.addEventListener('dragstart', (e) => {
    draggedTask = e.target;
    e.dataTransfer.setData('text/plain', e.target.textContent);
  });
});

// Event listener untuk mengendalikan operasi drop
kanbanColumns.forEach(column => {
  column.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  column.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedTask) {
      column.appendChild(draggedTask);
      draggedTask = null;   
    }
  });
});
    

// Temukan elemen-elemen yang diperlukan
const addTaskForm = document.getElementById('todo-form');
const taskNameInput = document.getElementById('todo-input');

// Event listener untuk saat formulir dikirimkan (submit)
addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Ambil nilai input
  const taskName = taskNameInput.value.trim();

  // Pastikan input tidak kosong
  if (taskName !== '') {
    // Buat elemen card baru
    const newTask = document.createElement('div');
    newTask.className = 'list-group-item';
    newTask.draggable = true;
    newTask.textContent = taskName;

    // Tambahkan card baru ke kolom "To Do" (misalnya)
    const todoColumn = document.querySelector('.list-group-item').parentNode;
    todoColumn.appendChild(newTask);

    // Bersihkan nilai input
    taskNameInput.value = '';
  }
});

// Temukan kolom "Selesai" dan kolom "To Do"
const doneColumn = document.querySelector('#KolomDone').parentNode;
const todoColumn = document.querySelector('#KolomTodo').parentNode;

// Event listener untuk memulai operasi drag
kanbanTasks.forEach(task => {
  task.addEventListener('dragstart', (e) => {
    draggedTask = e.target;
    e.dataTransfer.setData('text/plain', e.target.textContent);
  });
});

// Event listener untuk mengendalikan operasi drop
doneColumn.addEventListener('dragover', (e) => {
  e.preventDefault();
  doneColumn.classList.add('kanban-column-highlight');
});

doneColumn.addEventListener('dragleave', () => {
  doneColumn.classList.remove('kanban-column-highlight');
});

doneColumn.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedTask) {
    // Buat elemen card baru di kolom "Selesai"
    const newTask = document.createElement('div');
    newTask.className = 'list-group-item';
    newTask.textContent = draggedTask.textContent;
    doneColumn.appendChild(newTask);

    // Hapus card asli dari kolom "To Do"
    todoColumn.removeChild(draggedTask);
    draggedTask = null;
  }

  // Hapus highlight dari kolom "Selesai"
  doneColumn.classList.remove('kanban-column-highlight');
});
