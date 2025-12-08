import { createPortal } from 'react-dom'
import React, { useEffect, useState } from 'react'

const listeners = new Set()

const createId = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`)

function dispatchToast(payload) {
  listeners.forEach(l => l(payload))
}

export const toast = {
  success: (message) => dispatchToast({ id: createId(), type: 'success', message }),
  error: (message) => dispatchToast({ id: createId(), type: 'error', message }),
  info: (message) => dispatchToast({ id: createId(), type: 'info', message }),
}

function Toast({ toast }) {
  return (
    <div className={`toastify-toast toast-${toast.type}`} role="status" aria-live="polite">
      {toast.message}
    </div>
  )
}

export function ToastContainer({ position = 'top-right' }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const handler = (payload) => {
      setItems(prev => [...prev, payload])
      setTimeout(() => {
        setItems(prev => prev.filter(t => t.id !== payload.id))
      }, 3200)
    }
    listeners.add(handler)
    return () => listeners.delete(handler)
  }, [])

  return createPortal(
    <div className={`toastify-container ${position}`}>
      {items.map(item => <Toast key={item.id} toast={item} />)}
    </div>,
    document.body
  )
}

export default ToastContainer
