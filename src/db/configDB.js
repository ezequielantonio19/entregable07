import mongoose from "mongoose";


const URI = 
    "mongodb+srv://ezequielantonio1987:<198717>@cluster0.czbixww.mongodb.net/DBENTREGABLE7?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la DB"))
  .catch((error) => console.log(error));