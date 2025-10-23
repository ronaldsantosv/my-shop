
export default function Cart({ cart, addToCart, removeFromCart }) {
  const total = cart.reduce((acc, it) => acc + it.price * it.qty, 0)

  return (
    <section>
      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-row">
                <img src={item.image} alt={item.title} />
                <div className="info">
                  <h4>{item.title}</h4>
                  <p>$ {item.price.toFixed(2)}</p>

                  <div className="qty">
                    <button className="btn-qty" onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button className="btn-qty" onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>

                <div className="line-total">$ {(item.price * item.qty).toFixed(2)}</div>
              </li>
            ))}
          </ul>

          <h3>Total: $ {total.toFixed(2)}</h3>
        </>
      )}
    </section>
  )
}


