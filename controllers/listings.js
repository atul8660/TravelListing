const Listing = require("../models/listing");
const axios = require("axios");

// Nominatim geocoding from OpenStreetMap (free, no API key needed)
const geocodeLocation = async (location) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: location,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "WanderLust-App",
      },
    });
    
    if (response.data.length > 0) {
      const result = response.data[0];
      return {
        type: "Point",
        coordinates: [parseFloat(result.lon), parseFloat(result.lat)],
      };
    }
    throw new Error("Location not found");
  } catch (error) {
    console.error("Geocoding error:", error.message);
    throw error;
  }
};

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
};

module.exports.renderNewFrom = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  const geometry = await geocodeLocation(req.body.listing.location);

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = geometry;

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditFrom = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

module.exports.filterListing = async (req, res) => {
  const { category } = req.params;
  const listingsByCategory = await Listing.find({ category: category });
  if (listingsByCategory.length > 0) {
    res.render("listings/index.ejs", { allListing: listingsByCategory });
  } else {
    req.flash("error", "No listings found for this category.");
    res.redirect("/listings");
  }
};

module.exports.searchListing = async (req, res) => {
  const searchTerm = req.query.query;
  if (searchTerm) {
    // Search listings with title, description, or location matching the search term
    let results = await Listing.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    });
    if (results == "") {
      req.flash("error", "No listings found.");
      res.redirect("/listings");
    } else {
      res.render("listings/index.ejs", { allListing: results });
    }
  } else {
    req.flash("error", "Please enter a search term.");
    res.redirect("/listings");
  }
};
