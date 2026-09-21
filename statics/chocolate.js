/*
 * 顶图雪花特效
 * 说明：原文件是 tzy 的气泡特效（circleMagic），且拼接符缺失已损坏；
 *      这里重写为原生实现，不依赖 jQuery。
 * 调参：改下面 CONFIG 即可。density 越大雪花越少，speed 越小下落越慢。
 * 注意：新增/修改后需重启 hexo server 或刷新页面（本文件不参与 pjax 重载）。
 */
(function () {
  'use strict';

  var CONFIG = {
    density: 34,       // 每多少像素宽度一颗雪花（越大越少）
    maxCount: 60,      // 雪花数量上限
    minRadius: 1.2,    // 最小半径(px)
    maxRadius: 3.2,    // 最大半径(px)
    minSpeed: 0.25,    // 最小下落速度(px/帧)
    maxSpeed: 0.7,     // 最大下落速度(px/帧)
    swayAmp: 16,       // 左右摆动幅度(px)
    swaySpeed: 0.012   // 摆动频率
  };

  var rafId = null;

  // 柔边雪花贴图，预渲染一次避免每帧创建渐变
  var sprite = (function () {
    var size = 64;
    var c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    var g2d = c.getContext('2d');
    var grad = g2d.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.85)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g2d.fillStyle = grad;
    g2d.beginPath();
    g2d.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    g2d.fill();
    return c;
  })();

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function init() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    var host = document.getElementById('page-header');
    if (!host) return;
    if (host.querySelector('canvas.snow-canvas')) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.createElement('canvas');
    canvas.className = 'snow-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var w = 0;
    var h = 0;
    var flakes = [];
    var frameCount = 0;
    var cleared = false;

    function makeFlake(above) {
      return {
        x: Math.random() * w,
        y: above ? -rand(0, h * 0.3) : rand(-h, 0),
        r: rand(CONFIG.minRadius, CONFIG.maxRadius),
        speed: rand(CONFIG.minSpeed, CONFIG.maxSpeed),
        alpha: rand(0.35, 0.9),
        swayAmp: rand(CONFIG.swayAmp * 0.4, CONFIG.swayAmp),
        swayPhase: Math.random() * Math.PI * 2
      };
    }

    function resize() {
      w = host.clientWidth || host.offsetWidth;
      h = host.clientHeight || host.offsetHeight;
      if (!w || !h) return;

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var target = Math.min(Math.round(w / CONFIG.density), CONFIG.maxCount);
      flakes = [];
      for (var i = 0; i < target; i++) {
        flakes.push(makeFlake(false));
      }
    }

    function frame() {
      rafId = requestAnimationFrame(frame);

      // 顶图滚出视口后停止绘制，避免无谓开销
      if (window.pageYOffset > h) {
        if (!cleared) {
          ctx.clearRect(0, 0, w, h);
          cleared = true;
        }
        return;
      }
      cleared = false;

      frameCount++;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.y += f.speed;

        if (f.y - f.r > h) {
          flakes[i] = makeFlake(true);
          continue;
        }

        var x = f.x + Math.sin(frameCount * CONFIG.swaySpeed + f.swayPhase) * f.swayAmp;
        var d = f.r * 2.6;

        ctx.globalAlpha = f.alpha;
        ctx.drawImage(sprite, x - d / 2, f.y - d / 2, d, d);
      }

      ctx.globalAlpha = 1;
    }

    resize();
    frame();

    window.addEventListener('resize', resize, false);
  }

  function boot() {
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, false);
  } else {
    boot();
  }

  // pjax 切换页面后顶图会重建，需要重新挂载
  document.addEventListener('pjax:complete', boot, false);
})();
