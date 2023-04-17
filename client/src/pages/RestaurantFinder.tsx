import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CSS from 'csstype';
import AuthContext, { AuthContextType } from "../context/AuthContext";

interface AddressSchema {
  building: string,
  street: string,
  zipcode: string
}

interface ReviewSchema {
  date: Date,
  score: Number,
  review: string
}

interface MenuSchema {
  menu_id: Number,
  menu_name: string,
  menu_category: string,
  menu_image: string,
  menu_price: string
}

interface Restaurant {
  _id: string,
  restaurantId: string,
  name: string,
  cuisine: string,
  address: AddressSchema,
  reviews: [ReviewSchema],
  image: [string],
  menu_list: [MenuSchema],
  email: string,
  phone: string
}

interface RestaurantCardProps {
  key: string;
  name: string;
  image: string;
  address: AddressSchema;
  reviews: ReviewSchema;
  onClick: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
}

const space: CSS.Properties = {
  marginRight: '1rem'
};

const margin: CSS.Properties = {
  marginTop: '1rem'
};

function RestaurantCard(props: RestaurantCardProps) {
  const auth = useContext(AuthContext) as AuthContextType;
  return (
    <div className="restaurant-card" onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}>

      <img src={props.image} alt={props.name} className="restaurant-photo" />
      <h2 className="restaurant-name">{props.name} </h2>
      <p> Address: {props.address.building}, {props.address.street}, {props.address.zipcode}</p>
      {auth.auth.email && auth.auth.roles.find(role => role == "ROLE_ADMIN") && (
      <div>
        <button style={space} className="btn btn-primary" onClick={props.handleEdit}>Edit</button> 
        <button className="btn btn-danger" onClick={props.handleDelete}>Delete</button>
      </div>
      )}
      <div style={margin}>
        <button className="btn btn-secondary" onClick={props.onClick}>View Menu</button>
      </div>
    </div>
  );
}


const RestaurantFinder = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [tempVar, setTempVar] = useState<Restaurant[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    console.log("Length of search term ", searchTerm.length)
    if (searchTerm.length > 1) {
      setFilteredRestaurants(
        restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      setRestaurants(
        filteredRestaurants
      );
      console.log("In the else", restaurants);
    } else {
      setRestaurants(tempVar);
    }


  };

  // Sending Get request to access the restaurant list
  const sendGetRequest = async () => {
    try {
      const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
      const response = await axios.get(
        `${url}/api/restaurants`,
        {
          withCredentials: true,
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('jwt')
          }
        }
      )
      console.log(response);

      setRestaurants(response.data.filter(function (element: Restaurant) {
        return element.reviews[0] !== undefined;
      }));

      setTempVar(response.data.results.filter(function (element: Restaurant) {
        return element.reviews[0] !== undefined;
      }));

    } catch (err) {
      console.log(err);
    }
  };
  let navigate = useNavigate();
  const handleRedirect = () =>{
    navigate("/findRestaurant");
  }
  const handleDelete = async (index: number) => {
    //let params = useParams();
    try {
      const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
      const id = restaurants[index].restaurantId;
      console.log(id);
      const response = await axios.delete(`${url}/api/restaurants/${id}`,{
        withCredentials: true,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
      });
      console.log(response);
      {handleRedirect};
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    sendGetRequest()
  }, []);

  function handleEdit(index: number) {
    console.log(restaurants[index].restaurantId);
    let id = restaurants[index].restaurantId;
    navigate(`/editRestaurant/${id}`);
  }

  function handleClick(index: number) {
    console.log(restaurants[index].restaurantId);
    let id = restaurants[index].restaurantId;
    navigate(`/restaurant/${id}/menu`);
  }

  return (
    <div className="RestaurantFinder">
      <header className="header">
        {/* <h1>Restaurant Finder</h1> */}
        <form className="search-form">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </form>
      </header>
      <main className="main">
        <section className="restaurant-list">
          {/* {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img src={restaurant.photo} alt={restaurant.name} className="restaurant-photo" />
              <h2 className="restaurant-name">{restaurant.name}</h2>
            </div>
          ))} */}

          {restaurants.filter(function (element) {
            return element.reviews[0] !== undefined;
          }).map((restaurant, index) => (
            <RestaurantCard
              key={restaurant._id}
              name={restaurant.name}
              image={restaurant.image[0]}
              address={restaurant.address}
              reviews={restaurant.reviews[0]}
              onClick={() => handleClick(index)}
              handleDelete={()=> handleDelete(index)}
              handleEdit={()=>handleEdit(index)}
               />
          ))}
        </section>
      </main>
    </div>
  );
};

export default RestaurantFinder;