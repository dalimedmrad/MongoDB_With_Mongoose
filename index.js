const mongoose = require("mongoose");
const Person = require("./models/Person");

var db = "mongodb://localhost:27017/checkpoint";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const conSuccess = mongoose.connection;
conSuccess.once("open", (_) => {
  console.log("Database connected:", db);
});

//create a person document with dataprovided
Person.create({
  name: "user name",
  age: 25,
  favoriteFoods: ["pasta", "pizza", "ijja"],
}).then((person) =>
  person.save((err, data) => {
    // console.log(data);
  })
);

let arrayOfPeople = [
  { name: "med", age: 25, favoriteFoods: ["pasta", "pizza", "kefte"] },
  { name: "dhia", age: 26, favoriteFoods: ["tajne", "pizza"] },
  {
    name: "ahmed",
    age: 27,
    favoriteFoods: ["pasta", "pizza", "3ejja", "mekla"],
  },
  { name: "fathi", age: 28, favoriteFoods: ["coscos", "ijja"] },
  { name: "mohsen", age: 29, favoriteFoods: ["pasta", "pizza", "roz"] },
  { name: "zied", age: 15, favoriteFoods: ["makrouna", "megli", "ijja"] },
];

//   //create and save many people documents
try {
  Person.create(arrayOfPeople).then((persons) =>
    persons.map((person) => {
      person.save((err, data) => {
        // console.log(data)
      });
    })
  );
} catch (err) {
  console.log(err);
}

// //   //finding people with name "user"
  Person.findOne({name:'med'}).then((persons)=>{
      console.log(persons);
  }).catch((error)=>{
    console.log(error);
  })

//find person that like pizza
Person.findOne({ favoriteFoods: "pizza" })
  .then((person) => {
    console.log(person);
  })
  .catch((error) => {
    console.error(error);
  });

//   //find a person with an Id = personId
  let personId="6129e74b4dd4c72150b9d268"
  Person.findById(personId).then((person)=>{
      console.log(person);
  })

  //adding loubiya as a favoritefood to the person with personId
  Person.findById(personId).then((person)=>{
      person.favoriteFoods.push("loubiya")
      person.save()
      console.log(person);
  })

// //   //edit the age of person with name personName to 30
  let personName="user name"
  Person.findOneAndUpdate({name:personName},{age:30},{ new: true })

// //   //delete the person with specified Id
  Person.findByIdAndRemove(personId)

//   //delete all person with name  'Marry'
  Person.findOne({name:"Marry"}).then((persons)=>{
    persons.Foreach((person)=>{
        person.remove()
    })
  })
