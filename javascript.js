 
  const getReastCountries = (callback) =>{

    var request = new XMLHttpRequest();
    
    request.addEventListener('readystatechange',()=>{
    
    if(request.readyState===4 && request.status== 200)
    {
    var data= JSON.parse(request.responseText)
    callback(undefined, data)
    }
    else if(request.readyState===4)
    {
    callback('could not fetch data',undefined)
    }
    
    })
    request.open('GET','https://restcountries.com/v3.1/all');
    request.send();
    
    }
    
    getReastCountries ((err,data)=>{
    console.log('callback function');
    if(err){
    console.log(err);
    }
    else{
    var maindata = data
    
    
    function createsection1(l,data)
    {
      
    var elements=document.querySelector(".elements");
    var elements_container =document.querySelector(".elements_container");
    elements_container.innerHTML ="";
    
    
    for(i=0; i<l;i++)
    {
    elements_container.appendChild(elements.cloneNode(true));
    
    
    }
    console.log("exit")
    var namesCountry= document.querySelectorAll(".elements span:nth-child(1)");
    var Population=document.querySelectorAll(".elements span:nth-child(2)");
    var Region=document.querySelectorAll(".elements span:nth-child(3)")
    for(i=0; i<l;i++)
    {
    console.log(i)
    console.log(data[i].name.common)
    
    namesCountry[i].innerHTML=data[i].name.common
    Population[i].innerHTML="Population: "+data[i].population.toLocaleString()
    Region[i].innerHTML="Region: "+data[i].region
    document.querySelectorAll(".elements span:nth-child(4)")[i].innerHTML="Capital: "+data[i].capital
    document.querySelectorAll(".elements img")[i].setAttribute("src",data[i].flags.png);
    document.querySelectorAll(".elements")[i].setAttribute("id", i)
    }
    
    var imgs= document.querySelectorAll(".elements img");
    var elements =document.querySelectorAll(".elements");
    
    imgs.forEach(element => {
         element.addEventListener("click", ()=> {
     
                           elements.forEach(elementf => {
                                        elementf.addEventListener("click", ()=> {
                                         var id= elementf.getAttribute("id")
                                      
                                         createsection2(id,data)
                                     
    
                              })
                           });
        
            
        })
     });
    
     var imgs= document.querySelectorAll(".elements img");
    var sections= document.querySelector(".elements_container");
    
    imgs.forEach(element => {
         element.addEventListener("click", ()=> {
          document.querySelector(".buttondiv").classList.add("disable");
          sections.classList.add("disable");
          document.querySelector("section").classList.remove("disable")
          document.querySelector(".search_nav").classList.add("disable")
        })
     });
    
    var sections= document.querySelector(".elements_container");
    function add()
    {
    document.querySelector("section").classList.add("disable")
    sections.classList.remove("disable");
    document.querySelector(".search_nav").classList.remove("disable")
    document.querySelector(".buttondiv").classList.remove("disable");
    
    }
    
    
    
    }
    
    
    
    function createsection2(id,data)
    {
    document.querySelector(".flag").setAttribute("src",data[id].flags.png);               
    document.querySelector(".information  h2").innerText=data[id].name.common
    document.querySelectorAll(".container_section2  p")[0].innerText=Object.values(data[id].name.nativeName)[0].official;
    document.querySelectorAll(".container_section2  p")[1].innerText=data[id].population.toLocaleString()
    document.querySelectorAll(".container_section2  p")[2].innerText=data[id].region
    document.querySelectorAll(".container_section2  p")[3].innerText=data[id].subregion
    document.querySelectorAll(".container_section2  p")[4].innerText=data[id].capital[0]
    document.querySelectorAll(".container_section2  p")[5].innerText=data[id].tld[0]
    document.querySelectorAll(".container_section2  p")[6].innerText=Object.values(data[id].currencies)[0].name;
    document.querySelectorAll(".container_section2  p")[7].innerText=Object.values(data[id].languages).join(", ");
                            
    //search for borders
    var btn=document.querySelector(".btnborder")
    document.querySelector(".btn_container").innerHTML ="";
    
    if(data.length<250)
    {
    console.log("less then 250")
    if(typeof(data[id].borders)!=="undefined")
     {
    var i;
    var k;
    for ( i=0 ; i <data[id].borders.length; i++)
    { 
    for (k=0 ; k < maindata.length; k++)
    {
    
    if(maindata[k].cca3===data[id].borders[i])
    {
    
    
     btn.setAttribute("id", k)
     btn.innerHTML=maindata[k].name.common;
    document.querySelector(".btn_container").appendChild(btn.cloneNode(true))
    }
    }
    }
     
    }
    else{
    document.querySelector(".btn_container").innerHTML="None";
    }
    document.querySelectorAll(".btnborder").forEach(element => {
         element.addEventListener("click", ()=> {
     
          var btnid=element.getAttribute("id")
         
          createsection2(btnid,maindata)
        })
     })
    }
    
    
    //
    else{
    console.log("more then 250")
    if(typeof(data[id].borders)!=="undefined")
     {
    var i;
    var k;
    for ( i=0 ; i < data[id].borders.length; i++)
    { 
    for (k=0 ; k < data.length; k++)
    {
    
    if(data[k].cca3===data[id].borders[i])
    {
    
    
    btn.setAttribute("id", k)
     btn.innerHTML=maindata[k].name.common;
    document.querySelector(".btn_container").appendChild(btn.cloneNode(true))
    }
    }
    }
     
    }
    else{
    document.querySelector(".btn_container").innerHTML="None";
    }
    document.querySelectorAll(".btnborder").forEach(element => {
         element.addEventListener("click", ()=> {
     
          var btnid=element.getAttribute("id")
         
          createsection2(btnid,data)
        })
     })
    }
    //
    
    
    }
    
    
    
    //search method
    //   for (var i=0 ; i < data.length; i++)
    // {
    
    //     if(typeof(data[i].borders)==="undefined")
    //     {
      
    //       console.log("yes");
     
    //     }
    // else
    // {
    //   for (var k=0 ; k <= data[i].borders.length-1; k++)
    // {
    //   if(data[i].borders[k]==="ARG")
    // {
    //   console.log(i);
    // }
    // }
    // }
    
    // }
    console.log(data)
    
    //search Bar code
    document.querySelector("input").addEventListener("input", (e)=> {
    const value=e.target.value.toLowerCase()
    
    var newArray = maindata.filter(function (el) {
    return el.name.common.toLowerCase().includes(value)
         
    });
    console.log(newArray.length)
    if(newArray.length!==0){
    data=newArray
    createsection1(newArray.length,data)
    document.querySelector(".buttondiv").classList.add("disable")
    }
    
    
                 })
    
    //
    
    //dropbox code
    data2 =[...new Set(data.map(p => p.region))];
    
    for(var i=0; i<data2.length;i++)
    {
    
    var options=document.createElement("option")
    document.querySelector("select").appendChild(options).innerHTML=data2[i]
    
    }
    
    document.querySelector('select').addEventListener('change',()=> {
    var find= document.querySelector("select").value
      if(find==="All")
    {
      console.log("hello1")
    data=maindata
    createsection1(8,data)
    document.querySelector(".buttondiv").classList.remove("disable")
    }
    
    else{
    var newArray = maindata.filter(function (el) {
    return el.region === find
         
    })
    console.log(newArray)
    data=newArray
    createsection1(data.length,data)
    document.querySelector(".buttondiv").classList.add("disable")
    
    
    }
    
    
    })
    
    //
    
    // Random button Code
    document.querySelector(".btn-random").addEventListener("click", ()=> {
    
    function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    }
    for (let i = 0; i < 250; i++) {
    
    shuffle(data);
    
    }
       
    
    if(data.length===250){
    document.querySelector(".buttondiv").classList.remove("disable")
    createsection1(8,data)
    var counter = 0;
    
    
      document.querySelector(".buttondiv").addEventListener("click", ()=> {
     
        counter += 25; 
        if(counter===250){
      document.querySelector(".buttondiv").classList.add("disable")
    
    }
        
        createsection1(counter,data)  
     
     })
    }
    else{
    createsection1(data.length,data)
    }
    
    
    });
    
    //
    
    
    // Alphabetical Order 
    document.querySelector(".btn-az").addEventListener("click", ()=> {
    data=data.sort((a, b) => {
    if (a.name.common < b.name.common)
    return -1;
    if (a.name.common > b.name.common)
    return 1;
    return 0;
    })
    
    
    if(data.length===250){
    document.querySelector(".buttondiv").classList.remove("disable")
    createsection1(8,data)
    var counters = 0;
    
    
      document.querySelector(".buttondiv").addEventListener("click", ()=> {
        console.log(counters)
        counters += 25; 
        if(counters===250){
            console.log("yikes")
      document.querySelector(".buttondiv").classList.add("disable")
    
    }
        
        createsection1(counters,data)  
     
     })
    }
    else{
    createsection1(data.length,data)
    }
    
     });
    //
    
    
    //back button of section2
    document.querySelector(".btn-primary").addEventListener("click", ()=> {
    
    document.querySelector("section").classList.add("disable")
    sections.classList.remove("disable");
    document.querySelector(".search_nav").classList.remove("disable")
    console.log(data.length)
    if(data.length===250){
    document.querySelector(".buttondiv").classList.remove("disable");
    }
                 })
    //
    
    
    //default loadout elements
    
    createsection1(8,data)
    
    if(data.length===250){
        var counter = 0;
      
       
          document.querySelector(".buttondiv").addEventListener("click", ()=> {
         
            counter += 25; 
            if(counter===250){
                console.log("yikes")
          document.querySelector(".buttondiv").classList.add("disable")
        
        }
            
            createsection1(counter,data)  
         
         })
      }
    
    
    
    
    }
    
    
    
    })
    var imgs= document.querySelectorAll(".elements img");
    var sections= document.querySelector(".elements_container");
    
    function add(){
    
    }
    
    //lightmode Toggle
    function nyfunction()
    {
    for (var element of document.querySelectorAll("span")) { 
       element.classList.toggle("lightmodeText");
      
    }
    
    for (var element of document.querySelectorAll(".elements")) { 
       element.classList.toggle("lightmodeElementBg");
       element.classList.toggle("lightboxshadow")
    }
    
    document.querySelector("main").classList.toggle("lightmodeBg");
    
    for (var element of document.querySelectorAll("span")) { 
       element.classList.toggle("lightmodeText");
      
    }
    document.querySelector("nav").classList.toggle("lightmodeElementBg");
    document.querySelector("nav").classList.toggle("lightboxshadow")
    
    
    document.querySelector(".search_bar").classList.toggle("lightmodeElementBg");
    document.querySelector(".search_bar").classList.toggle("lightmodesearchText");
    
    var imgsrc=document.querySelector("span img").getAttribute("src")
    if(imgsrc.indexOf("moon-6689 (1).svg")!= -1)
    {
    document.querySelector("span img").setAttribute("src","moon-outline.svg")
    document.querySelector(".textbar img").setAttribute("src","search.svg")
    
    }
    else{
    document.querySelector("span img").setAttribute("src","moon-6689 (1).svg")
    document.querySelector(".textbar img").setAttribute("src","search-outline.svg")
    }
    
    
    
    for (let element of  document.querySelectorAll("span")) { 
    element.classList.toggle("lightmodeText");
      
    }
    
    
    document.querySelector(".btn-seemore").classList.toggle("lightmodeBg")
    document.querySelector(".btn-seemore ").classList.toggle("lightmodeText");
    
    document.querySelector(".btn-primary").classList.toggle("lightboxshadow")
    document.querySelector(".btn-primary").classList.toggle("lightmodeText");
    document.querySelector(".btn-primary").classList.toggle("lightmodeBg")
    document.querySelector("section").classList.toggle("lightmodeBg");
    document.querySelector(".information_master").classList.toggle("lightmodeBg");
    
    
    document.querySelector("h2").classList.toggle("lightmodeText");
    for (let element of document.querySelectorAll(".btnborder")) { 
      
      element.classList.toggle("lightmodeText");
       element.classList.toggle("lightmodeBg")
       element.classList.toggle("lightboxshadow")
      
     }
     document.querySelector("body").classList.toggle("lightmodeBg")
    
     for (var element of document.querySelectorAll("i")) { 
        element.classList.toggle("lightmodeFontawesome")
       
    }
    
    }
    
    
    
