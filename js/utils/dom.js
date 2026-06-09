export function qs(selector, scope = document) {
  const element = scope.querySelector(selector);
  if (!element) throw new Error(`No se encontró el elemento: ${selector}`);
  return element;
}

export function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

export function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  const { className, text, attrs = {}, dataset = {}, style = {} } = options;

  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== null && value !== undefined) element.setAttribute(key, value);
  });

  Object.entries(dataset).forEach(([key, value]) => {
    element.dataset[key] = value;
  });

  Object.assign(element.style, style);
  return element;
}

export function removeChildren(element) {
  while (element.firstChild) element.removeChild(element.firstChild);
}
