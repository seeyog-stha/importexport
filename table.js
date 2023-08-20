import data from "./data.js"
let table=document.getElementsByClassName("tablecontent")[0]
let button=document.getElementsByTagName("button")
//  to display the content of the table 
const display=()=>{
    table.innerHTML=""
    data.sort((a,b)=>{return a.id-b.id})
    data.map((x)=>{
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
        table.appendChild(newrow)
    })
}
display()


// insert function logic 
button[0].addEventListener("click",()=>{
     let idvalue=document.getElementById("id").value
     let namevalue=document.getElementById("name").value
     let addressvalue=document.getElementById("address").value
    idvalue=Number.parseInt(idvalue)
    console.log(idvalue,namevalue,addressvalue)
    console.log(typeof idvalue, typeof namevalue)
    if(isNaN(idvalue)&&namevalue.length==0&&addressvalue.length==0){
        alert("kindly insert all the values")
    }
    else{

        let status=true
        data.map((x)=>{
            if(x.id==idvalue){
                alert("id exists")
                colorme(idvalue,"pink")
                let del1=confirm("do you want to update the existing id")
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
             display()
             colorme(idvalue,"blue")
        }
    }
 })
// for colouring the id while typing
let idInsert=document.getElementById("id")
let delid=document.getElementById("delid")
idInsert.addEventListener("input",(e)=>{
    let idvalue=e.target.value 
    colorme(idvalue,"yellow")
})
delid.addEventListener("input",(e)=>{
    let idvalue=e.target.value 
    colorme(idvalue,"red")
})

//  to remove 
button[1].addEventListener("click",()=>{
    let delvalue=document.getElementById("delid").value
    delvalue=Number.parseInt(delvalue)
    let status=true
    if(isNaN(delvalue)){
        alert("enter an id first")
    }
    else{

        let conf=confirm("are you sure to delete")
        if(conf){
            data.map((x)=>{
                if(x.id===delvalue){
                   let position=data.findIndex(obj=>obj.id==delvalue)
                  data.splice(position,1)
                  status=false
                }
            })
            display()
        } 
        if(status){
            alert("no such id found!!!")
        }
    }
})
// color the row 
const colorme=(value,colo,index=0)=>{

    let allrow=document.getElementsByTagName("tr")
    if(index ==0){

        for(let x in allrow){
            if(allrow[x].value!=undefined){
                if(allrow[x].value[0]!=value){
                    allrow[x].style.backgroundColor="transparent"
                }
                else {
                    allrow[x].style.backgroundColor=`${colo}`
                }
            }
        }
    }
    else{
        // console.log("boom")
      
        for(let x in allrow){
            if(allrow[x].value!=undefined){
                // console.log(allrow[x].value[1], value)
                if(allrow[x].value[1]==value||allrow[x].value[2]){
                    console.log("color" , value)
                    allrow[x].style.backgroundColor=`${colo}`
                }
                
            }
        }
    }
}
// code to make when click on an row data is supplied in the form 
table.addEventListener("click",(e)=>{

    const clickedRow = e.target.closest("tr");
    let tablerow=document.getElementsByTagName("tr")
    if(clickedRow){
        Array.from(tablerow).forEach((row)=>{
            if(row!=tablerow[0]){
                row.style.backgroundColor="gray"
            }
        })
        clickedRow.style.backgroundColor="pink"
        console.log(clickedRow.value)
        let idvalue=document.getElementById("id")
        let namevalue=document.getElementById("name")
        let addressvalue=document.getElementById("address")
        let delvalue=document.getElementById("delid")
        idvalue.value=clickedRow.value[0]
        idvalue.name=clickedRow.value[0]
        namevalue.value=clickedRow.value[1]
        namevalue.name=clickedRow.value[1]
        addressvalue.value=clickedRow.value[2]
        addressvalue.name=clickedRow.value[2]
        delvalue.value=clickedRow.value[0]
        delvalue.name=clickedRow.value[0]
    }
})

// for search logic
let search=document.getElementById("search")
let temp=""
let select=document.getElementById("select")
// console.log(select.value)
select.addEventListener("change",()=>{
    console.log(select.value)
})
search.addEventListener("input",(e)=>{
    // console.log(e.target.value)
    let temp=e.target.value
    let allrow=document.getElementsByTagName("tr")
        let pattern=new RegExp(temp, "ig")
    if(select.value==0){
        colorme(temp,"gray")
    }
    else if(select.value==1){
        
        Array.from(allrow).forEach(ele=>{
            ele.style.backgroundColor="transparent"
        })
       
        for(let x in allrow){
            if(allrow[x].value!=undefined){
              
                let temp1=allrow[x].value[1]
                
                if(temp1.match(pattern)!==null){
                   colorme(allrow[x].value[1],"gray",1)
                }

            }
        }
    }
    else{
      
        Array.from(allrow).forEach(ele=>{
            ele.style.backgroundColor="transparent"
        })
       
        for(let x in allrow){
            if(allrow[x].value!=undefined){
              
                let temp1=allrow[x].value[2]
                
                if(temp1.match(pattern)!==null){
                   colorme(allrow[x].value[2],"gray",1)
                }

            }
        }
    }
})