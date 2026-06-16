import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const sendQuestion = async () => {
    const response = await fetch('http://localhost:8080/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: question,
    });

    const data = await response.text();
    setAnswer(data);
  };

  return (
    <div>
      <h1>HU-B Chatbot</h1>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Stel een vraag..."
      />

      <button onClick={sendQuestion}>
        Versturen
      </button>

      <h3>Antwoord:</h3>
      <p>{answer}</p>
    </div>
  );
}

export default App;