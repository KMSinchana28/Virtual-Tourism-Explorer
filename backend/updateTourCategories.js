
import mongoose from "mongoose";
import Tour from "./models/Tour.js";
import dotenv from "dotenv";

dotenv.config();

const categories = [
  { title: "Goa Beach Escape", category: "Beach" },
  { title: "Manali Mountain Adventure", category: "Mountain" },
  { title: "Bali Tropical Experience", category: "Island" },
  { title: "Maldives Island Retreat", category: "Island" },
  { title: "Ooty Hill Station Tour", category: "Nature" },
];

const updateCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const item of categories) {
      const result = await Tour.findOneAndUpdate(
        { title: item.title },
        { $set: { category: item.category } },
        { new: true }
      );

      console.log(
        result
          ? `${result.title} updated to ${result.category}`
          : `Tour not found: ${item.title}`
      );
    }
  } catch (error) {
    console.error("Category update failed:", error);
  } finally {
    await mongoose.disconnect();
  }
};

updateCategories();
