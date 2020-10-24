const classPrefix = 'interE';

function createRipple(event) {
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

function createRippleHeart(event) {
  const button = event.currentTarget;

  const heart = document.createElement('span');
  //const diameter = Math.max(button.clientWidth, button.clientHeight);
  //const radius = diameter / 2;

  //circle.style.width = circle.style.height = `${diameter}px`;
  heart.style.left = `${event.offsetX - 50}px`;
  heart.style.top = `${event.offsetY - 45}px`;
  heart.classList.add(`${classPrefix}-ripple-heart`);

  const old = button.getElementsByClassName(`${classPrefix}-ripple-heart`)[0];

  if (old) {
    old.remove();
  }
  button.appendChild(heart);
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
  addDemoEventListener('rippleHeartDemoItem', `${classPrefix}-ripple-heart`, createRippleHeart);
  addDemoEventListener('bounceRightDemoItem', `${classPrefix}-bounce-to-right`);
  addDemoEventListener('bounceBottomDemoItem', `${classPrefix}-bounce-to-bottom`);
  addDemoEventListener('shutterOutHorizontalDemoItem', `${classPrefix}-shutter-out-horizontal`);
  addDemoEventListener('shutterOutVerticalDemoItem', `${classPrefix}-shutter-out-vertical`);
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
