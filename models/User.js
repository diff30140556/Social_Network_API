const { Schema, model, mongoose } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      max_length: 50,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4})?$/,
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// use pre-hook middleware for findOneAndDelete method to delete the related data in thought model
userSchema.pre('findOneAndDelete', async function (next) {
  // get the user that got called by delete method
  const user = await this.model.findOne(this.getQuery());
  // delete all thoughts documents that have an id in the user.thoughts array
  await mongoose.model('thought').deleteMany({ _id: { $in: user.thoughts } });
  next();
})

const User = model('user', userSchema);

module.exports = User;
