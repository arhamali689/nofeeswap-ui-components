import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { InputField } from '../components/InputField'

describe('InputField', () => {
  it('renders label and updates value', () => {
    const onChange = vi.fn()
    render(<InputField label="Email" placeholder="type" value="hi" onChange={onChange} />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    fireEvent.change(screen.getByPlaceholderText('type'), { target: { value: 'x' } })
    expect(onChange).toHaveBeenCalled()
  })
})
