import React from 'react';
import './components/RegistrationForm.css';
import './components/LoginForm.css';
import './components/TaskCreationForm.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import TaskCreationForm from './components/TaskCreationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My App</h1>
      </header>
      <main>
        <RegistrationForm />
        <LoginForm />
        <TaskCreationForm />
      </main>
    </div>
  );
}

export default App;
