import { createContext } from 'react';

interface MenuSchema  {
    _id: string,
    menu_name: string,
    menu_category: string,
    menu_image: string,
    price: string,
  }

const CartContext = createContext<MenuSchema[]>([]);

export default CartContext;
