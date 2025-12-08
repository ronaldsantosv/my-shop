import React from 'react'

function makeIcon(pathProps = {}, viewBox = '0 0 24 24') {
  return function Icon(props) {
    return (
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        viewBox={viewBox}
        width={props.size || 18}
        height={props.size || 18}
        className={props.className}
        style={{ verticalAlign: 'middle', ...(props.style || {}) }}
      >
        <path fill="currentColor" {...pathProps} />
      </svg>
    )
  }
}

export const FaShoppingCart = makeIcon({ d: 'M7 4h14l-1.5 9h-11L7 4zm-2 0H2v2h2l3.6 7.59L5.25 17H19v-2H7.42l1.1-2h9.95a1 1 0 0 0 .99-.83L20.8 4.6A1 1 0 0 0 19.82 3H5z' })
export const FaUser = makeIcon({ d: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z' })
export const FaSignInAlt = makeIcon({ d: 'M15 3h6v18h-6v-2h4V5h-4zm-2.59 4.59L16 11H6v2h10l-3.59 3.41L14 18l6-6-6-6z' })
export const FaSignOutAlt = makeIcon({ d: 'M16 3h6v18h-6v-2h4V5h-4zm-2.59 4.59L16 11H2v2h14l-2.59 2.41L15 18l6-6-6-6z' })
export const FaPlus = makeIcon({ d: 'M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z' })
export const FaMinus = makeIcon({ d: 'M5 11h14v2H5z' })
export const FaTrash = makeIcon({ d: 'M9 3h6v2h5v2h-2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7H4V5h5zm-1 4v11h8V7z' })
export const FaEdit = makeIcon({ d: 'M17.66 3a1 1 0 0 1 .7.29l2.35 2.35a1 1 0 0 1 0 1.42l-9.9 9.9-4.24.71a1 1 0 0 1-1.15-1.15l.71-4.24 9.9-9.9A1 1 0 0 1 17.66 3zM6.21 15.79l-.35 2.12 2.12-.35 8.44-8.44-1.77-1.77z' })
export const FaSearch = makeIcon({ d: 'M10 2a8 8 0 0 1 6.32 12.9l3.39 3.39-1.41 1.42-3.4-3.4A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 3.94 10.55L14 13.6A6 6 0 0 0 10 4z' })
export const FaBoxOpen = makeIcon({ d: 'M3 7l9-5 9 5-9 5zm0 2l9 5 9-5v8l-9 5-9-5z' })
export const FaCheckCircle = makeIcon({ d: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 15-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9z' })
