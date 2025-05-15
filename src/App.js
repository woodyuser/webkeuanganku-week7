import React from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginFooter from './components/LoginFooter';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <LoginHeader />
      <LoginPage />
      <LoginFooter />
    </div>
  );
}

export default App;
