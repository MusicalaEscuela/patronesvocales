import { createElement, removeChildren } from '../utils/dom.js';

export function renderRadioButtons({ container, items, activeId, className, onSelect, labelKey = 'label', valueKey = 'id' }) {
  removeChildren(container);

  items.forEach((item) => {
    const value = item[valueKey];
    const button = createElement('button', {
      className: `${className}${value === activeId ? ' is-active' : ''}`,
      text: item[labelKey],
      attrs: {
        type: 'button',
        role: 'radio',
        'aria-checked': String(value === activeId)
      }
    });

    button.addEventListener('click', () => onSelect(item));
    container.appendChild(button);
  });
}
