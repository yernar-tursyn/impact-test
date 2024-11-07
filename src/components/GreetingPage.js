import React, { useState } from "react";
import promoImage from "../images/promo.png";

export default function GreetingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [format, setFormat] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [scienceField, setScienceField] = useState("Technology");
  const [profession, setProfession] = useState("");
  const [financialAssistance, setFinancialAssistance] = useState("");
  const [percentage, setPercentage] = useState([]);
  const [result, setResult] = useState("Ваш результат"); // По умолчанию

  const handlePercentageChange = (value) => {
    setPercentage((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setBudget("");
    setFormat("");
    setTotalExpense("");
    setScienceField("Technology");
    setProfession("");
    setFinancialAssistance("");
    setPercentage([]);
    setResult("Ваш результат");
  };

  const handleGenerateResult = () => {
    if (!country || !profession) {
      setResult(
        "Пожалуйста, выберите все варианты, прежде чем генерировать результат."
      );
      return;
    }

    const difficulties = ["Германию", "Великобританию", "Францию"];
    const difficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

    setResult(
      `С выбранной страной ${country}, профессией ${profession} и бюджетом в ${budget} вам будет выгоднее поступать в ${difficulty}.`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      phone,
      country,
      budget,
      format,
      totalExpense,
      scienceField,
      profession,
      financialAssistance,
      percentage,
    });
  };

  // Словарь профессий по направлениям
  const professionOptions = {
    Technology: [
      { value: "Разработчик ПО", label: "Разработчик ПО" },
      { value: "Специалист по ИИ", label: "Специалист по ИИ" },
      { value: "Кибербезопасности", label: "Кибербезопасности" },
      { value: "Data Scientist", label: "Data Scientist" },
      { value: "Аналитик данных", label: "Аналитик данных" },
    ],
    Business: [
      { value: "Финансовый аналитик", label: "Финансовый аналитик" },
      { value: "Проект менеджер", label: "Проект менеджер" },
      { value: "Менеджер по продукту", label: "Менеджер по продукту" },
      { value: "Биолог-исследователь", label: "Биолог-исследователь" },
      { value: "Микробиолог", label: "Микробиолог" },
      { value: "Биоинженер", label: "Биоинженер" },
    ],
    Science: [
      {
        value: "Специалист по медицинским устройствам",
        label: "Специалист по медицинским устройствам",
      },
      { value: "Электроинженер", label: "Электроинженер" },
      { value: "Инженер телекоммуникаций", label: "Инженер телекоммуникаций" },
      { value: "Инженер-механик", label: "Инженер-механик" },
      { value: "Инженер по качеству", label: "Инженер по качеству" },
      { value: "Математик", label: "Математик" },
    ],
  };

  // Обновление направления и сброс профессии
  const handleScienceFieldChange = (e) => {
    setScienceField(e.target.value);
    setProfession(""); // Сбросить профессию при изменении направления
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <header className="flex justify-center items-center border-b">
        <img src={promoImage} alt="Промо блок" />
      </header>

      {/* How it Works Section */}
      <h2 className="text-2xl font-semibold text-center">
        Как работает калькулятор
      </h2>
      <section className="text-center flex w-max mx-auto gap-[106px]">
        <div className="w-1/3 p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Шаг 1</h3>
          <p className="text-gray-600 mt-2">
            Nam ut justo placerat, eleifend sem at, finibus velit.
          </p>
        </div>
        <div className="w-1/3 p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Шаг 2</h3>
          <p className="text-gray-600 mt-2">
            Nam ut justo placerat, eleifend sem at, finibus velit.
          </p>
        </div>
        <div className="w-1/3 p-4 border rounded-lg shadow-md">
          <h3 className="text-xl font-bold">Шаг 3</h3>
          <p className="text-gray-600 mt-2">
            Nam ut justo placerat, eleifend sem at, finibus velit.
          </p>
        </div>
      </section>

      {/* Calculator Form Section */}
      <section className="w-[1420px] mx-auto space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Планирование финансирования
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Имя"
              className="p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="p-2 border border-gray-300 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="p-2 border border-gray-300 rounded"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Выберите страну поступления</option>
              <option value="Германия">Германия</option>
              <option value="Великобритания">Великобритания</option>
              <option value="Нидерланды">Нидерланды</option>
              <option value="Финляндия">Финляндия</option>
              <option value="Швеция">Швеция</option>
              <option value="Швейцария">Швейцария</option>
              <option value="Италия">Италия</option>
              <option value="Испания">Испания</option>
              <option value="Польша">Польша</option>
              <option value="Венгрия">Венгрия</option>
              <option value="Франция">Франция</option>
              <option value="Латвия">Латвия</option>
              <option value="Португалия">Португалия</option>
              <option value="Чехия">Чехия</option>
              <option value="Норвегия">Норвегия</option>
              <option value="Южная Корея">Южная Корея</option>
              <option value="Сингапур">Сингапур</option>
              <option value="Гонконг">Гонконг</option>
              <option value="ОАЭ">ОАЭ</option>
              <option value="Турция">Турция</option>
              <option value="Катар">Катар</option>
              <option value="Канада">Канада</option>
              <option value="Австрия">Австрия</option>
              <option value="Дания">Дания</option>
              <option value="Бельгия">Бельгия</option>
              <option value="Китай">Китай</option>
              <option value="Малайзия">Малайзия</option>
            </select>

            <select
              className="p-2 border border-gray-300 rounded"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="">Выберите формат обучения</option>
              <option value="bachelor">Бакалавриат</option>
              <option value="master">Магистратура</option>
              <option value="phd">Докторантура</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              className="p-2 border border-gray-300 rounded"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            >
              <option value="">Выберите средний бюджет на обучение</option>
              <option value="2000-4000">$2,000 - $4,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="8000-15000">$8,000 - $15,000</option>
              <option value="15000-25000">$15,000 - $25,000</option>
              <option value="25000-40000">$25,000 - $40,000</option>
            </select>

            <select
              className="p-2 border border-gray-300 rounded"
              value={totalExpense}
              onChange={(e) => setTotalExpense(e.target.value)}
            >
              <option value="">Выберите месячные затраты на проживание</option>
              <option value="under-1500">Менее 1,500 USD</option>
              <option value="1500-2500">1,500 - 2,500 USD</option>
              <option value="2500-3500">2,500 - 3,500 USD</option>
              <option value="3500-4500">3,500 - 4,500 USD</option>
              <option value="above-4500">Более 4,500 USD</option>
            </select>
          </div>

          {/* Финансовая помощь */}
          <div>
            <label className="block font-semibold mb-2">
              Требуется ли финансовая помощь
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialAssistance"
                  value="grant"
                  checked={financialAssistance === "grant"}
                  onChange={() => setFinancialAssistance("grant")}
                />
                <span>Грант</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="financialAssistance"
                  value="noAssistance"
                  checked={financialAssistance === "noAssistance"}
                  onChange={() => setFinancialAssistance("noAssistance")}
                />
                <span>Не требуется</span>
              </label>
            </div>
          </div>

          {/* Направление и Профессия */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-semibold mb-2">
                Выберите направление для поступления
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={scienceField}
                onChange={handleScienceFieldChange}
              >
                <option value="Technology">Технологии</option>
                <option value="Business">Бизнес</option>
                <option value="Science">Наука</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">
                Выберите профессию для поступления
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              >
                <option value="">Выберите профессию</option>
                {professionOptions[scienceField]?.map((prof) => (
                  <option key={prof.value} value={prof.value}>
                    {prof.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Процентное соотношение */}
          <div>
            <label className="block font-semibold mb-2">
              Процентное соотношение
            </label>
            <div className="flex space-x-4">
              {["15%", "20%", "25%", "30%"].map((value) => (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={value}
                    checked={percentage.includes(value)}
                    onChange={() => handlePercentageChange(value)}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Кнопка Показать План */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Показать план
          </button>
        </form>

        {/* Результат */}
        <div className="p-6 border rounded-md mt-6">
          <p className="text-gray-600">{result}</p>
        </div>

        {/* Кнопка Генерировать результат */}
        <button
          type="button"
          onClick={handleGenerateResult}
          className="w-full p-3 mt-4 bg-teal-400 text-white font-semibold rounded hover:bg-teal-500"
        >
          Генерировать результат
        </button>
      </section>
    </div>
  );
}
