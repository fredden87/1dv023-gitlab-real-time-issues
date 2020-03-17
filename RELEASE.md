# Release

In this file, you indicate the status of your assignment by checking the checkboxes below. No unchecked checkboxes are allowed in the document when your hand in for the assessment.

## Release status

_To make a release that will be assessed by the examiner you need to make sure all checkboxes below are checked. You check a checkbox by adding a "x" within the brackets._

- [x] I have started working on the assignment.
- [x] `npm install` is being used to install all dependencies.
- [x] `npm start` is being used to start the application.
- [x] All functional requirements are fulfilled.
- [x] All Production requirements are fulfilled.
- [x] All non-functional requirements are fulfilled.
- [x] I have completed the assignment report (see below).

---

- [x] I intend to submit the assignment and at the same time I guarantee that I am the one who created the code that is submitted. In cases where I use external libraries or borrowed code from other sources, the source is clearly stated.
(_Jag avser göra en inlämning av uppgiften och jag garanterar samtidigt att jag är den som skapat koden som lämnas in. I de fall jag använder externa bibliotek eller har lånat kod från andra källor så är källan tydligt angiven._)

---

## Assignment report

Rolig uppgift som har lärt mig att göra en real-time webbapp. Har jobbat lite med vissa av dessa tekniker innan men aldrig på samma gång. Det var kul att se vad man kan göra när man blandar alla dessa tekniker. Webhook var en helt ny teknik för mig, tycker konceptet var lätt att förstå och ett bra sätt för att få en server att prenumerera på händelser.

### URL to your application

<https://cscloud495.lnu.se/>

### Security

Jag har säkrat upp min app genom att verifiera att datan som kommer från webhooken verkligen kommer från gitlab, detta sker genom att jag kollar att varje post som kommer till min webhook-route innehåller min SECRET TOKEN.

Applikationen går endats att nå via https vilket innebär att all data mellan client och server är krypterad med TLS. Servern har brandväggen påslagen och tillåter bara anslutningar på portarna 22/(SSH), 80(HTTP) och 443(HTTPS).

Jag använder även miljövariabler till allt som är hemligt.

### Description of entities

_ Describe the following parts, how you are using them, and what their purpose is in your solution:

- Reversed proxy

Reverse proxy används för att dirigera trafik till ens applikation. I mitt fall används nginx som reverse proxy och slussar vidare all trafik från port 443 till port 3000 på angiven URL. Reverse proxyn hanterar också TLS krypteringen mellan client och server.

- Process manager

En process manager ser till att en applikation körs och ifall applikationen krashar så startar den applikationen igen. I mitt fall använder jag pm2 för att säkerställa att min applikation alltid körs.

- TLS certificates

TLS certificates används för att kryptera förbindelsen mellan klient och server, och på så sätt omöjliggör avlyssning av datan som skickas mellan klient och server

- Environment variables

Environment variables används för att miljön applikationen körs på ska kunna tala om för en applikation hur den ska köras, eller ge annan information om miljön. I mitt fall används det till för att tala om för node att miljön är en produktions server.

_

### Development vs. Production

I mitt fall är det framförallt express som optimerar sig genom cashning när man kör applikationen i production. Detta gör att applikationen klarar av mer trafik. Cashning innebär att delar av applikationen blir tillgängliga direkt i ram-minnet, vilket är mycket snabbare än att läsa från disk.

### Use of external dependencies

Jag använde socket.io för att skapa en websocket som min klient kan ansluta till och få data i realtid. Motivationen för detta är helt enkelt att kursledningen rekommenderade den och att det är ett väldigt populärt ramverk för just detta endamål.

### Overall Reflection

En rolig uppgift som tog betydligt längre tid än jag hade planerat. Jag har lärt mig att blanda alla tekniker jag dels lärt mig genom 1dv022 och 1dv023. Slutresultatet blev kanske ingen monsterapp men visar vad som faktist är möjligt att göra på webben idag om man blandar dessa tekniker. Jag har lärt mig massor från denna uppgiften, men framförallt att använda många tekniker på samma gång och hur en webhook fungerar, vilket är något jag aldrig provat innan.

### Further improvments

Jag hade velat göra det möjligt att se återöppnade issues som en notifikation, datan man får när man återöppnar ett issue är identisk den data man får när man öppnar ett nytt issue, så här hade man behöver implementera nått för att komma ihåg gamla issues.

### Extras

Nej jag tror inte det, utan det som ska finnas med finns med.

### Feedback

Rolig uppgift som gör en taggad på att sätta sig och programera något eget på sin fritid. Har lärt mig massa nya tekniker som jag garanterat kommer ha nytta av längre fram.
