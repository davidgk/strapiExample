const Strapi = require('strapi');
const http = require("http");
let instance
const getStrapi = async () =>  {
  try {
    if(!instance) {
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
};

const tearDown = async () => {
  const dbSettings = strapi.config.get('database.connections.default.settings');
  //This will delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  await strapi.destroy()
}

module.exports = {getStrapi, tearDown}
