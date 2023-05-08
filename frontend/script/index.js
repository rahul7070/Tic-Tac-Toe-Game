
let url="http://localhost:8600/user/login"

let email=document.getElementById("email")
let password=document.getElementById("password")
let login=document.getElementById("login")

login.addEventListener("click",()=>{
    let obj={
        email:email.value,
        password:password.value
    }
    fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(obj)
    })
    .then(res=>res.json())
     .then(data=>{
        console.log(data,"gg")
        if(data.message=="login success full"){
            
            window.location.href="./joinroom.html"
        }
            
     })
})


