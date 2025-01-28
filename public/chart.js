window.onload = function() {
    const rsvpData = {
        attending: 15,  
        notAttending: 5, 
        totalGuests: 20  
    };

    
    const ctx = document.getElementById('rsvpChart').getContext('2d');

   
    const rsvpChart = new Chart(ctx, {
        type: 'pie',  
        data: {
            labels: ['Attending', 'Not Attending'],  
            datasets: [{
                label: 'RSVP Status',
                data: [rsvpData.attending, rsvpData.notAttending],  
                backgroundColor: ['#36A2EB', '#FF6384'],  
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} guests`;
                        }
                    }
                }
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guest-form');
    const guestTable = document.getElementById('guest-table').getElementsByTagName('tbody')[0];

   
    const loadGuests = () => {
        const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
        storedGuests.forEach(guest => {
            addGuestToTable(guest.name, guest.email, guest.rsvp);
        });
    };

    
    const addGuestToTable = (name, email, rsvp) => {
        const row = guestTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = email;
        row.insertCell(2).textContent = rsvp;
    };

    
    guestForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guest-name').value;
        const guestEmail = document.getElementById('guest-email').value;
        const guestRSVP = document.getElementById('guest-rsvp').value;

        
        if (!guestName || !guestEmail) {
            alert('Please fill in both name and email.');
            return;
        }

       
        addGuestToTable(guestName, guestEmail, guestRSVP);

        
        const newGuest = {
            name: guestName,
            email: guestEmail,
            rsvp: guestRSVP
        };

        const storedGuests = JSON.parse(localStorage.getItem('guests')) || [];
        storedGuests.push(newGuest);
        localStorage.setItem('guests', JSON.stringify(storedGuests));

        
        guestForm.reset();
    });

    
    loadGuests();
});