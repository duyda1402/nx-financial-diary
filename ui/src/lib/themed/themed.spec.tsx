import React from 'react';
import { render } from '@testing-library/react-native';

import Themed from './themed';

describe('Themed', () => {
  it('should render successfully', () => {
    const { root } = render(< Themed />);
    expect(root).toBeTruthy();
  });
});
