import { Children, useEffect } from 'react'
import React from 'react'

function applyMeta(meta) {
  const existing = document.head.querySelector(`meta[name="${meta.name}"]`)
  if (existing) {
    existing.setAttribute('content', meta.content)
    return
  }
  const el = document.createElement('meta')
  el.setAttribute('name', meta.name)
  el.setAttribute('content', meta.content)
  document.head.appendChild(el)
}

export default function Helmet({ children }) {
  useEffect(() => {
    if (!children) return
    Children.forEach(children, child => {
      if (!React.isValidElement(child)) return
      if (child.type === 'title') {
        document.title = child.props.children
      }
      if (child.type === 'meta' && child.props.name && child.props.content) {
        applyMeta(child.props)
      }
    })
  }, [children])

  return null
}
