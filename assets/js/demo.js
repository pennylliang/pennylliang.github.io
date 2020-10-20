const classPrefix = 'interE-';

function createRipple(event) {
  console.log(event);
  const button = event.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.offsetX - radius}px`;
  circle.style.top = `${event.offsetY - radius}px`;
  circle.classList.add(`${classPrefix}ripple`);

  const ripple = button.getElementsByClassName(`${classPrefix}ripple`)[0];

  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
}

onloadAction = function() {
  const rippleItem = document.getElementById('rippleDemoItem');
  rippleItem.addEventListener('click', createRipple);
}

if(window.attachEvent) {
  window.attachEvent('onload', onloadAction);
} else {
  if(window.onload) {
      var curronload = window.onload;
      var newonload = function(evt) {
          curronload(evt);
          onloadAction(evt);
      };
      window.onload = newonload;
  } else {
      window.onload = onloadAction;
  }
}
