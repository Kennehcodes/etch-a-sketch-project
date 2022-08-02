
const colors = {};
let gridSize = 29;
const DIV = {};
DIV.events = [];
DIV.container = document.querySelector("#drawing-canvas");
BLOCKS = {};

//nameing format is row # block # = r1b1
 let myLabel = "";
let rowLabel = "";

function makeGrid() {

for (let row = 1; row <= gridSize; row++) {

    rowLabel = makeRowLabel(row);
    DIV[rowLabel] = document.createElement("div");
    DIV[rowLabel].classList.add(rowLabel, "row"); 

    for (let block = 1; block <= gridSize; block++) {

        myLabel = makeBlockLabel(row, block);
        BLOCKS[myLabel] = document.createElement("div");
        BLOCKS[myLabel].classList.add(myLabel, "block"); 
        //BLOCKS[myLabel].textContent = myLabel;
        DIV[rowLabel].appendChild(BLOCKS[myLabel]);
        let eventLabel = "eventFor" + myLabel;
        DIV.events.push(eventLabel);

    }

    DIV.container.appendChild(DIV[rowLabel]);

}
}
makeGrid();



let bgColorBox1 = document.querySelector("#colorPicker")
let bgColorChange = bgColorBox1.addEventListener("change", (e) => {

    e.preventDefault();
    let colorChange = (e.target.value);
    console.log(colorChange)
    DIV.container.style.borderColor = colorChange;
    for (let i in BLOCKS){
        BLOCKS[i].style.borderColor = colorChange;
    } 
})


let range1value = document.querySelector("#range1");
let range2value = document.querySelector("#range2");

let rangeset = range1value.addEventListener("change", () => {
function getBlockBorder() {
let range = range1value.value;
if (parseInt(range) > 6) {
    range = "6";
}
range = range + "px"

for (let i in BLOCKS){
    BLOCKS[i].style.borderWidth = range;
} 
}

getBlockBorder();
});


let canvasSize = range2value.addEventListener("change", ()=> {
    let cSize = range2value.value;
    if (parseInt(cSize) > 50) {
        cSize = "50";
    }
    gridSize = cSize;
    let response ="";
    if (confirm("If you change the size, your work will be lost.\nAre you sure?") === true) {
        DIV.container.innerHTML = "";
        makeGrid();
    } else {
      return null;   
    }
    
    
}
)


let cArray = ["red", "blue", "green", "black", "white", "yellow", "orange", "indigo", "pink"];
let kArray = ["R", "B", "G", "K", "W", "Y", "O", "I", "P"];
for (let c in cArray) {

    let search = ".bt" + kArray[c];
    let currColor = cArray[c];
    colors[currColor] = document.querySelector(search);
    colors[currColor].addEventListener("click", () => { startPaintingViaClick(currColor)})

}

let space = document.querySelector(".space");

space.addEventListener("click", () => {
    clear();
})

let keyCheck = document.addEventListener("keydown", (e) =>
{
    if (e.code === "KeyR") {
        startPainting("red");
    }
    else if (e.code === "KeyB") {
        startPainting("blue");
    }
    else if (e.code === "KeyG") {
        startPainting("green");
    } else if (e.code === "KeyK") {
        startPainting("black");
    } else if (e.code === "KeyY") {
        startPainting("yellow");
    } else if (e.code === "KeyO") {
        startPainting("orange");
    } else if (e.code === "KeyP") {
        startPainting("pink");
    } else if (e.code === "KeyW") {
        startPainting("white");
    } else if (e.code === "KeyI") {
        startPainting("indigo");
    }
    else if (e.code === "Space") {
        clear();
    }

}
)

function clear() {
    for (let item in BLOCKS) {
            BLOCKS[item].classList.remove("red", "green", "blue", 
            "black", "yellow", "orange", "white", "pink", "indigo");
        }
    
    }
    


function startPainting(classname) {
for (let item in BLOCKS) {
    
    function paint(){
        BLOCKS[item].className = "block";
        BLOCKS[item].classList.add(classname);
    }
    
   
    BLOCKS[item].addEventListener("mouseenter", paint) 
    
    // document.addEventListener("keydown", erase);

    document.addEventListener("click", () => {
        BLOCKS[item].removeEventListener("mouseenter", paint)

    })
    
}
}





function startPaintingViaClick(classname) {
    for (let item in BLOCKS) {
        
        function paint(){
            BLOCKS[item].className = "block";
            BLOCKS[item].classList.add(classname);
            
        }
        
       
        BLOCKS[item].addEventListener("mouseover", paint) 


    

        document.addEventListener("dblclick", () => {
            BLOCKS[item].removeEventListener("mouseover", paint)
    
        })
        
    }
    }
    
    
let closeX = document.querySelector("#popupClose");
let popup = document.querySelector("#popup");

closeX.addEventListener("click", () => {
popup.classList.add("pophide");
})


let help = document.querySelector("#help");

help.addEventListener('click', () => {

popup.classList.remove("pophide");
})

//creates a label for the grids, takes in two numbers and returns a string
function makeBlockLabel(number1, number2) {
    let thisLabel = "row" + String(number1) + "Block" + String(number2);
    return thisLabel;    
}

function makeRowLabel(number) {
    return "row" + String(number);
}
