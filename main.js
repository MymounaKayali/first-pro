let input = document.getElementById("input")
let add = document.getElementById("add")
let tasksDiv = document.getElementById("tasks")

let arrayOfTasks = []

if(window.localStorage.getItem("tasks"))
{
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
    addTaskToPage(arrayOfTasks)
}

add.onclick = function ()
{
    if(input.value !== "")
    {
        addTask(input.value)
        input.value = ""
    }
}

function addTask(inp)
{
    let task = 
    {
        id: Date.now() , 
        text: inp , 
        done: false ,
    }

    arrayOfTasks.push(task)

    window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks))

    addTaskToPage(arrayOfTasks)
}

function addTaskToPage (arrayOfTasks)
{
    tasksDiv.innerHTML = ""
    arrayOfTasks.forEach(function(task)
    {
        let div = document.createElement("div")
        div.setAttribute("id" , task.id)
        div.setAttribute("done" , task.done)
        div.className = "task"
        div.appendChild(document.createTextNode(task.text))
        let delete_btn = document.createElement("button")
        delete_btn.className = "delete"
        delete_btn.appendChild(document.createTextNode("Delete"))
        div.appendChild(delete_btn)
        tasksDiv.appendChild(div)
    })
}

tasksDiv.addEventListener("click" , function(event)
{
    if(event.target.className == "delete")
    {
        event.target.parentElement.remove()

        arrayOfTasks = arrayOfTasks.filter(function(task)
        {
            return task.id != event.target.parentElement.getAttribute("id")
        })
        window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks))
    }

    if(event.target.className == "task")
    {

            for(let i = 0 ; i< arrayOfTasks.length ; i++)
            {
                if(arrayOfTasks[i].id ==event.target.getAttribute("id") )
                {
                    if(arrayOfTasks[i].done == false)
                    {
                        arrayOfTasks[i].done = true
                        event.target.style.backgroundColor = "khaki"  
                    }
                    else
                    {
                        arrayOfTasks[i].done = false
                        event.target.style.backgroundColor = "white"
                    }
                    
                }
            }  
        window.localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks))
    }


})
