import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import qquestLogo from './assets/Qquest_Logo_Wit(RGB).png'
import HUBIcon from './assets/rechthoekig-faceless-hub-logo-zwart.png'
import './App.css'


function App() {
  const rememberedMessageLimit = 20;
  /* Eigenlijk zou er in de opening verder ook gerbuikte bron & disclaimer moeten staan
  Volledige openingtekst in HU-B v2:
  Welkom! Ik ben HU-B, jouw HR-assistent.
  Gebruikte bron: Personeelsgids BU Talentclass versie 2024.1 en gelinkte bronnen
  Disclaimer: De informatie die HU-B geeft is mogelijk niet volledig of niet actueel. De informatie die gegeven is, is niet juridisch bindend. Raadpleeg bij twijfel altijd HR.
  De kennisbron is opgebouwd en opgeslagen in de cache. Je kunt nu vragen stellen.
  */
  const openingText = "Welkom! Ik ben HU-B, jouw HR-assistent. Je kunt nu vragen stellen!\n\nMaximaal 10 vragen uit de chatgeschiedenis worden meegenomen in een antwoord.\n Vragen die niet meer worden meegenomen worden verdonkerd weergegeven"
  const opening2 = "Disclaimer:\nDe informatie die HU-B geeft is mogelijk niet volledig of niet actueel.\nDe informatie die gegeven is, is niet juridisch bindend. Raadpleeg bij twijfel altijd HR."
  const [question, setQuestion] = useState('');
   /* qaHistory zijn de vragen & antwoorden die nog worden meegenomen door HU-B in de volgende antwoorden. deze worden getoond als 'gekleurde' berichten*/
  const [qaHistory, setQH] = useState([]);
  /* deze zijn voor het tonen van oude berichten */
  const [chatTotal, setChat] = useState([ {text: openingText, type: 'opening'}]);
  const [chatHistoricOnly, setHistoricChat] = useState([ {text: openingText, type: 'opening'},{text: opening2, type: 'disclaimer'}]); 
  

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
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString(msg.text).start();
              }}
              options={{
                delay: 17,
                cursor: '',
              }}
              />
              
          </div>
        ))}
        </section>

      
      <section id="input">
        <input className="inputText"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendQuestion();
            }
          }}
          placeholder="Stel een vraag..."
        />

        <button className="sendButton" onClick={sendQuestion}>
          Versturen
        </button>
        
      </section>
      

    </>
  );
}


export default App;