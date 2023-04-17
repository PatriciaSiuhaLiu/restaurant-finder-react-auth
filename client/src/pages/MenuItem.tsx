import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CSS from 'csstype';
import { Box } from '@mui/material';
import AuthContext, { AuthContextType } from "../context/AuthContext";
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

const divCard: CSS.Properties = {
  width: '18rem'
};

interface MenuSchema {
  menu_id: string,
  menu_name: string,
  menu_category: string,
  menu_image: string,
  menu_price: string,
  handleDelete: () => void;
}

interface MenuCardSchema {
  menu_id: string,
  menu_name: string,
  menu_category: string,
  menu_image: string,
  menu_price: string,
  onClick: () => void;
}
const space: CSS.Properties = {
  marginRight: '1rem'
};
type Props = {};

const MenuItem = (props: Props) => {
  let params = useParams();
  let restaurantId = `${params.id}`;
  const auth = useContext(AuthContext) as AuthContextType;

  const [restaurants, setRestaurants] = useState<MenuSchema[]>([]);

  const sendGetRequest = async () => {
    try {
      const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
      const response = await axios.get(
        `${url}/api/restaurants/${params.id}/menuList`,
        {
          withCredentials: true,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        }
      )
      console.log(response);
      setRestaurants(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendGetRequest()
  }, []);

  function MenuCard(props: MenuSchema) {
    const img = faker.image.food(200, 150, true);
    return (
      <div className="card shadow-lg p-3 mb-5 bg-white rounded" style={divCard}>
        <img className="card-img-top" src={img} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{props.menu_name}</h5>
          <p className="card-text">Category: {props.menu_category}</p>
          <h6 className="card-subtitle mb-2 text-muted">Price: $ {props.menu_price}</h6>
          {auth.auth.email && auth.auth.roles.find(role => role == "ROLE_ADMIN") && (
          <div>
            <button className="btn btn-danger" onClick={props.handleDelete}>Delete</button>
          </div>
          )}
        </div>
      </div>

    );
  }
  let navigate = useNavigate();
  const handleRedirect = () =>{
    navigate("/findRestaurant");
  }
  const handleDelete = async (index:string) => {
    try {
      const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
      console.log(restaurantId);
      let menuItemId = index;
      console.log(menuItemId);
      const response = await axios.delete(`${url}/api/restaurants/${restaurantId}/menuList/${menuItemId}`,{
        withCredentials: true,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
      });
      console.log(response);
      window.location.reload();
    }
    catch (err) {
      console.log(err);
    }
  }
  
  return (
    <Box sx={{ height: "100%" }}>
      <div className="RestaurantFinder">

        <div className="navbar navbar-light bg-light">
          <form className="form-inline justify-center">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
        <main className="form-control">
          <section className="menu-list d-flex flex-wrap">
            {restaurants.map((restaurant, index) => (
              <div className="p-3">
                <MenuCard
                  menu_id={restaurant.menu_id}
                  menu_name={restaurant.menu_name}
                  menu_category={restaurant.menu_category}
                  menu_image={restaurant.menu_image}
                  menu_price={restaurant.menu_price}
                  handleDelete={() => handleDelete(restaurant.menu_id)}
                />
              </div>
            ))}
          </section>
        </main>
      </div>
    </Box>
  );
};

export default MenuItem;