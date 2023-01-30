import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cartItems: localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) :
    []
  ,
  cartTotalQuantity: 0,
  CartTotalAmount:0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state,action) {
      const itemIndex = state.cartItems.findIndex(
        (item)=> item.id===action.payload.id
      )
      if (itemIndex>=0)
      {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info('Incerased Product Quantity',{
          position:"bottom-left"
        })
      }
      else
      {
        const tempProduct ={...action.payload, cartQuantity:1}
        state.cartItems.push(tempProduct)
        toast.success(` ${action.payload.title} Added To card`,{
          position:"bottom-left"
        })
      }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    removeFromCart(state,action) {
      const nextitems= state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
      )
      state.cartItems = nextitems;
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
      toast.error(` ${action.payload.title} Remove from card`,{
          position:"bottom-left"
        })
    },
    decreaseCart(state,action) {
      const itemIndex = state.cartItems.findIndex(
        (item)=> item.id===action.payload.id
      )
      if(state.cartItems[itemIndex].cartQuantity > 1)
      {
        state.cartItems[itemIndex].cartQuantity -= 1;
      }
      else if(state.cartItems[itemIndex].cartQuantity === 1)
      {
        const nextitems= state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
          )
          state.cartItems = nextitems;
        }
      
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
        toast.info('decrease Product Quantity',{
          position:"bottom-left"
        })
    },
    clearCart(state,action) {
      state.cartItems = [];
      toast.error('Cart Cleared  ',{
          position:"bottom-left"
        })
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems));
    },
    getTotals(state,action) {
      let { total,quantity } = state.cartItems.reduce(
        (cartTotal,cartitem) => {
          const { price , cartQuantity} = cartitem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
      },{
        total: 0,
        quantity:0
      })  
      state.cartTotalQuantity = quantity;
      state.CartTotalAmount = total;
    }

  },
});

export const { addToCart,
  increaseCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart
} =
  cartSlice.actions;

export default cartSlice.reducer;
