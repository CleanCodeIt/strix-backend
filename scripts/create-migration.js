'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Create a new migration file
 * Usage: node scripts/create-migration.js create-users-table
 */

// Check if name is provided
const args = process.argv.slice(2);
if (!args[0]) {
  console.error('Please provide a migration name');
  console.error('Example: node scripts/create-migration.js create-users-table');
  process.exit(1);
}

// Get migration name from command line arguments
const migrationName = args[0].toLowerCase().replace(/\s+/g, '-');

// Get timestamp for migration file name
const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);

// Create migration directory if it doesn't exist
const migrationsDir = path.join(__dirname, '../migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

// Migration file name with timestamp
const fileName = `${timestamp}-${migrationName}.js`;
const filePath = path.join(migrationsDir, fileName);

// Migration file template
const template = `'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add your migration code here
     * Example:
     * await queryInterface.createTable('users', {
     *   id: {
     *     type: Sequelize.INTEGER,
     *     primaryKey: true,
     *     autoIncrement: true,
     *     allowNull: false
     *   },
     *   username: {
     *     type: Sequelize.STRING,
     *     allowNull: false,
     *     unique: true
     *   },
     *   createdAt: {
     *     type: Sequelize.DATE,
     *     allowNull: false
     *   },
     *   updatedAt: {
     *     type: Sequelize.DATE,
     *     allowNull: false
     *   }
     * });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting migration code here
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
`;

// Write migration file
fs.writeFileSync(filePath, template);

console.log(`Migration file created: ${fileName}`);