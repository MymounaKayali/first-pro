let uName = document.getElementById("name")
let uAge = document.getElementById("age")
let uCountry = document.getElementById("country")
let addUser = document.getElementById("addUser")
let userTable = document.getElementById("tableUser")

let Users = []

if(window.localStorage.getItem("users"))
{
    Users = JSON.parse(localStorage.getItem("users"))
    showUserInPage(Users)
}

addUser.onclick = function ()
{
    for(let i =0; i<Users.length ; i++)
    {
        if(Users[i].up == true)
        {
            Users[i].up = false
            Users[i].nameUser = uName.value
            Users[i].ageUser = uAge.value
            Users[i].countryUser = uCountry.value

            window.localStorage.setItem("users" , JSON.stringify(Users))
            showUserInPage(Users)
            uName.value = ""
            uAge.value = ""
            uCountry.value = ""
        }
    }
    if(uName.value != "" || uAge.value != "" || uCountry.value != "")
    {
        addUserTo(uName.value , uAge.value , uCountry.value )
        uName.value = ""
        uAge.value = ""
        uCountry.value = ""
    }

}

function addUserTo(n , a , c)
{
    let user =
    {
        id: Date.now() ,
        nameUser: n ,
        ageUser: a ,
        countryUser: c ,
        up: false ,
    }

    Users.push(user)

    window.localStorage.setItem("users" , JSON.stringify(Users))

    showUserInPage(Users)
}

function showUserInPage(Users)
{
    userTable.innerHTML=""
    Users.forEach(function(user)
    {
        let tr = document.createElement("tr")
        tr.setAttribute("id" , user.id)
        
        let td1 = document.createElement("td")
        td1.appendChild(document.createTextNode(user.nameUser))
        let td2 = document.createElement("td")
        td2.appendChild(document.createTextNode(user.ageUser))
        let td3 = document.createElement("td")
        td3.appendChild(document.createTextNode(user.countryUser))

        let delete_btn = document.createElement("button")
        delete_btn.className = "delete"
        delete_btn.appendChild(document.createTextNode("Delete"))
        let update_btn = document.createElement("button")
        update_btn.appendChild(document.createTextNode("Update"))
        update_btn.className = "update"

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(delete_btn)
        tr.appendChild(update_btn)
        userTable.appendChild(tr)



    })
}

userTable.addEventListener("click" , function (event)
{
    if(event.target.className == "delete")
    {
        event.target.parentElement.remove()
        Users = Users.filter(function(user)
        {
            return user.id != event.target.parentElement.getAttribute("id")
        })
        window.localStorage.setItem("users" , JSON.stringify(Users))
    }

    if(event.target.className == "update")
    {
        for(let i=0 ; i<Users.length ; i++)
        {
        
            if(Users[i].id == event.target.parentElement.getAttribute("id"))
            {
                uName.value = Users[i].nameUser
                uAge.value = Users[i].ageUser
                uCountry.value = Users[i].countryUser
                Users[i].up = true
            }
        }
    }
})
