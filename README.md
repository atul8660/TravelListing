# ✨ **WanderLust**

WanderLust is a travel listing web application built with the Node.js, Express.js, MongoDB, and EJS for templating. It allows users to explore travel destinations, manage listings, leave reviews, and more, while featuring a clean, responsive design and  functionality.

---

## 📋 **Features**

- **User Authentication**: Secure login and registration using Passport.js for authentication.
- **Listing Management**: Users can create, read, update, and delete travel listings.
- **Review System**: Users can rate and leave reviews for each listing.
- **Map Integration**: Visualize listings locations using the Mapbox API.
- **Cloud Image Storage**: Use Cloudinary for storing and managing images.
- **Responsive Design**: Optimized for both mobile and desktop views.
- **Session Management**: Cookie-based sessions for user authentication.
- **Flash Messages**: Display success or error messages during user interactions.

---

## 💻**Tech Stack**

- **Backend**: Node.js, ExpressJS
- **Frontend**: EJS, HTML, CSS, JavaScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js for user authentication
- **Image Storage**: Cloudinary
- **Maps**: Mapbox API for map integration
- **Styling**: Bootstrap for responsive UI
- **Deployment**: Render for hosting the application

---

## 🚀**Live Demo**

You can explore the live demo of the WanderLust application here:

[WanderLust Live Demo](https://wanderlust-p1xo.onrender.com/listings)

---

## 🛠️**Installation**

### **Prerequisites**

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) and npm
- MongoDB (either locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### **Clone the repository**

```bash
git clone https://github.com/atharvrajmane/WanderLust.git
cd wanderlust
```

### **Install Dependencies**

```bash
npm install
```

---

## 🏃‍♂️**Running the Project**

### **Start the server**

```bash
nodemon app.js
```

Visit the app in your browser at http://localhost:8080/listings.

---

## 🔑**Environment Variables**

You will need to create a .env file with the following variables:

```bash
CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUD_API_KEY=<Your Cloudinary API Key>
CLOUD_API_SECRET=<Your Cloudinary API Secret>
MAP_TOKEN=<Your Mapbox API Token>
ATLASDB_URL=<Your MongoDB Atlas Database URL>
SECRET=<Your Session Secret (can write any secret here)>
```

---

## 📂**File Structure**

```bash
WANDERLUST/
├── controllers/                 # Handles the business logic for routes
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/                        # Initial data seeding and app setup
│   ├── data.js
│   └── index.js
├── models/                      # Mongoose models defining the schema
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   └── js/
│       ├── map.js
│       └── script.js
├── routes/                      # Routes that map HTTP requests to controllers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                       # Utility functions for error handling and async management
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/                       # EJS templates for rendering HTML
│   ├── includle/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplates.ejs
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── error.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
├── .env
├── .gitignore
├── app.js                       # Main server entry point
├── cloudConfig.js
├── middleware.js
├── package-lock.json
├── package.json
├── README.md
└── schema.js
```

---
