let url = "https://student-mentor-db.herokuapp.com";
function getMentors() {
    fetch(`${url}/all-students-mentors/unassigned`, {
        method: "GET",
    })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            let mentor_list = document.getElementById("mentor_list");
            let student_table = document.getElementById("student_list");
            generateMentor(result['mentors'], mentor_list);
            generateStudent(result['students'], student_table);
        })
        .catch((err) => {
            console.log("Could not get students/mentors list");
        })
}

function generateStudent(result, tableBody) {
    if(result.length == 0){
        document.getElementById("studentSection").innerHTML = `<h4 style="color:crimson">All the students already have a mentor!!</h4>`;
    }
    tableBody = tableBody;
    let mentor_count = 1;
    for (x of result) {
        console.log(x['email']);
        let tr = document.createElement("tr");

        let tdno = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', x['_id']);
        checkbox.setAttribute('class', 'ticks');

        tdno.append(checkbox);
        tr.appendChild(tdno);

        if (tableBody['id'] == 'student_list') {
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

function generateMentor(result, mentor_list) {
    select_box = mentor_list;
    select_box.innerHtml = '';
    console.log(result)
    for (x of result) {
        console.log(x['email']);
        let option = document.createElement("option");
        option.setAttribute('value', x['_id']);
        option.innerHTML = x['name'];
        select_box.appendChild(option);
    }
}

function assignStudents(event) {
    event.preventDefault();
    let studentId = [];
    let chks = document.getElementsByClassName("ticks");

    for (i = 0; i < chks.length; i++) {
        if (chks[i].checked) {
            studentId.push(chks[i].value);
        }
    }
    if(studentId.length == 0){
        alert("Please select the student(s)");
        return;
    }
    let mentorId = document.getElementById("mentor_list").value;
    if(!mentorId){
        alert("Select mentor from the list")
        return;
    }
    console.log(studentId);

    fetch(`${url}/assign-students-for-a-mentor/`, {
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
            console.log(result['data']);
            alert('success');
            let content_div = document.getElementById("content");
            content_div.innerHTML = '';
            let h2 = document.createElement("h2");
            h2.setAttribute('style','text-align:center; color:green; width: 100%;');
            h2.innerText = "Successfully assigned the student(s) !!"
            content_div.append(h2);
        }else{
            alert('Sorry, student id not found in our records !!');
        }
     })
    .catch((err)=>{
        console.log("Could not assign the mentor !!");
    })
}
