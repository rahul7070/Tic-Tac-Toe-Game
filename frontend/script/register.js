
let url="https://tic-tac-toe-deploygame.onrender.com/user/register"

let email=document.getElementById("email")
let password=document.getElementById("password")
let register=document.getElementById("register")
let message=document.getElementById("message")


register.addEventListener("click",()=>{
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
         console.log(data.msg)
        message.innerText=data.msg
        let a=document.createElement("a")
         a.setAttribute("href","index.html")
         let button=document.createElement("button")
         button.innerText="LOG IN"
          a.append(button)
          message.append(a)

     })
})
