const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    },
    avatar: {type: String},
    friends:[{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    chats: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Chat' 
    }],
    biography: {type: String, default: ""},
    location: {type: String, default: ""},

  }, {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  });

module.exports = mongoose.model('User', userSchema);