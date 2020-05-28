import { fireEvent, prettyPrint } from '@testing-library/react-native';
export { render, wait, within, act } from '@testing-library/react-native';
export * from './index.common';

export const events = {
  press: fireEvent.press,
  changeText: async (node, text) => await fireEvent.changeText(node, text),
};

export const debug = node => console.log(prettyPrint(node));
