let express = require("express");
let cors = require("cors");

let app = express();
let port = 3000;

app.use(cors());

//Home.
app.get("/", (req, res) => {
  res.send("Welcome to FlipDeal Shopping Cart Operations...");
});

//Cart Data.
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

//Endpoint 1 Add an Item to the Cart.
//Add a new item to the cart using the provided details.
function addNewItem(productId, name, price, quantity){
  let item = {
    productId : productId,
    name : name,
    price : price,
    quantity : quantity,
  };
  cart.push(item);
  return cart;
};

app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItem(productId, name, price, quantity);
  res.json({ cartItems : result });
});

//Endpoint 2 Edit Quantity of an Item in the Cart.
//Edit the quantity of an existing item in the cart based on the product ID.
function editQuantity(cart, productId, quantity){
  for(let i=0; i<cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity;
    }
  }
  return cart;
};

app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(cart, productId, quantity);
  res.json({ cartItems : result });
});

//Endpoint 3 Delete an Item from the Cart.
//Delete an item from the cart based on the product ID.
function deleteItem(cart, productId){
  return cart.productId !== productId;
};

app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter(el => deleteItem(el, productId));
  cart = result;
  res.json({ cartItems : result });
});

//Endpoint 4 Read Items in the Cart.
//Return the current list of items in the cart.
function currentState(cart){
  return cart;
};

app.get("/cart", (req, res) => {
  let result = currentState(cart);
  res.json({ cartItems : result });
});

//Endpoint 5 Calculate Total Quantity of Items in the Cart.
//Calculate and return the total quantity of items in the cart.
function totalQuantity(cart){
  let totalQuantity = 0;
  for(let i=0; i<cart.length; i++){
    totalQuantity = totalQuantity + cart[i].quantity;
  }
  return totalQuantity;
};

app.get("/cart/total-quantity", (req, res) => {
  let result = totalQuantity(cart);
  res.json({ totalQuantity : result });
});

//Endpoint 6 Calculate Total Price of Items in the Cart.
//Calculate and return the total price of items in the cart based on their quantities and individual prices.
function totalPrice(cart){
  let totalPrice = 0;
  for(let i=0; i<cart.length; i++){
    totalPrice = totalPrice + (cart[i].price * cart[i].quantity);
  }
  return totalPrice;
};

app.get("/cart/total-price", (req, res) => {
  let result = totalPrice(cart);
  res.json({ totalPrice : result });
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});