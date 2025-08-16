import '../src/index.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark', value: '#0a0a0a' }
      ]
    }
  }
}
export default preview
