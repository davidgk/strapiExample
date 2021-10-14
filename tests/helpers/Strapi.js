const Strapi = require('strapi');
const http = require('http');
let instance;
async function setupStrapi() {
  try {
    if (!instance) {
      let strapi1 = Strapi();
      /** the following code is copied from `./node_modules/strapi/lib/Strapi.js` */
      await strapi1.load();
      instance = strapi; // strapi is now global
      await instance.app
        .use(instance.router.routes()) // populate KOA routes
        .use(instance.router.allowedMethods()); // populate KOA methods
      instance.server = http.createServer(instance.app.callback());
    }
  } catch (e) {
    console.log(e)
  }
  return instance;
}
module.exports = { setupStrapi };
