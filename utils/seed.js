const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Add students to the collection and await the results
  await User.collection.insertMany(userData);

  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
