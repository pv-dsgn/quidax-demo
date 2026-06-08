import { useId } from 'react'
import styles from './Input.module.css'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string
  helperText?: string
  errorMessage?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function Input({
  label,
  helperText,
  errorMessage,
  prefix,
  suffix,
  required,
  disabled,
  id: idProp,
  className,
  ...rest
}: InputProps) {
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

      <div className={[styles.inputWrap, hasError ? styles.inputWrapError : ''].filter(Boolean).join(' ')}>
        {prefix && <span className={styles.prefix} aria-hidden="true">{prefix}</span>}

        <input
          id={id}
          className={[styles.input, className].filter(Boolean).join(' ')}
          disabled={disabled}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError || helperText ? descId : undefined}
          {...rest}
        />

        {suffix && <span className={styles.suffix} aria-hidden="true">{suffix}</span>}
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
