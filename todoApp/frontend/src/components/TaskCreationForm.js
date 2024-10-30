import React, { useState } from 'react';
import axios from 'axios';
import './TaskCreationForm.css';

function TaskCreationForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://todoApp-backend.cloud-stacks.com/api/tasks', {
        title,
        description,
        dueDate,
        priority
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      addTask(response.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setError(null);
    } catch (error) {
      setError('Failed to create task');
    }
  };

  return (
    <div className="task-creation-form">
      <header>
        <h1>Task Creation</h1>
        <nav>
          <a href="/home">Home</a>
          <a href="/tasks">Tasks</a>
          <a href="/calendar">Calendar</a>
        </nav>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
        {error && <p className="error">{error}</p>}
      </form>
      <footer>
        <p>© 2023 Your Company. All rights reserved.</p>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default TaskCreationForm;
