'use strict';

const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../models');

// Configure Umzug to use Sequelize for migrations
const umzug = new Umzug({
  migrations: {
    // Use glob pattern directly to specify migrations
    glob: path.join(__dirname, '../migrations', '*.js'),
    params: [sequelize.getQueryInterface(), sequelize.constructor],
  },
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

/**
 * Run migrations automatically on application start
 */
const runMigrations = async () => {
  try {
    // Check pending migrations
    const pending = await umzug.pending();
    
    if (pending.length > 0) {
      console.log(`Running ${pending.length} pending migrations...`);
      // Run all pending migrations
      const migrations = await umzug.up();
      console.log('Migrations completed successfully:', migrations.map(m => m.name).join(', '));
    } else {
      console.log('Database is up to date, no migrations needed.');
    }
    
    return true;
  } catch (err) {
    console.error('Migration error:', err);
    throw err;
  }
};

module.exports = { umzug, runMigrations };