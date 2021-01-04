# photographer-assistant-app

** JavaScript 2 – Praktisk uppgift – Foto-gallring **

Ni ska bygga en foto-review app för fotografer.
Fotografer ska kunna ladda upp bilder till album och få en länk som de kan skicka till sin kund.
Kunder ska när de går in på länken få en trevlig presentation av bilderna, kunna klicka på dem och ge dem 👍🏻 eller 👎🏻.
När alla foton har fått ett betyg så ska de med 👍🏻 sparas i ett nytt album som tillhör fotografen.
Tips är att nyttja en lightbox för att visa bilderna enkelt och snyggt.


Hygienkrav:

    * Samtlig kod ska vara egenskriven.
    * Skriven i React enligt best practice från kursen, dvs använder funktionella komponenter, React Router och Context (och/eller Redux).
    * Firebase ska användas som backend för autentisering, databas och fillagring.
    * All källkod vara korrekt indenterad (så klart!)
    * Versionshantering av kod enligt best practice (ej endast en commit i slutet).
    * Publicerat appen via ex. Heroku.


Fotograf
    Grundkriterier
        Fotografen ska endast kunna se och utföra operationer på album som tillhör hen.
    
    Stories:
        Som fotograf till jag kunna se mina album när jag loggat in.
        Som fotograf till jag kunna skapa nya album dit jag kan ladda upp ett obegränsat antal bilder.
        Som fotograf vill jag kunna redigera ett albumnamn.
        Som fotograf vill jag kunna ladda upp fler bilder till ett redan skapat album.
        Som fotograf vill jag kunna markera bilder och skapa ett nytt album utifrån de markerade bilderna.
        Som fotograf vill jag kunna bjuda in min kund till att gallra bland bilderna, och de bilder som kunden väljer ska hamna i ett nytt album på mitt konto.
        Som fotograf vill jag att den länken som jag skickar till min kund innehåller en unik kod och att kunden kommer till en separat vy utan att behöva logga in.
        Som fotograf vill jag att kunden endast ska kunna betygsätta bilderna i det albumet, och att när kunden markerat att hen är klar så skapas ett nytt album på mitt konto (förslagsvis med albumets namn + tidpunkt för gallringen).
        VG: Som fotograf vill jag kunna ta bort bilder från ett album (om bilden inte finns i fler album så ska bilden raderas).
        VG: Som fotograf vill jag kunna ta bort ett album (om bilderna inte finns i fler album så ska bilderna också raderas).


Kund
    Grundkriterier
        Kunden ska komma direkt till gallrings-vyn för bilderna i albumet. Ingen inloggning ska behövas.
        Kunden ska inte kunna komma åt andra album.

    Stories:
        Som kund vill jag kunna surfa in på en länk och komma direkt till bilderna i det albumet som länken avser. Jag ska inte behöva logga in.
        Som kund vill jag kunna betygsätta bilder med tumme upp eller tumme ner.
        Som kund vill jag kunna se samtliga bilder i albumet.
        Som kund vill jag innan jag skickar in min gallring kunna se vilka bilder jag gallrat bort och vilka jag valt att behålla. Jag vill också kunna ångra val. Jag vill också se hur många bilder jag valt att behålla av det totala antalet.
        Som kund vill jag kunna skicka in min gallring, men först efter att jag antingen gett tumme upp eller tumme ner till samtliga bilder.

Betygskriterier
    Godkänt:
        * Uppfyllt hygienkraven för uppgiften.
        * Lämnat in en komplett, fungerande app enligt specifikation.
        * Använt best practice enligt vad som lärts ut under utbildningen.

    Väl godkänt:
        * För väl godkänt finns möjligheten (inte krav) att genomföra projektet i grupp om två personer, men detta kräver att ni lämnar in en tydlig uppdelning av vilka komponenter och delar varje person ska skriva. Det krävs att båda personerna bidrager jämnt med faktisk kod, dvs det är inte godkänt att en av personerna enbart gör layout eller enbart “backend-kommunikationen”.

        * Förutom ovan kriterier för godkänt även:
            Uppfyllt VG-kriterierna ovan.
            Lämnat in en komplett, väl fungerande app i tid enligt specifikation.
            Skrivit minst fyra tester som testar rimlig funktionalitet (t.ex. att ett album ej går att komma åt för en kund om hen har en felaktig kod).
            Visat på god programmeringssed.
