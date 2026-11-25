const colors = {teal: '#15596b', line: '#dbe6ed', muted: '#4c6879'};
const scenes = new WeakMap();
let clipSerial = 0;

export function coordinateScene(svg) {
  return scenes.get(svg);
}

export function attachCoordinateScene(svg, scene) {
  scenes.set(svg, scene);
}

function escapeText(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function coordinateLabel(value) {
  if (value === 0) return '0';
  return String(Number(value.toPrecision(6))).replace(/^-/, '−');
}

function gridTicks(min, max, target, unit) {
  const ideal = (max - min) / unit / target;
  const power = 10 ** Math.floor(Math.log10(ideal));
  const choices = unit === Math.PI ? [1, 2, 5, 10] : [1, 2, 2.5, 5, 10];
  const step = choices.find(choice => choice >= ideal / power - 1e-12) * power;
  const first = Math.ceil(min / unit / step - 1e-10);
  const last = Math.floor(max / unit / step + 1e-10);
  return Array.from({length: Math.max(0, last - first + 1)}, (_, index) => {
    const multiple = (first + index) * step;
    const label = unit === Math.PI && multiple !== 0
      ? (multiple === 1 ? 'π' : multiple === -1 ? '−π' : coordinateLabel(multiple) + 'π')
      : coordinateLabel(multiple);
    return [multiple * unit, label];
  });
}

export function zoomBounds(bounds, factor, anchor) {
  const [x, y] = anchor;
  return {
    xmin: x + (bounds.xmin - x) * factor,
    xmax: x + (bounds.xmax - x) * factor,
    ymin: y + (bounds.ymin - y) * factor,
    ymax: y + (bounds.ymax - y) * factor
  };
}

export function shiftBounds(bounds, dx, dy) {
  return {
    xmin: bounds.xmin + dx, xmax: bounds.xmax + dx,
    ymin: bounds.ymin + dy, ymax: bounds.ymax + dy
  };
}

export function plot(title, {
  xmin = -2, xmax = 3, ymin = -1, ymax = 4, xticks, yticks,
  xlabel = 'x', ylabel = 'output', equalScale = false, focus, xUnit = 1
} = {}) {
  const home = {xmin, xmax, ymin, ymax};
  const width = 385;
  const height = equalScale ? width * (ymax - ymin) / (xmax - xmin) : 239;
  const marks = [];

  const scene = {
    title, home, focus, xlabel, ylabel,
    path(fn, options = {}) {
      marks.push({type: 'path', fn, ...options});
    },
    line(x1, y1, x2, y2, color = '#98637e', dash = '5 5') {
      marks.push({type: 'line', x1, y1, x2, y2, color, dash});
    },
    vertical(x, color) {
      marks.push({type: 'vertical', x, color});
    },
    point(x, y, options = {}) {
      marks.push({type: 'point', x, y, ...options});
    },
    draw(container, after = '') {
      container.innerHTML = scene.render() + after;
      attachCoordinateScene(container.querySelector('svg'), scene);
    },
    render(bounds = home, {inspecting = false} = {}) {
      const {xmin, xmax, ymin, ymax} = bounds;
      const xSpan = xmax - xmin;
      const ySpan = ymax - ymin;
      const left = inspecting ? 74 : 55;
      const top = 28;
      const right = inspecting ? 38 : 28;
      const bottom = 48;
      const X = x => left + (x - xmin) / xSpan * width;
      const Y = y => top + (ymax - y) / ySpan * height;
      const id = 'graph-clip-' + (++clipSerial);
      const xTicks = inspecting || !xticks ? gridTicks(xmin, xmax, 5, xUnit) : xticks;
      const yTicks = inspecting || !yticks ? gridTicks(ymin, ymax, 5, 1) : yticks;
      const extent = 'x="' + left + '" y="' + top + '" width="' + width + '" height="' + height + '"';
      let markup = '<svg viewBox="0 0 ' + (left + width + right) + ' ' + (top + height + bottom) +
        '" role="img" aria-label="' + escapeText(title) + '"><title>' + escapeText(title) +
        '</title><defs><clipPath id="' + id + '"><rect ' + extent + '/></clipPath></defs>' +
        '<rect data-plot-area ' + extent + ' fill="#fbfdfe" stroke="#cfdee8"/>';
      for (const tick of xTicks) {
        const [x, label] = Array.isArray(tick) ? tick : [tick, coordinateLabel(tick)];
        if (x < xmin - xSpan * 1e-9 || x > xmax + xSpan * 1e-9) continue;
        markup += '<line x1="' + X(x) + '" x2="' + X(x) + '" y1="' + top + '" y2="' +
          (top + height) + '" stroke="' + colors.line + '"/>' +
          '<text x="' + X(x) + '" y="' + (top + height + 21) + '" font-size="14" text-anchor="middle" fill="' +
          colors.muted + '">' + escapeText(label) + '</text>';
      }
      for (const tick of yTicks) {
        const [y, label] = Array.isArray(tick) ? tick : [tick, coordinateLabel(tick)];
        if (y < ymin - ySpan * 1e-9 || y > ymax + ySpan * 1e-9) continue;
        markup += '<line x1="' + left + '" x2="' + (left + width) + '" y1="' +
          Y(y) + '" y2="' + Y(y) + '" stroke="' + colors.line + '"/>' +
          '<text x="' + (left - 9) + '" y="' + (Y(y) + 5) +
          '" font-size="14" text-anchor="end" fill="' + colors.muted + '">' + escapeText(label) + '</text>';
      }
      if (xmin <= 0 && xmax >= 0) {
        markup += '<line x1="' + X(0) + '" x2="' + X(0) + '" y1="' + top +
          '" y2="' + (top + height) + '" stroke="#8baab9"/>';
      }
      if (ymin <= 0 && ymax >= 0) {
        markup += '<line y1="' + Y(0) + '" y2="' + Y(0) + '" x1="' + left +
          '" x2="' + (left + width) + '" stroke="#8baab9"/>';
      }
      markup += '<text x="' + (left + width) + '" y="' + (top + height + 43) +
        '" font-size="15" text-anchor="end" fill="' + colors.muted + '">' + escapeText(xlabel) +
        '</text><text x="' + left + '" y="18" font-size="15" fill="' + colors.muted + '">' +
        escapeText(ylabel) + '</text><g clip-path="url(#' + id + ')">';
      for (const mark of marks) {
        const color = mark.color ?? colors.teal;
        if (mark.type === 'vertical') {
          if (mark.x < xmin || mark.x > xmax) continue;
          const at = X(mark.x);
          markup += '<line x1="' + at + '" x2="' + at + '" y1="' + top + '" y2="' +
            (top + height) + '" stroke="' + color + '" stroke-dasharray="5 5" stroke-width="1.8"/>';
        } else if (mark.type === 'line') {
          markup += '<line x1="' + X(mark.x1) + '" y1="' + Y(mark.y1) + '" x2="' + X(mark.x2) +
            '" y2="' + Y(mark.y2) + '" stroke="' + color + '" stroke-width="1.8" stroke-dasharray="' + mark.dash + '"/>';
        } else if (mark.type === 'point') {
          if (mark.x < xmin || mark.x > xmax || mark.y < ymin || mark.y > ymax) continue;
          markup += '<circle cx="' + X(mark.x) + '" cy="' + Y(mark.y) + '" r="' + (mark.r ?? 5.5) +
            '" fill="' + (mark.open ? '#fbfdfe' : color) + '" stroke="' + color + '" stroke-width="2.3"/>';
          if (mark.label) {
            markup += '<text x="' + (X(mark.x) + 8) + '" y="' + (Y(mark.y) - 8) +
              '" font-size="15" fill="' + color + '">' + escapeText(mark.label) + '</text>';
          }
        } else {
          const from = Math.max(xmin, mark.from ?? -Infinity);
          const to = Math.min(xmax, mark.to ?? Infinity);
          if (to <= from) continue;
          let path = '';
          let drawing = false;
          for (let index = 0; index <= 560; index++) {
            const x = index === 560 ? to : from + (to - from) * index / 560;
            const y = mark.fn(x);
            if (!Number.isFinite(y) || y < ymin - ySpan * 12 || y > ymax + ySpan * 12) {
              drawing = false;
              continue;
            }
            path += (drawing ? 'L' : 'M') + X(x).toFixed(2) + ',' + Y(y).toFixed(2);
            drawing = true;
          }
          markup += '<path d="' + path + '" stroke="' + color + '" stroke-width="' +
            (mark.width ?? 2.5) + '" fill="none"' +
            (mark.dash ? ' stroke-dasharray="' + mark.dash + '"' : '') + '/>';
        }
      }
      return markup + '</g></svg>';
    }
  };
  return scene;
}
