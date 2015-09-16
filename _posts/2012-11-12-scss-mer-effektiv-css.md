---
title: 'SCSS &#8211; Mer effektiv CSS'
author: Anders
layout: post
permalink: /scss-mer-effektiv-css/
categories:
  - Development
---
CSS3 har blitt godt implementert i de fleste nettlesere nå og det har mange kjekke muligheter som animasjoner, skyggelegging og avrundede hjørner. Men likevel kan du ta CSS enda et steg videre og gjøre utviklingen enklere. **Say hello to SCSS.**

SCSS er et skriptspråk som kompileres til CSS. SCSS skrives på samme måte som CSS men det har muligheter som ikke er mulig med vanlig CSS. Du har foreksempel mulighet til å nøste css-tagger sånn at du slipper å skrive like mye:

<pre rel='scss'><code>
.mainmenu{
  width: 600px;
  margin: 0 auto;
  ul{
    background: #412eeb;
    li{
      display: inline;
      padding: 5px;
      a{
        color: #ca2828;
      }
    }
  }
}
</code></pre>

<pre rel='css'><code>
.mainmenu{
  width: 600px;
  margin: 0 auto;
}
.mainmenu ul{
  background: #412eeb;
}
.mainmenu ul li{
  display: inline;
  padding: 5px;
}
.mainmenu ul li a{
  color: #ca2828;
}
</code></pre>

Her vil SCSS kompileres til CSS-eksempelet over, ved å bruke SCSS sparer man litt unødvendig skriving og personlig mener jeg det blir mer oversiktlig.<!--more-->

**Variabler**

SCSS gir også muligheten til å lage variabler. Variabler i CSS kan du foreksempel bruke til å angi 3-4 farger, dermed kan du bruke disse variablene gjennom CSS-dokumentet. Skulle du få lyst til å forandre noen av fargene på nettstedet kan du nå bare forandre variablene istedet for å måtte gå gjennom dokumentet og forandre alle forekomstene.

**Mixins**

Mye CSS-kode skrives mange ganger gjennom dokumentene og kan ikke alltid plasseres i klasser for gjenbruk. Der har SCSS en kjekk ting som kalles mixins.

En mixin er som en variabel, bare at du kan skrive hele CSS-biter du bruker ofte:

<pre rel='scss'><code>
@mixin centered {
  margin-left: auto;
  margin-right: auto;
}
.box{
  @include centered;
  /* Annen CSS */
}
</code></pre>

<pre rel='css'><code>
.box{
  margin-left: auto;
  margin-right: auto;
  /* Annen CSS */
}
</code></pre>

**Mixins med argument**

Du kan også la mixins motta argumenter og sette standard-argumenter om ingenting blir angitt.

Bruker du ofte 1px ramme rundt bokser og avrundede hjørner er du kanskje lei av å skrive alle prefixene for de forskjellige nettleserene.

Ved å bruke SCSS kan du da lage deg en mixin som gjør dette veldig enkelt:

<pre rel='scss'><code>
@mixin rounded($val) {
  -moz-border-radius: $val;
  -webkit-border-radius: $val;
  border-radius: $val;
}
.box{
  @include rounded(10px);
  /* Annen CSS */
}
</code></pre>

<pre rel='css'><code>
.box{
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  /* Annen CSS */
}
</code></pre>

**Komme i gang med SCSS**

For å komme i gang med SCSS må du enten ha litt kunnskaper om Ruby og terminal(mac), være god til å søke og lese deg frem eller gå for et program som tar seg av alt.

Personlig har jeg valgt å gå for det siste alternativet. Jeg bruker et program som heter CodeKit, det lar meg administrere alt på en behagelig måte, også slipper jeg å styre med ruby og kommandoer jeg fort glemmer.

CodeKit overvåker de mappene du angir og kompilerer SCSS-koden til gyldig CSS. CodeKit har også en nyttig funksjon hvor det oppdaterer nettleseren med endringene du gjør uten at siden oppdateres. CodeKit har veldig mange funksjoner og muligheter og det fortjener et eget innlegg for å få med alt, så kanskje jeg skriver et innlegg om det senere.