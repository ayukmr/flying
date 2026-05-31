import { Canvas } from './canvas.js';
import { fns, fn } from './fns.js';

function F(r) {
  return fns[fn].F(r);
}
function intF(r) {
  return fns[fn].intF(r);
}

function velo(r) {
  return Math.sqrt(2 * (k/r - k/rInit + intF(r) - intF(rInit)) + vInit**2);
}
function accel(r) {
  return -k/r**2 + l**2/r**3 + F(r);
}

const sma = 300;
const ecc = 0.5;

const rInit = sma / (1 + ecc);
const vInit = 50;

const k = vInit**2 * rInit / (1 + ecc); // fixed elliptic orbit
const l = rInit * vInit;

let dir = Math.sign(accel(rInit)) || 1;

let r1 = rInit + dir * 0.01, r2 = r1;
let th1 = 0, th2 = 0;

let v2 = dir * Math.sqrt(Math.max(0, velo(r2)**2 - l**2/r2**2)); // same starting energy

const dt = fns[fn].dt;

const cx = 1000;
const cy = 1000;

new Canvas('#c1', 2000, 2000, function () {
  for (let i = 0; i < 100; i++) {
    th1 += l/r1**2 * dt;
    th2 += l/r2**2 * dt;

    v2 += accel(r2) * dt;

    const x = velo(r1)**2 - l**2/r1**2;

    if (x <= 0) {
      // overshot, turn back
      dir = -dir;
      r1 += dir * Math.sqrt(-x) * dt;
    } else {
      r1 += dir * Math.sqrt(x) * dt;
    }

    r2 += v2 * dt;
  }

  this.ctx.fillStyle = '#0004';
  this.ctx.fillRect(0, 0, this.width, this.height);

  const x = cx + r1 * Math.cos(th1) / 2;
  const y = cy + r1 * Math.sin(th1) / 2;

  const vv = dir * Math.sqrt(velo(r1)**2 - l**2/r1**2);

  const xv = x + Math.cos(th1) * vv * 10 / 2;
  const yv = y + Math.sin(th1) * vv * 10 / 2;

  this.arrow([x, y], [xv, yv], '#0ea5e9');

  this.point(x, y, '#ef4444');
  this.point(cx, cy, '#22c55e');
});

new Canvas('#c2', 2000, 2000, function () {
  this.ctx.fillStyle = '#0004';
  this.ctx.fillRect(0, 0, this.width, this.height);

  const x = cx + r2 * Math.cos(th2) / 2;
  const y = cy + r2 * Math.sin(th2) / 2;

  const x2 = x + Math.cos(th2) * v2 * 10 / 2;
  const y2 = y + Math.sin(th2) * v2 * 10 / 2;

  this.arrow([x, y], [x2, y2], '#3b82f6');

  const x3 = x + Math.cos(th2) * F(r2) * -30;
  const y3 = y + Math.sin(th2) * F(r2) * -30;

  this.line([x, y], [x3, y3], '#f97316', 20);

  this.point(x, y, '#ef4444');
  this.point(cx, cy, '#22c55e');
});

const cy2 = 125;
const rx = 3500;

let p1, p2, p3, p4, p5;

new Canvas('#s1', 4060, 250, function () {
  const n1 = dir * Math.sqrt(velo(r1)**2 - l**2/r1**2) / 2 + cy2;

  if (p1 !== undefined) this.line([rx - 4, p1], [rx, n1], '#0ea5e9', 16);

  p1 = n1;
}, true);

new Canvas('#s2', 4060, 250, function () {
  const n2 = v2 / 2 + cy2;

  if (p2 !== undefined) this.line([rx - 4, p2], [rx, n2], '#3b82f6', 16);

  p2 = n2;
}, true);

new Canvas('#s3', 4060, 250, function () {
  const n3 = r2 / 16 + cy2;
  const n4 = F(r2) * 10 + cy2;

  if (p3 !== undefined) this.line([rx - 4, p3], [rx, n3], '#22c55e', 16);
  if (p4 !== undefined) this.line([rx - 4, p4], [rx, n4], '#f97316', 16);

  p3 = n3;
  p4 = n4;
}, true);

new Canvas('#s4', 4060, 250, function () {
  const n5 = th2 % (2 * Math.PI);

  if (p5 !== undefined && Math.abs(n5 - p5) < Math.PI) {
    const m = this.height / (2 * Math.PI);
    this.line([rx - 4, p5 * m], [rx, n5 * m], '#8b5cf6', 16);
  }

  p5 = n5;
}, true);
