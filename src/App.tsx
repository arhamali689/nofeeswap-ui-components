import React, { useState } from 'react'
import { InputField } from './components/InputField'
import { DataTable } from './components/DataTable'
import type { Column } from './components/types'

interface User { id: number; name: string; age: number; role: string }

export default function App() {
  const [val, setVal] = useState('')

  const users: User[] = [
    { id: 1, name: 'Alice', age: 24, role: 'Engineer' },
    { id: 2, name: 'Bob', age: 29, role: 'Designer' },
    { id: 3, name: 'Carol', age: 26, role: 'PM' },
  ]

  const columns: Column<User>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role' }
  ]

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-neutral-900 p-6 space-y-8">
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold mb-4">InputField Demo</h1>
        <div className="space-y-6">
          <InputField label="Email" placeholder="you@example.com" helperText="We’ll never share your email." value={val} onChange={(e) => setVal(e.target.value)} variant="filled" clearable />
          <InputField label="Password" placeholder="••••••••" type="password" passwordToggle variant="outlined" />
          <InputField label="Loading" placeholder="Please wait…" loading variant="ghost" />
          <InputField label="Error" placeholder="Type here" errorMessage="This field is required" invalid />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">DataTable Demo</h2>
        <DataTable<User>
          data={users}
          columns={columns}
          selectable
          onRowSelect={(rows) => console.log('Selected rows', rows)}
        />
      </div>
    </div>
  )
}
