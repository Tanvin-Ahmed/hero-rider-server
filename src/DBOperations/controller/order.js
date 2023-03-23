const { createOrder, getOrder } = require("../services/order");

const addOrder = async (req, res) => {
  try {
    const info = req.body;
    console.log(info);
    const order = await createOrder(info);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error creating order!" });
  }
};

const findOrders = async (req, res) => {
  try {
    const orders = await getOrder(req.params.userId);
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(404).json({ message: "No order found!" });
  }
};

module.exports = { addOrder, findOrders };
