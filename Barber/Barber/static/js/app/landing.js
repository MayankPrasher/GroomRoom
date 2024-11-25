document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const queue_sidebar = document.getElementById('queue-sidebar');
    const toggleIcon = document.getElementById('menu-icon');
    const toggleQueueIcon = document.getElementById('queue-icon');
    const addSeatButton = document.querySelector('.add-seat');
    const container = document.querySelector('.container');
    const upcomingPersonsList = document.getElementById('upcoming-persons-list');
    const nextPersonContainer = document.getElementById('next-person-container');

    let sidebarOpen = false;
    let queueSidebarOpen = false;

    // Example customer queue
    const queue = ["Customer 1", "Customer 2", "Customer 3", "Customer 4"];

    // Function to render the updated queue
    function renderQueue() {
        nextPersonContainer.innerHTML = ""; // Clear existing content
        upcomingPersonsList.innerHTML = ""; // Clear existing queue display
    
        if (queue.length > 0) {
            nextPersonContainer.innerHTML = `
                <div class="next-person">
                    <div class="next-person-profile-pic"></div>
                    <h3 class="next-person-name">
                        <center>${queue[0]}</center>
                        <center style="font-size:12px;letter-spacing:0.7px;">Estimated time: 10min</center>
                    </h3>
                    <button class="person-discard-btn">&#215;</button>
                </div>`;
            
            // Add event listener for discard button
            const discardButton = nextPersonContainer.querySelector('.person-discard-btn');
            discardButton.addEventListener('click', function () {
                discardPerson();
            });
        } else {
            nextPersonContainer.innerHTML = `
                <div class="next-person">
                    <div class="next-person-profile-pic" style="opacity:0;"></div>
                    <h3 class="next-person-name">
                        <center>All Done!!</center>
                        <center style="font-size:12px;letter-spacing:0.7px;opacity:0;">Estimated time: 10min</center>
                    </h3>
                    <button class="person-discard-btn" style="opacity:0;">&#215;</button>
                </div>`;
        }
    
        for (let i = 1; i < queue.length; i++) {
            upcomingPersonsList.innerHTML += `
                <div class="person-in-queue">
                    <div class="person-in-queue-profile-pic"></div>
                    <h5 class="person-in-queue-name">
                        <center>${queue[i]}</center>
                        <center style="font-size:12px;letter-spacing:0.7px;">Estimated time: 10min</center>
                    </h5>
                </div>`;
        }
    }

    // Initial render of the queue
    renderQueue();
    function discardPerson() {
        if (queue.length > 0) {
            const discardedPerson = queue.shift(); // Remove the first person from the queue
            console.log(`Discarded: ${discardedPerson}`); // Optional: Log the discarded person
            renderQueue(); // Update the queue display
        } else {
            alert('No customers to discard!');
        }
    }
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.style.left = sidebarOpen ? '-500px' : '0';
        sidebarOpen = !sidebarOpen;
    }

    // Toggle queue sidebar function
    function toggleQueueSidebar() {
        queue_sidebar.style.top = queueSidebarOpen ? '-5000px' : '0';
        queueSidebarOpen = !queueSidebarOpen;
    }

    // Toggle left sidebar on icon click
    toggleIcon.addEventListener('click', function (e) {
        toggleSidebar();
        e.stopPropagation();
    });

    // Toggle right queue sidebar on icon click
    toggleQueueIcon.addEventListener('click', function (e) {
        toggleQueueSidebar();
        e.stopPropagation();
    });

    // Close sidebars when clicking outside
    document.addEventListener('click', function (e) {
        if (sidebarOpen && !sidebar.contains(e.target) && e.target !== toggleIcon) {
            toggleSidebar();
        }
        if (queueSidebarOpen && !queue_sidebar.contains(e.target) && e.target !== toggleQueueIcon) {
            toggleQueueSidebar();
        }
    });

    // Function to add a seat
    function addSeat() {
        if (queue.length === 0) {
            alert('No customers in the queue!');
            return;
        }

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
        const currentCustomer = queue.shift(); // Remove and assign the first customer in the queue
        timeLabel.innerHTML = `<b>Current Customer: ${currentCustomer}</b>`;
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

        // Update the queue display
        renderQueue();
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
        console.log(`Customer: ${customerLabel.textContent}, Payment Status: ${paymentDone ? 'Done' : 'Pending'}`);

        // Assign the next customer to the seat
        if (queue.length > 0) {
            const nextCustomer = queue.shift(); // Assign the next customer
            customerLabel.innerHTML = `<b>Current Customer: ${nextCustomer}</b>`;
        } else {
            customerLabel.innerHTML = '<b>No Customer</b>';
            doneButton.disabled = true; // Disable the button if no customers are left
        }

        // Update the queue display
        renderQueue();

        modal.style.display = 'none';
    }

    // Add event listener for adding seats
    addSeatButton.addEventListener('click', addSeat);
});
