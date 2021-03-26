import React from 'react';
import {screen, render} from '@testing-library/react';
import { App } from './index';

describe('App', () => {
  it('should render h1', () => {
    const title = 'Testing!';
    render(<App title={title} />);
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });
})