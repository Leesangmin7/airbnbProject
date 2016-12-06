var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({




  //email : {type: String, required: true, index: true, unique: true, trim: true},// trim 띄워쓰기 없애는 것

  password : {type: String},
  content : {type: String},
  title : {type: String},
  createdAt : {type: Date, default: Date.now},
  read : {type: Number ,default : 0}


}, {
  toJSON : { virtuals: true},
  toObject : {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
