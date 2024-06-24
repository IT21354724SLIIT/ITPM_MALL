const Advertisement = require("./AdModel");

exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find();
    res.json(advertisements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdvertisementById = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.json(advertisement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAdvertisement = async (req, res) => {
  try {
    const {
      adverisementId,
      adType,
      description,
      ImageBase64,
      name
    } = req.body;

    // Check if all required fields are provided
    if (
      !adverisementId ||
      !adType ||
      !description ||
      !ImageBase64 ||
      !name
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const advertisement = new Advertisement({
      adverisementId,
      adType,
      description,
      ImageBase64,
      name
    });
    await advertisement.save();
    res
      .status(201)
      .json({ message: "Advertisement created successfully", advertisement });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      adType,
      description,
      ImageBase64,
      name
    } = req.body;

    // Validate all fields are provided
    if (
      !adType ||
      !description ||
      !ImageBase64 ||
      !name
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
      id,
      {
        adType,
        description,
        ImageBase64,
        name
      },
      { new: true }
    );
    if (!updatedAdvertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.json({
      message: "Advertisement updated successfully",
      advertisement: updatedAdvertisement,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdvertisement = await Advertisement.findByIdAndDelete(id);
    if (!deletedAdvertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.json({ message: "Advertisement deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};





