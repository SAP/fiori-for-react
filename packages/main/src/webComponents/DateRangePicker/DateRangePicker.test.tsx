import { render } from '@shared/tests';
import { DateRangePicker } from '@ui5/webcomponents-react/dist/DateRangePicker';
import React from 'react';

describe('DateRangePicker', () => {
  test('Basic Test (generated)', () => {
    const { asFragment } = render(<DateRangePicker />);
    expect(asFragment()).toMatchSnapshot();
  });
});
