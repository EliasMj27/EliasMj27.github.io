let sudukoBoard = [];
let sudukoNumberDivs = [];
let numbersOnBoardList =[];
let visibleboard=[];
let listOfButtons = [];
let currentNumber = 0
let difficulty = "medium"
let listOfDoChange = [];
let boardChecked = false;
const difficulties = {
    "easy":51,
    "medium":34,
    "hard":17
}


function setDifficulty(diff)
{
    difficulty = diff;
    clearBoard();
}

function GenerateBoard()
{
    for(let i=0; i<9;i++)
    {
        sudukoBoard.push([]);
        for(let j=0; j<9; j++)
        {
            sudukoBoard[i].push([]);
            sudukoBoard[i][j]=null;
            
        }
    }
}
function clearBoard()
{
    sudukoBoard=[];
    listOfDoChange=[];
    visibleboard=[];
    currentNumber = 0;
    boardChecked = false;
    for(let i =0 ; i<81; i++)
    {
        numbersOnBoardList[i].innerHTML="0";
        if(sudukoNumberDivs[i].classList.contains("wrong"))
        {
            sudukoNumberDivs[i].classList.remove("wrong")
        }
        else{
            sudukoNumberDivs[i].classList.remove("correct")
        }
    }
    
    GenerateBoard();
    backTrackAlgo();
    CreateVisebleboard();
    removeNumbers();
    SetEtireBoard();
    updateBoard();
    BoldFont();
    document.getElementById("resetB").innerHTML = "Check";

}
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function GetFromLineToCords(pos)
{
    let row = Math.floor(pos / 9) ;
    let col = pos % 9 ;
    return [row , col];
}

function isValid(x,y,val)
{
    for(let i =0; i<9;i++)
    {
        if(sudukoBoard[x][i]===val || sudukoBoard[i][y] === val)
        {
            return false;
        }
    }
    let boxStartRow = Math.floor(x / 3) * 3;
    let boxStartCol = Math.floor(y / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (sudukoBoard[boxStartRow + i][boxStartCol + j] === val) {
                return false;
            }
        }
    }
    return true
}

function backTrackAlgo(pos = 0)
{
    let [x, y] = GetFromLineToCords(pos)
    ListOfValues = [1, 2, 3, 4, 5, 6, 7, 8 ,9].sort((a, b) => 0.5 - Math.random());
    for(val of ListOfValues)
    {
        if(isValid(x,y,val))
            {
                
                sudukoBoard[x][y]=val;
                if(pos===80) return true;
                if(backTrackAlgo(pos+1)) return true;
                sudukoBoard[x][y]=null;
            }
    }
    return false;
}

function CreateDivs()
{
    for(let i = 0; i<81 ; i++)
    {
        let div = document.createElement("div")
        div.className = "numberBox";
        
        div.onclick = () => changeValue(i)
        document.getElementById("SudukoBox").appendChild(div)
        sudukoNumberDivs.push(div)
    }
}
function changeValue(location)
{
    if(listOfDoChange.includes(location))
    {
        let [x, y] = GetFromLineToCords(location);
        SetNumber(location, currentNumber);
        visibleboard[x][y] = currentNumber;

    }
    updateBoard();
}


function SetNumber(pos, val)
{
    numbersOnBoardList[pos].innerHTML = val;
}
function CreateNumbers()
{
  for(let i=0; i<81; i++)
    {
        const paragraf= document.createElement('p');
        sudukoNumberDivs[i].appendChild(paragraf);
        paragraf.className = "numberPar";
        paragraf.onclick = () =>changeValue(i)
        numbersOnBoardList.push(paragraf);
    }
    SetEtireBoard();
}
function SetEtireBoard()
{
    for(let i=0; i<81; i++)
    {
        let [x,y] = GetFromLineToCords(i);
        SetNumber(i, visibleboard[x][y] );
    }
}

function CreateVisebleboard()
{
    for(let i = 0 ; i< sudukoBoard.length ;i++)
    {
        visibleboard.push([])
        for(let j = 0 ; j< sudukoBoard.length; j++)
        {
            visibleboard[i][j]=sudukoBoard[i][j];
        }
    }
}

function removeNumbers()
{
    let positions=[]
    for(let i = 0; i<81; i++)
    {
        positions.push(i)
    }
    shuffle(positions);
    for(let i = 80; i>difficulties[difficulty]; i--)
    {
        let [x,y] = GetFromLineToCords(positions[i]);
        listOfDoChange.push(positions[i])

        visibleboard[x][y]=0
    }
}

function updateBoard()
{
    for(let i = 0; i<9*9; i++)
    {
        let [x,y] = GetFromLineToCords(i);
        if(visibleboard[x][y]=="0")
        {
            numbersOnBoardList[i].classList.add("hide");

        }else if (visibleboard[x][y]==currentNumber)
        {
            sudukoNumberDivs[i].classList.add("curentNum")
        }else
        {
            if(sudukoNumberDivs[i].classList.contains("curentNum"))
            {
                sudukoNumberDivs[i].classList.remove("curentNum")
            }
        }
        if(visibleboard[x][y]!=0)
        {
            if(numbersOnBoardList[i].classList.contains("hide"))
            {
                numbersOnBoardList[i].classList.remove("hide")
            }
        }
        
    }
}
function updateButtons()
{
    for(let i = 0; i<9; i++)
    {
        if(i+1==currentNumber)
        {
            listOfButtons[i].classList.add("curentNum")
        }else
        {
            if(listOfButtons[i].classList.contains("curentNum"))
            {
                listOfButtons[i].classList.remove("curentNum")
            }
        }
    }
}


function createButtons()
{
    for(let i =1 ; i<=9;i++)
    {
        listOfButtons.push(document.createElement("button"));
        listOfButtons[i-1].classList.add("button");
        document.getElementById("buttons").appendChild(listOfButtons[i-1])
        listOfButtons[i-1].innerHTML=i;
        listOfButtons[i-1].onclick =()=> setCurentNumber(i);
    }
}
function setCurentNumber(number)
{
    if(currentNumber != number)
    {
        currentNumber = number;
    }else{
        currentNumber = 0;
    }
    updateBoard();
    updateButtons();

}
function print()
{
    return visibleboard;
}

function BoldFont()
{
    for(let i = 0; i<81; i++)
    {
        
        
        if(!listOfDoChange.includes(i))
        {
            numbersOnBoardList[i].style.color="grey";
            
        }else{
            if(numbersOnBoardList[i].style.color==="grey")
            {
                numbersOnBoardList[i].style.color="black";
            }
        }
    }
}
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkIfCorect()
{
    for(let i =0 ; i<81; i++)
    {
        let [x,y] = GetFromLineToCords(i);
        if (visibleboard[x][y]==sudukoBoard[x][y])
        {
            await sleep(100)
            sudukoNumberDivs[i].classList.add("correct");
        }
        else
        {
            await sleep(200)
            sudukoNumberDivs[i].classList.add("wrong")
        }
    }
    document.getElementById("resetB").innerHTML = "Reset";
    boardChecked=true;
}


document.body.addEventListener("keypress",function(e)
{
    int = parseInt(e.key);
    if(!isNaN(int))
    {
        currentNumber = (currentNumber===int)? 0: int;
    }
    updateBoard();
    updateButtons();
    
})


async function buttonClicked()
{
    if(boardChecked)
    {
        clearBoard();
    }else{
        await checkIfCorect();
    }
}


GenerateBoard();
backTrackAlgo();
CreateVisebleboard();
removeNumbers();
CreateDivs();
CreateNumbers();
updateBoard();
createButtons();
BoldFont();





//THICK_Borders();