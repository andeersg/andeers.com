---
title: jQuery og Google Analytics for å spore klikk
author: Anders
layout: post
permalink: /jquery-og-google-analytics-for-a-spore-klikk/
firstpublish:
  - 1
categories:
  - Development
---
Har du lenker eller knapper som kjører AJAX-innhold kan det være kjekt å spore hvor mange som klikker på elementene. Det kan hende du er nysgjerrig på hvor mange som klikker på logoen din kontra HJEM-knappen. Ved å bruke Google Analytics kan du sette opp at klikk på disse elementene skal spores. Dermed kan du se hvor mange klikk logoen din får og hvor mange klikk hjem-knappen har fått. Dermed kan du finne ut hva brukerne foretrekker og om det er poeng å ha en hjem-knapp.

## Google Analytics Event Tracking

For å spore klikk brukes en kode som ser ca sånn ut:  
`_gaq.push(['_trackEvent', 'Kategori', 'Hendelse', 'Tittel']);`

&#8220;Kategori&#8221; er en samlebetegnelse for flere &#8220;Hendelser&#8221;. Disse to er obligatoriske og må være med for at det skal fungere. I tillegg er det mulig å sette en Tittel, dette kan for eksempel være målet om det er lenker man sporer.

I eksempelet med HJEM-knappen vil da kodene se sånn ut f.eks:  
`_gaq.push(['_trackEvent', 'Hjemlenke', 'Logo']);`  
`_gaq.push(['_trackEvent', 'Hjemlenke', 'Menyelement']);`

Da vil du etter hvert få opp statistikk i Google Analytics om hvor mange som har klikket på de forskjellige lenkene.

Google plasserer disse kodene i et onClick-element på lenkene i [sin dokumentasjon][1].

## jQuery

Ved å bruke jQuery til dette vil du få en mye mer oversiktlig kode, pluss at du slipper å redigere html-koden.

For å spore klikk på logoen kan du da bruke denne koden:

<pre rel="jQuery"><code>$('#logo').click(function(){
_gaq.push(['_trackEvent', 'Hjemlenke', 'Logo']);
});
</code></pre>

I dette tilfellet er IDen til logoen &#8220;logo&#8221;. Denne koden kan du ha i `<head></head>`-seksjonen eller i en ekstern javascript-fil. Dermed får du en ryddig kode og du får samlet alle tracking-kodene på en plass.

jQuery og denne sporingskoden er en veldig kraftig kombinasjon, du kan spore alt mulig.

### Forslag til sporing:

  * Hva en bruker velger i en nedtrekksliste.
  * Hvor mange som flytter musa over logoen (`$.mouseover`).
  * Eller alt annet du måtte føle for å vite om og som du kan bruke jQuery på.

Bruker du Google Analytics på en lur måte? Fortell gjerne om det i kommentarfeltet.

 [1]: https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide "Google Analytics Event Tracking"