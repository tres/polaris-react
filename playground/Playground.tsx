import React, {useCallback, useMemo, useState} from 'react';
import {SearchMinor} from '@shopify/polaris-icons';

import {useToggle} from '../src/utilities/use-toggle';
import {
  ActionList,
  ActionListItemDescriptor,
  Button,
  Card,
  Combobox,
  Icon,
  Listbox,
  Page,
  Popover,
  Stack,
} from '../src';

export function Playground() {
  // #region Popover STUFF
  const {
    value: popoverActive,
    setTrue: openPopover,
    setFalse: closePopover,
  } = useToggle(false);

  const popoverActionList: ActionListItemDescriptor[] = [
    {
      id: 'one',
      content: 'First Popover Content Action',
      role: 'menuitem',
      onAction: () => console.log('First Action CLICKED'),
    },
    {
      id: 'two',
      content: 'Second Popover Content Action',
      role: 'menuitem',
      onAction: () => console.log('Second Action CLICKED'),
    },
  ];

  const popoverActivatorMarkup = (
    <Button primary disclosure onClick={openPopover}>
      Toggle popover
    </Button>
  );
  // #endregion

  // #region ComboBox STUFF
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );

  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;
  // #endregion

  return (
    <Page title="Playground">
      {/* Add the code you want to test in here */}
      <div>OMG</div>
      <Card.Section>
        <Stack distribution="trailing" spacing="tight">
          <Button>First Button</Button>
          <Popover
            // active
            active={popoverActive}
            activator={popoverActivatorMarkup}
            onClose={closePopover}
            autofocusTarget="first-node"
          >
            <ActionList
              actionRole="menu"
              items={popoverActionList.map((action) => action)}
            />
          </Popover>
          <Button>Second Button</Button>
          <Combobox
            activator={
              <Combobox.TextField
                prefix={<Icon source={SearchMinor} color="subdued" />}
                onChange={updateText}
                label="Search customers"
                labelHidden
                value={inputValue}
                placeholder="Search customers"
                autoComplete="auto complete"
              />
            }
          >
            {options.length > 0 ? (
              <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
            ) : null}
          </Combobox>
          <Button>Third Button</Button>
        </Stack>
      </Card.Section>
    </Page>
  );
}
