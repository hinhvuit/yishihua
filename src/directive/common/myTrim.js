/**
 * 去除两边空格
 * v-myTrim="'part'
 * 去除全部空格
 * v-myTrim
 */

function getInput(el) {
  let inputEle;
  const { tagName } = el;
  if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
    inputEle = el;
  } else {
    inputEle = el.querySelector('input');
    if (!inputEle) {
      inputEle = el.querySelector('textarea');
    }
  }
  return inputEle;
}

function dispatchEvent(el, type) {
  let evt = document.createEvent('HTMLEvents');
  evt.initEvent(type, true, true);
  el.dispatchEvent(evt);
}

const Trim = {
  mounted: (el, binding) => {
    if (!el) return;
    let inputEle = getInput(el);
    const handler = function (event) {
      let newVal = '';
      if (binding.value === 'part') {
        newVal = event.target.value.trim();
      } else {
        newVal = event.target.value.replace(/\s/g, '');
      }
      if (event.target.value != newVal) {
        event.target.value = newVal;
        dispatchEvent(inputEle, 'input');
      }
    };
    el.inputEle = inputEle;
    el._blurHandler = handler;
    inputEle?.addEventListener('blur', handler);
  },

  beforeUnmount(el) {
    const { inputEle } = el;
    inputEle?.removeEventListener('blur', el._blurHandler);
  }
};

export default Trim;
