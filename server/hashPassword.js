const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/votingdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const hashPassword = async () => {
  try {
    const hashed = await bcrypt.hash("123", 10);
    await mongoose.connection.collection('users').updateOne(
      { email: "user@gmail.com" },
      { $set: { password: hashed } }
    );
    console.log("✅ Password updated successfully!");
  } catch (err) {
    console.error("❌ Error updating password:", err);
  } finally {
    mongoose.disconnect();
  }
};

hashPassword();
