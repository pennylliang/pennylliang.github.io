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


function addSpanEventListener(boxId, styleName, customize) {
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

function addStyleEventListener(boxId, styleName, ms) {
  this.defaultAction = (event) => {
    if (event.currentTarget.classList.contains(styleName)) {
      event.currentTarget.classList.remove(styleName);
    }
    event.currentTarget.classList.add(styleName);
    event.currentTarget.style.pointerEvents = "none";
    setTimeout(() => {
      const element = document.getElementById(boxId);
      if (element) {
        element.style.pointerEvents = "";
        element.classList.remove(styleName);
      }
    }, ms ? ms : 600);
  }
  const elm = document.getElementById(boxId);
  if (elm) {
    elm.addEventListener('click', this.defaultAction);
  }
}


onloadAction = function() {
  addSpanEventListener('rippleDemoItem', `${classPrefix}-ripple`, createRipple);
  addSpanEventListener('rippleOutDemoItem', `${classPrefix}-ripple-out`);
  addSpanEventListener('rippleHeartDemoItem', `${classPrefix}-ripple-heart`, createRippleHeart);
  addSpanEventListener('bounceRightDemoItem', `${classPrefix}-bounce-to-right`);
  addSpanEventListener('bounceBottomDemoItem', `${classPrefix}-bounce-to-bottom`);
  addSpanEventListener('shutterOutHorizontalDemoItem', `${classPrefix}-shutter-out-horizontal`);
  addSpanEventListener('shutterOutVerticalDemoItem', `${classPrefix}-shutter-out-vertical`);
  addSpanEventListener('radarDemoItem', `${classPrefix}-radar`, createRadar);
  addSpanEventListener('cycleLoadingDemoItem', `${classPrefix}-loading`);
  addSpanEventListener('cycleLoading2DemoItem', `${classPrefix}-loading2`);
  addStyleEventListener('morphDemoItem', `${classPrefix}-morph`, 8000);
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
