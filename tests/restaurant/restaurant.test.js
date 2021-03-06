const faker = require("faker");
const {getStrapi, tearDown} = require("../helpers/setupAll");

describe('restaurant tests', () => {
  let restaurantName;
  let strapi;
  beforeEach(async() => {
    strapi = await getStrapi()
    await strapi.query('restaurant'),delete({name: restaurantName})
  })
  afterAll(async () =>{
    await tearDown()
  })
  describe('create', () => {
    it('should create a restaurant', async () => {
      restaurantName = faker.random.word();
      const result = await strapi.query('restaurant').create({name: restaurantName})
      expect(result.name).toEqual(restaurantName)
    });
    it('should create a restaurant 2', async () => {
      restaurantName = faker.random.word();
      const result = await strapi.query('restaurant').create({name: restaurantName})
      expect(result.name).toEqual(restaurantName)
    });
  });
});
