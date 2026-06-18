import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import qquestLogo from './assets/Qquest_Logo_Wit(RGB).png'
import HUBIcon from './assets/rechthoekig-faceless-hub-logo-zwart.png'
import './App.css'

/*
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

    // setQH(prev => {
    //   const newHistory = [...prev, {text: data, type: 'answer'}]
    //   if ( newHistory.length >= rememberedMessageLimit  ) {
    //     setHistoricChat(prev => [...prev, ...newHistory.slice(0,2)]);
    //     return newHistory.slice(2);
    //   } else {
    //     return newHistory;
    //   }
    // });
const [prev_questions, setPrevQ] = useState(initialQ);
  const [prev_answers, setPrevA] = useState(initialA);

setPrevA(prev_answers => [...prev_answers, data]);

{prev_answers}
<div className="chatMessages">
          <blockquote>{answer}</blockquote>
        </div>

Hier ben ik mee bezig om te kijken of ik een icon kan toevoegen, voornamelijk bij HU-B's antwoorden
<div key={i} className={`messages-tot ${msg.type}`}>
            {msg.type === 'answer' && (
              <img src={HUBIcon} alt="HU-B avatar icon" className="avatar" />
            )}
            <div className={`message ${msg.type}`}>
              {msg.text}
            </div>
            {msg.type === 'question' && ()}
          </div>


morgen: begin met typewriter effect. Gebruik video: https://www.youtube.com/watch?v=ZlZgE-xKRCE
<Typewriter options={{string=JSON.stringify({msg.text}),autoStart=true,}} />

Eerst moet de chatgeschiedenis visueel worden aangegeven
En ik wil op enter kunnen drukken ipv alleen maar op 'versturen'
*/

function App() {
  const rememberedMessageLimit = 20; /*hoort 20 te zijn, 6 is even voor test */
  /* Eigenlijk zou er in de opening verder ook gerbuikte bron & disclaimer moeten staan
  Volledige openingtekst in HU-B v2:
  Welkom! Ik ben HU-B, jouw HR-assistent.
  Gebruikte bron: Personeelsgids BU Talentclass versie 2024.1 en gelinkte bronnen
  Disclaimer: De informatie die HU-B geeft is mogelijk niet volledig of niet actueel. De informatie die gegeven is, is niet juridisch bindend. Raadpleeg bij twijfel altijd HR.
  De kennisbron is opgebouwd en opgeslagen in de cache. Je kunt nu vragen stellen.
  */
  const openingText = "Welkom! Ik ben HU-B, jouw HR-assistent. Je kunt nu vragen stellen!\n\nMaximaal 10 vragen uit de chatgeschiedenis worden meegenomen in een antwoord.\n Vragen die niet meer worden meegenomen worden verdonkerd weergegeven"
  const [question, setQuestion] = useState('');
   /* qaHistory zijn de vragen & antwoorden die nog worden meegenomen door HU-B in de volgende antwoorden. deze worden getoond als 'gekleurde' berichten*/
  const [qaHistory, setQH] = useState([]);
  /* deze zijn voor het tonen van oude berichten */
  const [chatTotal, setChat] = useState([ {text: openingText, type: 'opening'}]);
  const [chatHistoricOnly, setHistoricChat] = useState([ {text: openingText, type: 'opening'}]);


  const sendQuestion = async () => {
    const currentQuestion = question;

    setChat(prev => [...prev, { text: currentQuestion, type: 'question'}]);
    setQH(prev => [...prev, { text: currentQuestion, type: 'question'}]);
    
    setQuestion('');
    
    const response = await fetch('http://localhost:8080/api/chat', {
    /*const response = await fetch('http://localhost:9090/api/chat', { */
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: currentQuestion,
    });

    const data = await response.text();
    setChat(prev => [...prev, {text: data, type: 'answer'}]);
    setQH(prev => [...prev, {text: data, type: 'answer'}]);
    if ( qaHistory.length >= rememberedMessageLimit ) {
      setHistoricChat(prev => [...prev, ...qaHistory.slice(0,2)]);
      setQH(prev => prev.slice(2));
    }
    
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
        <h2>Jouw chatgesprek</h2>
        {chatHistoricOnly.map((msg, i) => (
          <div key={i} className={`message-history ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {qaHistory.map((msg, i) => (
          <div key={i} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
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
      <section>
        <div>
          <h2>Playground</h2>
          <Typewriter options={{
            strings: 'Ik ben het typewriter effect aan het testen',
            autoStart: true,
            delay: 40,
            loop: true,
          }} />
        </div>
      </section>

    </>
  );
}


export default App;