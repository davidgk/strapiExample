const faker = require("faker");
const {getStrapi, tearDown} = require("../helpers/setupAll");

describe('restaurant tests', () => {
  let restaurantName;
  let strapi;
  beforeEach(async() => {
    strapi = await getStrapi()
    await strapi.query('restaurant').delete({name: restaurantName})
  })
  afterAll(async () =>{
    await tearDown()
  })
  describe('create', () => {
    beforeEach(async() => {
      restaurantName = faker.random.word();
    })
    it('should create a restaurant', async () => {
      const result = await strapi.query('restaurant').create({name: restaurantName})
      expect(result.name).toEqual(restaurantName)
    });
    it('should create a restaurant 2', async () => {
      const result = await strapi.query('restaurant').create({name: restaurantName})
      expect(result.name).toEqual(restaurantName)
    });
  });
});
