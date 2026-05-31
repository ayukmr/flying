class Canvas {
  constructor(query, width, height, draw, scroll=false) {
    this.canvas = document.querySelector(query);

    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;

    this.canvas.style.width = `${width / 3}px`;
    this.canvas.style.height =`${height / 3}px`;

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

  point(x, y, color, r=16) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  line(p0, p1, color, width=8) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;

    this.ctx.beginPath();
    this.ctx.moveTo(p0[0], p0[1]);
    this.ctx.lineTo(p1[0], p1[1]);
    this.ctx.stroke();
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
