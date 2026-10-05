(function() {
  'use strict';

  // The complete page is already in HTML; these features are optional.
  var date = document.getElementById('topline-date');
  if (date) {
    var now = new Date();
    date.dateTime = now.getFullYear() + '-' +
      String(now.getMonth() + 1).padStart(2, '0') + '-' +
      String(now.getDate()).padStart(2, '0');
    date.textContent = now.toLocaleDateString('en', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  var olderNews = document.getElementById('older-news');
  var moreBtn = document.getElementById('news-toggle');
  if (olderNews && moreBtn) {
    var mq = window.matchMedia('(max-width: 960px)');
    var expanded = false;
    var label = moreBtn.querySelector('[data-toggle-label]');
    function updateNews() {
      olderNews.hidden = mq.matches && !expanded;
      moreBtn.hidden = !mq.matches;
      moreBtn.setAttribute('aria-expanded', String(!olderNews.hidden));
      label.textContent = expanded ? 'Show less' : 'Show more';
      if (olderNews.hidden && olderNews.contains(document.activeElement)) {
        moreBtn.focus();
      }
    }
    moreBtn.addEventListener('click', function() {
      expanded = !expanded;
      updateNews();
      // The button remains in the DOM, retaining keyboard focus.
    });
    mq.addEventListener('change', updateNews);
    updateNews();
  }

  // Ignore unavailable analytics so outbound navigation always works.
  document.querySelectorAll('[data-track-event]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (!window.goatcounter || typeof window.goatcounter.count !== 'function') return;
      try {
        window.goatcounter.count({
          path: link.dataset.trackEvent,
          event: true,
          no_session: true,
          title: link.dataset.trackTitle
        });
      } catch (_) {
        // Tracking is optional; a reporting failure must not affect the page.
      }
    });
  });
})();
