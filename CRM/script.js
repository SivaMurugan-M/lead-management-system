// ================= LOGIN SYSTEM =================

function login(){

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    
    if(username==="admin" && password==="1234"){
    
    localStorage.setItem("loggedIn","true");
    window.location.href="index.html";
    
    }else{
    
    alert("Invalid Login");
    
    }
    
    }
    
    // ================= LOGOUT =================
    
    function logout(){
    
    localStorage.removeItem("loggedIn");
    window.location.href="login.html";
    
    }
    
    // ================= STORAGE =================
    
    function getLeads(){
    
    return JSON.parse(localStorage.getItem("leads")) || [];
    
    }
    
    function saveToStorage(leads){
    
    localStorage.setItem("leads",JSON.stringify(leads));
    
    }
    
    // ================= PREPARE ADD =================
    
    function prepareAdd(){
    
    document.getElementById("editIndex").value="";
    clearForm();
    
    }
    
    // ================= SAVE LEAD =================
    
    function saveLead(){
    
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let phone=document.getElementById("phone").value;
    let company=document.getElementById("company").value;
    let status=document.getElementById("status").value;
    let followup=document.getElementById("followup").value;
    
    let leads=getLeads();
    let editIndex=document.getElementById("editIndex").value;
    
    let lead={
    name,
    email,
    phone,
    company,
    status,
    followup
    };
    
    if(editIndex===""){
    
    leads.push(lead);
    
    }else{
    
    leads[editIndex]=lead;
    
    }
    
    saveToStorage(leads);
    
    // close modal
    
    let modal=bootstrap.Modal.getInstance(document.getElementById("leadModal"));
    modal.hide();
    
    clearForm();
    
    displayLeads();
    
    if(typeof loadChart==="function"){
    loadChart();
    }
    
    }
    
    // ================= DISPLAY LEADS =================
    
    function displayLeads(){
    
    let leads=getLeads();
    let table=document.getElementById("leadTable");
    
    if(!table) return;
    
    table.innerHTML="";
    
    let total=0;
    let newCount=0;
    let won=0;
    let lost=0;
    
    leads.forEach((lead,index)=>{
    
    let badge=getBadge(lead.status);
    
    let row=
    
    `<tr>
    
    <td>${lead.name}</td>
    <td>${lead.email}</td>
    <td>${lead.phone}</td>
    <td>${lead.company}</td>
    <td>${badge}</td>
    <td>${lead.followup || "-"}</td>
    
    <td>
    
    <button class="btn btn-warning btn-sm" onclick="editLead(${index})">Edit</button>
    
    <button class="btn btn-danger btn-sm" onclick="deleteLead(${index})">Delete</button>
    
    </td>
    
    </tr>`;
    
    table.innerHTML+=row;
    
    total++;
    
    if(lead.status==="New") newCount++;
    if(lead.status==="Won") won++;
    if(lead.status==="Lost") lost++;
    
    });
    
    document.getElementById("totalLeads").innerText=total;
    document.getElementById("newLeads").innerText=newCount;
    document.getElementById("wonLeads").innerText=won;
    document.getElementById("lostLeads").innerText=lost;
    
    }
    
    // ================= STATUS BADGE =================
    
    function getBadge(status){
    
    if(status==="New") return '<span class="badge bg-primary">New</span>';
    if(status==="Contacted") return '<span class="badge bg-warning">Contacted</span>';
    if(status==="Qualified") return '<span class="badge bg-info">Qualified</span>';
    if(status==="Won") return '<span class="badge bg-success">Won</span>';
    if(status==="Lost") return '<span class="badge bg-danger">Lost</span>';
    
    }
    
    // ================= EDIT LEAD =================
    
    function editLead(index){
    
    let leads=getLeads();
    let lead=leads[index];
    
    document.getElementById("name").value=lead.name;
    document.getElementById("email").value=lead.email;
    document.getElementById("phone").value=lead.phone;
    document.getElementById("company").value=lead.company;
    document.getElementById("status").value=lead.status;
    document.getElementById("followup").value=lead.followup || "";
    
    document.getElementById("editIndex").value=index;
    
    let modal=new bootstrap.Modal(document.getElementById("leadModal"));
    modal.show();
    
    }
    
    // ================= DELETE LEAD =================
    
    function deleteLead(index){
    
    if(confirm("Delete this lead?")){
    
    let leads=getLeads();
    
    leads.splice(index,1);
    
    saveToStorage(leads);
    
    displayLeads();
    
    if(typeof loadChart==="function"){
    loadChart();
    }
    
    }
    
    }
    
    // ================= SEARCH =================
    
    function searchLeads(){
    
    let keyword=document.getElementById("searchInput").value.toLowerCase();
    let rows=document.querySelectorAll("#leadTable tr");
    
    rows.forEach(row=>{
    
    let text=row.innerText.toLowerCase();
    
    row.style.display=text.includes(keyword) ? "" : "none";
    
    });
    
    }
    
    // ================= FILTER =================
    
    function filterLeads(){
    
    let filter=document.getElementById("statusFilter").value;
    let leads=getLeads();
    let table=document.getElementById("leadTable");
    
    table.innerHTML="";
    
    leads.forEach((lead,index)=>{
    
    if(filter==="All" || lead.status===filter){
    
    let badge=getBadge(lead.status);
    
    let row=
    
    `<tr>
    
    <td>${lead.name}</td>
    <td>${lead.email}</td>
    <td>${lead.phone}</td>
    <td>${lead.company}</td>
    <td>${badge}</td>
    <td>${lead.followup || "-"}</td>
    
    <td>
    
    <button class="btn btn-warning btn-sm" onclick="editLead(${index})">Edit</button>
    
    <button class="btn btn-danger btn-sm" onclick="deleteLead(${index})">Delete</button>
    
    </td>
    
    </tr>`;
    
    table.innerHTML+=row;
    
    }
    
    });
    
    }
    
    // ================= DARK MODE =================
    
    function toggleDarkMode(){
    
    document.body.classList.toggle("dark-mode");
    
    }
    
    // ================= CLEAR FORM =================
    
    function clearForm(){
    
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("phone").value="";
    document.getElementById("company").value="";
    document.getElementById("followup").value="";
    
    }
    
    // ================= INIT =================
    
    document.addEventListener("DOMContentLoaded",function(){
    
    displayLeads();
    
    if(typeof loadChart==="function"){
    loadChart();
    }
    
    });
    