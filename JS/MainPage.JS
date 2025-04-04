function hamburgerMenuClick()
{
    if(document.getElementById("LeftNav").style.visibility!= "visible")
    {
        document.getElementById("LeftNav").style.visibility="visible";
    }
    else{
        document.getElementById("LeftNav").style.visibility="collapse";
    }
    document.getElementById("bar1").classList.toggle("change")
    document.getElementById("bar2").classList.toggle("change")
    document.getElementById("bar3").classList.toggle("change")
}