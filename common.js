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
