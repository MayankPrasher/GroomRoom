document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('menu-icon');
    let sidebarOpen = false;

    toggleIcon.addEventListener('click', function () {
        if (sidebarOpen) {
            // Move sidebar off-screen
            sidebar.style.left = '-250px';
        } else {
            // Bring sidebar on-screen
            sidebar.style.left = '0';
        }
        // Toggle sidebar state
        sidebarOpen = !sidebarOpen;
    });
});