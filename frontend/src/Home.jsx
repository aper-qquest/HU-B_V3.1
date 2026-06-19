// Dit bestand doet nog niets! Het is een set-up voor het gebruik van meerdere paginas
import { useNavigate } from 'react-router-dom';
import qquestLogo from './assets/Qquest_Logo_Wit(RGB).png'
import HUBIcon from './assets/rechthoekig-faceless-hub-logo-zwart.png' // tijdelijk! moet vervangen worden door de final
import '.App.css'


function Home() {
    const navigate = useNavigate();
    
    return (
        <section id="welcome">
            <div className="topBanner">
                <img src={qquestLogo} className="qquestLogo" alt="Qquest logo" />
                <img src={HUBIcon} className="HUBBanner" alt="HU-B logo" />
                <h1 className="topText">De personeelsgids Chatbot</h1>
            </div>
            <div className="pages">
                <button disabled>
                    Home
                </button>
                <button onClick={() => navigate('/TCChat')}>
                    Talent Class Chat
                </button>
                <button onClick={() => navigate('/QAChat')}>
                    QA Chat
                </button>
                <button onClick={() => navigate('/ServiceChat')}>
                    Service Chat
                </button>
            </div>
            <div>
                <h1>Welkom!</h1>
                <img src={HUBIcon} alt="HU-B icon" className="HUBIcon"/>
                <h1>Ik ben HU-B</h1>
                <p>Kies een van de personeelsgidsen om met me te chatten.</p>
                <h2>Disclaimers:</h2>
                <p>
                    Maximaal 10 vragen uit de chatgeschiedenis worden meegenomen in een antwoord.
                    Vragen die niet meer worden meegenomen worden verdonkerd weergegeven.
                    Chatgeschiedenis van een vorige sessie wordt nooit meegenomen.
                </p>
                <p>
                    De informatie die HU-B geeft is mogelijk niet volledig of niet actueel.
                    De informatie die gegeven is, is niet juridisch bindend. Raadpleeg bij twijfel altijd HR.
                </p>
            </div>
        </section>
    )
}