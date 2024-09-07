const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed data for Users
const seedUsers = [
  {
    username: 'johndoe',
    email: 'johndoe@example.com',
  },
  {
    username: 'janedoe',
    email: 'janedoe@example.com',
  },
  {
    username: 'mikesmith',
    email: 'mikesmith@example.com',
  },
  {
    username: 'sarahjones',
    email: 'sarahjones@example.com',
  }
];

// Seed data for Thoughts
const seedThoughts = [
  {
    thoughtText: "Social media is so interesting!",
    username: "johndoe",
  },
  {
    thoughtText: "Today was a great day!",
    username: "janedoe",
  },
  {
    thoughtText: "I love learning about NoSQL databases.",
    username: "mikesmith",
  },
  {
    thoughtText: "MongoDB is a powerful tool!",
    username: "sarahjones",
  }
];

// Seed data for Reactions (associated with Thoughts)
const seedReactions = [
  {
    reactionBody: "Totally agree!",
    username: "janedoe"
  },
  {
    reactionBody: "That's so true!",
    username: "sarahjones"
  },
  {
    reactionBody: "Couldn't have said it better myself.",
    username: "mikesmith"
  },
  {
    reactionBody: "Absolutely!",
    username: "johndoe"
  }
];

// Seed the database
async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert Users
    const users = await User.insertMany(seedUsers);

    // Insert Thoughts
    const thoughts = await Thought.insertMany(seedThoughts);

    // You can manually associate reactions with thoughts here if needed

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();