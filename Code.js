//Varibles 🪺
let ImagesArray=[];
let arrayWithSprites=[];
const body = document.getElementById("body");
const screenDiv = document.getElementById("Screen");
const outp= document.getElementById("out");
const slid1 =document.getElementById("slider")
const scratchScreenHeightPixels=360;
const scratchScreenWidthPixels=480;
//Funtions
function CreateArayFromFoulder(foulder, FileType="png",size) {
    let arr=[];
    for(i=0;i<size;i++)
    {
        arr.push(`${foulder}\\${i}.${FileType}`);
    }
    console.log("Completed creating");
    return arr;
    
}
const moveScreen=(y,x)=>
{
    for(i=0; i<=level1.ArrayWithTiles;i++)
    {
        if(x)
        {
            level1.ArrayWithTiles[i].x+=y;
        }else
        {
            level1.ArrayWithTiles[i].x-=y;
        }
        level1.ArrayWithTiles[i].UpdatePosition();
    }
}

//Key 🔑
class Key
{
    constructor()
    {
        this.up= false;
        this.down= false;
        this.left= false;
        this.right= false;
        this.CUp= false;
        this.CDown= false;
        this.CLeft= false;
        this.CRight= false;
    }
}
//Screen 🖥️
class Screen 
{
    constructor()
    {
        this.vekst=480/360;
        this.isHeightWidthCorect;
        this.CheckWindowProportions();
        this.CreateScreen();
        this.borderLenW=window.innerWidth-window.innerWidth/100*25
        this.borderLenH=(window.innerWidth-window.innerWidth/100*25)/this.vekst
    }
    CheckWindowProportions()
    {
        if(window.innerWidth<=window.innerHeight*this.vekst)
        {
            this.isHeightWidthCorect=true;
        }
        else
        {
            this.isHeightWidthCorect=false;
        }
    }
    CreateScreen()
    {
        this.ReSizeScreen();
        screenDiv.style.position="absolute"
        screenDiv.style.border="solid";
        screenDiv.style.border="black";
        screenDiv.style.border="1px solid black";
        screenDiv.style.left="50%";
        screenDiv.style.transform="translate(-50%, 0)";
        screenDiv.top=`${this.borderLenH/10}`
    }
    ReSizeScreen()
    {
        if(this.isHeightWidthCorect)
        {
            screenDiv.style.width=`${window.innerWidth-window.innerWidth/100*25}px`;
            screenDiv.style.height=`${(window.innerWidth-window.innerWidth/100*25)/this.vekst}px`;
        }
        else
        {
            screenDiv.style.width=`${(window.innerHeight-window.innerHeight/100*25)*this.vekst}px`;
            screenDiv.style.height=`${window.innerHeight-window.innerHeight/100*25}px`;
        }
    }

}



//  Sprite 🤖
class Sprite
{
    constructor(Name, Image, WidthAndHeight, pos=[100,100], index = 0, size = 100) 
        {        
        this.name = Name;
        this.visibility = true;
        this.ImageIndex = index;
        this.size = size;
        this.heightAndWidth=WidthAndHeight;
        this.x = pos[0];    
        this.y = pos[1];
        this.imageArray = [];
        for(let i=0; i<Image.length; i++){
           this.imageArray.push(Image[i]); 
        };
        arrayWithSprites.push(this);
        
    }
    Hide(){
        this.visibility = false;
    }
    Show()
    {
        this.visibility = true;
    }
    ChangeX(movment = 10)
    {
        this.x+=movment;
        this.SetPosition();
    }
    SetPosition(x=this.image)
    {
        x.style.left=`${this.ConvertPixelToPrecentagesX(this.x)}%`;
        x.style.top=`${this.ConvertPixelToPrecentagesY(this.y)}%`;
    }
    ConvertPixelToPrecentagesX(pixel)
    {
        return 100/scratchScreenWidthPixels*pixel;
    }
    ConvertPixelToPrecentagesY(pixel)
    {
        return 100/scratchScreenHeightPixels*pixel;
    }
    ChangeY(Movment)
    {
        this.y+=Movment;
        this.SetPosition();
    }
    CreateChild()
    {
        this.image = document.createElement("img");
        this.SetImageToChild();
        this.image.style.position="absolute";

        screenDiv.appendChild(this.image);
        this.SetSize();
        this.SetPosition(); 
        this.createDiv();

    }
    createDiv()
    {
        this.div= document.createElement("div");
        this.div.style.position="absolute";
        this.SetPosition(this.div);
        this.SetSize(this.div);
        screenDiv.appendChild(this.div);
    }
    SetSize(x=this.image)
    {
        x.style.width=`${this.ConvertPixelToPrecentagesX(this.heightAndWidth[1]*(this.size/100))}%`;
        x.style.height=`${this.ConvertPixelToPrecentagesY(this.heightAndWidth[0]*(this.size/100))}%`;
    }
    SetImageToChild()
    {
        this.image.src=this.imageArray[this.ImageIndex];
    }
    ChangeIndexPlus(x)
    {
        this.index+=x;
        if(this.index>=this.imageArray.length)
        {
            this.index=0;
        }
        
    }
}
//Background class 
class background
{
    constructor()
    {
        
    }
}
class Level
{
    constructor(tileLevel)
    {
        this.tileLevel=tileLevel
    }
    TileCountY=13;
    TileCountX=16;
    CreateTile(tile)
    {  
        let string=""
        console.log(tile) 
        this.tiles=tile;
        this.height
        this.width
        let index=0;
        let tileX=-16;
        this.ArrayWithTiles=[];
        let x=0;
        for(let i=0; i<this.TileCountX;i++)
        {
            let tileY=-32;
            for(let j=0;j<this.TileCountY;j++)
            {
                string+=`${index}`;
                x++;
                this.ArrayWithTiles.push(new Tile(x, this.tiles, [16,16], [tileX,tileY], this.tileLevel[index], 200));
                this.ArrayWithTiles[this.ArrayWithTiles.length-1].CreateChild();
                this.ArrayWithTiles[this.ArrayWithTiles.length-1].index=index;
                this.ArrayWithTiles[this.ArrayWithTiles.length-1].innerHTML=`${index}`;
                console.log(index)
                index++;
                tileY+=32;   
            }   
            tileX+=32;
            string+="\n"
            
            
        }
        alert(x)
    }
    PositionTiles()
    {
        for(i in this.ArrayWithTiles)
        {

        }
    }
    GetTileAt(x,y)
    {
        var tileGridX=Math.floor((x+32)/32);
        var tileGridY=Math.floor((y+22)/32);
        var tileIndex=1+tileGridY+(tileGridX*this.TileCountY)
        console.log(this.tileLevel[tileIndex]);
        return this.tileLevel[tileIndex];
    }
}
class Tile extends Sprite
{
    
    UpdatePosition()
    {
        if(false)
        {

        }
    }
    GetCords()
    {
        return [this.TileX, this.TileY];
    }
}  
//Player 🎮
class Player extends Sprite
{
    CreateVars()
    {
        this.tuchSolidBlock=false
    }
    MovePlayerX(xMovment)
    {
        let SpeedX=xMovment;
        this.x+=SpeedX;
        if(level1.GetTileAt(this.x,this.y)!=42)
        {
            this.x-=SpeedX;
        }
        player.SetPosition()
    }
    MovePlayerY(yMovment)
    {
        let SpeedY=yMovment;
        this.y+=SpeedY;
        if(level1.GetTileAt(this.x,this.y)!=42)
        {
            this.tuchSolidBlock=true;
            this.y-=SpeedY;
        }
        player.SetPosition()
    }
    
}


// Create objects 🗃️
let key = new Key();
const screen = new Screen();
const frogRun = [
    "Images\\NinjaFrog\\row-1-column-1.png", 
    "Images\\NinjaFrog\\row-1-column-2.png",
    "Images\\NinjaFrog\\row-1-column-3.png", 
    "Images\\NinjaFrog\\row-1-column-4.png",  
    "Images\\NinjaFrog\\row-1-column-5.png",
    "Images\\NinjaFrog\\row-1-column-6.png",
    "Images\\NinjaFrog\\row-1-column-7.png",
    "Images\\NinjaFrog\\row-1-column-8.png",
    "Images\\NinjaFrog\\row-1-column-9.png",
    "Images\\NinjaFrog\\row-1-column-10.png",
    "Images\\NinjaFrog\\row-1-column-11.png",
    "Images\\NinjaFrog\\row-1-column-12.png"]

const tiles = CreateArayFromFoulder("Images\\Tiles","png",145);
let level1 = new Level([1,1,1,1,1,1,1,1,1,1,1,1,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,42,1,1,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,1,1,1,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,42,33,36,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,33,36,42,1,1,42,42,42,42,42,42,19,42,42,42,42,1,1,42,42,42,42,42,42,22,42,42,42,42,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,42,42,42,42,42,42,42,42,42,42,42,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
level1.CreateTile(tiles)

let player = new Player("Player", frogRun, [32,32], [100,100]);
player.CreateChild();


let int=0;


//eventlistner📆
body.addEventListener("keydown", function(e) {
    if (e.key === 'd') 
    {
        key.right=true;
    }
    if (e.key==='a')
    {
        key.left=true;
    }
    if (e.key==='k')
    {
        key.up=true;  
    } if(e.key==='37')
    {
        key.CLeft=true
    }if(e.key==='39')
    {
        key.CRight=true;
    }if(e.key==='38')
    {
        key.CUp=true;
    }if(e.key==='40')
    {
        key.CDown=true;
    }
});
body.addEventListener("keyup",function(e)
{
    if(e.key==='d')
    {
        key.right=false;
    }
    if(e.key==='a')
    {
        key.left=false;
    }
    if(e.key==='k')
    {
        key.up=false;
    }if(e.key==='37')
    {
        key.CLeft=false;
    }if(e.key==='39')
    {
        key.CRight=false;
    }if(e.key==='38')
    {
        key.CUp=false;
    }if(e.key==='40')
    {
        key.CDown=false;
    }
});


//loop ♻️
let faling=true
let variableJump=0;
const walkingLoop= ()=>
{
    if(key.right){    
        player.MovePlayerX(7*1)
    }
    if(key.left){    
        player.MovePlayerX(7*-1)    
    }
    if(key.left^key.right)
    {
        player.ChangeIndexPlus();
        player.SetImageToChild(frogRun);
    }
    

}
const fallLoop= () =>
{
    if(key.up && player.tuchSolidBlock)
    {
        faling=false;
    }
    if(faling){
        player.MovePlayerY(10);
    }else{
        if(player.tuchSolidBlock || ( variableJump!=0))
        { 
            setTimeout(()=>{
                variableJump++
                player.tuchSolidBlock=false;
                player.MovePlayerY(-10);  
            },100)
            if(variableJump>6){
                variableJump=0;
                faling=true
            }
        }
    }  
    if(tuchSolidBlock)
    {
        faling=false
    }
}
const moveMap=()=>
{
    if(key.CLeft)
    {
        moveScreen(10,true);
    }
}
setInterval(moveMap,15);
setInterval(walkingLoop,15);
setInterval(fallLoop,15);
