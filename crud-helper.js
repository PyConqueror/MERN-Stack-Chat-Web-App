require('dotenv').config();
require('./config/database.cjs');

const User = require('./models/user');
// const Item = require('./models/item');
// const Category = require('./models/category');
// const Order = require('./models/order');

let user, item, category, order;
let users, items, categories, orders;