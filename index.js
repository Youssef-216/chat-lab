
//DB initial code
let Datastore = require('nedb');
let db = new Datastore({ filename: 'chats.db', timestampData: true });
db.loadDatabase(); 

let express = require("express");
let app = express();
app.use(express.json());

let msgs = [];

app.use('/', express.static('public'))



app.post('/message' , (req,res) => {
    // msgs.push(req.body);
    db.insert(req.body, (err, newDoc) => {
    if(err) {
    res.send({"task" :"failed"})
    }
    else {
    res.send({"latestMsg" : req.body});
    }
})
    console.log(msgs);
})


app.get('/messages', (req,res) =>{
    db.find({}, (err, docs) => {
        if(err) {
            res.send({"task" :"failed"})
        }else {
            console.log(docs);
            res.send({"msgs" : docs});
        }
    });
})


app.get('/messages', (req,res) => {
  res.json({
    "msgs" : msgs
  })
})



// app.listen(3000, () => {
//   console.log("app is runnning");
// }) process.env.PORT ||

let port =  3000;
app.listen(port, ()=> {
console.log('listening at ', port);
});








//spin up a server on port 3000
// app.listen(PORT, ()=>{
//     console.log("Server is running on port"+ PORT);
// });

// let planets = {
//     "Earth": {
//     "moons" : "1 moon",
//     },
//     "Mars" :{ 
//     "moons" : "2 moons",
//     "date" : "68.317 million miles"
//     },
//     "Jupiter": {
//     "moons" : "80 moons",
//     "distance" : "370.58 million miles"
//     },
//     "Mercury": {
//     "moons" : "0 moons",
//     "distance" : "94.814 million miles"
//     },
//     "Venus": {  
//     "moons" : "0 moons",
//     "distance" : "159.43 million miles"
//     },
//     "Saturn": {
//     "moons" : "62 moons",  
//     "distance" : "863.25 million miles"
//     },
//     "Uranus": {
//     "moons" : "27 moons",
//     "distance" : "1.7485 billion miles"
//     },
//     "Neptune": {
//     "moons" : "14 moons",
//     "distance" : "2.695 billion miles"
//     },
// }

// app.use("/", express.static("public"));

// // if we go to the route /midterms, we should see a json of all the midterms
// app.get("/planets", (req,res) => {
//     console.log(req.query.planet);
//     let planetName = req.query.planet;
//     if(planets[planetName]) {
//     res.json(planets [planetName])
//     }else{
//     res.json({"planet" : "this planet does not exist"});
//     }
//     })

//     // app.get("/planet/:planet", (req,res) => {
//     //     let planetName = req.params.planet;
//     //     console.log(planetName);
//     //     res.json(midterms[planetName]);
//     //     })

//     // app.get('/random', (request, response) => {
//     //     let randomNum = Math.floor(Math.random() * data.planets.length);
//     //     let randomPlanet = data.planets[randomNum];
//     //     console.log(randomPlanet);
//     //     response.json(randomPlanet);
//     // })