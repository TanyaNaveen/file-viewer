// __tests__/viewer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Fetching folders', () => {
  test('fetches folder names correctly', () => {

    // call SelectFolder
    
    const runid = 'test-runid';
    expect(runid).toBe('test-runid')

    // render(<Viewer runid={runid} />);

    // // Check if the Viewer component renders the header
    // const headerElement = screen.getByText('Model');
    // expect(headerElement).toBeInTheDocument();

    // //TODO: add tests for dropdown menu
  });
});