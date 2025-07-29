// MongoDB initialization script
db = db.getSiblingDB('hackathon');

// Create collections
db.createCollection('users');
db.createCollection('hackathons');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.hackathons.createIndex({ "title": 1 });
db.hackathons.createIndex({ "status": 1 });

// Insert sample data (optional)
db.users.insertOne({
  name: "Admin User",
  email: "admin@hackathon.com",
  age: 25,
  isActive: true,
  pwd: "admin123",
  createdAt: new Date(),
  updatedAt: new Date()
});

db.hackathons.insertOne({
  title: "Sample Hackathon",
  description: "This is a sample hackathon for testing",
  image: "/uploads/230b5bef3addc32e3101fe73858a49dd1.webp",
  status: "upcoming",
  participants: [],
  createdAt: new Date(),
  updatedAt: new Date()
});

print('Database initialized successfully!'); 