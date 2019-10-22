const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

//Schema
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Bootcamp name is required!"],
    unique: true,
    trim: true
  },
  slug: String,
  description: {
    type: String,
    required: [true, "A description is required!"]
  },
  website: {
    type: String,
    required: [true, "A website url is required"],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Website is invalid"
    ]
  },
  phone: String,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address"
    ]
  },

  address: {
    type: String,
    required: [true, "Please add an address"]
  },

  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"] // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },

    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },

  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other"
    ]
  },

  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"]
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg"
  },
  housing: {
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//create bootcamp slug from the name before saving doc
BootcampSchema.pre("save", function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Geocode & create location field
BootcampSchema.pre(
  "save",
  async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: "Point",
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      state: loc[0].stateCode,
      zip: loc[0].zipcode,
      country: loc[0].countryCode
    };

    //dont save address in db
    this.address = undefined;
    next();
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//delete courses when bootcamp is deleted
BootcampSchema.pre("remove", async function(next) {
  await this.model(Course).deleteMany({ bootcamp: this._id });
  next()
});

//Reverse populate with Virtuals
BootcampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false
});
module.exports = mongoose.model("Bootcamp", BootcampSchema);
