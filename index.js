const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 3000

let elevator = {
    floors: ["P3", "P2", "P1", "G", "1", "2", "SPH", "PH"],
    currentLocationIndex: 3
}

function display({height, location, floors}){
    let asciiDisplay = "";
    for(let i = height-1; i >= 0; i--){
        if(i == location){
            asciiDisplay = asciiDisplay + "<br> |&nbsp X &nbsp | " + floors[i];
        }
        else{
            asciiDisplay = asciiDisplay + "<br> | &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp | " + floors[i];
        }
    }
    return asciiDisplay
}

function elevatorButton({floor}){
    elevator.currentLocationIndex = floor;
    let html = defineHTML();
    res.send(html);
}

function buttonGen({floors}){
    let buttonHTML = [];
        for(let i = 0; i < floors.length; i++){
            let floor = floors[i];
            buttonHTML.push(`<button><a href="/floor/${i}">${floor}</a></button>`);
            if(i%3 == 2){
                buttonHTML.push('<br/>')
            }
        }
    return buttonHTML.join("\n");
    }

function defineHTML(){
    myHTML = `
    <html>
    <head>
        <title>Elevator</title>
        <style>
    
        h1{
            font-size: 75px;
            font-family: "Helvetica", "Arial", sans;
        }
    
        </style>
    </head>
    <body>
        <div>
            <h1>Elevator Floor ${elevator.floors[elevator.currentLocationIndex]}</h1>
            <p>
            ${display({height:elevator.floors.length, location:elevator.currentLocationIndex, floors:elevator.floors})} 
            </p>
        </div>
        ${buttonGen({floors:elevator.floors})}
    </body>
    </html>
    `
    return myHTML;
}


app.get('/', (req,res) => {
        
    let html = defineHTML();    
    
    res.send(html);
    
})

app.get('/floor/:floor', (req, res) => {
    let floor = parseInt(req.params.floor);
    if(isNaN(floor) || floor < 0 || floor > elevator.floors.length){
        console.error(`${req.params.floor} is not a valid floor`)
        return res.redirect('/');
    }
    
    if(floor < 0 || floor > elevator.floors.length){
        return res.redirect('/');
    }
    elevator.currentLocationIndex = floor;

    res.redirect('/');
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