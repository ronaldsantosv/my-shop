import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`

const Modal = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem;
  max-width: 420px;
  width: 92%;
  box-shadow: 0 25px 60px rgba(0,0,0,0.12);
  display: grid;
  gap: 1rem;
`

export default function ConfirmModal({ open, title, message, onConfirm, onClose }) {
  if (!open) return null
  return (
    <Backdrop role="dialog" aria-modal="true" aria-label={title}>
      <Modal>
        <div>
          <h4 style={{ margin: '0 0 .35rem' }}>{title}</h4>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
        <div className="d-flex justify-content-between gap-2">
          <button className="btn btn-outline" onClick={onClose}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
        </div>
      </Modal>
    </Backdrop>
  )
}
