import { render } from '@shared/tests';
import { Breadcrumbs } from '@ui5/webcomponents-react/dist/Breadcrumbs';
import { Button } from '@ui5/webcomponents-react/dist/Button';
import { Label } from '@ui5/webcomponents-react/dist/Label';
import { Link } from '@ui5/webcomponents-react/dist/Link';
import { Text } from '@ui5/webcomponents-react/dist/Text';
import { Title } from '@ui5/webcomponents-react/dist/Title';
import React from 'react';
import { DynamicPageTitle } from '@ui5/webcomponents-react/dist/DynamicPageTitle';
import { DynamicPageHeader } from '@ui5/webcomponents-react/dist/DynamicPageHeader';
import { DynamicPage } from '@ui5/webcomponents-react/dist/DynamicPage';
import '@ui5/webcomponents-icons/dist/action';
import '@ui5/webcomponents-icons/dist/full-screen';
import '@ui5/webcomponents-icons/dist/exit-full-screen';
import '@ui5/webcomponents-icons/dist/decline';
import { ButtonDesign } from '@ui5/webcomponents-react/dist/ButtonDesign';
import { Badge } from '@ui5/webcomponents-react/dist/Badge';
import { Form } from '@ui5/webcomponents-react/dist/Form';
import { FormGroup } from '@ui5/webcomponents-react/dist/FormGroup';
import { FormItem } from '@ui5/webcomponents-react/dist/FormItem';
import { ObjectStatus } from '@ui5/webcomponents-react/dist/ObjectStatus';
import { ValueState } from '@ui5/webcomponents-react/dist/ValueState';
import { createPassThroughPropsTest } from '@shared/tests/utils';

const renderComponent = () => (
  <DynamicPage
    title={
      <DynamicPageTitle
        actions={[
          <Button design={ButtonDesign.Emphasized}>Edit</Button>,
          <Button design={ButtonDesign.Transparent}>Delete</Button>,
          <Button design={ButtonDesign.Transparent}>Copy</Button>,
          <Button design={ButtonDesign.Transparent}>Toggle Footer</Button>,
          <Button icon="action" design={ButtonDesign.Transparent}></Button>
        ]}
        navigationActions={[
          <Button icon="full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="exit-full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="decline" design={ButtonDesign.Transparent} />
        ]}
        breadcrumbs={
          <Breadcrumbs>
            <Link>Home</Link>
            <Link>Page 1</Link>
            <Link>Page 2</Link>
            <Link>Page 3</Link>
            <Link>Page 4</Link>
            <Link>Page 5</Link>
          </Breadcrumbs>
        }
        heading={<Title>Header Title</Title>}
        subHeading={<Label>This is a subheading</Label>}
      >
        <Badge>Status: OK</Badge>
      </DynamicPageTitle>
    }
    header={
      <DynamicPageHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Location: Warehouse A</Label>
          <Label>Halway: 23L</Label>
          <Label>Rack: 34</Label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
          <Label>Availability:</Label>
          <ObjectStatus state={ValueState.Success}>In Stock</ObjectStatus>
        </div>
      </DynamicPageHeader>
    }
  >
    <Form style={{ paddingBottom: '2rem', zIndex: 0 }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Phone Numbers">
        <FormItem label="Home">
          <Text>+1 234-567-8901</Text>
        </FormItem>
        <FormItem label="">
          <Text>+1 234-567-5555</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Social Accounts">
        <FormItem label="LinkedIn">
          <Text>/DeniseSmith</Text>
        </FormItem>
        <FormItem label="Twitter">
          <Text>@DeniseSmith</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Addresses">
        <FormItem label="Home Address">
          <Text>2096 Mission Street</Text>
        </FormItem>
        <FormItem label="Mailing Address">
          <Text>PO Box 32114</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Mailing Address">
        <FormItem label="Work">
          <Text>DeniseSmith@sap.com</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Phone Numbers">
        <FormItem label="Home">
          <Text>+1 234-567-8901</Text>
        </FormItem>
        <FormItem label="">
          <Text>+1 234-567-5555</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Social Accounts">
        <FormItem label="LinkedIn">
          <Text>/DeniseSmith</Text>
        </FormItem>
        <FormItem label="Twitter">
          <Text>@DeniseSmith</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Addresses">
        <FormItem label="Home Address">
          <Text>2096 Mission Street</Text>
        </FormItem>
        <FormItem label="Mailing Address">
          <Text>PO Box 32114</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Mailing Address">
        <FormItem label="Work">
          <Text>DeniseSmith@sap.com</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem', zIndex: 0 }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Phone Numbers">
        <FormItem label="Home">
          <Text>+1 234-567-8901</Text>
        </FormItem>
        <FormItem label="">
          <Text>+1 234-567-5555</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Social Accounts">
        <FormItem label="LinkedIn">
          <Text>/DeniseSmith</Text>
        </FormItem>
        <FormItem label="Twitter">
          <Text>@DeniseSmith</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Addresses">
        <FormItem label="Home Address">
          <Text>2096 Mission Street</Text>
        </FormItem>
        <FormItem label="Mailing Address">
          <Text>PO Box 32114</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Mailing Address">
        <FormItem label="Work">
          <Text>DeniseSmith@sap.com</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Phone Numbers">
        <FormItem label="Home">
          <Text>+1 234-567-8901</Text>
        </FormItem>
        <FormItem label="">
          <Text>+1 234-567-5555</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Social Accounts">
        <FormItem label="LinkedIn">
          <Text>/DeniseSmith</Text>
        </FormItem>
        <FormItem label="Twitter">
          <Text>@DeniseSmith</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Addresses">
        <FormItem label="Home Address">
          <Text>2096 Mission Street</Text>
        </FormItem>
        <FormItem label="Mailing Address">
          <Text>PO Box 32114</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Mailing Address">
        <FormItem label="Work">
          <Text>DeniseSmith@sap.com</Text>
        </FormItem>
      </FormGroup>
    </Form>
  </DynamicPage>
);

const renderComponentWithoutContent = () => (
  <DynamicPage
    title={
      <DynamicPageTitle
        actions={[
          <Button design={ButtonDesign.Emphasized}>Edit</Button>,
          <Button design={ButtonDesign.Transparent}>Delete</Button>,
          <Button design={ButtonDesign.Transparent}>Copy</Button>,
          <Button design={ButtonDesign.Transparent}>Toggle Footer</Button>,
          <Button icon="action" design={ButtonDesign.Transparent}></Button>
        ]}
        navigationActions={[
          <Button icon="full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="exit-full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="decline" design={ButtonDesign.Transparent} />
        ]}
        breadcrumbs={
          <Breadcrumbs>
            <Link>Home</Link>
            <Link>Page 1</Link>
            <Link>Page 2</Link>
            <Link>Page 3</Link>
            <Link>Page 4</Link>
            <Link>Page 5</Link>
          </Breadcrumbs>
        }
        heading={<Title>Header Title</Title>}
        subHeading={<Label>This is a subheading</Label>}
      >
        <Badge>Status: OK</Badge>
      </DynamicPageTitle>
    }
    header={
      <DynamicPageHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Location: Warehouse A</Label>
          <Label>Halway: 23L</Label>
          <Label>Rack: 34</Label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
          <Label>Availability:</Label>
          <ObjectStatus state={ValueState.Success}>In Stock</ObjectStatus>
        </div>
      </DynamicPageHeader>
    }
  />
);

const renderComponentWithAlwaysShowContentHeader = () => (
  <DynamicPage
    alwaysShowContentHeader={true}
    title={
      <DynamicPageTitle
        actions={[
          <Button design={ButtonDesign.Emphasized}>Edit</Button>,
          <Button design={ButtonDesign.Transparent}>Delete</Button>,
          <Button design={ButtonDesign.Transparent}>Copy</Button>,
          <Button design={ButtonDesign.Transparent}>Toggle Footer</Button>,
          <Button icon="action" design={ButtonDesign.Transparent}></Button>
        ]}
        navigationActions={[
          <Button icon="full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="exit-full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="decline" design={ButtonDesign.Transparent} />
        ]}
        breadcrumbs={
          <Breadcrumbs>
            <Link>Home</Link>
            <Link>Page 1</Link>
            <Link>Page 2</Link>
            <Link>Page 3</Link>
            <Link>Page 4</Link>
            <Link>Page 5</Link>
          </Breadcrumbs>
        }
        heading={<Title>Header Title</Title>}
        subHeading={<Label>This is a subheading</Label>}
      >
        <Badge>Status: OK</Badge>
      </DynamicPageTitle>
    }
    header={
      <DynamicPageHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Location: Warehouse A</Label>
          <Label>Halway: 23L</Label>
          <Label>Rack: 34</Label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
          <Label>Availability:</Label>
          <ObjectStatus state={ValueState.Success}>In Stock</ObjectStatus>
        </div>
      </DynamicPageHeader>
    }
  />
);

const renderComponentHideHeaderButton = () => (
  <DynamicPage
    showHideHeaderButton={false}
    alwaysShowContentHeader={true}
    title={
      <DynamicPageTitle
        actions={[
          <Button design={ButtonDesign.Emphasized}>Edit</Button>,
          <Button design={ButtonDesign.Transparent}>Delete</Button>,
          <Button design={ButtonDesign.Transparent}>Copy</Button>,
          <Button design={ButtonDesign.Transparent}>Toggle Footer</Button>,
          <Button icon="action" design={ButtonDesign.Transparent}></Button>
        ]}
        navigationActions={[
          <Button icon="full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="exit-full-screen" design={ButtonDesign.Transparent} />,
          <Button icon="decline" design={ButtonDesign.Transparent} />
        ]}
        breadcrumbs={
          <Breadcrumbs>
            <Link>Home</Link>
            <Link>Page 1</Link>
            <Link>Page 2</Link>
            <Link>Page 3</Link>
            <Link>Page 4</Link>
            <Link>Page 5</Link>
          </Breadcrumbs>
        }
        heading={<Title>Header Title</Title>}
        subHeading={<Label>This is a subheading</Label>}
      >
        <Badge>Status: OK</Badge>
      </DynamicPageTitle>
    }
    header={
      <DynamicPageHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>Location: Warehouse A</Label>
          <Label>Halway: 23L</Label>
          <Label>Rack: 34</Label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2vw' }}>
          <Label>Availability:</Label>
          <ObjectStatus state={ValueState.Success}>In Stock</ObjectStatus>
        </div>
      </DynamicPageHeader>
    }
  >
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Phone Numbers">
        <FormItem label="Home">
          <Text>+1 234-567-8901</Text>
        </FormItem>
        <FormItem label="">
          <Text>+1 234-567-5555</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Social Accounts">
        <FormItem label="LinkedIn">
          <Text>/DeniseSmith</Text>
        </FormItem>
        <FormItem label="Twitter">
          <Text>@DeniseSmith</Text>
        </FormItem>
      </FormGroup>
    </Form>
    <Form style={{ paddingBottom: '2rem' }} columnsXL={4} columnsL={4}>
      <FormGroup heading="Addresses">
        <FormItem label="Home Address">
          <Text>2096 Mission Street</Text>
        </FormItem>
        <FormItem label="Mailing Address">
          <Text>PO Box 32114</Text>
        </FormItem>
      </FormGroup>
      <FormGroup heading="Mailing Address">
        <FormItem label="Work">
          <Text>DeniseSmith@sap.com</Text>
        </FormItem>
      </FormGroup>
    </Form>
  </DynamicPage>
);

describe('DynamicPage', () => {
  test('with content', () => {
    const { asFragment } = render(renderComponent());
    expect(asFragment()).toMatchSnapshot();
  });
  test('without content', () => {
    const { asFragment } = render(renderComponentWithoutContent());
    expect(asFragment()).toMatchSnapshot();
  });
  test('always show content header', () => {
    const { asFragment } = render(renderComponentWithAlwaysShowContentHeader());
    expect(asFragment()).toMatchSnapshot();
  });
  test('hider header button', () => {
    const { asFragment } = render(renderComponentHideHeaderButton());
    expect(asFragment()).toMatchSnapshot();
  });

  createPassThroughPropsTest(DynamicPage);
});
