'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
  async create(ctx) {
    try {
      // Create the payment
      const response = await super.create(ctx);
      
      // If payment is successful, update booking status
      if (response.data.attributes.status === 'completed') {
        const bookingId = response.data.attributes.booking.data.id;
        await strapi.entityService.update('api::booking.booking', bookingId, {
          data: { status: 'confirmed' }
        });
      }

      return response;
    } catch (error) {
      ctx.throw(400, error);
    }
  }
}));