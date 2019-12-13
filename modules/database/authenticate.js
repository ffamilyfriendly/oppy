const mongoose = require("mongoose")
const password = require('../../config').tokens.database
exports.run = () => {
    console.time("database startup")
    mongoose
    .connect(
      `mongodb+srv://FamilyFriendly:${password}@cluster-mefqr.mongodb.net/test?retryWrites=true`,
      // newUrlParser is important if you want it not to scream at you.
       {useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => {
      console.log("Connected to database!")
      console.timeEnd("database startup")
    })
    .catch((error) => {
      console.error(`could not connect to atlasDB database: ${err.stack}`)
    });
 }

exports.meta = {
    name: 'authenticate',
    autorun: 1
}
