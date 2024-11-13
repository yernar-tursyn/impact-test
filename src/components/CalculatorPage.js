'use client'

import React, { useState } from 'react'
import "../styles/CalculatorPage.css";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [satValue, setSatValue] = useState("ideal");
  const [ieltsValue, setIeltsValue] = useState("a1");
  const [schoolType, setSchoolType] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [selectedSubCriteria, setSelectedSubCriteria] = useState({});

  const handleSatChange = (event) => {
    setSatValue(event.target.value);
  };

  const handleIeltsChange = (event) => {
    setIeltsValue(event.target.value);
  };

  const handleSchoolChange = (event) => {
    setSchoolType(event.target.value);
    if (event.target.value !== "Другое") {
      setCustomSchool(""); // Reset custom school input if not "Другое"
    }
  };

  const handleCriteriaChange = (activity, criteria, event) => {
    setSelectedCriteria({
      ...selectedCriteria,
      [activity]: {
        ...selectedCriteria[activity],
        [criteria]: event.target.value,
      },
    });
    setSelectedSubCriteria({
      ...selectedSubCriteria,
      [activity]: {
        ...selectedSubCriteria[activity],
        [criteria]: "", // Reset sub-criteria on criteria change
      },
    });
  };

  const handleSubCriteriaChange = (activity, criteria, event) => {
    setSelectedSubCriteria({
      ...selectedSubCriteria,
      [activity]: {
        ...selectedSubCriteria[activity],
        [criteria]: event.target.value,
      },
    });
  };

  const satOptions = [
    { value: 'ideal', label: 'идеальное состояние (4,0)' },
    { value: 'good', label: 'хорошее (3,75–3,99)' },
    { value: 'average', label: 'среднее (3,2–3,75)' },
    { value: 'low', label: 'низкое (<3,2)' }
  ];

  const ieltsOptions = [
    { value: 'a1', label: 'A1 - Начальный (Beginner) - 1.0 - 2.5' },
    { value: 'a2', label: 'A2 - Элементарный (Elementary) - 3.0 - 3.5' },
    { value: 'b1', label: 'B1 - Средний (Intermediate) - 4.0 - 5.0' },
    { value: 'b2', label: 'B2 - Выше среднего (Upper Intermediate) - 5.5 - 6.5' },
    { value: 'c1', label: 'C1 - Продвинутый (Advanced) - 7.0 - 8.0' },
    { value: 'c2', label: 'C2 - В совершенстве (Proficient) - 8.5 - 9.0' }
  ];

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
    "Другое"
  ];

  const activities = {
    "Олимпиады, национальные олимпиады, конкурсы": {
      "Уровень олимпиады": ["Региональный", "Национальный", "Международный"],
      "Результаты": ["Призовые места", "Дипломы"],
      "Предмет/дисциплина": ["Математика", "Физика", "Искусство"],
      "Число участников": ["< 100", "100-500", "> 500"],
    },
    "Награды и достижения": {
      "Вид награды": ["Академическая", "Спортивная", "Культурная"],
      "Уровень конкурса": ["Школьный", "Региональный", "Национальный"],
      "Признание": ["Сертификаты", "Медали", "Грамоты"],
      "Частота участия": ["Ежегодно", "Раз в несколько лет"],
    },
  };

  const renderTabContent = () => {
    if (activeTab === "profile") {
      return (
        <div className="profile-form">
          <h2>Профиль</h2>
          <form>
            <div className="form-group">
              <label>Имя</label>
              <input type="text" placeholder="Введите имя" />
            </div>
            <div className="form-group">
              <label>Фамилия</label>
              <input type="text" placeholder="Введите фамилию" />
            </div>
            <div className="form-group">
              <label>Дата рождения</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>Тип школы</label>
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
                  onChange={(e) => setCustomSchool(e.target.value)}
                />
              )}
            </div>
            <div className="form-group">
              <label>Класс обучения</label>
              <input type="number" placeholder="Введите класс" />
            </div>
            <div className="form-group">
              <label>Год выпуска</label>
              <input type="number" placeholder="Введите год выпуска" />
            </div>
            <div className="form-group">
              <label>Любимые предметы</label>
              <input type="text" placeholder="Физика, Математика" />
            </div>
            <div className="form-group">
              <label>Бюджет на обучение в год</label>
              <input type="text" placeholder="Введите бюджет" />
            </div>
            <div className="form-group">
              <label>Предпочитаемые страны для учебы</label>
              <input type="text" placeholder="Введите предпочитаемые страны" />
            </div>
          </form>
        </div>
      );
    } else if (activeTab === "cashLoan") { 
      return (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Анализ SAT</h2>
            <div className="space-y-2">
              {satOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    checked={satValue === option.value}
                    onChange={handleSatChange}
                    className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="text-gray-700 text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Анализ уровня английского языка IELTS</h2>
            <div className="space-y-2">
              {ieltsOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    value={option.value}
                    checked={ieltsValue === option.value}
                    onChange={handleIeltsChange}
                    className="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <span className="text-gray-700 text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "extracurricular") {
      return (
        <div className="extracurricular">
          <h2>Внешкольная деятельность</h2>
          {Object.keys(activities).map((activity) => (
            <div key={activity} className="activity-section">
              <h3>{activity}</h3>
              {Object.keys(activities[activity]).map((criteria) => (
                <div key={criteria} className="form-group">
                  <label>{criteria}</label>
                  <select
                    value={selectedCriteria[activity]?.[criteria] || ""}
                    onChange={(event) =>
                      handleCriteriaChange(activity, criteria, event)
                    }
                  >
                    <option value="">Выберите {criteria}</option>
                    {activities[activity][criteria].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "collateralLoan") {
      return (
        <div>
          <h2>Финансы</h2>
          <p>Содержимое финансового раздела.</p>
        </div>
      );
    } else if (activeTab === "educationPayment") {
      return (
        <div>
          <h2>Поступление</h2>
          <p>Содержимое раздела о поступлении.</p>
        </div>
      );
    }
  };

  return (
    <div className="calculator">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
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
          className={`tab ${activeTab === "extracurricular" ? "active" : ""}`}
          onClick={() => setActiveTab("extracurricular")}
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
