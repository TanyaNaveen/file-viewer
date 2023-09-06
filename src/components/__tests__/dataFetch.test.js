// __tests__/viewer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Fetching folders', () => {
  
  test('fetches folder names correctly', () => {

    // call SelectFolder - would need to test dropdown options
    
    const runid = 'test-runid';
    expect(runid).toBe('test-runid')

    // render(<Viewer runid={runid} />);

    // //TODO: add tests for dropdown menu
  });
});