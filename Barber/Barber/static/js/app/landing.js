document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('menu-icon');
    const addSeatButton = document.querySelector('.add-seat');
    const container = document.querySelector('.container');
    let sidebarOpen = false;

    // Example customer queue
    const queue = ["Customer 1", "Customer 2", "Customer 3", "Customer 4"];

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
        const seatContainer = document.createElement('div');
        seatContainer.classList.add('seat-container');

        const seat = document.createElement('div');
        seat.classList.add('seat');

        const deleteButton = document.createElement('div');
        deleteButton.classList.add('delete-seat-btn');
        deleteButton.innerHTML = '&#215;';
        deleteButton.onclick = function () {
            seatContainer.remove();
        };

        // Assign next customer to the seat
        const timeLabel = document.createElement('span');
        if (queue.length > 0) {
            const currentCustomer = queue.shift(); // Remove and assign the first customer in the queue
            timeLabel.innerHTML = `<b>Current Customer: ${currentCustomer}</b>`;
        } else {
            timeLabel.innerHTML = '<b>No Customer</b>';
        }
        timeLabel.classList.add('customer-label');
        seatContainer.appendChild(timeLabel);

        seat.appendChild(deleteButton);
        seatContainer.appendChild(seat);

        const doneButton = document.createElement('button');
        doneButton.classList.add('doneButton');
        doneButton.textContent = 'Done!';
        seatContainer.appendChild(doneButton);

        // Create modal specific to this seat
        const seatModal = createModal(timeLabel, doneButton);
        seatContainer.appendChild(seatModal);

        // Add event listener to open the modal for this seat
        doneButton.addEventListener('click', function () {
            seatModal.style.display = 'block';
        });

        container.appendChild(seatContainer);
    }

    // Function to create a modal
    function createModal(customerLabel, doneButton) {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeModalButton = document.createElement('span');
        closeModalButton.classList.add('close-modal');
        closeModalButton.innerHTML = '&times;';
        closeModalButton.onclick = function () {
            modal.style.display = 'none';
        };

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Payment Status';

        const modalMessage = document.createElement('p');
        modalMessage.textContent = 'Has the customer paid?';

        // Buttons for payment status
        const payDoneButton = document.createElement('button');
        payDoneButton.textContent = 'Pay Done';
        payDoneButton.classList.add('pay-done-btn');
        payDoneButton.onclick = function () {
            handlePayment(true, customerLabel, modal, doneButton);
        };

        const payNotDoneButton = document.createElement('button');
        payNotDoneButton.textContent = 'Pay Not Done';
        payNotDoneButton.classList.add('pay-not-done-btn');
        payNotDoneButton.onclick = function () {
            handlePayment(false, customerLabel, modal, doneButton);
        };

        modalContent.appendChild(closeModalButton);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalMessage);
        modalContent.appendChild(payDoneButton);
        modalContent.appendChild(payNotDoneButton);
        modal.appendChild(modalContent);

        // Add event listener to close the modal when clicking outside of modal content
        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        return modal;
    }

    // Handle payment and update queue
    function handlePayment(paymentDone, customerLabel, modal, doneButton) {
        // Store payment status for the current customer
        console.log(`Customer: ${customerLabel.textContent}, Payment Status: ${paymentDone ? 'Done' : 'Pending'}`);

        // Assign the next customer to the seat
        if (queue.length > 0) {
            const nextCustomer = queue.shift(); // Assign the next customer
            customerLabel.innerHTML = `<b>Current Customer: ${nextCustomer}</b>`;
        } else {
            customerLabel.innerHTML = '<b>No Customer</b>';
            doneButton.disabled = true; // Disable the button if no customers are left
        }

        modal.style.display = 'none';
    }

    addSeatButton.addEventListener('click', addSeat);
    const queue_sidebar = document.getElementById('queue-sidebar');
    const toggleQueueIcon = document.getElementById('queue-icon');
    let queuesidebarOpen = false;

    // Toggle queue sidebar function
    function toggleQueueSidebar() {
        if (!queue_sidebar) {
            console.error('Queue sidebar element not found!');
            return;
        }
        queue_sidebar.style.right = queuesidebarOpen ? '-500px' : '0';
        queuesidebarOpen = !queuesidebarOpen;
    }

    // Toggle sidebar on icon click
    toggleQueueIcon?.addEventListener('click', function (e) {
        toggleQueueSidebar();
        e.stopPropagation();
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
        if (queuesidebarOpen && !queue_sidebar.contains(e.target) && e.target !== toggleQueueIcon) {
            toggleQueueSidebar();
        }
    });

});
