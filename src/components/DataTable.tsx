import React, { useMemo, useState } from 'react'
import { clsx } from 'clsx'
import type { Column, DataTableProps } from './types'

function sortData<T>(data: T[], column: Column<T>, dir: 'asc' | 'desc') {
  const key = column.dataIndex
  const sorted = [...data].sort((a: any, b: any) => {
    const va = a[key]
    const vb = b[key]
    if (va === vb) return 0
    return va > vb ? 1 : -1
  })
  return dir === 'asc' ? sorted : sorted.reverse()
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const colMap = useMemo(() => new Map(columns.map(c => [c.key, c])), [columns])
  const processed = useMemo(() => {
    if (!sortKey) return data
    const col = colMap.get(sortKey)
    if (!col || !col.sortable) return data
    return sortData(data, col, sortDir)
  }, [data, sortKey, sortDir, colMap])

  function toggleSort(key: string) {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc'); return }
    setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
  }

  function toggleRow(i: number) {
    if (!selectable) return
    const next = new Set(selected)
    next.has(i) ? next.delete(i) : next.add(i)
    setSelected(next)
    onRowSelect?.(Array.from(next).map(idx => processed[idx]))
  }

  const allSelected = selectable && processed.length > 0 && selected.size === processed.length

  function toggleAll() {
    if (!selectable) return
    if (allSelected) {
      setSelected(new Set())
      onRowSelect?.([])
    } else {
      const all = new Set(processed.map((_, i) => i))
      setSelected(all)
      onRowSelect?.(processed)
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10">
      <table className="w-full text-left text-sm text-gray-800 dark:text-gray-100">
        <thead className="bg-gray-100 dark:bg-white/5">
          <tr>
            {selectable && (
              <th className="p-3 w-10">
                <input aria-label="Select all"
                  type="checkbox" checked={!!allSelected} onChange={toggleAll} />
              </th>
            )}
            {columns.map(col => (
              <th key={col.key} className="p-3 font-semibold">
                <button
                  className={clsx('flex items-center gap-1', col.sortable && 'hover:underline')}
                  aria-label={col.sortable ? `Sort by ${col.title}` : undefined}
                  onClick={() => col.sortable && toggleSort(col.key)}
                >
                  <span>{col.title}</span>
                  {sortKey === col.key && (
                    <span aria-hidden>{sortDir === 'asc' ? '▲' : '▼'}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6 text-center">
                Loading…
              </td>
            </tr>
          ) : processed.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            processed.map((row, i) => (
              <tr key={(row as any).id ?? i} className="odd:bg-white even:bg-gray-50 dark:odd:bg-neutral-900 dark:even:bg-neutral-950">
                {selectable && (
                  <td className="p-3">
                    <input aria-label={`Select row ${i+1}`} type="checkbox" checked={selected.has(i)} onChange={() => toggleRow(i)} />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {String(row[col.dataIndex])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
