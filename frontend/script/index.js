
let url="http://localhost:8500/user/login"

let statusTag = document.getElementById("login-status")

let email=document.getElementById("email")
let password=document.getElementById("password")
let login=document.getElementById("login")

login.addEventListener("click",()=>{
    let obj={
        email:email.value,
        password:password.value
    }
    console.log(obj)
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then(res=>res.json())
     .then(data=>{
        console.log(data.message)
        if(data.message=="login success full"){
            
            window.location.href="./joinroom.html"
        }else{
            statusTag.innerText = data.message
        }
            
     })
})


