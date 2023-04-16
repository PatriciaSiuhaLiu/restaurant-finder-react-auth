import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

interface RestaurantSchema {
    restaurantId: string,
    name: string,
}

interface MenuSchema {
    menu_id: string;
    menu_name: string;
    menu_category: string;
    menu_image: string;
    menu_price: number;
}

const AddMenuItem: React.FC = () => {
    const [restaurants, setRestaurants] = useState<RestaurantSchema[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantSchema | null>(null);
    const [menu, setMenu] = useState<MenuSchema>({
        menu_id: '',
        menu_name: '',
        menu_category: '',
        menu_image: '',
        menu_price: 0
    });

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {

                const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";

                const response = await axios.get(`${url}/api/restaurants`,
                    {
                        withCredentials: true,
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem('jwt')
                        }
                    }

                );
                setRestaurants(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (selectedRestaurant) {
            setMenu((prevMenu) => ({ ...prevMenu, restaurant_id: selectedRestaurant.restaurantId }));

        }
    }, [selectedRestaurant]);


    // useEffect(() => {
    //     const randomId = Math.floor(Math.random() * 10);
    //     setMenu((prevMenu) => ({ ...prevMenu, menu_id: randomId.toString() }));
    // }, []);


    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try { //http://localhost:8000/api/v1/restaurants/640ebdf14253cbaa5b96969c/menuList

            const url = import.meta.env.VITE_ENV === "DEV" ? "http://localhost:8080" : "https://online-food-order-nf2n.onrender.com";
            const response = await axios.post(`${url}/api/restaurants/${selectedRestaurant?.restaurantId}/menuList`, menu,
                {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('jwt')
                    }
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form className='form-control' onSubmit={handleSubmit}>

            <FormGroup className='form-control'>
                <Label for="restaurant_select">Select Restaurant</Label>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret>
                        {selectedRestaurant ? selectedRestaurant.name : 'Select Restaurant'}
                    </DropdownToggle>
                    <DropdownMenu>
                        {restaurants.map((restaurant) => (
                            <DropdownItem key={restaurant.restaurantId.toString()} onClick={() => setSelectedRestaurant(restaurant)}>
                                {restaurant.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
                <Label for="menu_name">Menu Name</Label>
                <Input type="text" name="menu_name" id="menu_name" placeholder="Enter Menu Name" onChange={(event) => setMenu({ ...menu, menu_name: event.target.value })} required />
                <Label for="menu_category">Menu Category</Label>
                <Input type="text" name="menu_category" id="menu_category" placeholder="Enter Menu Category" onChange={(event) => setMenu({ ...menu, menu_category: event.target.value })} required />
                <Label for="menu_price">Menu Price</Label>
                <Input type="number" name="menu_price" id="menu_price" placeholder="Enter Menu Item Price" onChange={(event) => setMenu({ ...menu, menu_price: +event.target.value })} required />

                <Label for="menu_image">Menu Image</Label>
                <Input type="text" name="menu_image" id="menu_image" placeholder="Enter Menu Image" onChange={(event) => setMenu({ ...menu, menu_image: event.target.value })} required />
                <br />
                <Button variant="link">Submit</Button>
            </FormGroup>
        </Form>
    );
};

export default AddMenuItem;
