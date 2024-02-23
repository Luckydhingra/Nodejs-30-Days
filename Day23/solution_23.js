// 23. Problem: Mongoose Population

// Problem Statement: Extend the previous "Product" schema
// to include a reference to a "Category" entity. Implement
// a Mongoose population query to retrieve all products with
// their corresponding category details.

// Solution:

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/productsWithCategories', { useNewUrlParser: true, useUnifiedTopology: true });
const categorySchema = new mongoose.Schema({
    name: String
});
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function createCategory(name) {
    const category = new Category({ name });
    await category.save();
    console.log('Category created successfully');
    return category;
}

async function createProduct(name, price, category) {
    const product = new Product({ name, price, category });
    await product.save();
    console.log('Product created successfully');
    return product;
}

async function test() {
    const category1 = await createCategory('Electronics');
    const category2 = await createCategory('Clothing');
    const category3 = await createCategory('Books');
    await createProduct('Laptop', 1000, category1._id);
    await createProduct('T-shirt', 20, category2._id);
    await createProduct('Book', 10, category3._id);
}

async function deleteAll() {
    await Category.deleteMany({});
    await Product.deleteMany({});
}

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
    // Your implementation here
    try {
        const products = await Product.find().populate('category');
        return products;
    } catch (error) {
        console.log(error);
    }
}

app.get('/products', async (req, res) => {
    try {
        const products = await getProductsPopulatedWithCategory();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await deleteAll();
    test();
});

// Expected Output:

// 1. The function should return an array of product objects with populated category details.

// Test Cases:

// 2. Create products with associated categories, then call the function to retrieve products with populated category details.

// Hint:

// To solve this problem, you'll need to:

// 1. Define a Category schema.
// 2. Update the Product schema to include a reference to Category.
// 3. Create a ProductWithCategory model using the updated schema.
// 4. Implement the getProductsPopulatedWithCategory function using Mongoose's populate method to retrieve all products with their corresponding category details.
// 5. Hint: Use Mongoose's populate method on the category field of the ProductWithCategory model to populate the category details.