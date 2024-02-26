// 26. Problem: Aggregation Pipeline for Product Stats

// Problem Statement: Create an aggregation pipeline to
// calculate statistics for products in MongoDB. Implement
// a function to execute the pipeline and return aggregated
// results like the total number of products, the average
// price, and the highest quantity.

// Solution:

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});
const Product = mongoose.model('Product', productSchema);
async function seedProducts() {
    await Product.insertMany([
        { name: 'A', price: 100, quantity: 10 },
        { name: 'B', price: 200, quantity: 20 },
        { name: 'C', price: 300, quantity: 30 },
        { name: 'D', price: 400, quantity: 40 },
        { name: 'E', price: 500, quantity: 50 }
    ]);
}
seedProducts();

const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';
const dbName = 'test';
const client = new MongoClient(url, { useUnifiedTopology: true });

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
function getProductStatistics() {
    // Your implementation here
    client.connect()
        .then(async () => {
            const db = client.db(dbName);
            const products = db.collection('products');
            const pipeline = [
                {
                    $group: {
                        _id: null,
                        totalProducts: { $sum: 1 },
                        averagePrice: { $avg: '$price' },
                        highestQuantity: { $max: '$quantity' }
                    }
                }
            ];
            const result = await products.aggregate(pipeline).toArray();
            console.log(result);
            client.close();
        })
        .catch(err => {
            console.error('Error: ', err);
        });
}

// Call the function to get the aggregated product statistics
getProductStatistics();

// Expected Output:

// The function should return an object with aggregated product statistics.

// Test Cases:

// Call the function and check the results for the expected product statistics.

// Hint: To calculate statistics for products in MongoDB using an aggregation
// pipeline, you can use the $group stage to calculate the total number of
// products (totalProducts), the average price (averagePrice), and the highest
// quantity (highestQuantity). Use $sum, $avg, and $max operators respectively
// for these calculations.