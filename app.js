document.addEventListener('DOMContentLoaded', () => {
  const habitInput = document.getElementById('habit-input');
  const addBtn = document.getElementById('add-btn');
  const habitList = document.getElementById('habit-list');

  // Load habits from localStorage
  const habits = JSON.parse(localStorage.getItem('habits')) || [];

  // Render habits
  const renderHabits = () => {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
      const li = document.createElement('li');
      li.className = `habit-item ${habit.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span>${habit.text}</span>
        <div>
          <button class="toggle-btn" data-index="${index}">${habit.completed ? 'Undo' : 'Done'}</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      habitList.appendChild(li);
    });
  };

  // Save habits to localStorage
  const saveHabits = () => {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
  };

  // Add habit
  addBtn.addEventListener('click', () => {
    const text = habitInput.value.trim();
    if (text) {
      habits.push({ text, completed: false });
      habitInput.value = '';
      saveHabits();
    }
  });

  // Handle habit actions
  habitList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('toggle-btn')) {
      habits[index].completed = !habits[index].completed;
      saveHabits();
    } else if (e.target.classList.contains('delete-btn')) {
      habits.splice(index, 1);
      saveHabits();
    }
  });

  // Allow Enter key to add habit
  habitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addBtn.click();
  });

  // Initial render
  renderHabits();
});
