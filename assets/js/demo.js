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

function createBubble(event) {
  const button = event.currentTarget;
  const left = document.createElement('span');
  const right = document.createElement('span');

  left.classList.add(`${classPrefix}-bubble-left`);
  right.classList.add(`${classPrefix}-bubble-right`);

  const oldLeft = button.getElementsByClassName(`${classPrefix}-bubble-left`)[0];
  const oldRight = button.getElementsByClassName(`${classPrefix}-bubble-right`)[0];

  if (oldLeft) {
    oldLeft.remove();
  }
  if (oldRight) {
    oldRight.remove();
  }
  button.appendChild(left);
  button.appendChild(right);
}

function createBorderSlide(event) {
  const button = event.currentTarget;

  const top = document.createElement('span');
  const right = document.createElement('span');
  const bottom = document.createElement('span');
  const left = document.createElement('span');

  top.classList.add(`${classPrefix}-slide-top`);
  right.classList.add(`${classPrefix}-slide-right`);
  bottom.classList.add(`${classPrefix}-slide-bottom`);
  left.classList.add(`${classPrefix}-slide-left`);

  const oldtop = button.getElementsByClassName(`${classPrefix}-slide-top`)[0];
  const oldright = button.getElementsByClassName(`${classPrefix}-slide-right`)[0];
  const oldbottom = button.getElementsByClassName(`${classPrefix}-slide-bottom`)[0];
  const oldleft = button.getElementsByClassName(`${classPrefix}-slide-left`)[0];

  if (oldtop) {
    oldtop.remove();
  }
  if (oldright) {
    oldright.remove();
  }
  if (oldbottom) {
    oldbottom.remove();
  }
  if (oldleft) {
    oldleft.remove();
  }
  button.appendChild(top);
  button.appendChild(right);
  button.appendChild(bottom);
  button.appendChild(left);
}

function addSpanEventListener(boxId, styleName, customize) {
  var defaultAction = (event) => {
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
    elm.addEventListener('click', customize ? customize : defaultAction);
  }
}

function addStyleEventListener(boxId, styleName, ms, disableClickWhenShown) {
  var defaultAction = (event) => {
    if (event.currentTarget.classList.contains(styleName)) {
      event.currentTarget.classList.remove(styleName);
    }
    event.currentTarget.classList.add(styleName);
    if (disableClickWhenShown) {
      event.currentTarget.style.pointerEvents = "none";
    }

    setTimeout(() => {
      const element = document.getElementById(boxId);
      if (element) {
        if (disableClickWhenShown) {
          element.style.pointerEvents = "";
        }
        element.classList.remove(styleName);
      }
    }, ms ? ms : 600);
  }
  const elm = document.getElementById(boxId);
  if (elm) {
    elm.addEventListener('click', defaultAction);
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
  addStyleEventListener('morphDemoItem', `${classPrefix}-morph`, 8000, true);
  addSpanEventListener('slideDemoItem', '', createBorderSlide);
  addSpanEventListener('clipDemoItem', `${classPrefix}-clip`);
  addStyleEventListener('psychoDemoItem', `${classPrefix}-psycho`, 2000, true);
  addStyleEventListener('cornerDemoItem', `${classPrefix}-corner`, 3000, true);
  addSpanEventListener('bubbleDemoItem', '', createBubble);
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
