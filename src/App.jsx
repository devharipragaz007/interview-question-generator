import { useState } from 'react'
import { fetchInterviewQuestions } from './api/gemini'
import './index.css'
import Spinner from './components/Spinner';
import QuestionCard from './components/QuestionCard';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuestions([]);
    const topic = e.target.topic.value
    console.log('Generating questions for topic:', topic)
    fetchInterviewQuestions(topic)
      .then(questions => {
        console.log('Generated questions:', questions)
        setQuestions(questions)
      })
      .catch(err => {
        console.error('Error fetching questions:', err)
        setError('Failed to generate questions. Please try again.')
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-sm">

          <h1 className="text-2xl font-semibold text-gray-500 mb-1" style={{ color: "black" }}>
            Interview Question Generator
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter a job title to get 3 interview questions.
          </p>

          <form onSubmit={handleSubmit} >
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              id="topic"
              required
              type="text"
              name="topic"
              autoComplete='off'
              placeholder="e.g. Customer Success Manager"
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm border mb-4"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {loading ? "Generating..." : "Generate Questions"}
            </button>
          </form>
          {loading && (
            <Spinner />
          )}
          {error && (
            <p className="text-red-500 text-sm mt-4">{error}</p>
          )}
          {questions.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-black-800 mb-3" style={{ color: "black" }}>Generated Questions:</h2>
              {questions.map((q, idx) => (
                <QuestionCard key={idx} idx={idx} question={q} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
