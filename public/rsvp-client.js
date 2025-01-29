document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');

  if (!form) {
      console.error('Error: RSVP form not found in the DOM.');
      return;
  }

  console.log('RSVP Form Found: JavaScript Loaded Successfully.');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const event_id = parseInt(document.querySelector('input[name="event_id"]').value, 10);
      const guest_name = document.getElementById('guest_name').value;
      const guest_email = document.getElementById('guest_email').value;
      const attendingValue = document.querySelector('#attending').value;
      const attending = attendingValue === 'yes'; // Converts "yes" to true and "no" to false

      console.log('Submitting RSVP...');
      console.log('Collected Data:', { event_id, guest_name, guest_email, attending });

      try {
          const response = await fetch('/api/rsvps', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ event_id, guest_name, guest_email, attending }),
          });

          const result = await response.json();
          console.log('Server Response:', result);

          if (response.ok) {
              alert('RSVP created successfully!');
          } else {
              console.error('Error response:', result);
              alert(`Error: ${result.error}`);
          }
      } catch (error) {
          console.error('Fetch Error:', error);
      }
  });
});
