import { fireEvent, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export { render, waitFor as wait, act } from '@testing-library/react';
export { within } from '@testing-library/dom';
export * from './index.common';

export const events = {
  press: node => {
    fireEvent.touchStart(node);
    fireEvent.touchEnd(node);
  },
  changeText: async (node, text) => await userEvent.type(node, text),
};

export const debug = node => console.log(prettyDOM(node));
