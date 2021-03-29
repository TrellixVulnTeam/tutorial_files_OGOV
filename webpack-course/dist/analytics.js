/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./analytics.js ***!
  \**********************/
function createAnalytics() {
  var counter = 0;
  var isDestroyed = false;

  var listener = function listener() {
    return counter++;
  };

  document.addEventListener('click', listener);
  return {
    destroy: function destroy() {
      document.removeEventListener('click', listener);
      isDestroyed = true;
    },
    getClicks: function getClicks() {
      if (isDestroyed) {
        return "Analytics is destroyed. Total click is ".concat(counter);
      }

      return counter;
    }
  };
}

window.analytics = createAnalytics();
/******/ })()
;
//# sourceMappingURL=analytics.js.map