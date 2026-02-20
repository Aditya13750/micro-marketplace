import User from "../models/User.js";

export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found in toggleFavorite:", req.user.id);
      return res.status(404).json({ msg: "User not found" });
    }

    const productIdStr = req.params.productId;
    console.log(`Toggling favorite: User=${user.email}, ProductID=${productIdStr}`);

    const exists = user.favorites.some((id) => id.toString() === productIdStr);

    if (exists) {
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== productIdStr
      );
    } else {
      user.favorites.push(productIdStr);
    }

    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};