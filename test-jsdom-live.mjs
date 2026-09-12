import { JSDOM } from 'jsdom';

(async () => {
  const dom = await JSDOM.fromURL('https://yassaei-electronics.onrender.com/', {
    runScripts: "dangerously",
    resources: "usable"
  });
  
  dom.window.console.log = (...args) => console.log('LOG:', ...args);
  dom.window.console.error = (...args) => console.error('ERROR:', ...args);
  dom.window.console.warn = (...args) => console.warn('WARN:', ...args);
  
  dom.window.addEventListener('error', e => console.error('WINDOW ERROR:', e.error || e.message));
  dom.window.addEventListener('unhandledrejection', e => console.error('UNHANDLED:', e.reason));
  
  setTimeout(() => {
    const ws = dom.window.document.getElementById('welcomeScreen');
    console.log('welcomeScreen opacity:', ws ? ws.style.opacity : 'null', 'className:', ws ? ws.className : 'null');
    process.exit(0);
  }, 12000);
})();
