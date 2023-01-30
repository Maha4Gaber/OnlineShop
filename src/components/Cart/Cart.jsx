import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../../slices/cartSlice';
import './Cart.css'
const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals())
  },[cart,dispatch])

  const removeitem = (cartitem) => {
    dispatch(removeFromCart(cartitem))
  }
  const inceement = (cartitem) => {
    dispatch(addToCart(cartitem))
  }
  const deceement = (cartitem) => {
    dispatch(decreaseCart(cartitem))
  }
  const clearitems = () => {
    dispatch(clearCart())
  }
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {
        cart.cartItems.length === 0 ? (
          <div className='cart-empty'>
            <p>Your Cart is Currntly empty </p>
            <div className='start-shopping'>
              <Link to='/'>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
                <span> Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
            <div>
              <div className='titles'>
                <h3 className='Product'>Product</h3>
                <h3 className='Price'>Price</h3>
                <h3 className='Quantity'>Quantity</h3>
                <h3 className='total'>Total</h3>
              </div>
              <div className='cart-items'>
                {
                  cart.cartItems.map(cartitem => (
                    <div className='cart-item' key={cartitem.id}>
                      <div className='cart-product'>
                        <img src={cartitem.image} alt=''></img>
                        <div>
                          <h3>{cartitem.title}</h3>
                          <p>{cartitem.description}</p>
                          <button onClick={()=> removeitem(cartitem)}>Remove</button>
                        </div>
                      </div>
                      <div className='cart-product-price'>
                        ${cartitem.price}
                      </div>
                      <div className='cart-product-quantity'>
                        <button onClick={() => deceement(cartitem)}>-</button>
                        <div className='count'> {cartitem.cartQuantity}</div>
                        <button onClick={() => inceement(cartitem)}>+</button>
                      </div>
                      <div className='cart-product-total-price'>
                        ${cartitem.price * cartitem.cartQuantity}
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='cart-summary'>
                <button className='clear-btn'
                  onClick={() => clearitems()}
                >Clear Cart</button>
                <div className='cart-checkout'>
                  <div className='subtotal'>
                    <span>SubTotal</span>
                    <span className='amount'>${cart.CartTotalAmount}</span>
                  </div>
                  <p>Taxes and shipping calculated at checkout</p>
                  <button>Checkout</button>
                  <div className='continue-shopping'>
                    <Link to='/'>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                      <span> Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        )
      }
      
    </div>
  );
};

export default Cart;
