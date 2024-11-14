import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CalculatorPage from './components/CalculatorPage.js'; 
import ProductPage from './components/ProductPage.js';
import GreetingPage from './components/GreetingPage.js'; // Импортируем компонент GreetingPage
import './index.css';
import QuizPage from './components/QuizPage.js';


function App() {
  const navigate = useNavigate();

  // Функция для перенаправления на страницу калькулятора
  const handleTestClick = () => {
    navigate('/calculator');
  };

  // Функция для перехода на страницу продукта 1
  const handleProductClick = () => {
    navigate('/product');
  };

  // Функция для перехода на страницу GreetingPage для Продукта 2
  const handleGreetingClick = () => {
    navigate('/greeting');
  };

  const handleQuizClick = () => {
    navigate('/quiz');
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="logo">
          <img src="https://static.tildacdn.pro/tild3835-3562-4436-b934-663163663637/9.svg" alt="Badoo Employee" />
        </div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a onClick={handleProductClick}>Продукт 1</a></li>
            <li><a onClick={handleGreetingClick}>Продукт 2</a></li> {/* Обновленный клик для Продукта 2 */}
            <li><a onClick={handleQuizClick}>Test</a></li>
            <li><a href="#career">Career</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        </nav>
        <button className="scoring-test-btn" onClick={handleTestClick}>Take a scoring test</button>
      </header>

      <main className="main-content">
        <h1>One platform meeting all your relocation needs</h1>
        <p>Get a Global Talent Visa and relocate to the UK. Start your journey now</p>
        
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
        <Route path="/product" element={<ProductPage />} /> {/* Маршрут для Продукта 1 */}
        <Route path="/greeting" element={<GreetingPage />} /> {/* Новый маршрут для Продукта 2 */}
        <Route path="/quiz" element={<QuizPage />} /> {/* Новый маршрут для Продукта 2 */}
      </Routes>
    </Router>
  );
}

export default AppWrapper;
