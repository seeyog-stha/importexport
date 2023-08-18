import data from "./data.js"
// console.log(data)
let table=document.getElementsByClassName("tablecontent")[0]
let button=document.getElementsByTagName("button")
//  to display the content of the table 
const display=()=>{
    data.sort((a,b)=>{return a.id-b.id})
    

    data.map((x)=>{
        // console.log(data)
        // console.log(x)
        let newrow=document.createElement('tr')
        let newsn=document.createElement("td")
        let newname=document.createElement("td")
        let newaddress=document.createElement("td")
        newsn.innerHTML=`${x.id}`
        newname.innerHTML=`${x.name}`
        newaddress.innerHTML=`${x.address}`
        newrow.appendChild(newsn)
        newrow.appendChild(newname)
        newrow.appendChild(newaddress)
        newrow.value=[x.id,x.name,x.address]
        console.log(newrow.value)
        table.appendChild(newrow)
    })
}
display()


// insert function logic 
 button[0].addEventListener("click",()=>{
    //  alert("hello there")
    let idvalue=document.getElementById("id").value
    let namevalue=document.getElementById("name").value
    let addressvalue=document.getElementById("address").value
    idvalue=Number.parseInt(idvalue)
    let status=true
    data.map((x)=>{
        if(x.id==idvalue){
            alert("id exists")
            colorme(idvalue,"pink")
         
            let del1=confirm("do you want to remove the existing id")
            if(del1){
               let position=data.findIndex(obj=>obj.id==idvalue)
               console.log(position)
               data.splice(position,1)
              
            }
            else{
                status=false
            }
        }
    })
    if(status){

        let temp={
            id:idvalue,
            name:namevalue,
            address:addressvalue,
        }
        data.push(temp)
        // console.log(data)
        // console.log(temp)
        table.innerHTML=""
         display()
         colorme(idvalue,"blue")
    }
 })


//  to remove 
button[1].addEventListener("click",()=>{
    let delvalue=document.getElementById("delid").value
    delvalue=Number.parseInt(delvalue)
    let status=true
    data.map((x)=>{
        if(x.id===delvalue){
           alert("id exits")
           let position=data.findIndex(obj=>obj.id==delvalue)
          data.splice(position,1)
          status=false
        }
    })
    if(status){
        alert("no such id found!!!")
    }
    table.innerHTML=""
    display()

})
// color the row 
const colorme=(id,colo)=>{

    let allrow=document.getElementsByTagName("tr")
    console.log("here we start")
    for(let x in allrow){
        if(allrow[x].value!=undefined){
    
            console.log(allrow[x].value)
            console.log(typeof allrow[x].value)
        
            let temp=Array.from(allrow[x].value)
            console.log(temp)
            if(allrow[x].value[0]==id){
                allrow[x].style.background=`${colo}`
            }
            else{
                allrow[x].style.background="none"
            }
        }
    }
}

