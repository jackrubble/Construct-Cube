const express = require('express')
const app = express()
const port = 3000

let database = [];

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/borp', (req, res) => {
    res.send("Blip Blop");
})

app.get('/hello/:name', (req,res) => {
    let name = req.params.name;

    database.push(name);

    let constructedString = "";
    for(let savedName of database){
        constructedString = constructedString + ` and also, hello ${savedName}`;
    }

    res.send(constructedString)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})