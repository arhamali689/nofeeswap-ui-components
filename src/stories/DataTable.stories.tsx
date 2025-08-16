import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '../components/DataTable'
import type { Column } from '../components/types'
import React from 'react'

interface Row { id: number; name: string; age: number; role: string }

const meta: Meta<typeof DataTable<Row>> = {
  title: 'Components/DataTable',
  component: DataTable
}
export default meta

const data: Row[] = [
  { id: 1, name: 'Alice', age: 24, role: 'Engineer' },
  { id: 2, name: 'Bob', age: 29, role: 'Designer' },
  { id: 3, name: 'Carol', age: 26, role: 'PM' }
]

const columns: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' }
]

export const Basic: StoryObj<typeof DataTable<Row>> = {
  render: () => <div className="p-6"><DataTable<Row> data={data} columns={columns} selectable /></div>
}
