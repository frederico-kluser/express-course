const mongoose = require("mongoose");
const { app, PORT } = require('.');

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
console.log(DB); // remove this in production
mongoose.connect(DB, { 
  useNewUrlParser: true,
}).then(({ connections }) => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
});