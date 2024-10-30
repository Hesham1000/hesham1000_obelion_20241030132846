import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskListPage.css';

function TaskListPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://todoApp-backend.cloud-stacks.com/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to retrieve tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const newTask = { title, description, dueDate, priority };
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/tasks', newTask, {
        headers: { 'Content-Type': 'application/json' },
      });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="task-list-page">
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="navigation">
          <ul>
            <li>Home</li>
            <li>Tasks</li>
            <li>Calendar</li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Task Creation</h1>
        <div className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleCreateTask}>Create Task</button>
        </div>
        <div className="task-list">
          {tasks.map((task, index) => (
            <div key={index} className="task-item">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2023 Company Name</p>
        <ul>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </footer>
    </div>
  );
}

export default TaskListPage;
