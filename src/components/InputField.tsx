import React, { useId, useState } from 'react'
import { clsx } from 'clsx'

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'text' | 'password' | 'email'
  clearable?: boolean
  passwordToggle?: boolean
  id?: string
}

const sizeClasses: Record<NonNullable<InputFieldProps['size']>, string> = {
  sm: 'text-sm py-2 px-3 rounded-lg',
  md: 'text-base py-2.5 px-3.5 rounded-xl',
  lg: 'text-lg py-3 px-4 rounded-2xl'
}

const base = 'w-full outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed bg-transparent'

const variants = {
  filled: 'bg-white/80 dark:bg-white/5 border border-transparent focus:ring-2 focus:ring-indigo-500',
  outlined: 'bg-transparent border border-gray-300 dark:border-white/10 focus:border-indigo-500',
  ghost: 'bg-transparent border border-transparent focus:border-indigo-500'
} as const

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  loading,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  clearable,
  passwordToggle,
  id
}) => {
  const uid = useId()
  const inputId = id ?? `input-${uid}`
  const describedBy = helperText || errorMessage ? `${inputId}-desc` : undefined
  const [localType, setLocalType] = useState(type)

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}
      <div className={clsx('relative flex items-center', sizeClasses[size])}>
        <input
          id={inputId}
          aria-invalid={invalid || !!errorMessage}
          aria-busy={loading}
          aria-describedby={describedBy}
          disabled={disabled}
          type={localType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(base, sizeClasses[size], variants[variant],
            'text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 w-full pr-20')}
        />
        {loading && (
          <span aria-hidden className="absolute right-14 animate-spin inline-block h-4 w-4 border-[3px] border-gray-400 border-t-transparent rounded-full" />
        )}
        {clearable && value && value.length > 0 && (
          <button
            type="button"
            aria-label="Clear input"
            className="absolute right-8 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
            onClick={(e) => {
              e.preventDefault()
              const tgt = { target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>
              onChange?.(tgt)
            }}
          >✕</button>
        )}
        {passwordToggle && type === 'password' && (
          <button
            type="button"
            aria-label={localType === 'password' ? 'Show password' : 'Hide password'}
            className="absolute right-2 text-sm text-gray-600 dark:text-gray-300"
            onClick={() => setLocalType((t) => (t === 'password' ? 'text' : 'password'))}
          >{localType === 'password' ? 'Show' : 'Hide'}</button>
        )}
      </div>
      <p id={describedBy} className={clsx('mt-1 text-xs',
        errorMessage ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400')}
      >
        {errorMessage ?? helperText}
      </p>
    </div>
  )
}

export default InputField
