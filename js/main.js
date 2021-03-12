$(document).ready(function(){
    //add task
    $('#add-task-form').on('submit',function(e){
        addTask(e);
        

    });

    //edit event
    $('#edit-task-form').on('submit',function(e){
        updateTask(e);
    });

    //REMOVE TASK
    $("#task-table").on("click","#remove-task",function(){
        id=$(this).data('id');
        removeTask(id);
    })

    //clear all tasks
    $("#clear-tasks").on("click",function(){
        clearAllTasks();
    });


    
    
    displayTasks();

    function displayTasks() {
        var tasklist=JSON.parse(localStorage.getItem('tasks'));

        if(tasklist !=null){
            tasklist=tasklist.sort(sortByTime);
        }
        var i=0;
        if(localStorage.getItem('tasks') !=null){
            $.each(tasklist,function(key,value){
                $('#task-table').append('<tr id="'+value.id+'">'+
                '<td>'+value.task+'</td>'
                +'<td>'+value.task_priority+'</td>'+
                '<td>'+value.task_date+'</td>'+
                '<td>'+value.task_time+'</td>'+
                '<td><a href="edit.html?id='+value.id+'">Edit</a> | <a href="#" id="remove-task" data-id="'+value.id+'">Remove</a></td>'+
                '</tr>');
            })
        }
    }

    function sortByTime(a,b){
    var aTime=a.task_time;
    var bTime=b.task_time;
    return ((aTime<bTime) ? -1 : ((aTime>bTime) ? 1 :0));
    }


    // function  to add task
    function addTask(e){
        //add a unique id
        var newDate=new Date();
        id=newDate.getTime();

        var task =$('#task').val();
        var task_priority=$('#priority').val();
        var task_date =$('#date').val();
        var task_time =$('#time').val();

        //validation
        if(task == ''){
            alert('task is required');
            e.preventDefault();
        } else if(task_date==''){
            alert("date is required");
        }else if(task_time==''){
            alert("time is required");   
        }else if(task_priority==''){
            task_priority="normal";   
        }else{
            
            tasks=JSON.parse(localStorage.getItem('tasks'));

            //check tasks
            if(tasks == null){
                tasks=[];
            }
            var tasklist=JSON.parse(localStorage.getItem('tasks'));

            //new task object
            var new_task={
                "id":id,
                "task":task,
                "task_priority":task_priority,
                "task_date":task_date,
                "task_time":task_time
            }
            tasks.push(new_task);
            localStorage.setItem("tasks",JSON.stringify(tasks));
            
            console.log("task added");

        }
    }
    function updateTask(e){
        var id=$("#task_id").val();
        var task =$('#task').val();
        var task_priority=$('#priority').val();
        var task_date =$('#date').val();
        var task_time =$('#time').val();

        taskList=JSON.parse(localStorage.getItem('tasks'));

        for(var i=0;i<taskList.length;i++){
            if(taskList[i].id == id){
                taskList.splice(i,1)
            }
            localStorage.setItem("tasks",JSON.stringify(taskList));
        }

        if(task == ''){
            alert('task is required');
            e.preventDefault();
        } else if(task_date==''){
            alert("date is required");
        }else if(task_time==''){
            alert("time is required");   
        }else if(task_priority==''){
            task_priority="normal";   
        }else{
            
            tasks=JSON.parse(localStorage.getItem('tasks'));
            //check tasks
            if(tasks == null){
                tasks=[];
            }
            var tasklist=JSON.parse(localStorage.getItem('tasks'));

            //new task object
            var new_task={
                "id":id,
                "task":task,
                "task_priority":task_priority,
                "task_date":task_date,
                "task_time":task_time
            }
            tasks.push(new_task);
            localStorage.setItem("tasks",JSON.stringify(tasks));

        }


    }

    function removeTask(id){
        if(confirm("Are you sure want to delete this task?")){
            var taskList=JSON.parse(localStorage.getItem("tasks"));

            for(var i=0;i<taskList.length;i++){
                if(taskList[i].id == id){
                    taskList.splice(i,1)
                }
                localStorage.setItem("tasks",JSON.stringify(taskList));
        }
        location.reload();
    }
}


    function clearAllTasks(){
        if(confirm("Are you sure want to delete all tasks?")){
            localStorage.clear();
            location.reload();
    }
}


});

//function for getting task id
function getTask(){
    var $_GET = getQueryParams(document.location.search);

    id=$_GET['id'];

    console.log(id);
    var tasklist=JSON.parse(localStorage.getItem('tasks'));

    for(var i=0;i<tasklist.length;i++){
        if(tasklist[i].id == id){
            $('#edit-task-form #task_id').val(tasklist[i].id);
            $('#edit-task-form #task').val(tasklist[i].task);
            $('#edit-task-form #priority').val(tasklist[i].task_priority);
            $('#edit-task-form #date').val(tasklist[i].task_date);
            $('#edit-task-form #time').val(tasklist[i].task_time);
        }
    }

}

function getQueryParams(qs) {
    qs=qs.split("+").join(" ");
    var params={},
        tokens,
        re=/[?&]?([^=]+)=([^&]*)/g;

    while (tokens=re.exec(qs)){
        params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);

    }
    return params;
}
