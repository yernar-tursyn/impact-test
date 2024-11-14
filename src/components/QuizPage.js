import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

const Button = ({ onClick, disabled, children, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
)

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
)

const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
)

const CardFooter = ({ children }) => (
  <div className="px-6 py-4 bg-gray-50">{children}</div>
)

const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-blue-600 h-2.5 rounded-full"
      style={{ width: `${value}%` }}
    ></div>
  </div>
)

const RadioGroup = ({ children, onValueChange, value }) => (
  <div onChange={(e) => onValueChange(e.target.value)} className="space-y-2">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { selectedValue: value })
    )}
  </div>
)

const RadioGroupItem = ({ value, id, children, selectedValue }) => (
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      id={id}
      value={value}
      name="radio-group"
      className="w-4 h-4"
      checked={selectedValue === value} // Устанавливаем checked на основе выбранного значения
      onChange={() => {}} // Обработчик для управляемого компонента
    />
    <label htmlFor={id} className="text-sm font-medium leading-none">
      {children}
    </label>
  </div>
)

const tests = [
  {
    name: "Тест на знание JavaScript",
    questions: [
      {
        question: "Что такое замыкание в JavaScript?",
        options: ["Функция внутри функции", "Способ хранения данных", "Метод объекта", "Тип данных"],
        correctAnswer: "Функция внутри функции"
      },
      {
        question: "Какой оператор используется для строгого сравнения в JavaScript?",
        options: ["==", "===", "=", "!="],
        correctAnswer: "==="
      },
      {
        question: "Что такое промисы в JavaScript?",
        options: ["Способ обработки асинхронных операций", "Тип данных", "Метод массива", "Функция высшего порядка"],
        correctAnswer: "Способ обработки асинхронных операций"
      },
      {
        question: "Что изображено на картинке?",
        image: "/placeholder.svg?height=200&width=300",
        options: ["Цикл событий (Event Loop)", "DOM-дерево", "Стек вызовов", "Куча (Heap)"],
        correctAnswer: "Цикл событий (Event Loop)"
      }
    ]
  },
  {
    name: "Тест на знание React",
    questions: [
      {
        question: "Что такое JSX?",
        options: ["Расширение синтаксиса JavaScript", "Библиотека JavaScript", "Фреймворк", "Препроцессор CSS"],
        correctAnswer: "Расширение синтаксиса JavaScript"
      },
      {
        question: "Что такое хуки в React?",
        options: ["Функции для использования состояния и других возможностей React", "Компоненты React", "Методы жизненного цикла", "Стили CSS"],
        correctAnswer: "Функции для использования состояния и других возможностей React"
      },
      {
        question: "Как передать данные от родительского компонента к дочернему?",
        options: ["Через пропсы", "Через состояние", "Через контекст", "Через Redux"],
        correctAnswer: "Через пропсы"
      },
      {
        question: "Какой хук React изображен на картинке?",
        image: "/placeholder.svg?height=200&width=300",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correctAnswer: "useState"
      }
    ]
  },
  {
    name: "Тест на знание CSS",
    questions: [
      {
        question: "Что означает CSS?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
      },
      {
        question: "Какое свойство используется для изменения цвета текста?",
        options: ["color", "text-color", "font-color", "text-style"],
        correctAnswer: "color"
      },
      {
        question: "Что такое селектор в CSS?",
        options: ["Шаблон для выбора элементов", "Тег HTML", "Свойство CSS", "Значение свойства"],
        correctAnswer: "Шаблон для выбора элементов"
      },
      {
        question: "Какой тип позиционирования CSS изображен на картинке?",
        image: "/placeholder.svg?height=200&width=300",
        options: ["Relative", "Absolute", "Fixed", "Static"],
        correctAnswer: "Absolute"
      }
    ]
  }
]

export default function Component() {
  const [currentTest, setCurrentTest] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(
    tests.map(test => Array(test.questions.length).fill('')) // Инициализация пустыми ответами
  )
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answer) => {
    const newAnswers = [...answers]
    newAnswers[currentTest][currentQuestion] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < tests[currentTest].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1)
      setCurrentQuestion(0)
    } else {
      calculateScore()
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let totalScore = 0
    tests.forEach((test, testIndex) => {
      test.questions.forEach((question, questionIndex) => {
        if (answers[testIndex][questionIndex] === question.correctAnswer) {
          totalScore++
        }
      })
    })
    setScore(totalScore)
  }

  useEffect(() => {
    if (showResults) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [showResults])

  const totalQuestions = tests.reduce((sum, test) => sum + test.questions.length, 0)
  const answeredQuestions = answers.flat().filter(Boolean).length
  const progress = (answeredQuestions / totalQuestions) * 100

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">Результаты тестов</h2>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-3xl font-bold">Ваш итоговый балл: {score} из {totalQuestions}</p>
            <p className="text-xl mt-2">
              Процент правильных ответов: {((score / totalQuestions) * 100).toFixed(2)}%
            </p>
          </div>
          {tests.map((test, testIndex) => (
            <div key={testIndex} className="mb-6">
              <h3 className="font-semibold text-xl mb-2">{test.name}</h3>
              {test.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="mb-2">
                  <p className="font-medium">{question.question}</p>
                  {question.image && (
                    <div className="my-2">
                      <img src={question.image} alt="Вопрос с изображением" width={300} height={200} />
                    </div>
                  )}
                  <p>Ваш ответ: {answers[testIndex][questionIndex]}</p>
                  <p className={answers[testIndex][questionIndex] === question.correctAnswer ? "text-green-600" : "text-red-600"}>
                    Правильный ответ: {question.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            <div className="inline-block animate-bounce">🎉</div>
            <p className="mt-2">Поздравляем с завершением всех тестов!</p>
          </div>
        </CardFooter>
      </Card>
    )
  }

  const currentTestData = tests[currentTest]
  const currentQuestionData = currentTestData.questions[currentQuestion]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">{currentTestData.name}</h2>
        <Progress value={progress} />
        <p className="text-sm text-gray-500 mt-2">
          Вопрос {currentQuestion + 1} из {currentTestData.questions.length}
        </p>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl mb-4">{currentQuestionData.question}</h3>
        {currentQuestionData.image && (
          <div className="mb-4">
            <img src={currentQuestionData.image} alt="Вопрос с изображением" width={300} height={200} />
          </div>
        )}
        <RadioGroup onValueChange={handleAnswer} value={answers[currentTest][currentQuestion]}>
          {currentQuestionData.options.map((option, index) => (
            <RadioGroupItem key={index} value={option} id={`option-${index}`}>
              {option}
            </RadioGroupItem>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!answers[currentTest][currentQuestion]} className="w-full">
          {currentTest < tests.length - 1 || currentQuestion < currentTestData.questions.length - 1 ? 'Следующий вопрос' : 'Завершить тесты'}
        </Button>
      </CardFooter>
    </Card>
  )
}
