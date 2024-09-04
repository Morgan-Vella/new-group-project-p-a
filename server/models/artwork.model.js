import { model, Schema } from "mongoose";

const ArtworkSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minlength: [2, "Name must be at least 2 characters long."],
      maxLength: [255, "Name can not be longer than 255 characters."],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description of your artwork."],
      minlength: [10, "You can describe it better than that!"],
      maxLength: [
        255,
        "Let's keep it brief. Perhaps less than 255 characters?",
      ],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Artwork = model("Artworks", ArtworkSchema);
export default Artwork;
