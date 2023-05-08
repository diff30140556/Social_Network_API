const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    user_name: {  
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

reactionSchema
  .virtual('create_time')
  .get(function (){
    const time = this.createdAt;
    return time.toISOString().substring(0, 10);
  })


module.exports = reactionSchema;
