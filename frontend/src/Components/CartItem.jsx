import '../Styles/CartItem.css';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({item, qtyChangeHandler, removeFromCartHandler}) => {
  return (
    <div className="cartitem">
        <input type="checkBox" />
        <div className="cartitem__img">
            <img className='product__img' src={item.imageUrl} alt={item.name} />
        </div>
        <Link to={`/product/${item.product}`} className='cartitem__name'>
            <p>{item.name}</p>
        </Link>
        <p className="cartitem__price">${item.price}</p>
        <select className='cartitem__qty hover' value={item.qty} onChange={(e) => qtyChangeHandler(item.product, e.target.value)}>
            {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x+1} value={x+1}>{x+1}</option>
            ))}
        </select>
        <button className="cartitem__removeitem" onClick={() => removeFromCartHandler(item.product)}>
            <i><DeleteIcon fontSize='small' /></i>
        </button>
    </div>
  )
}

export default CartItem