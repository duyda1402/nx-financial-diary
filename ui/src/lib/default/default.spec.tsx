import React from 'react';
import { render } from '@testing-library/react-native';

import Default from './default';

describe('Default', () => {
  it('should render successfully', () => {
    const { root } = render(< Default />);
    expect(root).toBeTruthy();
  });
});
