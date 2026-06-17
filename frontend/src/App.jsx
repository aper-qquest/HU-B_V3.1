import { useState } from 'react';
import qquestLogo from './assets/Qquest_Logo_Wit(RGB).png'
import HUBIcon from './assets/rechthoekig-faceless-hub-logo-zwart.png'
import './App.css'


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
    <>
      <section id="header">
        <div className="topBanner">
          <img src={qquestLogo} className="qquestLogo" alt="Qquest logo" />
          <img src={HUBIcon} className="HUBBanner" alt="HU-B logo" />
          <h1 className="topText">De personeelsgids Chatbot</h1>
        </div>          
      </section>
      
      <section id="chat">
        <h2>Antwoord (hier komt de chatgeschiedenis):</h2>
        <div className="chatMessages">
          <blockquote>{answer}</blockquote>
        </div>
      </section>

      
      <section id="input">
        <input className="inputText"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Stel een vraag..."
        />

        <button className="sendButton" onClick={sendQuestion}>
          Versturen
        </button>
      </section>
      <h1>Chat visuele playground</h1>
      <div class="conversation">
        <div class="message-group" data-sender="HU-B">
          <blockquote>This would be the intro text of HU-B</blockquote>
          <cite>HU-B</cite>
        </div>
        <div class="message-group" data-sender="User">
          <blockquote>Here the user would ask a question</blockquote>
          <cite>User</cite>
        </div>
        <div class="message-group" data-sender="HU-B">
          <blockquote>HU-B mentions source</blockquote>
          <blockquote>Actual answer you are looking for</blockquote>
          <blockquote>Citation of answer.</blockquote>
          <blockquote>Potential follow-up question.</blockquote>
          <cite>HU-B</cite>
        </div>
        <div class="message-group" data-sender="User">
          <blockquote>Next question of user</blockquote>
          <cite>User</cite>
        </div>
        <div class="message-group" data-sender="HU-B">
          <blockquote>…</blockquote>
          <cite>HU-B</cite>
        </div>
      </div>
      
    </>
  );
}

export default App;