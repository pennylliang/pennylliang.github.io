const classPrefix = 'interE';

function createRipple(event) {
  console.log(event);
  const button = event.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.offsetX - radius}px`;
  circle.style.top = `${event.offsetY - radius}px`;
  circle.classList.add(`${classPrefix}-ripple`);

  const ripple = button.getElementsByClassName(`${classPrefix}-ripple`)[0];

  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
}

function addDemoEventListener(boxId, styleName, customize) {
  this.defaultAction = (event) => {
    const span = document.createElement('span');
    span.classList.add(styleName);

    const spanOld = event.currentTarget.getElementsByClassName(styleName)[0];

    if (spanOld) {
      spanOld.remove();
    }
    event.currentTarget.appendChild(span);
  }
  document.getElementById(boxId).addEventListener('click', customize ? customize : this.defaultAction);
}


onloadAction = function() {
  addDemoEventListener('rippleDemoItem', `${classPrefix}-ripple`, createRipple);
  addDemoEventListener('rippleOutDemoItem', `${classPrefix}-ripple-out`);
  addDemoEventListener('bounceRightDemoItem', `${classPrefix}-bounce-to-right`);
  addDemoEventListener('bounceBottomDemoItem', `${classPrefix}-bounce-to-bottom`);
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
