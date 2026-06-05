# Hu-B_V3 
HU-B is een chatbot voor vragen rondom de Qquest personeelsgids

Installatie
1. Schaf een API-key aan (bijvoorbeeld door een persoonlijk account op OpenAI aan te maken en hier credit op te zetten). https://auth.openai.com/create-account.
2. Sla de link naar de API-Key op in Windows Powershell (zie functioneel ontwerp voor meer instructies).
4. Installeer NetBeans 29 (Java). https://netbeans.apache.org/front/main/download/nb29/
5. Navigeer in NetBeans naar Team > Git > Clone > voer de github link in (https://github.com/RBruggeman96/HU-B_V3), en daaronder je eigen GitHub accountgegevens.
6. Je hebt nu de meest recente versie van HU-B.
7. Run de code en de chatbot verschijnt in een apart venster.

Gebruik
De gebruiker stelt een vraag. HU-B beantwoord deze vraag. 
Als de informatie in de personeelsgids of gelinkte documenten staat geeft hij inhoudelijk antwoord. 
Bij onvoldoende informatie geeft hij de gebruiker een advies met vervolgstappen om toch antwoord op diens vraag te kunnen krijgen. 

Functionaliteiten
HU-B gebruikt hiervoor de volgende functionaliteiten:
HU-B heeft een 'context window' van waaruit hij, binnen (niet tussen) sessies gegeven informatie, meeneemt voor het formuleren van een gericht antwoord.
HU-B vraagt zelf door naar meer context en geeft het ook aan wanneer hij onvoldoende informatie heeft voor het beantwoorden van de vraag.
HU-B kan vragen met typfouten alsnog interpreteren.
HU-B kan de gebruiker helpen een email op te stellen naar een leidinggevende.

Bron updates
HU-B laadt de personeelsgids en alle externe bronnen bij de eerste keer opstarten in. De chatbot doet er dan 2-3 minuten over om op te starten. 
Daarna zal hij binnen enkele seconden opstarten. Er is een update knop die voor iedereen toegankelijk is. 
Wanneer deze wordt aangeklikt worden alle documenten opnieuw ingeladen en is de informatie die de chatbot voor zijn antwoorden gebruikt weer up to date. 
Momenteel gebeurt zo'n update alleen lokaal omdat HU-B_V3 nog niet gehost wordt. 
Vanaf het moment dat HU-B V3 wel gehost word kunnen alleen beheerders documenten toevoegen en wijzigen, die gebruikers dan zelf ophalen met de knop. 
