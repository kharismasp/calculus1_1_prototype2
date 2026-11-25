import {coordinateScene, coordinateLabel, shiftBounds, zoomBounds} from './coordinates.js';

function center(bounds) {
  return [(bounds.xmin + bounds.xmax) / 2, (bounds.ymin + bounds.ymax) / 2];
}

function visibleAnchor(bounds, anchor) {
  return anchor && anchor[0] >= bounds.xmin && anchor[0] <= bounds.xmax &&
    anchor[1] >= bounds.ymin && anchor[1] <= bounds.ymax;
}

export function openGraphInspector(dialog, mount, title) {
  const figures = Array.from(mount.querySelectorAll('svg'));
  if (!figures.length) return;
  dialog.innerHTML = `
    <header>
      <h2 id="zoom-title"></h2>
      <button data-close-graph type="button">Close</button>
    </header>
    <div class="graph-toolbar">
      ` + (figures.length > 1 ? '<div class="graph-figures" aria-label="Figures"></div>' : '') + `
      <div class="graph-actions" hidden>
        <button data-zoom-out type="button" aria-label="Zoom out on the coordinates">−</button>
        <button data-zoom-in type="button" aria-label="Zoom in on the coordinates">+</button>
        <button data-reset-axes type="button">Reset axes</button>
      </div>
      <p class="graph-bounds" hidden></p>
    </div>
    <div class="graph-stage"></div>
    <p class="graph-help" id="graph-help" hidden>Drag the plot to pan. With the plot focused, use + or − to zoom, arrow keys to pan, and 0 to reset. Scroll over the focused plot to zoom at the pointer.</p>`;

  dialog.querySelector('h2').textContent = title;
  const stage = dialog.querySelector('.graph-stage');
  const extent = dialog.querySelector('.graph-bounds');
  const help = dialog.querySelector('.graph-help');
  const actions = dialog.querySelector('.graph-actions');
  const zoomIn = actions.querySelector('[data-zoom-in]');
  const zoomOut = actions.querySelector('[data-zoom-out]');
  const legend = document.createElement('div');
  legend.className = 'graph-inspector-legend';
  stage.after(legend);
  let scene, bounds, anchor, drag;
  let scale = 1;
  const figureButtons = [];

  function render() {
    stage.innerHTML = scene.render(bounds, {inspecting: true});
    extent.textContent = 'Horizontal [' + coordinateLabel(bounds.xmin) + ', ' + coordinateLabel(bounds.xmax) +
      ']  ·  Vertical [' + coordinateLabel(bounds.ymin) + ', ' + coordinateLabel(bounds.ymax) + ']';
    zoomIn.disabled = scale <= 1/128;
    zoomOut.disabled = scale >= 8;
  }

  function selectFigure(index) {
    const svg = figures[index];
    scene = coordinateScene(svg);
    stage.classList.toggle('coordinate-stage', Boolean(scene));
    actions.hidden = extent.hidden = help.hidden = !scene;
    legend.replaceChildren();
    const key = svg.parentElement.querySelector('.legend') ??
      (figures.length === 1 ? mount.querySelector('.legend') : null);
    if (key) legend.append(key.cloneNode(true));
    figureButtons.forEach((button, number) => button.setAttribute('aria-pressed', String(number === index)));
    if (scene) {
      stage.tabIndex = 0;
      stage.setAttribute('role', 'group');
      stage.setAttribute('aria-label', scene.title + ', interactive coordinate view');
      stage.setAttribute('aria-describedby', 'graph-help');
      reset();
    } else {
      stage.removeAttribute('tabindex');
      stage.removeAttribute('role');
      stage.removeAttribute('aria-label');
      stage.removeAttribute('aria-describedby');
      stage.replaceChildren(svg.cloneNode(true));
    }
  }

  function reset() {
    scale = 1;
    bounds = scene.home;
    anchor = visibleAnchor(bounds, scene.focus) ? scene.focus : center(bounds);
    render();
  }

  function zoom(factor, pivot = anchor) {
    const next = Math.min(8, Math.max(1/128, scale * factor));
    if (next === scale) return;
    bounds = zoomBounds(bounds, next / scale, pivot);
    scale = next;
    render();
  }

  function pan(dx, dy) {
    bounds = shiftBounds(bounds, dx, dy);
    anchor = center(bounds);
    render();
  }

  function plotRect() {
    return stage.querySelector('[data-plot-area]').getBoundingClientRect();
  }

  function inside(event, rect) {
    return event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
  }

  stage.onpointerdown = event => {
    if (!scene || !event.isPrimary || event.button !== 0) return;
    const rect = plotRect();
    if (!inside(event, rect)) return;
    stage.focus({preventScroll:true});
    drag = {id:event.pointerId, x:event.clientX, y:event.clientY, rect};
    stage.setPointerCapture(event.pointerId);
  };
  stage.onpointermove = event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    pan(-dx / drag.rect.width * (bounds.xmax - bounds.xmin),
      dy / drag.rect.height * (bounds.ymax - bounds.ymin));
  };
  stage.onlostpointercapture = () => { drag = null; };
  stage.onwheel = event => {
    if (!scene || document.activeElement !== stage || event.ctrlKey || event.metaKey || !event.deltaY) return;
    const rect = plotRect();
    if (!inside(event, rect)) return;
    event.preventDefault();
    const x = bounds.xmin + (event.clientX - rect.left) / rect.width * (bounds.xmax - bounds.xmin);
    const y = bounds.ymax - (event.clientY - rect.top) / rect.height * (bounds.ymax - bounds.ymin);
    zoom(event.deltaY < 0 ? 0.5 : 2, [x, y]);
    anchor = [x, y];
  };
  stage.onkeydown = event => {
    if (!scene) return;
    const dx = (bounds.xmax - bounds.xmin) / 8;
    const dy = (bounds.ymax - bounds.ymin) / 8;
    switch (event.key) {
      case '+': case '=': zoom(0.5); break;
      case '−': case '-': zoom(2); break;
      case '0': reset(); break;
      case 'ArrowLeft': pan(-dx, 0); break;
      case 'ArrowRight': pan(dx, 0); break;
      case 'ArrowDown': pan(0, -dy); break;
      case 'ArrowUp': pan(0, dy); break;
      default: return;
    }
    event.preventDefault();
  };
  zoomIn.onclick = () => zoom(0.5);
  zoomOut.onclick = () => zoom(2);
  actions.querySelector('[data-reset-axes]').onclick = reset;
  dialog.querySelector('[data-close-graph]').onclick = () => dialog.close();

  const picker = dialog.querySelector('.graph-figures');
  if (picker) {
    figures.forEach((svg, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = svg.getAttribute('aria-label') || 'Figure ' + (index + 1);
      button.onclick = () => selectFigure(index);
      picker.append(button);
      figureButtons.push(button);
    });
  }
  selectFigure(0);
  dialog.showModal();
}
