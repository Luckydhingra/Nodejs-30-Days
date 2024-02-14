const cachedResponses = {}; // Object to store cached responses

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const url = req.originalUrl; // Get the request URL
  const cachedResponse = cachedResponses[url]; // Check if response is cached
  
  if (cachedResponse) {
    // If cached response exists, check if it's expired
    if (Date.now() < cachedResponse.expiresAt) {
      // If not expired, return cached response
      res.send(cachedResponse.body);
      return;
    } else {
      // If expired, remove cached response
      delete cachedResponses[url];
    }
  }

  // If no cached response or expired, proceed to the next middleware
  next();
}

/**
 * Function to cache a response
 * @param {string} url - Request URL
 * @param {Object} body - Response body
 * @param {number} expiresIn - Time in milliseconds until the cached response expires
 */
function cacheResponse(url, body, expiresIn) {
  const expiresAt = Date.now() + expiresIn;
  cachedResponses[url] = { body, expiresAt };
}

// Example usage:
// Call this function to cache a response
// cacheResponse('/example', { data: 'example' }, 60000); // Cache for 1 minute

module.exports = { cachingMiddleware, cacheResponse };