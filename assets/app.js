(function () {
  'use strict';

  /* ---------- 开机动画（约 1.6s） ---------- */
  var boot = document.getElementById('boot');
  var bar = document.getElementById('bootbar');
  var timers = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function runBoot() {
    clearTimers();
    boot.classList.remove('done');
    boot.style.display = '';
    bar.style.width = '0%';

    timers.push(setTimeout(function () { bar.style.width = '100%'; }, 120));

    timers.push(setTimeout(function () {
      boot.classList.add('done');
      timers.push(setTimeout(function () { boot.style.display = 'none'; }, 460));
      startReveal();
    }, 1250));
  }

  /* ---------- 内容入场 ---------- */
  function startReveal() {
    var items = document.querySelectorAll('.reveal');
    items.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('in'); }, 60 * i);
    });
  }

  /* ---------- 状态栏时钟 ---------- */
  var clock = document.getElementById('clock');
  function tick() {
    var d = new Date();
    clock.textContent = d.getHours().toString().padStart(2, '0') + ':' +
      d.getMinutes().toString().padStart(2, '0');
  }
  tick();
  setInterval(tick, 20000);

  /* ---------- 应用栏吸顶 ---------- */
  var content = document.querySelector('.content');
  var appbar = document.getElementById('appbar');
  content.addEventListener('scroll', function () {
    appbar.classList.toggle('stuck', content.scrollTop > 40);
  });

  /* ---------- 点击反馈 ---------- */
  document.addEventListener('pointerdown', function (e) {
    var t = e.target.closest('.ripple');
    if (!t) return;
    var r = t.getBoundingClientRect();
    var d = Math.max(r.width, r.height);
    var s = document.createElement('span');
    s.className = 'rp';
    s.style.width = s.style.height = d + 'px';
    s.style.left = (e.clientX - r.left - d / 2) + 'px';
    s.style.top = (e.clientY - r.top - d / 2) + 'px';
    t.appendChild(s);
    setTimeout(function () { s.remove(); }, 520);
  });

  /* ---------- 重播 ---------- */
  document.getElementById('replay').addEventListener('click', function () {
    runBoot();
    content.scrollTop = 0;
  });

  /* ---------- 截图轮播 ---------- */
  var shots = document.querySelector('.shots');
  if (shots) {
    var idx = 0;
    setInterval(function () {
      if (document.hidden || !shots.clientWidth) return;
      idx = (idx + 1) % shots.children.length;
      shots.scrollTo({ left: idx * (shots.children[0].offsetWidth + 12), behavior: 'smooth' });
    }, 4000);
  }

  runBoot();
})();
