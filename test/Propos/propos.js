
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

  