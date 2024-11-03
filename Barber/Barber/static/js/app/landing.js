document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('menu-icon');
    const addSeatButton = document.querySelector('.add-seat'); // Select the "Add Seat" button
    const container = document.querySelector('.container'); // Main container to hold all seats

    let sidebarOpen = false;

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.style.left = sidebarOpen ? '-500px' : '0';
        sidebarOpen = !sidebarOpen;
    }

    toggleIcon.addEventListener('click', function (e) {
        toggleSidebar();
        e.stopPropagation();
    });

    document.addEventListener('click', function (e) {
        if (sidebarOpen && !sidebar.contains(e.target) && e.target !== toggleIcon) {
            toggleSidebar();
        }
    });

    // Function to add a seat
    function addSeat() {
        // Create new seat container
        const seatContainer = document.createElement('div');
        seatContainer.classList.add('seat-container');

        // Create and add seat element
        const seat = document.createElement('div');
        seat.classList.add('seat');

        // Create and add delete button
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('delete-seat-btn');
        deleteButton.innerHTML = '&#215;'; // '×' symbol
        deleteButton.onclick = function () {
            seatContainer.remove(); // Remove seat on delete button click
        };

       

        // Add estimated time label
        const timeLabel = document.createElement('span');
        timeLabel.innerHTML = '<b>Estimated time : 3min</b>';
        seatContainer.appendChild(timeLabel);
            // Append delete button to seat
            seat.appendChild(deleteButton);

            // Append seat and label to seat container
            seatContainer.appendChild(seat);
        // Add partner label
        const partnerLabel = document.createElement('span');
        partnerLabel.textContent = `Partner ${container.children.length}`; // Dynamically number partners
        seatContainer.appendChild(partnerLabel);

        // Add seat container to main container
        container.appendChild(seatContainer);
    }

    // Event listener for adding seat on button click
    addSeatButton.addEventListener('click', addSeat);
});
