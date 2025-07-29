// Appointment form logic
const form = document.getElementById('bookingForm');
const appointmentsDiv = document.getElementById('appointments');
const API_URL = 'http://localhost:5000/api/appointments';

// Handle form submission
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const name = document.getElementById('patientName').value.trim();
  const email = document.getElementById('patientEmail').value.trim();
  const doctor = document.querySelector('input[name="doctor"]:checked')?.value;
  const date = document.getElementById('appointmentDate').value;

  if (!name || !email || !doctor || !date) {
    appointmentsDiv.innerHTML = '<p class="error">All fields are required.</p>';
    return;
  }

  const appointment = { name, email, doctor, date };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });
    const result = await res.json();
    if (res.ok) {
      appointmentsDiv.innerHTML = '<p style="color:#388e3c; font-weight:500;">Appointment booked successfully!</p>';
      form.reset();
      showAppointments();
    } else {
      appointmentsDiv.innerHTML = `<p class="error">❌ Error: ${result.error || 'Failed to book appointment.'}</p>`;
    }
  } catch (err) {
    appointmentsDiv.innerHTML = '<p class="error">⚠️ Network error. Is your server running?</p>';
  }
});

// Fetch and display appointments
async function showAppointments() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch appointments');
    const appointments = await res.json();
    if (!appointments.length) {
      appointmentsDiv.innerHTML = '<p style="color:#789;">No appointments yet.</p>';
      return;
    }
    appointmentsDiv.innerHTML = appointments.map(a =>
      `<div class="appointment">
        <div><strong>Name:</strong> ${a.name}</div>
        <div><strong>Email:</strong> ${a.email}</div>
        <div><strong>Doctor:</strong> ${a.doctor}</div>
        <div><strong>Date:</strong> ${a.date}</div>
      </div>`
    ).join('');
  } catch (err) {
    appointmentsDiv.innerHTML = `<p class="error">${err.message}</p>`;
  }
}

document.getElementById('clearBtn').onclick = () => {
  document.getElementById('appointments').innerHTML = '';
}

window.onload = showAppointments;
