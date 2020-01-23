import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, radios } from '@storybook/addon-knobs';

import Select, { RefactoredSelect } from '.';

const createKnobs = () => {
  const error = boolean('error', false);
  const disabled = boolean('disabled', false);
  const placeholder = text('Placeholder', '- Select an option -');
  const errorMessage = text('Error Message', 'Please fill out the required field.');
  const size = radios(
    'size',
    {
      sm: 'sm',
      lg: 'lg',
    },
    'sm',
  );

  return {
    error,
    errorMessage,
    disabled,
    placeholder,
    size,
  };
};
const InputStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => {
    const knobs = createKnobs();
    return (
      <div style={{ width: '200px' }}>
        <Select
          aria-label="demo-select"
          options={[
            { content: 'Value 1', value: 'v1' },
            { content: 'Value 2', value: 'v2' },
            { content: 'Value 3', value: 'v3' },
            { content: 'Value 4', value: 'v4' },
          ]}
          onChange={action('onChange')}
          onBlur={() => '[parent func]'}
          {...knobs}
        />
        <Select
          aria-label="demo-select"
          value="v1"
          options={[
            { content: 'Value 1', value: 'v1' },
            { content: 'Value 2', value: 'v2' },
            { content: 'Value 3', value: 'v3' },
            { content: 'Value 4', value: 'v4' },
          ]}
          onChange={action('onChange')}
          onBlur={() => '[parent func]'}
          {...knobs}
        />
      </div>
    );
  })
  .add('Refactored', () => {
    const knobs = createKnobs();

    return (
      <div style={{ width: '300px' }}>
        <RefactoredSelect />
      </div>
    );
  });

export default InputStories;
