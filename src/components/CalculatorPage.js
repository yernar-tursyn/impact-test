import React, { useState } from "react";
import "../styles/CalculatorPage.css"; // Если хотите стилизовать компонент

function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("installments");
  const [creditAmount, setCreditAmount] = useState(5000);
  const [term, setTerm] = useState(6);

  const handleAmountChange = (event) => {
    setCreditAmount(event.target.value);
  };

  const handleTermChange = (selectedTerm) => {
    setTerm(selectedTerm);
  };

  const calculateMonthlyPayment = () => {
    // Простая формула для расчета ежемесячного платежа
    return (creditAmount / term).toFixed(0);
  };

  const renderTabContent = () => {
    if (activeTab === "installments") {
      return (
        <div className="calculator-content">
          <div className="partner">
            <label>Партнер</label>
            <select>
              <option>ТОО "Мечта Маркет"</option>
              <option>ТОО "Армада"</option>
              <option>ТОО "Сулпак"</option>
              <option>ТОО "Технодом"</option>
            </select>
          </div>

          <div className="credit-amount">
            <label>Сумма микрокредита</label>
            <input
              type="range"
              min="5000"
              max="2000000"
              value={creditAmount}
              onChange={handleAmountChange}
            />
            <div className="range-values">
              <span>5 000 ₸</span>
              <span>2 000 000 ₸</span>
            </div>
            <div className="amount-display">{creditAmount} ₸</div>
          </div>

          <div className="term-selection">
            <label>Срок в месяцах</label>
            <div className="terms">
              {[6, 12, 24, 36, 48].map((t) => (
                <button
                  key={t}
                  className={term === t ? "active" : ""}
                  onClick={() => handleTermChange(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="payment-info">
            <div>
              <span>Ежемесячный платёж</span>
              <span>{calculateMonthlyPayment()} ₸</span>
            </div>
            <div>
              <span>Переплата</span>
              <span>0 ₸</span>
            </div>
            <p>Расчет предварительный. Не является офертой.</p>
          </div>

          <button className="apply-btn">Оформить рассрочку</button>
        </div>
      );
    } else {
      switch (activeTab) {
        case "cashLoan":
          return <p>Привет, это Микрокредит наличными!</p>;
        case "airTickets":
          return <p>Привет, это Авиабилеты в микрокредит!</p>;
        case "collateralLoan":
          return <p>Привет, это Залоговый кредит!</p>;
        case "educationPayment":
          return <p>Привет, это Оплата за обучение!</p>;
        default:
          return <p>Выберите вкладку.</p>;
      }
    }
  };

  return (
    <div className="calculator">
      <h1>Калькулятор</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "installments" ? "active" : ""}`}
          onClick={() => setActiveTab("installments")}
        >
          Профиль
        </button>
        <button
          className={`tab ${activeTab === "cashLoan" ? "active" : ""}`}
          onClick={() => setActiveTab("cashLoan")}
        >
          Академическая успеваемость
        </button>
        <button
          className={`tab ${activeTab === "airTickets" ? "active" : ""}`}
          onClick={() => setActiveTab("airTickets")}
        >
          Внешкольная деятельность
        </button>
        <button
          className={`tab ${activeTab === "collateralLoan" ? "active" : ""}`}
          onClick={() => setActiveTab("collateralLoan")}
        >
          Финансы
        </button>
        <button
          className={`tab ${activeTab === "educationPayment" ? "active" : ""}`}
          onClick={() => setActiveTab("educationPayment")}
        >
          Поступление
        </button>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
}

export default CalculatorPage;