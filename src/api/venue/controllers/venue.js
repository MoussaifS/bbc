'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::venue.venue', ({ strapi }) => ({
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.service('api::venue.venue').findOne(id, {
        populate: ['images', 'bookings']
      });
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    } catch (error) {
      ctx.throw(400, error);
    }
  },

  async find(ctx) {
    try {
      const { results, pagination } = await strapi.service('api::venue.venue').find({
        ...ctx.query,
        populate: ['images']
      });
      
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      return this.transformResponse(sanitizedResults, { pagination });
    } catch (error) {
      ctx.throw(400, error);
    }
  }
}));