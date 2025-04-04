let data;


function hamburgerMenuClick()
{
    if(document.getElementById("LeftNav").style.visibility!= "visible")
    {
        document.getElementById("LeftNav").style.visibility="visible";
    }
    else{
        document.getElementById("LeftNav").style.visibility="collapse";
    }
}

async function GetJson() {
    const request = new Request("https://eliasmj27.github.io/JSON/Pages.json");

    const responce = await fetch(request);
    const svar = await responce.json();
    data = svar;
}


async function CreateLinks()
{
    let ListOfPages=[];
    let ListOfLinks=[];
    for(let i=0; i < data.pages.length;i++)
    {
        ListOfPages.push( document.createElement("div"));
        document.getElementById("Links").appendChild(ListOfPages[ListOfPages.length-1]);
        ListOfPages[ListOfPages.length-1].classList.add("BannerButton");
        ListOfLinks.push(document.createElement("a"));
        ListOfPages[ListOfPages.length-1].appendChild(ListOfLinks[ListOfLinks.length-1]);
        ListOfLinks[ListOfLinks.length-1].href=`${data.pages[i]["url"]}` ;
        ListOfLinks[ListOfLinks.length-1].innerHTML=`${data.pages[i]["name"]}`;
    }
}
async function startup()
{
    await GetJson()
    await CreateLinks()
}
startup()