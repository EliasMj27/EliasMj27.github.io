let buttons = []
let validations = 0
let selectedNumber = null
let htmlElement = document.querySelectorAll(".litenBox")
let htmlDict = {}
let numbersInSudoku = [9,9,9,9,9,9,9,9,9]
let arrayOfButtons

for (let i = 1; i <= 81; i++) {
    let box = document.getElementById(`litenBox${i}`)
    let key = "litenBox" + i;
    htmlDict[key] = box
}

class button {
    constructor(value, element) {
        this.value = value
        this.element = element
        this.isActive = false
        buttons.push(this)
    }
}
let button1 = new button("1", document.getElementById("b1"))
let button2 = new button("2", document.getElementById("b2"))
let button3 = new button("3", document.getElementById("b3"))
let button4 = new button("4", document.getElementById("b4"))
let button5 = new button("5", document.getElementById("b5"))
let button6 = new button("6", document.getElementById("b6"))
let button7 = new button("7", document.getElementById("b7"))
let button8 = new button("8", document.getElementById("b8"))
let button9 = new button("9", document.getElementById("b9"))

let htmlRutenet = [
    [htmlDict["litenBox1"], htmlDict["litenBox2"], htmlDict["litenBox3"], htmlDict["litenBox10"], htmlDict["litenBox11"], htmlDict["litenBox12"], htmlDict["litenBox19"], htmlDict["litenBox20"], htmlDict["litenBox21"]],
    [htmlDict["litenBox4"], htmlDict["litenBox5"], htmlDict["litenBox6"], htmlDict["litenBox13"], htmlDict["litenBox14"], htmlDict["litenBox15"], htmlDict["litenBox22"], htmlDict["litenBox23"], htmlDict["litenBox24"]],
    [htmlDict["litenBox7"], htmlDict["litenBox8"], htmlDict["litenBox9"], htmlDict["litenBox16"], htmlDict["litenBox17"], htmlDict["litenBox18"], htmlDict["litenBox25"], htmlDict["litenBox26"], htmlDict["litenBox27"]],
    [htmlDict["litenBox28"], htmlDict["litenBox29"], htmlDict["litenBox30"], htmlDict["litenBox37"], htmlDict["litenBox38"], htmlDict["litenBox39"], htmlDict["litenBox46"], htmlDict["litenBox47"], htmlDict["litenBox48"]],
    [htmlDict["litenBox31"], htmlDict["litenBox32"], htmlDict["litenBox33"], htmlDict["litenBox40"], htmlDict["litenBox41"], htmlDict["litenBox42"], htmlDict["litenBox49"], htmlDict["litenBox50"], htmlDict["litenBox51"]],
    [htmlDict["litenBox34"], htmlDict["litenBox35"], htmlDict["litenBox36"], htmlDict["litenBox43"], htmlDict["litenBox44"], htmlDict["litenBox45"], htmlDict["litenBox52"], htmlDict["litenBox53"], htmlDict["litenBox54"]],
    [htmlDict["litenBox55"], htmlDict["litenBox56"], htmlDict["litenBox57"], htmlDict["litenBox64"], htmlDict["litenBox65"], htmlDict["litenBox66"], htmlDict["litenBox73"], htmlDict["litenBox74"], htmlDict["litenBox75"]],
    [htmlDict["litenBox58"], htmlDict["litenBox59"], htmlDict["litenBox60"], htmlDict["litenBox67"], htmlDict["litenBox68"], htmlDict["litenBox69"], htmlDict["litenBox76"], htmlDict["litenBox77"], htmlDict["litenBox78"]],
    [htmlDict["litenBox61"], htmlDict["litenBox62"], htmlDict["litenBox63"], htmlDict["litenBox70"], htmlDict["litenBox71"], htmlDict["litenBox72"], htmlDict["litenBox79"], htmlDict["litenBox80"], htmlDict["litenBox81"]]
]
let rutenet = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null]
]
let sudoku1 = [
    ["7", "1", "4", "3", "2", "8", "9", "6", "5"],
    ["8", "5", "2", "6", "1", "9", "4", "3", "7"],
    ["3", "9", "6", "5", "7", "4", "8", "2", "1"],
    ["5", "6", "1", "2", "8", "3", "7", "9", "4"],
    ["9", "3", "8", "7", "4", "5", "6", "1", "2"],
    ["2", "4", "7", "1", "9", "6", "3", "5", "8"],
    ["6", "7", "3", "4", "5", "2", "1", "8", "9"],
    ["1", "2", "9", "8", "3", "7", "5", "4", "6"],
    ["4", "8", "5", "9", "6", "1", "2", "7", "3"]
]

function isCorect() {
    let falseOrTrue = false
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (String(htmlRutenet[i][j].innerHTML) == sudoku1[i][j]) { } else {
                falseOrTrue = false
            }

        }
    }
    return falseOrTrue

}

function zeroToGray() {
    for (let i = 0; i < htmlRutenet.length; i++) {
        for(let j = 0; j < htmlRutenet[i].length;j++)
        {
            if (htmlRutenet[i][j].innerHTML === "0") {
                htmlRutenet[i][j].classList.add("GrayText")
            }
        }
    }
}
function clickDiv(element) {    
    console.log("click")
    element.classList.remove("wrong")
    if (element.classList.contains("changeable")) {
        let number = element.innerHTML
        if (element.innerHTML == "0") {
            element.classList.remove("GrayText")
        }
        if (selectedNumber != null) {
            if(element.innerHTML!=selectedNumber){
                numbersInSudoku[`${selectedNumber}`]-=1
                //document.getElementById(`${selectedNumber}`).innerHTML = `${selectedNumber} : `+numbersInSudoku[`${selectedNumber}`]
            }
            element.innerHTML = String(selectedNumber)
        } else {
            element.innerHTML = "0"
            element.classList.add("GrayText")
        }
        CheckForUsedNumbers()
    }

}

function CheckForUsedNumbers()
{
    let arr=[0,0,0,0,0,0,0,0,0]
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(Number(htmlRutenet[i][j].innerHTML)!=0)
            {
                arr[Number(htmlRutenet[i][j].innerHTML)-1]+=1
            }
        }
    }

    for(let i=0; i<arr.length;i++)
    {

        
        document.getElementById(`${i+1}`).innerHTML = `${i+1} : ${htmlRutenet.length - arr[i]}`
    }
    zeroToGray()

    SelectedNumber()
}
function SelectedNumber()
{

    for(let i=0;i<9;i++)
        {
            for(let j=0;j<9;j++)
            {
                if(Number(htmlRutenet[i][j].innerHTML)==selectedNumber)
                {
                    htmlRutenet[i][j].classList.add("selectedNumber")
                }
                else {
                    htmlRutenet[i][j].classList.remove("selectedNumber")
                }
            }
        } 
}

function clickButton(value) {

    let button = buttons.find(b => b.value == value);

    
    if (!button) {
      return;
    }
    
    selectedNumber = (selectedNumber === Number(value)) ? null : Number(value);
    
    buttons.forEach(btn => {
      if (btn.value == selectedNumber) {
        btn.element.classList.add("selectedNumber");
      } else {

        btn.element.classList.remove("selectedNumber");
      }
    });
    
    SelectedNumber()
}
function remover(x) {
    let z=[]
    for (let i=0;i<9;i++){
       z.push([]) 
       for(let j=0;j<9;j++){
           z[i][j]=x[i][j]
       }
    }
    let y;
    let i = 31;
    for (let a = 0; a < 9; a++) {
        if (a == 9) {
            y = i;
            while (y > 0) {
                z[8][Math.floor(Math.random() * 9)] = "0";
                y--;
            }
            break;
        } else {
            if (i >= 7) {
                y = Math.floor(Math.random() * 7) + 1;
                while (y > 0) {
                    z[a][Math.floor(Math.random() * 9)] = "0";
                    y--;
                }
            } else if (i == 0) {
                y = 0;
            } else {
                y = Math.floor(Math.random() * i) + 1;
                while (y > 0) {
                    z[a][Math.floor(Math.random() * 9)] = "0";
                    y--;
                }
            }
        }
        i = i - y;
    }
    return z;
}
function validate() {
    let isAllCorect=true
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (htmlRutenet[i][j].innerHTML === sudoku1[i][j]) { } else {
                isAllCorect=false
                if(htmlRutenet[i][j].innerHTML!="0"){
                    htmlRutenet[i][j].classList.add("wrong")
                }
            }

        }
    }
    if(isAllCorect==true){
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                htmlRutenet[i][j].classList.add("finished")
            }
        }
    }

}

let removedSudoku = remover(sudoku1)
let number = 1
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        let x = removedSudoku[i][j]
        htmlRutenet[i][j].innerHTML = x
        if (x == "0") {
            htmlRutenet[i][j].classList.add("changeable")
        } else {
            htmlRutenet[i][j].classList.add("unchangeable")
        }
    }
}

buttons.forEach(button => {
    button.element.addEventListener("click", function() {
      clickButton(button.value);
    });
  });
  


document.addEventListener("keydown", function(event)
{
    try{
        let number=Number(event.key)
        if(number==0){throw new Error("")}
        clickButton(number)
    }catch{
        clickButton(document.getElementsByClassName("selectedNumber")[0].innerHTML)
    }
})









CheckForUsedNumbers()
zeroToGray(htmlElement)
