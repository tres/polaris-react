import React from 'react';

import {useToggle} from '../src/utilities/use-toggle';
import {
  ActionList,
  ActionListItemDescriptor,
  Button,
  Card,
  Page,
  Popover,
  Stack,
} from '../src';

export function Playground() {
  const {
    value: popoverActive,
    setTrue: openPopover,
    setFalse: closePopover,
  } = useToggle(false);

  const popoverActionList: ActionListItemDescriptor[] = [
    {
      content: 'First Popover Content Action',
      role: 'option',
      onAction: () => console.log('First Action CLICKED'),
    },
    {
      content: 'Second Popover Content Action',
      role: 'option',
      onAction: () => console.log('Second Action CLICKED'),
    },
  ];

  const popoverActivatorMarkup = (
    <Button primary disclosure onClick={openPopover}>
      Toggle popover
    </Button>
  );

  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <div>OMG</div>
      <Card.Section>
        <Stack distribution="trailing" spacing="tight">
          <Button>First Button</Button>
          <Popover
            active={popoverActive}
            activator={popoverActivatorMarkup}
            onClose={closePopover}
          >
            <ActionList items={popoverActionList.map((action) => action)} />
          </Popover>
          <Button>Second Button</Button>
        </Stack>
      </Card.Section>
    </Page>
  );
}
