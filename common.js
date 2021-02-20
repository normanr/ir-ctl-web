if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('worker.js').then(function(registration) {
    console.log('Service worker registration succeeded: ' + (registration.waiting ? "waiting to update..." : "no update"));
  }, /*catch*/ function(error) {
    console.error('Service worker registration failed:', error);
  });
} else {
  console.warn('Service workers are not supported.');
}

let touchstart = (event) => {
  event.preventDefault();
  let button = event.target.closest('button');
  if (!button) return;
  console.log(event.type, button.dataset.keycode)
  let data = {
    "keymap": button.closest('device').dataset.keymap,
    "keycode": button.dataset.keycode,
  };
  if (button.dataset.hasOwnProperty('delays')) {
    data.delays = button.dataset.delays
  }
  let led = document.getElementById('led');
  led.style = "color:red";
  let query = Object.entries(data).map(([k, v]) => escape(k) + '=' + escape(v)).join('&');
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/cgi-bin/ir-ctl-send?" + query);
  xhr.addEventListener("load", () => {
    led.style = "";
    msg = xhr.status + " " + xhr.statusText + ":\n" + xhr.response;
    if (xhr.status >= 200 && xhr.status < 300) {
      if (xhr.response) {
        console.warn(msg);
        alert(msg);
      }
    } else {
      console.error(msg);
      alert(msg);
    }
  });
  xhr.addEventListener("error", () => {
    led.style = "";
    alert("Error trying to connect to server");
  });
  xhr.send();
};
let touchend = (event) => {
  let button = event.target.closest('button');
  if (!button) return;
  event.preventDefault();
  console.log(event.type, button.dataset.keycode)
};
let buttondown = (event) => {
  if (event.button == 0) touchstart(event)
}
let buttonup = (event) => {
  if (event.button == 0) touchend(event)
}
[...document.getElementsByTagName('device')].forEach(element => {
  element.addEventListener('touchstart', touchstart);
  element.addEventListener('mousedown', buttondown);
  element.addEventListener('touchend', touchend);
  element.addEventListener('mouseup', buttonup);
});
