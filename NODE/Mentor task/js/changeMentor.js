let url = "https://student-mentor-db.herokuapp.com";
   function getMentors() {
       
    fetch(url + `/all-students-mentors/all`, {
        method: "GET",
    })
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        let mentor_list = document.getElementById("mentor_list");
        generateDom(result['mentors'], mentor_list);
     })
    .catch((err)=>{
        console.log("Could not get mentors list");
        console.log(err)
    })
}

function generateDom(result, mentor_list){
    console.log(mentor_list)
    select_box = mentor_list;
    select_box.innerHtml = '';
    let mentor_count = 1;
    console.log(result)
    for (x of result){
        console.log(x['email']);
            let option = document.createElement("option");
            option.setAttribute('value', x['_id']);
            option.innerHTML = x['name'];
            select_box.appendChild(option);          
            mentor_count++;
    }
}

function changeMentor(event){
    event.preventDefault();
    let mentorId = document.getElementById("mentor_list").value;
    let studentId = document.getElementById("studentId").value;
    var sel = document.getElementById("mentor_list");
    var mentorName = sel.options[sel.selectedIndex].text;
    console.log(studentId, mentorId);
    if(!studentId){
        alert("Enter student Id");
        return;
    }
    if(!mentorId){
        alert("Select mentor from the list")
        return;
    }
    updateMentor(studentId, mentorId);
    
}

function updateMentor(studentId, mentorId) {
    fetch(url + `/change-mentor-for-a-student`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            studentId, mentorId
        })
    })
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        console.log(result);
        if(result['data']){
            let content_div = document.getElementById("content");
            content_div.innerHTML = '';
            let h2 = document.createElement("h2");
            h2.setAttribute('style','text-align:center; color:green; width: 100%;');
            h2.innerText = "Successfully changed the mentor !!"
            content_div.append(h2);
        }else{
            alert('Sorry, student id not found in our records !!');
        }
     })
    .catch((err)=>{
        console.log("Could not assign the mentor !!");
    })
}
