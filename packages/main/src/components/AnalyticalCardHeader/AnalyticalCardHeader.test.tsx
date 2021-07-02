import { fireEvent, render, screen } from '@shared/tests';
import { createPassThroughPropsTest } from '@shared/tests/utils';
import { AnalyticalCard } from '@ui5/webcomponents-react/dist/AnalyticalCard';
import { AnalyticalCardHeader } from '@ui5/webcomponents-react/dist/AnalyticalCardHeader';
import { DeviationIndicator } from '@ui5/webcomponents-react/dist/DeviationIndicator';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import React from 'react';

const valueStateMapping = [
  { state: 'Error', className: 'AnalyticalCardHeader-error' },
  { state: 'Warning', className: 'AnalyticalCardHeader-critical' },
  { state: 'Success', className: 'AnalyticalCardHeader-good' },
  { state: 'None', className: 'N.A.' }
];
const testFactory = () => {
  valueStateMapping.forEach((item) => {
    test(`with value state: ${item.state}`, () => {
      render(
        <AnalyticalCardHeader
          unit="EUR"
          arrowIndicator={DeviationIndicator.Down}
          showIndicator
          indicatorState={ValueState[item.state]}
          value="123"
          valueState={ValueState[item.state]}
        />
      );
      if (item.state !== 'None') {
        expect(screen.getByText('EUR').parentElement.firstChild).toHaveClass(item.className);
        expect(screen.getByText('123').parentElement).toHaveClass(item.className);
      } else {
        valueStateMapping.forEach(({ className }) => {
          expect(screen.getByText('EUR').parentElement.firstChild).not.toHaveClass(className);
          expect(screen.getByText('123').parentElement).not.toHaveClass(className);
        });
      }
    });
  });
};

describe('AnalyticalCardHeader', () => {
  test('click event', () => {
    const cb = jest.fn();

    const { rerender, container } = render(<AnalyticalCardHeader onHeaderClick={cb} heading="header" />);

    expect(container.firstChild).toHaveClass('AnalyticalCardHeader-cardHeaderClickable');
    fireEvent.click(screen.getByText('header'));
    expect(cb).toHaveBeenCalledTimes(1);

    rerender(<AnalyticalCardHeader heading="header" />);
    expect(container.firstChild).not.toHaveClass('AnalyticalCardHeader-cardHeaderClickable');
  });

  test('with all string props', () => {
    const { asFragment } = render(
      <AnalyticalCardHeader
        heading="Title"
        subheading="Subtitle"
        value="Value"
        unit="Unit"
        target="TargetDesc"
        deviation="DeviationDesc"
        description="Description"
      />
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Unit')).toBeInTheDocument();
    expect(screen.getByText('TargetDesc')).toBeInTheDocument();
    expect(screen.getByText('DeviationDesc')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
  test('with arrow indicator', () => {
    const { rerender } = render(
      <AnalyticalCardHeader unit="EUR" arrowIndicator={DeviationIndicator.Down} showIndicator />
    );
    expect(screen.getByText('EUR').parentElement.firstChild).toHaveClass('AnalyticalCardHeader-arrowDown');

    rerender(<AnalyticalCardHeader unit="EUR" arrowIndicator={DeviationIndicator.Up} showIndicator />);
    expect(screen.getByText('EUR').parentElement.firstChild).toHaveClass('AnalyticalCardHeader-arrowUp');

    rerender(<AnalyticalCardHeader unit="EUR" arrowIndicator={DeviationIndicator.None} showIndicator />);
    expect(screen.getByText('EUR').parentElement.firstChild).toHaveClass('AnalyticalCardHeader-arrowRight');
  });

  testFactory();

  createPassThroughPropsTest(AnalyticalCard);
});
