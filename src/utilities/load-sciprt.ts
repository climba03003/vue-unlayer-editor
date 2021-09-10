import { ref, watch } from 'vue';

export const scriptUrl = '//editor.unlayer.com/embed.js?2';
export const isInjected = ref(false);
export const isInjecting = ref(false);

export function isScriptInjected(scriptUrl: string) {
  const scripts = document.querySelectorAll('script');
  let injected = false;

  scripts.forEach((script) => {
    // fast break
    if (injected) return;
    // check if script injected
    if (script.src.includes(scriptUrl)) injected = true;
  });

  return injected;
}

export function injectScript(scriptUrl: string, callback: () => void) {
  if (isInjecting.value === false) {
    isInjecting.value = true;
    const embedScript = document.createElement('script');
    embedScript.setAttribute('src', scriptUrl);
    embedScript.onload = () => {
      isInjected.value = true;
      isInjecting.value = false;
      callback();
    };
    document.head.appendChild(embedScript);
  } else {
    const stopWatcher = watch(isInjecting, function (newValue) {
      if (newValue === false) {
        callback();
        stopWatcher();
      }
    });
  }
}
