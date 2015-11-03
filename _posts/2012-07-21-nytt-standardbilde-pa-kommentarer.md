---
title: Nytt standardbilde på kommentarer
author: Anders
excerpt: I dette innlegget skal jeg vise hvordan man setter en personlig avatar på kommentarene.
layout: post
permalink: /nytt-standardbilde-pa-kommentarer/
categories:
  - WordPress
tags:
  - Guide
---
<p class="intro">
  I dette blogginnlegget skal jeg vise hvordan man enkelt kan sette en personlig avatar som standard på kommentarer. Alt som kreves er en liten kodesnutt og et nytt bilde.
</p>

Bilder på kommentarene på en blogg kalles avatarer og WordPress benytter en tjeneste som kalles [Gravatar][1] for å la folk ha sine egne bilder på kommentarene uten å måtte registrere seg på hver enkelt blogg. For personer som ikke benytter gravatartjenesten vises enten WordPress sin &#8220;Mystery Man&#8221; eller autogenerert pixelart:<figure id="attachment_665" style="width: 338px;" class="wp-caption aligncenter">

[<img class="size-full wp-image-665" title="Avatarer" src="/wp-content/uploads/2012/07/avatars.png" alt="Avatarer" width="338" height="144" />][2]<figcaption class="wp-caption-text">Avatarene man kan velge som standard</figcaption></figure> 

Vil man ha et eget bilde som standard, noe som kan ta seg bedre ut om man har lagd et pent design, krever det kun en liten kodesnutt som må limes inn i functions.php.

    add_filter( 'avatar_defaults', 'ny_avatar' ); 
    
    function ny_avatar ($avatar_defaults) { 
    	$ny_avatar = get_bloginfo('template_directory') . '/images/gravatar.png'; 
    	$avatar_defaults[$ny_avatar] = "Ny avatar"; return $avatar_defaults; 
    }

Det denne kodesnutten gjør er å:

  * Kjøre funksjonen vår når WordPress skal vise avatarene.
  * Angi hvor vår avatar ligger (I dette tilfellet ligger avataren i &#8220;images&#8221;-mappen i tema-mappen).
  * Legge til vår avatar sammen med resten og gir den navnet &#8220;Ny avatar&#8221;.

Resultatet av dette er at det på administrasjonsiden &#8220;Settings &#8211; Discussion&#8221; har dukket opp et nytt valg for avatarer:<figure id="attachment_685" style="width: 439px;" class="wp-caption aligncenter">

[<img class="size-full wp-image-685" title="Ny avatar" src="/wp-content/uploads/2012/07/Skjermbilde-2012-07-17-kl.-22.00.45.png" alt="ny avatar" width="439" height="74" />][3]<figcaption class="wp-caption-text">Min nye avatar.</figcaption></figure> 

Da skulle det være enkelt å lage din egen avatar for bruk på WordPress-siden, skulle noe være uklart er det bare å slenge igjen en **kommentar**.

 [1]: http://gravatar.com "Gravatar.com"
 [2]: /wp-content/uploads/2012/07/avatars.png
 [3]: /wp-content/uploads/2012/07/Skjermbilde-2012-07-17-kl.-22.00.45.png