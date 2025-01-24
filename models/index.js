document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guest-form');
    const guestTable = document.getElementById('guest-table').getElementsByTagName('tbody')[0];

    // Load stored guests from localStorage (if any)
    const loadGuests = () => {
        const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
        storedGuests.forEach(guest => {
            addGuestToTable(guest.name, guest.email, guest.rsvp);
        });
    };

    // Add a new guest to the table
    const addGuestToTable = (name, email, rsvp) => {
        const row = guestTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = email;
        row.insertCell(2).textContent = rsvp;
    };

    // Handle form submission
    guestForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guest-name').value;
        const guestEmail = document.getElementById('guest-email').value;
        const guestRSVP = document.getElementById('guest-rsvp').value;

        // Validate form inputs
        if (!guestName || !guestEmail) {
            alert('Please fill in both name and email.');
            return;
        }

        // Add the new guest to the table
        addGuestToTable(guestName, guestEmail, guestRSVP);

        // Save the guest to localStorage
        const newGuest = {
            name: guestName,
            email: guestEmail,
            rsvp: guestRSVP
        };

        const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
        storedGuests.push(newGuest);
        localStorage.setItem('guests', JSON.stringify(storedGuests));

        // Clear the form
        guestForm.reset();
    });

    // Initial loading of guests when the page loads
    loadGuests();
});
