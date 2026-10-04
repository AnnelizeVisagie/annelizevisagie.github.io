/* Annelize Visagie — portfolio scripts */
(function(){'use strict';
(function(){
    var btn = document.getElementById('menubtn');
    var menu = document.getElementById('mobilemenu');
    if(!btn || !menu) return;
    btn.addEventListener('click', function(){
      var open = !menu.hidden;
      menu.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ menu.hidden = true; btn.setAttribute('aria-expanded','false'); });
    });
  })();

  (function(){
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var counters = document.querySelectorAll('.tabnum[data-count]');
    counters.forEach(function(el){
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      if(reduce){ el.textContent = target + suffix; return; }
      var start = null;
      var duration = 1000;
      function step(ts){
        if(start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if(progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  })();

  (function(){
    var reveals = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window && reveals.length){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            entry.target.classList.remove('pre');
            io.unobserve(entry.target);
          }
        });
      }, {threshold:.15, rootMargin:'0px 0px -40px 0px'});
      reveals.forEach(function(el){
        var rect = el.getBoundingClientRect();
        if(rect.top > window.innerHeight * 0.85){ el.classList.add('pre'); }
        io.observe(el);
      });
    }
  })();

  (function(){
    var nav = document.querySelector('nav');
    if(!nav) return;
    function onScroll(){
      nav.classList.toggle('scrolled', window.scrollY > 8);
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  })();

  (function(){
    document.querySelectorAll('.slider').forEach(function(slider){
      var track = slider.querySelector('.slider-track');
      var slides = track ? track.children.length : 0;
      if(!track || slides < 2) return;
      var dotsWrap = slider.querySelector('.slider-dots');
      var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];
      var index = 0;
      function go(i){
        index = (i + slides) % slides;
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(function(d, di){ d.classList.toggle('active', di === index); });
      }
      var prev = slider.querySelector('.slider-arrow.prev');
      var next = slider.querySelector('.slider-arrow.next');
      if(prev) prev.addEventListener('click', function(){ go(index - 1); });
      if(next) next.addEventListener('click', function(){ go(index + 1); });
      dots.forEach(function(d, di){ d.addEventListener('click', function(){ go(di); }); });

      var startX = null;
      track.addEventListener('touchstart', function(e){ startX = e.touches[0].clientX; }, {passive:true});
      track.addEventListener('touchend', function(e){
        if(startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if(Math.abs(dx) > 40){ go(index + (dx < 0 ? 1 : -1)); }
        startX = null;
      }, {passive:true});

      go(0);
    });
  })();
})();
