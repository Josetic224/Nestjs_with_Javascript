const { PrismaClient } = require('@prisma/client');
const { Injectable } = require('@nestjs/common');

@Injectable()
class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$connect()
      .then(() => console.log('Prisma connected to MongoDB successfully'))
      .catch((error) => console.error('Could not connect to database:', error));
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
module.exports = PrismaService;
