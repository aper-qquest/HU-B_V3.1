import { useState } from "react";
import qquestLogo from './assets/Qquest_Logo_Wit(RGB).png'
import './AppVenster.css'

// moet een kopie vormen van hoe het appvenster van HU-B er nu uit ziet, gebruikt stijlvormen gedefinieerd in AppVenster.css
function AppVenster() {
    // const[value, setValue] = useState("Change me");

    return (
        <>
        <section id="header">
            <div className="topBanner">
                <img src={qquestLogo} className="qquestLogo" alt="Qquest logo" />
            </div>
            <div>
                <h1>Test.</h1>
                <p>
                    Main body text
                </p>
                <p>
                    Starting to use <code>Appvenster.css</code> for certain settings.
                </p>
            </div>
            
        </section>

        <section id="chat">
            <div>
                <p>Gebied waarin de chat wordt afgebeeld.</p>
            </div>
        </section>
        <section id="input">
            <div>
                <p>Gebied waar vragen getypt kunnen worden.</p>
            </div>
        </section>
        </>
    )
}
/*
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
    <div>
                <input value={value} onChange={handleChange} />
                <p>Value: {value}</p>
            </div>
  }
*/
export default AppVenster