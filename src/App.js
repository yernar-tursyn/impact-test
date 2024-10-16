import React from 'react';
import './App.css'; // Подключаем CSS файл для стилизации
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CalculatorPage from './components/CalculatorPage.js'; // Импортируем компонент приветствия

function App() {
  const navigate = useNavigate();

  // Функция для перенаправления на страницу приветствия
  const handleTestClick = () => {
    navigate('/calculator');
  };

  return (
    <div className="App">
      {/* Навигационная панель */}
      <header className="navbar">
        <div className="logo">
          <img src="https://static.tildacdn.pro/tild3835-3562-4436-b934-663163663637/9.svg" alt="Badoo Employee" />
        </div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#self-service">Self-Service</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#career">Career</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        </nav>
        <button className="scoring-test-btn" onClick={handleTestClick}>Take a scoring test</button>
      </header>

      {/* Основное содержимое страницы */}
      <main className="main-content">
        {/* Заголовок и описание */}
        <h1>One platform meeting all your relocation needs</h1>
        <p>Get a Global Talent Visa and relocate to the UK. Start your journey now</p>
        
        {/* Кнопка прохождения теста */}
        <button className="scoring-test-btn" onClick={handleTestClick}>Take a scoring test</button>
        <p>Evaluate your chances and get detailed feedback from our team</p>
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
