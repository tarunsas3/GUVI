let url = "https://student-mentor-db.herokuapp.com";
   function getMentors() {
    fetch(`${url}/all-students-mentors/all`, {
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
        console.log("Could not get students/mentors list");
    })
}

function generateDom(result, mentor_list){
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

function searchStudents(event){
    event.preventDefault();
    let mentorId = document.getElementById("mentor_list").value;
    var sel = document.getElementById("mentor_list");
    var mentorName = sel.options[sel.selectedIndex].text;
    if(!mentorId){
        alert("Select mentor from the list")
        return;
    }
  
    fullUrl =  `${url}/list-of-students-for-a-mentor/${mentorId}`;
    console.log(fullUrl)
        fetch(fullUrl, {
            method: "GET"
           })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                console.log(result['data']);
                console.log(result['data'].length);
                if(result['data'].length > 0){
                    let studentSection = document.getElementById("studentSection");
                    studentSection.innerHTML = '';

                    let h3 = document.createElement("h3");
                    h3.setAttribute('style','text-align:center')
                    h3.innerText = 'Students';

                    let div_table = document.createElement("div");
                    div_table.setAttribute('class','table-responsive');

                    let table = document.createElement("table");
                    table.setAttribute('class','table table-bordered');
                    
                    let thead = document.createElement("thead");
                    
                    let tr = document.createElement("tr");
                    
                    let th1 = document.createElement("th");
                    th1.innerText = "S.No";

                    let th2 = document.createElement("th");
                    th2.innerText = "Name";

                    let th3 = document.createElement("th");
                    th3.innerText = "Email";

                    let tbody = document.createElement("tbody");
                    tbody.setAttribute('id','student_list')

                    let mentor_count = 1;
                    for (x of result['data']) {
                        console.log(x['email']);
                        let tr = document.createElement("tr");

                        let tdno = document.createElement("td");
                        tdno.innerText = mentor_count;
                        tr.appendChild(tdno);

                        let td1 = document.createElement("td");
                        td1.innerText = x['name'];
                        tr.appendChild(td1);

                        let td2 = document.createElement("td");
                        td2.innerText = x['email'];
                        tr.appendChild(td2);
                        tbody.appendChild(tr);

                        mentor_count++;
                    }

                    tr.append(th1, th2, th3)
                    thead.append(tr);
                    table.append(thead, tbody);
                    div_table.append(table)
                    studentSection.append(h3, div_table);
                }else{
                    let studentSection = document.getElementById("studentSection");
                    studentSection.innerHTML = '';

                    h3 = document.createElement("h5");
                    h3.setAttribute('style','color:crimson')
                    h3.innerText = `Sorry, no students are assigned for the mentor - ${mentorName}`;
                    studentSection.style.display = 'initial';
                    alert(`No students found !!`)

                    studentSection.append(h3);
                }
            })

            .catch((err) => {
                console.log("Could not get students list", err);
            })
    
}
