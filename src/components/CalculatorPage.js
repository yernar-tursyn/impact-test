import React, { useState } from "react";
import "../styles/CalculatorPage.css";

function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("installments");
  const [schoolType, setSchoolType] = useState("");
  const [customSchool, setCustomSchool] = useState("");

  const schoolOptions = [
    "Государственная школа",
    "Частная школа",
    "Международная школа",
    "Гимназия",
    "Лицей",
    "Техническая школа",
    "Военная школа",
    "Религиозная школа",
    "Школа с углубленным изучением предметов",
    "Школа-интернат",
    "Школа искусств",
    "Школа для одаренных детей",
    "Другое",
  ];

  const handleSchoolChange = (event) => {
    setSchoolType(event.target.value);
    // Если выбрано "Другое", очищаем поле customSchool для ввода
    if (event.target.value !== "Другое") {
      setCustomSchool("");
    }
  };

  const handleCustomSchoolChange = (event) => {
    setCustomSchool(event.target.value);
  };

  const renderTabContent = () => {
    if (activeTab === "installments") {
      return (
        <div className="profile-form">
          <h2>Анкета для заполнения</h2>
          <form>
            <div className="form-group">
              <label>1. Имя</label>
              <input type="text" placeholder="Введите имя" />
            </div>
            <div className="form-group">
              <label>2. Фамилия</label>
              <input type="text" placeholder="Введите фамилию" />
            </div>
            <div className="form-group">
              <label>3. Дата рождения</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>4. Школа</label>
              <select value={schoolType} onChange={handleSchoolChange}>
                <option value="">Выберите тип школы</option>
                {schoolOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {schoolType === "Другое" && (
                <input
                  type="text"
                  placeholder="Введите название школы"
                  value={customSchool}
                  onChange={handleCustomSchoolChange}
                />
              )}
            </div>
            <div className="form-group">
              <label>5. Класс обучения</label>
              <input type="number" placeholder="Класс обучения" />
            </div>
            <div className="form-group">
              <label>6. Год выпуска</label>
              <input type="number" placeholder="2025" />
            </div>
            <div className="form-group">
              <label>7. Любимые предметы</label>
              <input type="text" placeholder="Физика, Математика" />
            </div>
            <div className="form-group">
              <label>8. High school type</label>
              <input type="text" placeholder="Тип школы" />
            </div>
            <div className="form-group">
              <label>9. Бюджет на обучение в год</label>
              <input type="text" placeholder="Введите бюджет" />
            </div>
            <div className="form-group">
              <label>10. Предпочитаемые страны</label>
              <input type="text" placeholder="Например, страны Европы" />
            </div>
          </form>
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
