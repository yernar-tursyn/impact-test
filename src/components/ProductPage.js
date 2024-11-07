import React, { useState } from 'react'

export default function ImmigrationFeasibilityCheck() {
  const [country, setCountry] = useState('')
  const [profession, setProfession] = useState('')
  const [budget, setBudget] = useState('')
  const [result, setResult] = useState('')

  const countries = ['США', 'Канада', 'Корея', 'Словакия', 'Германия', 'Франция', 'Япония']
  const professions = ['Software Developer', 'Doctor', 'Teacher', 'Engineer', 'Artist', 'Entrepreneur']
  const budgets = ['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $50,000', '> $50,000']

  const handleResultClick = () => {
    if (!country || !profession || !budget) {
      setResult('Пожалуйста, выберите все варианты, прежде чем генерировать результат.')
      return
    }

    let difficulty
    switch (budget) {
      case '< $1,000':
        difficulty = 'Токио'
        break
      case '$1,000 - $5,000':
        difficulty = 'Малазия'
        break
      case '$5,000 - $10,000':
        difficulty = 'Китай'
        break
      case '$10,000 - $50,000':
        difficulty = 'Сингапур'
        break
      default:
        difficulty = 'Москва'
    }

    setResult(`С выбранной страной ${country}, профессией ${profession} и бюджетом в ${budget} вам будет выгоднее поступать в ${difficulty}`)
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Лид магнит</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Country
          </label>
          <select
            id="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Выберите страну</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="profession-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Profession
          </label>
          <select
            id="profession-select"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Выберите профессию</option>
            {professions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a Budget
          </label>
          <select
            id="budget-select"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Выберите бюджет</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleResultClick}
        className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Генерировать результат
      </button>
      {result && (
        <p className="mt-4 text-sm text-gray-600 text-center" role="status" aria-live="polite">
          {result}
        </p>
      )}
    </div>
  )
}