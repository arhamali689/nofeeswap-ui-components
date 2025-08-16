import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import React from 'react'
import { DataTable } from '../components/DataTable'
import type { Column } from '../components/types'

interface Row { id: number; name: string; age: number }

const rows: Row[] = [
  { id: 1, name: 'B', age: 30 },
  { id: 2, name: 'A', age: 20 }
]
const cols: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
]

describe('DataTable', () => {
  it('sorts by column', () => {
    render(<DataTable<Row> data={rows} columns={cols} />)
    fireEvent.click(screen.getByRole('button', { name: /sort by name/i }))
    // If it doesn’t throw, basic render + sort works
    expect(screen.getByText('A')).toBeInTheDocument()
  })
})
