const state = {
  count: 0,
  zIndexMax: 0,
  foregroundNumber: undefined
};

const canvas = document.querySelector('.canvas');

console.log(canvas.offsetLeft, canvas.offsetTop);

const panel = document.createElement('div');
panel.classList.add('panel');

canvas.appendChild(panel);

const windows = document.createElement('div');
windows.classList.add('windows');
canvas.appendChild(windows);

const makeWindowButton = document.createElement('div');
makeWindowButton.classList.add('make-window');
const textMakeWindow = document.createTextNode('New Window');
makeWindowButton.appendChild(textMakeWindow);

panel.appendChild(makeWindowButton);

makeWindowButton.addEventListener('click', makeNewWindow);

function makeNewWindow() {
  state.count++;


  const newWindow = document.createElement('div');
  newWindow.classList.add('window');
  state.zIndexMax++;
  newWindow.style.zIndex = state.zIndexMax;
  const windowPanel = document.createElement('div');
  windowPanel.classList.add('window-panel');

  const windowName = document.createElement('div');
  const windowNameText = document.createTextNode(`Window ${state.count}`);
  windowName.appendChild(windowNameText);
  windowName.classList.add('window-name');
  windowPanel.appendChild(windowName);

  const minimizeButton = document.createElement('div');
  minimizeButton.classList.add('minimize-button');
  const minimizeText = document.createTextNode('_');
  minimizeButton.appendChild(minimizeText);
  windowPanel.appendChild(minimizeButton);

  const closeButton = document.createElement('div');
  closeButton.classList.add('close-button');
  const closeText = document.createTextNode('x');
  closeButton.appendChild(closeText);
  windowPanel.appendChild(closeButton);

  newWindow.appendChild(windowPanel);
  windows.appendChild(newWindow);

  const miniName = document.createElement('div');
  const miniNameText = document.createTextNode(state.count);
  miniName.appendChild(miniNameText);
  miniName.classList.add('mini-name');
  panel.append(miniName);

  miniName.addEventListener('click', () => {
    newWindow.classList.remove('none');
  });

  closeButton.addEventListener('click', () => {
    newWindow.remove();
    miniName.remove();
  });

  minimizeButton.addEventListener('click', () => {
    newWindow.classList.add('none');
  });

  windowPanel.onmousedown = function(event) {
    const offsetX = event.pageX - newWindow.offsetLeft;
    const offsetY = event.pageY - newWindow.offsetTop;

    function moveAt(pageX, pageY) {
      newWindow.style.left = pageX - offsetX + 'px';
      newWindow.style.top = pageY - offsetY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      windowPanel.onmouseup = null;
    };

    windowPanel.ondragstart = function() {
      return false;
    };
  };

  newWindow.addEventListener('mousedown', handleZIndex);

  function handleZIndex() {
    state.zIndexMax++;
    newWindow.style.zIndex = state.zIndexMax;
    state.foregroundNumber = state.count;
  }

}
