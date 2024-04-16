
function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  sidebar.style.right = sidebar.style.right === '0px' ? '-250px' : '0px';
}

// Event listener for the menu icon
document.getElementById('menu-icon').addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent click from propagating to the document
  toggleSidebar();
});

// Event listener to hide sidebar if clicked outside of it
document.addEventListener('click', function(event) {
  var sidebar = document.getElementById('sidebar');
  if (event.target !== sidebar && !sidebar.contains(event.target)) {
    sidebar.style.right = '-250px';
  }
});

// Prevent sidebar from closing when clicking inside it
document.getElementById('sidebar').addEventListener('click', function(event) {
  event.stopPropagation();
});




// Variables
const titleInput = document.getElementById("title-input");
const descriptionInput = document.getElementById("description-input");
const startDateInput = document.getElementById("start-date-input");
const endDateInput = document.getElementById("end-date-input");
const budgetInput = document.getElementById("budget-input");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let currentProjectIndex = null;
let projects = JSON.parse(localStorage.getItem("projects")) || [];
getProjects();
let projectIdCounter = JSON.parse(localStorage.getItem("projectIdCounter")) || 1;
document.getElementById('admin-btn').addEventListener('click', function() {
  document.getElementById('admin-password').style.display = 'inline';
  document.getElementById('admin-password').focus();
});

document.getElementById('admin-password').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      const transformedInput = this.value.split('').reverse().join('') + 'salt';
      const expectedTransform = 'elgnairtsalt'; 
      
      if (transformedInput === expectedTransform) {
          document.getElementById('crud-table').style.display = 'block';
      } else {
          alert('Mot de passe incorrect');
      }
      this.value = '';
  }
});


// Create Project
function createProject() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const budget = budgetInput.value;
  const id = projects.length + 1; // Simple ID assignment, for demo purposes
  
  const newProject = { id: projectIdCounter, title, description, startDate, endDate, budget };
  projects.push(newProject);
  projectIdCounter++;
  
  localStorage.setItem("projectIdCounter", JSON.stringify(projectIdCounter));
  alert('Projet ajoutée');

  resetForm();
  saveData();
}

// Read Projects
function getProjects() {
  tableBody.innerHTML = "";
  projects.forEach((project, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${project.id}</td>
      <td>${project.title}</td>
      <td>${project.description}</td>
      <td>${project.startDate}</td>
      <td>${project.endDate}</td>
      <td>${project.budget}</td>
      <td>
        <button class="edit-btn" onclick="showUpdateProject(${index})">Modifier</button>
        <button class="delete-btn" onclick="deleteProject(${index})">Supprimer</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Update Project
function updateProject() {
  const project = projects[currentProjectIndex];
  project.title = titleInput.value;
  project.description = descriptionInput.value;
  project.startDate = startDateInput.value;
  project.endDate = endDateInput.value;
  project.budget = budgetInput.value;
  
  saveData();
  resetUpdate();
}

// Show Update Form
function showUpdateProject(index) {
  currentProjectIndex = index;
  const project = projects[index];
  titleInput.value = project.title;
  descriptionInput.value = project.description;
  startDateInput.value = project.startDate;
  endDateInput.value = project.endDate;
  budgetInput.value = project.budget;

  addBtn.style.display = "none";
  updateBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
}

// Save Data to localStorage
function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
  getProjects();
}

// Delete Project
function deleteProject(index) {
  projects.splice(index, 1);
  saveData();
}

// Reset Form to Default
function resetForm() {
  titleInput.value = "";
  descriptionInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  budgetInput.value = "";
}
function resetUpdate() {
  resetForm();
  addBtn.style.display = "inline";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  currentProjectIndex = null; // Reset l'index du projet actuellement sélectionné pour la mise à jour
}



addBtn.addEventListener("click", createProject);
updateBtn.addEventListener("click", updateProject);
cancelBtn.addEventListener("click", resetUpdate);
