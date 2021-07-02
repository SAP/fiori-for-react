import { render, screen } from '@shared/tests';
import { createPassThroughPropsTest } from '@shared/tests/utils';
import { AnalyticalCard } from '@ui5/webcomponents-react/dist/AnalyticalCard';
import { AnalyticalCardHeader } from '@ui5/webcomponents-react/dist/AnalyticalCardHeader';
import { Text } from '@ui5/webcomponents-react/dist/Text';
import React from 'react';

const Header = <AnalyticalCardHeader heading="Header Title" />;

describe('Analytical Card', () => {
  test('Render without Crashing', () => {
    const { asFragment } = render(
      <AnalyticalCard>
        <Text>I'm a content!</Text>
      </AnalyticalCard>
    );
    expect(screen.getByText("I'm a content!")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('with custom header', () => {
    const { asFragment } = render(
      <AnalyticalCard header={<div>I'm a header!</div>}>
        <Text>I'm a content!</Text>
      </AnalyticalCard>
    );
    expect(screen.getByText("I'm a content!")).toBeInTheDocument();
    expect(screen.getByText("I'm a header!")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('with AnalyticalCardHeader', () => {
    const { asFragment } = render(
      <AnalyticalCard header={Header}>
        <Text>I'm a content!</Text>
      </AnalyticalCard>
    );
    expect(screen.getByText('Header Title')).toBeInTheDocument();
    expect(screen.getByText("I'm a content!")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  createPassThroughPropsTest(AnalyticalCard);
});
