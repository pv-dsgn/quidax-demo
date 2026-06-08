import { useId } from 'react'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectGroup {
  group: string
  options: SelectOption[]
}

type SelectItems = SelectOption[] | SelectGroup[]

function isGrouped(items: SelectItems): items is SelectGroup[] {
  return items.length > 0 && 'group' in items[0]
}

interface SelectProps {
  options: SelectItems
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  required?: boolean
  disabled?: boolean
  id?: string
  className?: string
}

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  required,
  disabled,
  id: idProp,
  className,
}: SelectProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const hasError = Boolean(errorMessage)
  const descId = `${id}-desc`

  return (
    <div className={[styles.root, disabled ? styles.rootDisabled : ''].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
      )}

      <div className={[styles.selectWrap, hasError ? styles.selectWrapError : ''].filter(Boolean).join(' ')}>
        <select
          id={id}
          className={[styles.select, className].filter(Boolean).join(' ')}
          value={value}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError || helperText ? descId : undefined}
          onChange={e => onChange?.(e.target.value)}
        >
          {placeholder && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}

          {isGrouped(options)
            ? options.map(g => (
                <optgroup key={g.group} label={g.group}>
                  {g.options.map(opt => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : options.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
        </select>

        <span className={styles.chevron} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>

      {(hasError || helperText) && (
        <p
          id={descId}
          className={[styles.helper, hasError ? styles.helperError : ''].filter(Boolean).join(' ')}
        >
          {hasError ? errorMessage : helperText}
        </p>
      )}
    </div>
  )
}
