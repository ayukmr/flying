class Canvas {
  constructor(query, width, height, draw, scroll=false) {
    this.canvas = document.querySelector(query);

    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;

    this.canvas.style.width = `${width / 4}px`;
    this.canvas.style.height =`${height / 4}px`;

    this.ctx = this.canvas.getContext('2d');
    this.draw = draw;

    this.ctx.fillRect(0, 0, this.width, this.height);

    this.scroll = scroll;
    if (this.scroll) {
      this.line([0, height / 2], [width, height / 2], '#333', 2);
    }

    this.animate();
  }

  animate(tm) {
    if (this.scroll) {
      this.ctx.drawImage(this.canvas, -4, 0);
      this.ctx.clearRect(this.width - 4, 0, 4, this.height);
    }

    this.draw.call(this, tm);
    this.frameID = requestAnimationFrame((tm) => this.animate(tm));
  }

  point(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
    this.ctx.fill();
  }

  line(p0, p1, color, width=12) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(p0[0], p0[1]);
    this.ctx.lineTo(p1[0], p1[1]);
    this.ctx.stroke();
  }

  arrow(p0, p1, color) {
    const [x0, y0] = p0;
    const [x1, y1] = p1;

    const mag = Math.log(Math.hypot(x1 - x0, y1 - y0));
    const angle = Math.atan2(y1 - y0, x1 - x0);

    const m = 6 * Math.max(0, mag);

    this.line(p0, p1, color);
    this.line(p1, [x1 - m * Math.cos(angle - Math.PI / 6), y1 - m * Math.sin(angle - Math.PI / 6)], '#3b82f6');
    this.line(p1, [x1 - m * Math.cos(angle + Math.PI / 6), y1 - m * Math.sin(angle + Math.PI / 6)], '#3b82f6');
  }

  rect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  text(text, x, y, color) {
    this.ctx.font = '35px IBM Plex Sans';
    this.ctx.fillStyle = color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillText(text, x, y);
  }
}

export { Canvas };
