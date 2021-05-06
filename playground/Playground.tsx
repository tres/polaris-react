import React, {useCallback, useState} from 'react';

import {
  Page,
  Button,
  Card,
  Collapsible,
  DropZone,
  Layout,
  Stack,
  TextContainer,
  TextStyle,
} from '../src';

const COLLAPSIBLE_ID = 'CollapsibleTest';

export function Playground() {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  const dropzoneMarkup = (
    <DropZone onDrop={() => console.log('Upload')}>
      <Stack vertical>
        <TextStyle>Here is some text</TextStyle>
        <Button onClick={() => console.log('Hello')}>Internal action</Button>
        <TextStyle>Also, more text</TextStyle>
      </Stack>
    </DropZone>
  );

  const activatorText = `${open ? 'Close' : 'Open'} this Collapsible`;

  return (
    <Page title="Playground">
      <Layout>
        <Layout.Section>
          <Card title="Order details" sectioned>
            <TextContainer>
              <p>View a summary of your order.</p>
              <p>
                Text style enhances text with additional visual meaning. For
                example, using subdued text to de-emphasize it from its
                surrounding text.
              </p>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section secondary>
          <Stack vertical>
            <Button
              primary
              ariaControls={COLLAPSIBLE_ID}
              ariaExpanded={open}
              onClick={handleToggle}
            >
              {activatorText}
            </Button>

            <Collapsible
              open={open}
              id={COLLAPSIBLE_ID}
              transition={{duration: '0ms', timingFunction: 'none'}}
            >
              <Card sectioned>
                <TextStyle variation="strong">Collapsible</TextStyle>
                {dropzoneMarkup}
              </Card>
            </Collapsible>
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
