import React from 'react';
import './RegistrationForm.css';
import './LoginForm.css';
import './TaskCreationForm.css';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import TaskCreationForm from './TaskCreationForm';

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
