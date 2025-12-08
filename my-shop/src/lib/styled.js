import React, { useMemo } from 'react'

let styleSheet

function ensureSheet() {
  if (styleSheet) return styleSheet
  const tag = document.createElement('style')
  tag.setAttribute('data-styled-lite', 'true')
  document.head.appendChild(tag)
  styleSheet = tag.sheet
  return styleSheet
}

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
  }
  return `sc-${Math.abs(h)}`
}

function injectRule(className, cssText) {
  const sheet = ensureSheet()
  const rule = `.${className}{${cssText}}`
  try { sheet.insertRule(rule, sheet.cssRules.length) } catch (err) {
    console.warn('styled-lite could not insert rule', err)
  }
}

function styledFactory(tag) {
  return (strings, ...exprs) => {
    const cssText = strings.reduce((acc, str, i) => acc + str + (exprs[i] ?? ''), '')
    const className = hash(cssText)
    injectRule(className, cssText)

    const Component = React.forwardRef(({ className: cls, ...rest }, ref) => {
      const combined = [className, cls].filter(Boolean).join(' ')
      return React.createElement(tag, { ...rest, ref, className: combined })
    })

    Component.displayName = `styled.${tag}`
    return Component
  }
}

const handler = {
  get: (_, tag) => styledFactory(tag)
}

const styled = new Proxy(() => {}, handler)

export const css = (strings, ...exprs) => strings.reduce((acc, str, i) => acc + str + (exprs[i] ?? ''), '')
export const useTheme = () => useMemo(() => ({}), [])
export default styled
