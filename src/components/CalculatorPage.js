import React, { useState } from "react";
import "../styles/CalculatorPage.css";

function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [schoolType, setSchoolType] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [selectedSubCriteria, setSelectedSubCriteria] = useState({});

  // Опции для выбора типа школы
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

  // Обработка выбора типа школы
  const handleSchoolChange = (event) => {
    setSchoolType(event.target.value);
    if (event.target.value !== "Другое") {
      setCustomSchool(""); // сброс поля для ввода, если выбрана не "Другое"
    }
  };

  // Данные для внешкольной деятельности, критериев и под-критериев
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
    "1-2 исследования": {
      "Тема исследования": ["Актуальность", "Инновационность"],
      "Результаты": ["Публикации", "Конференции", "Призы"],
      "Уровень участия": ["Инициатор", "Руководитель", "Член команды"],
      "Связь с учебной программой": ["Есть", "Нет"],
    },
    "Собственный проект": {
      "Тема проекта": ["Социальный", "Научный", "Культурный"],
      "Реализованность и результаты": ["Полностью выполнен", "Частично выполнен"],
      "Используемые навыки": ["Лидерство", "Креативность"],
      "Влияние на сообщество": ["Сильное", "Умеренное", "Слабое"],
    },
    "Community Service (Общественная деятельность)": {
      "Вид деятельности": ["Экологическое", "Социальное", "Образовательное"],
      "Количество часов": ["< 50", "50-100", "> 100"],
      "Влияние на сообщество": ["Сильное", "Умеренное", "Слабое"],
      "Роль": ["Организатор", "Активист"],
    },
    "Student Government (Студенческое самоуправление)": {
      "Должность": ["Президент", "Секретарь", "Член совета"],
      "Реализованные инициативы": ["Да", "Нет"],
      "Участие в управлении": ["Да", "Нет"],
      "Влияние на сообщество": ["Сильное", "Умеренное", "Слабое"],
    },
    "Academic Teams & Clubs (Академические команды и клубы)": {
      "Тип клуба": ["Дебаты", "Научные кружки", "Предметные клубы"],
      "Роль в команде": ["Лидер", "Участник"],
      "Достижения команды": ["Победы на соревнованиях", "Публикации"],
      "Частота участия": ["Ежегодно", "Часто", "Редко"],
    },
    "Arts (Искусство)": {
      "Вид искусства": ["Музыка", "Танцы", "Живопись", "Театр"],
      "Уровень достижений": ["Участие в выставках", "Участие в конкурсах"],
      "Вклад в культурное сообщество": ["Сильный", "Умеренный", "Слабый"],
      "Частота занятий": ["Ежедневно", "Раз в неделю", "Раз в месяц"],
    },
  };

  // Обработка изменения критериев
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
        [criteria]: "", // сброс под-критерия при изменении критерия
      },
    });
  };

  // Обработка изменения под-критериев
  const handleSubCriteriaChange = (activity, criteria, event) => {
    setSelectedSubCriteria({
      ...selectedSubCriteria,
      [activity]: {
        ...selectedSubCriteria[activity],
        [criteria]: event.target.value,
      },
    });
  };

  // Отображение контента в зависимости от выбранной вкладки
  const renderTabContent = () => {
    if (activeTab === "profile") {
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
                  onChange={(e) => setCustomSchool(e.target.value)}
                />
              )}
            </div>
            <div className="form-group">
              <label>5. Класс обучения</label>
              <input type="number" placeholder="Введите класс" />
            </div>
            <div className="form-group">
              <label>6. Год выпуска</label>
              <input type="number" placeholder="Введите год выпуска" />
            </div>
            <div className="form-group">
              <label>7. Любимые предметы</label>
              <input type="text" placeholder="Физика, Математика" />
            </div>
            <div className="form-group">
              <label>8. Тип школы</label>
              <input type="text" placeholder="Тип школы" />
            </div>
            <div className="form-group">
              <label>9. Бюджет на обучение в год</label>
              <input type="text" placeholder="Введите бюджет" />
            </div>
            <div className="form-group">
              <label>10. Предпочитаемые страны</label>
              <input type="text" placeholder="Введите предпочитаемые страны" />
            </div>
          </form>
        </div>
      );
    } else if (activeTab === "extracurricular") {
      return (
        <div className="academic-performance">
          <h2>Внешкольная деятельность и критерии</h2>
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

                  {/* Появление под-критериев, если критерий выбран */}
                  {selectedCriteria[activity]?.[criteria] && (
                    <div className="form-group">
                      <label>Выберите под-критерий для {criteria}</label>
                      <select
                        value={selectedSubCriteria[activity]?.[criteria] || ""}
                        onChange={(event) =>
                          handleSubCriteriaChange(activity, criteria, event)
                        }
                      >
                        <option value="">Выберите под-критерий</option>
                        {activities[activity][criteria].map((subOption) => (
                          <option key={subOption} value={subOption}>
                            {subOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
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
          className={`tab ${activeTab === "extracurricular" ? "active" : ""}`}
          onClick={() => setActiveTab("extracurricular")}
        >
          Внешкольная деятельность
        </button>
        <button
          className={`tab ${activeTab === "cashLoan" ? "active" : ""}`}
          onClick={() => setActiveTab("cashLoan")}
        >
          Академическая успеваемость
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
