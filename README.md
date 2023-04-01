# react-project-code-bridge

Application deployed at: https://online-food-order-frontend.onrender.com/ (Note: initial load is slow on render.com!!)

Admin cerdentials:-
email: Patricia@gmail.com
password: hello14785

Customer credentials:-
email: stavan@gmail.com
password: 123654789

### Patricia Liu worked on:-

A) Frontend-

1. Client(Frontend) Application Setup
2. Theme in theme.tsx
3. Hamburger inside Navbar
4. Application's Navbar & Footer in Navbar.tsx & Footer.tsx
5. Routing with file route.ts
6. Persisted Login (PersistLogin.tsx)
7. Created Protected Routes (ProtectedRoutes.tsx)
8. Role Based Routing (App.js)
9. Created Auth Context (AuthContext.tsx)
10. Login & Logout pages
11. Payment pages
12. Unauthorized Page
13. Not Found Page

B) Backend-

1. Server(Backend) Application Setup
2. /auth/passport.js - Implemented authentication with Passport JWT strategy using passport & passport-jwt
3. Middleware.js file for - 'not found' routes and error handling
4. app.js - Initializing the app adding all the required middlewares like helmet, morgan, dotenv, cookie-parser etc.
5. /api/index.js - Handling the all routes
6. /api/payment.js - payment api implementation with jwt authentication
7. /api/login.js - login api implementation

C) Application deployment

### Eknoor Kaur worked on:-

A) Frontend-

1. User Registration Page
2. Contact Us Form Page

B) Backend -

1. /api/register.js -
   CRUD operations are implemented on the Users Collection in the database.
2. /api/contactUs.js -  
   Contact Us form implementation.
3. /models/user.js-
   Users collection definition.
4. /models/contact.js-
   ConatctForm collection definition.

C) Project Documentation

### Akshay Gaikwad worked on:-

A) Frontend-

1. Menu List Page
2. Cart Page
3. Created Context for Cart and storing cart in local storage.
4. Navigating from specific restaurant to display list of menu.

B) Backend -

1. /api/menuitem.js -
   CRUD operations are implemented on menulist in the Restaurants collection.
2. /models/restaurant.js -  
   created restaurant model which included sub schemas of address, reviews and menu
