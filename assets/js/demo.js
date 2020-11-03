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
  heart.style.left = `${event.offsetX - 50}px`;
  heart.style.top = `${event.offsetY - 45}px`;
  heart.classList.add(`${classPrefix}-ripple-heart`);

  const old = button.getElementsByClassName(`${classPrefix}-ripple-heart`)[0];

  if (old) {
    old.remove();
  }
  button.appendChild(heart);
}

function createRadar(event) {
  const button = event.currentTarget;

  const heart = document.createElement('span');
  const radius = Math.sqrt(Math.pow(button.clientWidth/2, 2) +
    Math.pow(button.clientHeight/2, 2));
  heart.style.left = `${(button.clientWidth/2)-radius}px`;
  heart.style.top = `${(button.clientHeight/2)-radius}px`;
  heart.style.width = `${radius*2}px`;
  heart.style.height = `${radius}px`;
  heart.style.borderTopLeftRadius = `${radius*2}px`;
  heart.style.borderTopRightRadius = `${radius*2}px`;
  heart.classList.add(`${classPrefix}-radar`);

  const old = button.getElementsByClassName(`${classPrefix}-radar`)[0];

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
  const elm = document.getElementById(boxId);
  if (elm) {
    elm.addEventListener('click', customize ? customize : this.defaultAction);
  }
}


onloadAction = function() {
  addDemoEventListener('rippleDemoItem', `${classPrefix}-ripple`, createRipple);
  addDemoEventListener('rippleOutDemoItem', `${classPrefix}-ripple-out`);
  addDemoEventListener('rippleHeartDemoItem', `${classPrefix}-ripple-heart`, createRippleHeart);
  addDemoEventListener('bounceRightDemoItem', `${classPrefix}-bounce-to-right`);
  addDemoEventListener('bounceBottomDemoItem', `${classPrefix}-bounce-to-bottom`);
  addDemoEventListener('shutterOutHorizontalDemoItem', `${classPrefix}-shutter-out-horizontal`);
  addDemoEventListener('shutterOutVerticalDemoItem', `${classPrefix}-shutter-out-vertical`);
  addDemoEventListener('radarDemoItem', `${classPrefix}-radar`, createRadar);
  addDemoEventListener('cycleLoadingDemoItem', `${classPrefix}-loading`);
  addDemoEventListener('cycleLoading2DemoItem', `${classPrefix}-loading2`);
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
