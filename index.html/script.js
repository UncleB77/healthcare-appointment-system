// Appointment form logic
const form = document.getElementById('bookingForm');
const appointmentsDiv = document.getElementById('appointments');

form.addEventListener('submit', function(event) {
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
  let appointments = [];
  try {
    appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  } catch (e) {
    appointments = [];
  }
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  showAppointments();
  form.reset();
  appointmentsDiv.innerHTML = '<p style="color:#388e3c; font-weight:500;">Appointment booked successfully!</p>';
});

function showAppointments() {
  let appointments = [];
  try {
    appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  } catch (e) {
    appointments = [];
  }
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
}

window.onload = showAppointments;
