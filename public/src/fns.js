// F(r) is force, intF(r) is antiderivative
const fns = {
  zero: {
    F: () => 0,
    intF: () => 0,
    dt: 0.01,
    latex: {
      F: '0',
      intF: '0'
    }
  },
  sin: {
    F: (r) => 10 * Math.sin(r / 200),
    intF: (r) => -10 * 200 * Math.cos(r / 200),
    dt: 0.0025,
    latex: {
      F: '10 \\sin(\\frac{r}{200})',
      intF: '-10 \\cdot 200 \\cdot \\cos(\\frac{r}{200})'
    }
  },
  'inv cube': {
    F: (r) => 2e7 / r**3,
    intF: (r) => -1e7 / r**2,
    dt: 0.01,
    latex: {
      F: '\\frac{2 \\cdot 10^7}{r^3}',
      intF: '\\frac{-1 \\cdot 10^7}{r^2}'
    }
  },
  cos: {
    F: (r) => 10 * Math.cos(r / 200),
    intF: (r) => 10 * 200 * Math.sin(r / 200),
    dt: 0.0025,
    latex: {
      F: '10 \\cos(\\frac{r}{200})',
      intF: '10 \\cdot 200 \\cdot \\sin(\\frac{r}{200})'
    }
  },
  constant: {
    F: () => -10,
    intF: (r) => -10 * r,
    dt: 0.00125,
    latex: {
      F: '-10',
      intF: '-10r'
    }
  },
  spring: {
    F: (r) => -0.05 * r,
    intF: (r) => -0.025 * r**2,
    dt: 0.00125,
    latex: {
      F: '-0.05r',
      intF: '-0.025r^2'
    }
  }
};

const fn = new URLSearchParams(location.search).get('fn') || 'zero';

const fEl = document.querySelector('#F');
const hEl = document.querySelector('#intF');
const dtEl = document.querySelector('#dt');

function render() {
  katex.render('F(r) = ' + fns[fn].latex.F, fEl);
  katex.render('\\int F(r) dr = ' + fns[fn].latex.intF, hEl);
  dtEl.innerText = fns[fn].dt.toString();
}

const select = document.querySelector('#fn');

for (const key of Object.keys(fns)) {
  select.appendChild(new Option(key, key));
}

select.addEventListener('change', (e) => {
  const url = new URL(window.location);
  url.searchParams.set('fn', e.target.value);
  location.replace(url);
});

select.value = fn;
render();

export { fns, fn };
