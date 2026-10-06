(function () {
  'use strict';

  /* ---------- 开机启动动画 ---------- */
  var LINES = [
    '[  OK  ] 加载守护内核模块',
    '[  OK  ] 挂载主动防御引擎',
    '[  OK  ] 初始化应用锁服务',
    '[  OK  ] 校验支付保护环境',
    '[  OK  ] 启动诈骗与广告拦截',
    '[  OK  ] 装载文件保险箱',
    '[  OK  ] 防护就绪'
  ];

  var boot = document.getElementById('boot');
  var logBox = document.getElementById('bootlog');
  var bar = document.getElementById('bootbar');
  var pct = document.getElementById('bootpct');
  var timers = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function runBoot() {
    clearTimers();
    boot.classList.remove('done');
    boot.style.display = '';
    logBox.innerHTML = '';
    bar.style.width = '0%';
    pct.textContent = '0%';

    var step = 380;
    LINES.forEach(function (t, i) {
      timers.push(setTimeout(function () {
        var p = document.createElement('p');
        p.textContent = t;
        p.style.animationDelay = '0s';
        logBox.appendChild(p);
      }, 900 + i * step));
    });

    var total = 900 + LINES.length * step;
    var ticks = 34;
    for (var i = 1; i <= ticks; i++) {
      (function (n) {
        timers.push(setTimeout(function () {
          var v = Math.round(Math.pow(n / ticks, 0.82) * 100);
          bar.style.width = v + '%';
          pct.textContent = v + '%';
        }, total * (n / ticks)));
      })(i);
    }

    timers.push(setTimeout(function () {
      pct.textContent = '启动完成';
    }, total + 220));

    timers.push(setTimeout(function () {
      boot.classList.add('done');
      timers.push(setTimeout(function () { boot.style.display = 'none'; }, 760));
      startReveal();
    }, total + 900));
  }

  /* ---------- 内容入场 ---------- */
  function startReveal() {
    var items = document.querySelectorAll('.reveal');
    items.forEach(function (el, i) {
      setTimeout(function () { el.classList.add('in'); }, 90 * i);
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
  var screen = document.getElementById('screen');
  var content = document.querySelector('.content');
  var appbar = document.getElementById('appbar');
  content.addEventListener('scroll', function () {
    appbar.classList.toggle('stuck', content.scrollTop > 40);
  });

  /* ---------- 涟漪 ---------- */
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
    setTimeout(function () { s.remove(); }, 600);
  });

  /* ---------- 重播 ---------- */
  document.getElementById('replay').addEventListener('click', function () {
    runBoot();
    content.scrollTop = 0;
  });

  /* ---------- 截图自动轮播 ---------- */
  var shots = document.querySelector('.shots');
  if (shots) {
    var idx = 0;
    setInterval(function () {
      if (document.hidden || !shots.clientWidth) return;
      idx = (idx + 1) % shots.children.length;
      shots.scrollTo({ left: idx * (shots.children[0].offsetWidth + 12), behavior: 'smooth' });
    }, 3600);
  }

  /* ---------- go ---------- */
  runBoot();
})();
