import React from 'react';
import { render } from '@testing-library/react-native';

import Inputs from './inputs';

describe('Inputs', () => {
  it('should render successfully', () => {
    const { root } = render(< Inputs />);
    expect(root).toBeTruthy();
  });
});
