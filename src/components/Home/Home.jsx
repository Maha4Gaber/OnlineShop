import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import {  useGetAllProductsQuery } from '../../slices/productsApi';
import { useHistory } from "react-router";
import './Home.css';

const Home = () => {
  const { data,error,isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const history=useHistory()



  const addtocart = (product)=>{
    dispatch(addToCart(product))
    history.push("/cart");
  }
  return (
    <div className="home-container">
      {isLoading ? (<p>Loading...</p>
      ) : error ? (
          <p>An error occured...</p>
        ) : (
            <div>
              <h2>
                New Arrivals
              </h2>
              <div className='products'>
                {data?.map(product => 
                  <div className='product' key={product.id}>
                    <h3>{product.title}</h3>
                    <img src={product.image} alt=''></img>
                    <div className='details'>
                      <span>{product.category}</span>
                      <span className='price'>{product.price} $</span>
                    </div>
                    <button onClick={() => {
                      addtocart(product)
                      }}>Add to Cart</button>
                  </div>
                )
                }
                
              </div>
            </div>
      )}
      
    </div>
  );
};

export default Home;
