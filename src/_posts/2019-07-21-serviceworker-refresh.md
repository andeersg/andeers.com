---
title: 'Refresh Service Worker'
permalink: /2019/07/service-worker-refresh/
tags:
  - JavaScript
  - Service Worker
---

Have you ever enabled a service worker and then realised that your updates are not showing because of caching. I have.

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API "Service Worker API") a service worker will update every 24 hour or so or when all pages/instances are closed.

This can be a problem if you have made recent changes or the website is added to home screen. There could be reasons not to force update the service worker whenever a new one is available, so a better solution is to prompt the user to update (if they want to).

## How to detect when a new worker is available

There are two parts to manage this. The service worker must listen for messages from the browser (client refreshing), and the browser must listen for new service workers.

### Service worker

To listen for messages inside the service worker we need to add an event listener for the message event.

In my solution I send an object to the service worker with an action property. So when the service worker receives `action: 'skipWaiting'` it knows to activate the pending worker.

``` javascript
self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
```

### Browser

First you need a button to click.

``` html
<button class="refresh-worker hidden">A new service worker is available, click to reload</button>
```

I recommend to hide it with CSS. If JS or service workers are not supported it has no purpose and can stay hidden.

``` javascript
const refreshButton = document.querySelector('.refresh-worker');
let newWorker = null;
    
refreshButton.addEventListener('click', (event) => {
  event.preventDefault();
  newWorker.postMessage({ action: 'skipWaiting' });
  window.location.reload();
});
```

First we need a reference to the button (for click handler) and a variable to put the service worker in when it's available.

When the button is clicked we send a message to the worker telling it to skip waiting and activate the new worker. Then we refresh the page.

Next we must listen for service worker updates so we know when to display the button and prompt the user to update.

```javascript
// Register service worker:
navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
 		// Listen for updates:
    registration.addEventListener('updatefound', () => {
      newWorker = registration.installing;
			// Listen for when the new worker is ready:
      newWorker.addEventListener('statechange', () => {
        switch (newWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
 							// Display button:
              refreshButton.classList.remove('hidden');
            }
            break;
        }
      });
    });
  });
}
```

When the worker is ready to be activated we can display the button and inform the user that a new version is available.