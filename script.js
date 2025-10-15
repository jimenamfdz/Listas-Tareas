const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');


window.onload = function() {
  const length = localStorage.getItem('length');
  if (length) {
    for (let i = 0; i < length; i++) {
      const text = localStorage.getItem(`task${i}`);
      const done = localStorage.getItem(`done${i}`);
      if (text !== null) {
        createTask(text, done === 'true');
      }
    }
  }
};


function createTask(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  taskList.appendChild(li);
}


function saveTasks() {
  const tasks = document.querySelectorAll('li');
  localStorage.clear();
  localStorage.setItem('length', tasks.length);
  tasks.forEach((li, i) => {
    localStorage.setItem(`task${i}`, li.textContent);
    localStorage.setItem(`done${i}`, li.classList.contains('completed'));
  });
}


addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text !== '') {
    createTask(text);
    saveTasks();
    input.value = '';
  }
});
