---
title: Angrep mot WordPress
author: Anders
layout: post
permalink: /angrep-mot-wordpress/
firstpublish:
  - 1
categories:
  - WordPress
---
I det siste har det vært flere artikler om store angrep mot WordPress-installasjoner. Derfor er det veldig viktig å ta noen forhåndsregler sånn at din WordPress er sikker.

Angrepene prøver brukernavnet &#8220;admin&#8221; sammen med veldig mange passord. &#8220;admin&#8221; er et brukernavn veldig mange har satt som standard og derfor er det dette angrepet prøver på.

## Har du &#8220;admin&#8221; som brukernavn?

Ta det med ro, det er ikke vanskelig å løse dette problemet.

  * <span style="line-height: 13px;">Opprett en ny bruker med det brukernavnet du ønsker (Sørg for at den nye brukeren har administrator-rettigheter).</span>
  * Logg inn med den nye brukeren og slett den gamle.
  * Da vil du få et spørsmål om hva du vil gjøre med postene til den gamle brukeren, du kan enten overføre de til den nye brukeren eller slette de.

Da skal du ha fått deg en ny bruker med alle dine gamle innlegg.

## Andre måter for å forhindre angrep mot WordPress

Jeg bruker alltid å legge inn [Limit Login Attempts][1] når jeg setter opp en WordPress-side. Den blokkerer brukere som prøver å logge inn for mange ganger på kort tid. Standardinnstillingen er at 4 feilaktige innlogginger fører til en &#8220;lockout&#8221;.

Til nå er det 1367 lockouts på denne siden. Man får også se en lang liste med IP-adressene som har prøvd og med hvilket brukernavn de har brukt. I listen min ser jeg at **admin** er en gjenganger, over 90% av forsøkene er gjort med admin som brukernavn.

En annen plugin jeg har begynt å ta i bruk er [Google Authenticator][2]. Denne gjør at du må oppgi en kode i tillegg til brukernavn og passord når du logger på siden din. Koden får du via en app Google har laget, denne er tilgjengelig til iOs, Android og Blackberry. Dette fungerer på samme vis som bankID, koden er kun gyldig i ca 1 minutt. Dermed har det blitt veldig vanskelig for en person som prøver å bryte seg inn, selv om de har passordet ditt må de også ha telefonen din.

&nbsp;

 [1]: http://wordpress.org/extend/plugins/limit-login-attempts/ "Limit Login Attempts"
 [2]: http://wordpress.org/extend/plugins/google-authenticator/ "Google Authenticator"