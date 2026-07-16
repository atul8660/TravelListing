if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const mongo_url = process.env.ATLASDB_URL;

main()
  .then((res) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  await User.deleteMany({});
  const newUser = new User({ email: "admin@wanderlust.com", username: "admin" });
  const registeredUser = await User.register(newUser, "admin123");

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: registeredUser._id,
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
  process.exit(0);
};

initDB();
