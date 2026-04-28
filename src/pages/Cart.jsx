import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuNotebookText } from 'react-icons/lu';
import { MdDeliveryDining } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import emptyCart from "../assets/empty-cart.png"

const Cart = ({ location }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  // ✅ FIX: include quantity in total
  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className='mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0'>
      {cartItem.length > 0 ? (
        <div>
          <h1 className='font-bold text-2xl'>
            My Cart ({cartItem.length})
          </h1>

          {/* CART ITEMS */}
          <div className='mt-10'>
            {cartItem.map((item, index) => {
              const itemId = item._id || item.id; // ✅ safe id

              return (
                <div
                  key={index}
                  className='bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full'
                >
                  {/* LEFT */}
                  <div className='flex items-center gap-4'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-20 h-20 rounded-md'
                    />
                    <div>
                      <h1 className='md:w-[300px] line-clamp-2'>
                        {item.title}
                      </h1>
                      <p className='text-red-500 font-semibold text-lg'>
                        ${item.price}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className='bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl'>
                    <button
                      onClick={() => updateQuantity(itemId, "decrease")}
                      className='cursor-pointer'
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(itemId, "increase")}
                      className='cursor-pointer'
                    >
                      +
                    </button>
                  </div>

                  {/* DELETE */}
                  <span
                    onClick={() => deleteItem(itemId)}
                    className='hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl'
                  >
                    <FaRegTrashAlt className='text-red-500 text-2xl cursor-pointer' />
                  </span>
                </div>
              )
            })}
          </div>

          {/* BILL SECTION */}
          <div className='grid grid-cols-1 md:grid-cols-2 md:gap-20'>
            
            {/* DELIVERY INFO */}
            <div className='bg-gray-100 rounded-md p-7 mt-4 space-y-2'>
              <h1 className='text-gray-800 font-bold text-xl'>
                Delivery Info
              </h1>

              <input
                type="text"
                className='p-2 rounded-md'
                value={user?.fullName || ""}
                readOnly
              />

              <input
                type="text"
                className='p-2 rounded-md'
                value={location?.county || ""}
                readOnly
              />

              <div className='flex gap-5'>
                <input
                  type="text"
                  className='p-2 rounded-md w-full'
                  value={location?.state || ""}
                  readOnly
                />
                <input
                  type="text"
                  className='p-2 rounded-md w-full'
                  value={location?.postcode || ""}
                  readOnly
                />
              </div>

              <div className='flex gap-5'>
                <input
                  type="text"
                  className='p-2 rounded-md w-full'
                  value={location?.country || ""}
                  readOnly
                />
                <input
                  type="text"
                  placeholder='Phone Number'
                  className='p-2 rounded-md w-full'
                />
              </div>

              <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-3'>
                Submit
              </button>
            </div>

            {/* BILL */}
            <div className='bg-white border shadow-xl rounded-md p-7 mt-4 space-y-2 h-max'>
              <h1 className='text-gray-800 font-bold text-xl'>
                Bill details
              </h1>

              <div className='flex justify-between'>
                <h1 className='flex gap-1 items-center'>
                  <LuNotebookText /> Items total
                </h1>
                <p>${totalPrice}</p>
              </div>

              <div className='flex justify-between'>
                <h1 className='flex gap-1 items-center'>
                  <MdDeliveryDining /> Delivery
                </h1>
                <p className='text-red-500'>FREE</p>
              </div>

              <div className='flex justify-between'>
                <h1 className='flex gap-1 items-center'>
                  <GiShoppingBag /> Handling
                </h1>
                <p>$5</p>
              </div>

              <hr />

              <div className='flex justify-between font-bold text-lg'>
                <h1>Grand total</h1>
                <p>${totalPrice + 5}</p>
              </div>

              <button className='bg-red-500 text-white py-2 w-full mt-3 rounded-md'>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-3 justify-center items-center h-[600px]'>
          <h1 className='text-red-500 text-4xl font-bold'>
            Your cart is empty
          </h1>

          <img src={emptyCart} alt="" className='w-[300px]' />

          <button
            onClick={() => navigate('/products')}
            className='bg-red-500 text-white px-4 py-2 rounded-md'
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart;