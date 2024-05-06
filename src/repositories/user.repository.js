const UserModel = require("../models/session.model.js");

class userRepository{
    async findByEmail(email){
        return UserModel.findOne({email})
    }
}

module.exports = userRepository;
