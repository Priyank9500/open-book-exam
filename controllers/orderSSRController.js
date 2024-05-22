const Order = require("../models/orderModel");

// Render Controller: Render index.html with orders using EJS
const renderOrders = async (req, res) => {
  const user_id = req.user._id;
  try {
    const orders = await Order.find({ createdBy: user_id }).sort({ createdAt: -1 });
    res.render("index", { orders }); // Render index.ejs with orders data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Order by ID
const renderOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const order = await Order.findOne({ _id: id, createdBy: user_id });
    if (!order) {
      return res.render("notfound");
    }
    res.render("singleorder", { order }); // Render singleorder.ejs with order data
  } catch (error) {
    console.error("Error rendering Order:", error);
    res.status(500).render("error");
  }
};

// Render Form to add a new Order
const renderForm = (req, res) => {
  try {
    res.render("addorder"); // Assuming "addorder.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new order (used for rendering and API)
const addOrder = async (req, res) => {
  try {
    const { customer, totalAmount, duration, products, status } = req.body;
    const createdBy = req.user._id;
    const newOrder = new Order({ customer, totalAmount, duration, products, status, createdBy });
    await newOrder.save();
    console.log("Order added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).render("error");
  }
};

// Delete Order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const order = await Order.findOneAndDelete({ _id: id, createdBy: user_id });
    if (!order) {
      return res.status(404).render("notfound");
    }
    console.log("Order deleted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleting Order:", error);
    res.status(500).render("error");
  }
};

// Update Order by ID
const renderUpdateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.render("notfound");
    }
    res.render("updateorder", { order });
  } catch (error) {
    console.error("Error fetching Order:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer, totalAmount, duration, products, status } = req.body;
    const updatedOrderData = { customer, totalAmount, duration, products, status };
    const updatedOrder = await Order.findByIdAndUpdate(id, updatedOrderData, { new: true });
    if (!updatedOrder) {
      return res.render("notfound");
    }
    console.log("Order updated successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error updating Order:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderOrders,
  renderOrder,
  addOrder,
  renderForm,
  deleteOrder,
  updateOrder,
  renderUpdateOrder,
};
