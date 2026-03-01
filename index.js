const todo_input = document.getElementById("todo_input");
const todo_container = document.getElementById("todo_container");

function add_todo(){
    let value = todo_input.value;
    if(value){
        localStorage.setItem(localStorage.length, value);
    }

    todo_container.innerHTML = "";
    
    for(let item = 0; item < localStorage.length; item++){
        let button_finished = document.createElement("button");
        let todo_box = document.createElement("div");
        todo_box.classList.add("todo_box");
        let todo_p = document.createElement("p");
        todo_p.textContent = localStorage.getItem(item);
        button_finished.textContent = "erledigt";
        button_finished.classList.add("finish_button")
        button_finished.onclick = function(){
            localStorage.removeItem(item);
            let is_last = true;
            if(item != localStorage.length){
                for(let i = item+1; i <= localStorage.length; i++){
                    let old_value = localStorage.getItem(i);
                    localStorage.setItem(i-1, old_value);
                }
                is_last = false;
            }
            
            if(is_last == false){
                localStorage.removeItem(localStorage.length-1);
            }
            add_todo()
        };
        todo_box.appendChild(todo_p);
        todo_box.appendChild(button_finished);
        todo_container.appendChild(todo_box);
        todo_input.value = "";
    }
}

function delete_todo(item){
    old_value = localStorage.getItem(item);
    localStorage.removeItem(item);
    for(let i = item; i < localStorage.length; i++){
        localStorage.setItem(i, old_value)
    }
}

function clear_localStorage(){
    localStorage.clear();
    add_todo();
}

add_todo()