const BUSINESS_NUMBER = '18552158469';
const DISPLAY_NUMBER = /1\s*\(855\)\s*215-8469|1-855-215-8469|855-215-8469/g;

export function connectPhoneTracking(root) {
  const synchronize = () => {
    root.querySelectorAll('a[href^="tel:"]').forEach((link) => {
      const digits = link.getAttribute('href').replace(/\D/g, '');
      if (digits !== BUSINESS_NUMBER && digits !== BUSINESS_NUMBER.slice(1)) return;
      link.classList.add('js-google-phone-link');
      const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((node) => {
        if (node.parentElement.closest('.js-google-phone-number')) return;
        DISPLAY_NUMBER.lastIndex = 0;
        if (!DISPLAY_NUMBER.test(node.textContent)) return;
        DISPLAY_NUMBER.lastIndex = 0;
        const fragment = document.createDocumentFragment();
        let offset = 0;
        for (const match of node.textContent.matchAll(DISPLAY_NUMBER)) {
          fragment.append(document.createTextNode(node.textContent.slice(offset, match.index)));
          const span = document.createElement('span');
          span.className = 'js-google-phone-number';
          span.textContent = match[0];
          fragment.append(span);
          offset = match.index + match[0].length;
        }
        fragment.append(document.createTextNode(node.textContent.slice(offset)));
        node.replaceWith(fragment);
      });
    });
    window.__applyGooglePhoneConversionNumber?.();
  };
  const observer = new MutationObserver(() => {
    observer.disconnect();
    synchronize();
    observe();
  });
  const observe = () => observer.observe(root, {
    subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: ['href']
  });
  synchronize();
  observe();
  return () => observer.disconnect();
}
