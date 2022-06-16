const express = require('express')
const app = express()
const port = 3000

let elevatorRaw = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let elevatorProcessed  = {floors: elevatorRaw.length, current_Floor: 3};

function display(height, location, width = 1, depth = 1){
    let asciiDisplay = "";
    for(let i = height; i > 0; i--){
        if(i == location){
            asciiDisplay = asciiDisplay + "<br> |&nbsp X &nbsp | ";
        }
        else{
            asciiDisplay = asciiDisplay + "<br> | &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp | ";
        }
    }
    return asciiDisplay
}

function elevatorButton(floor){
    elevatorProcessed.current_Floor = floor;
    let html = defineHTML();
    res.send(html);
}

function buttonGen(elevatorFloors){
    let buttonHTML = "";
    let counter = 0;
        for(let i of elevatorFloors){
            if(counter%3 == 0){
                buttonHTML = buttonHTML + "<br> <button onclick = elevatorButton(i)>" + i + "</button>";
            }
            else if(counter%3 == 1){
                buttonHTML = buttonHTML + "&nbsp&nbsp <button onclick = elevatorButton(i)>" + i + "</button>";
            }
            else{
                buttonHTML = buttonHTML + "&nbsp&nbsp <button onclick = elevatorButton(i)>" + i + "</button>";
            }
        counter++;
        }
    return buttonHTML
    }

function defineHTML(){
    myHTML = `
    <html>
    <head>
        <title>Elevator</title>
        <style>
    
        h1{
            font-size: 150px;
            font-family: "Helvetica", "Arial", sans;
        }
    
        </style>
    </head>
    <body>
        <div>
            <h1>Elevator Floor ${elevatorProcessed.current_Floor}</h1>
            <p>
            ${display(elevatorProcessed.floors, elevatorProcessed.current_Floor)}
            </p>
        </div>
        ${buttonGen(elevatorRaw)}
    </body>
    </html>
    `
    return myHTML;
}


app.get('/', (req,res) => {
        
    let html = defineHTML();    
    
    res.send(html);
    
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