import React from 'react';
import {screen, render} from '@testing-library/react';
import { App } from './index';

describe('App', () => {

  it('should render h1 with title parameter', () => {
    const title = 'Testing!';
    render(<App title={title} />);
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });

  it('should render h1 without title parameter', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeTruthy();
  });

})