(function(d) {
  // GoatCounter: record outbound link clicks as events (no_session => every click counts)
  function trackOutbound(el, name, title) {
    el.addEventListener('click', function() {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: name, event: true, no_session: true, title: title });
      }
    });
  }

  // Meta
  document.getElementById('site-name').textContent = d.meta.name;
  document.getElementById('site-tagline').innerHTML = d.meta.tagline;
  document.getElementById('topline-location').textContent = d.meta.topline.location;
  document.getElementById('topline-date').textContent =
    new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  var foot = document.getElementById('site-foot');
  if (d.meta.foot) foot.innerHTML = d.meta.foot; else foot.remove();
  document.title = d.meta.name;

  // Font Awesome icon classes (CDN loaded in <head>)
  var iconCls = {
    scholar: 'fa-brands fa-google-scholar',
    github: 'fa-brands fa-github',
    linkedin: 'fa-brands fa-linkedin-in'
  };

  // Contact icons, rendered under the masthead tagline
  var contactRow = document.getElementById('site-contact');
  d.contact.forEach(function(c) {
    var a = document.createElement('a');
    a.href = c.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = iconCls[c.icon] || '';
    a.setAttribute('aria-label', c.text);
    trackOutbound(a, 'outbound:contact', c.text);
    contactRow.appendChild(a);
  });

  // Build columns dynamically from data.columns order and widths
  var container = document.getElementById('columns-container');
  container.style.setProperty('--cols', d.columns.map(function(c) {
    return (c.width || 1) + 'fr';
  }).join(' '));
  d.columns.forEach(function(col) {
    var wrapper = document.createElement('div');
    wrapper.className = 'col';

    if (col.section === 'news') {
      wrapper.innerHTML = '<h2 class="k">' + col.heading + '</h2>';
      var articles = d.news.map(function(n) {
        var article = document.createElement('article');
        article.className = 'news';
        article.innerHTML =
          '<div class="nmeta"><span>' + n.date + '</span><span class="ntype">' + n.type + '</span></div>' +
          '<p>' + n.body + '</p>';
        return article;
      });
      // Stacked (mobile) layout: show only the latest 3, with a "show more" toggle
      var feed = document.createElement('div');
      var mq = window.matchMedia('(max-width: 960px)');
      var moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'show-more';
      moreBtn.innerHTML = 'Show more <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
      var expanded = false;
      function renderFeed() {
        feed.innerHTML = '';
        var limit = (!mq.matches || expanded) ? articles.length : 3;
        articles.forEach(function(a, i) {
          if (i < limit) feed.appendChild(a);
        });
        if (mq.matches && !expanded && articles.length > 3) feed.appendChild(moreBtn);
      }
      moreBtn.addEventListener('click', function() {
        expanded = true;
        renderFeed();
      });
      mq.addEventListener('change', renderFeed);
      renderFeed();
      wrapper.appendChild(feed);
    }

    if (col.section === 'publications') {
      wrapper.innerHTML = '<h2 class="k">' + col.heading + '</h2>';
      var pubIcons = {
        paper: 'fa-solid fa-file-lines',
        code: 'fa-brands fa-github'
      };
      var publist = document.createElement('div');
      d.publications.forEach(function(p) {
        var article = document.createElement('article');
        article.className = 'pub';
        var linksHTML = '';
        p.links.forEach(function(l) {
          linksHTML += '<a href="' + l.url + '" target="_blank" rel="noopener" class="' + (pubIcons[l.icon] || '') + '" aria-label="' + l.text + '"></a>';
        });
        article.innerHTML =
          '<div class="pbody">' +
            '<h3>' + p.title + '</h3>' +
            '<div class="pa">' + p.authors + '</div>' +
            '<div class="pv">' + p.venue + '</div>' +
          '</div>' +
          '<div class="plinks">' + linksHTML + '</div>';
        Array.prototype.forEach.call(article.querySelectorAll('.plinks a'), function(a, i) {
          trackOutbound(a, 'outbound:' + p.links[i].icon, p.title);
        });
        publist.appendChild(article);
      });
      wrapper.appendChild(publist);
    }

    if (col.section === 'about') {
      var bioText = d.bio;
      var firstChar = bioText.charAt(0);
      var rest = bioText.slice(1);
      wrapper.innerHTML = '<h2 class="k">' + col.heading + '</h2>';
      var img = document.createElement('img');
      img.src = d.portrait;
      img.alt = d.meta.name;
      img.loading = 'lazy';
      img.style.cssText = 'width:100%;max-width:300px;display:block;margin:0 auto 22px;';
      wrapper.appendChild(img);
      var bioP = document.createElement('p');
      bioP.className = 'bio';
      bioP.innerHTML = '<span class="dc">' + firstChar + '</span>' + rest;
      wrapper.appendChild(bioP);
    }

    container.appendChild(wrapper);
  });
})(SITE_DATA);
