import type { Meta, StoryObj } from '@storybook/react'
import { InputField } from '../components/InputField'
import React, { useState } from 'react'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] }
  }
}
export default meta

export const Playground: StoryObj<typeof InputField> = {
  render: (args) => {
    const [v, setV] = useState('')
    return <InputField {...args} value={v} onChange={(e) => setV(e.target.value)} />
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    helperText: 'Helper message',
    variant: 'outlined',
    size: 'md',
    clearable: true
  }
}
