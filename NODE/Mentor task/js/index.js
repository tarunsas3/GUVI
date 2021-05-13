let url = "https://student-mentor-db.herokuapp.com";
   function getMentors() {
    fetch(`${url}/all-students-mentors/all`, {
        method: "GET",
    })
    .then((response) => {
        return response.json()
    })
    .then((result) => {
        let mentor_table = document.getElementById("mentor_list");
        let student_table = document.getElementById("student_list");
        generateDom(result['mentors'], mentor_table);
        generateDom(result['students'], student_table);
    })
    .catch((err)=>{
        console.log("Could not get students/mentors list");
    })
}

function generateDom(result, tableBody){
    tableBody = tableBody;
    let mentor_count = 1;
    for (x of result){
        console.log(x['email']);
            let tr = document.createElement("tr");

            let tdno = document.createElement("td");
            tdno.innerText = mentor_count;
            tr.appendChild(tdno);

            if(tableBody['id'] == 'student_list'){
            let tdId = document.createElement("td");
            tdId.innerText = x['_id'];
            tr.appendChild(tdId);
            }   
            let td1 = document.createElement("td");
            td1.innerText = x['name'];
            tr.appendChild(td1);

            let td2 = document.createElement("td");
            td2.innerText = x['email'];
            tr.appendChild(td2);
            tableBody.appendChild(tr);

            mentor_count++;
    }
}

function addnewmentor(event){
    event.preventDefault();
   let name = document.getElementById("mentorname").value
   let email = document.getElementById("mentoremail").value
   if(!name ) {
    alert("Enter Mentor Name")   
    return
   }
   if(!email ) {
    alert("Enter Mentor Email")   
    return
   }
   
   fetch(url + `/add-a-mentor`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name, email
    })
    })
    .then((response) => {
        return response.json()
    })
    .then((result)=>{
        console.log(result)
        location.reload();
    })
    .catch((err)=>{
        console.log(err)
        
    })
}

function addnewstudent(event){
    event.preventDefault();
   let name = document.getElementById("studentname").value
   let email = document.getElementById("studentemail").value
   if(!name ) {
    alert("Enter Student Name")   
    return
   }
   if(!email ) {
    alert("Enter Student Email")   
    return
   }
   
   fetch(url + `/add-a-student`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name, email
    })
    })
    .then((response) => {
        return response.json()
    })
    .then((result)=>{
        console.log(result)
        location.reload();
    })
    .catch((err)=>{
        console.log(err)
        
    })
}
