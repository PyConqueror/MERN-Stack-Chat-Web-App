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
    avatar: {
      type: String, 
      default:"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"},
    friends:[{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    chats: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Chat' 
    }]

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

userSchema.methods.createUserIcon = function(userId){
    function generateHSLNumber(min, max){
      let difference = max - min;
      let rand = Math.random();
      rand = Math.floor(rand * difference)
      rand = rand + min
      return rand
    }

    let hValue = generateHSLNumber(0, 360)
    let sValue = generateHSLNumber(50, 75)
    let lValue = generateHSLNumber(25, 60)

    function HSLtoString(h, s, l){
        return `hsl(${h}, ${s}%, ${l}%)`
    }

    let backgroundColour = HSLtoString(hValue, sValue, lValue)

    return this.findOneAndUpdate(
      {_id: userId},
      { $set: {avatar: backgroundColour }},
      { new:true }
    )
}



module.exports = mongoose.model('User', userSchema);