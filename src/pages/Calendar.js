import React from "react";
import { useState } from 'react';
import { connect } from 'react-redux';

function Calendar({ reminders, editReminder, addReminder, updateReminder, setEditReminder, clearEditReminder }) {

  const date = new Date();
  const initialYear = date.getFullYear();
  const initialMonth = date.getMonth();
  
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [selectedDayReminders, setSelectedDayReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchWeather = async () => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ecuador?unitGroup=metric&key=5LQWAFGK7VFALAM3SWURFYY8L&contentType=json`);
    const data = await response.json();
    return data.days[0].description;
  }

  const handleAddReminder = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReminder = {
      id: editReminder ? editReminder.id : Date.now(),
      text: formData.get('text'),
      date: formData.get('date'),
      time: formData.get('time'),
      city: formData.get('city')
    };
    const weather = await fetchWeather(newReminder.city, newReminder.date);
    newReminder.weather = weather;
    if (editReminder){
      updateReminder(newReminder)
      clearEditReminder();
    }else {
      addReminder(newReminder)
    };
    e.target.reset();
  };

  const handleEdit = (reminder) => {
    setEditReminder(reminder)
  }

  const handleCancelEdit = () => {
    clearEditReminder(null);
  }

  const navigateToMonth = (dateString) => {
    const [y, m] = dateString.split('-');
    setCurrentMonth(parseInt(m, 10) -1);
    setCurrentYear(parseInt(y, 10))
  }

  const navigateToNextYear = () => {
    setCurrentYear(currentYear + 1);
  }

  const navigateToPreviousYear = () => {
    setCurrentYear(currentYear -1);
  }

  const handleDayClick = (dayReminders) => {
    setSelectedDayReminders(dayReminders);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const handleSelectReminder = (reminder) => {
    setEditReminder(reminder);
    closeModal();
  }

  const monthNames = ["January", "Frebuary", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"]

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = [];
  for (let i = firstDayOfMonth -1; i >= 0; i--){
    const prevDateString = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(daysInLastMonth - i).padStart(2, '0')}`;
    const prevReminders = reminders.filter(r => r.date === prevDateString);
    prevReminders.sort((a, b) => a.time.localeCompare(b.time));
    calendarDays.push(
      <div key={`prev-${i}`} className="empty-day" onClick={() => navigateToMonth(prevDateString)}>
        <span className="empty-number">{daysInLastMonth - i}</span>
        {prevReminders.slice(0,1).map((reminder, index) =>(
          <div key={index} className="reminder" onClick={() => handleEdit(reminder)}>
            {reminder.text} - {reminder.city} H: {reminder.time} ({reminder.weather})
          </div>
        ))}
        {prevReminders.length >= 2 && (
          <div className="more-reminders" onClick={() => handleDayClick(prevReminders)}>+{prevReminders.length - 1} más</div>
        )}
      </div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++){
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayReminders = reminders.filter(r => r.date === dateString);
    dayReminders.sort((a, b) => a.time.localeCompare(b.time));
    calendarDays.push(
      <div key={day} className="day" onClick={dayReminders.length === 0 ? handleCancelEdit : undefined}>
        <span className="day-number">{day}</span>
          {dayReminders.slice(0, 1).map((reminder, index) => (
            <div key={index} className="reminder" onClick={() => handleEdit(reminder)}>
              {reminder.text} - {reminder.city} H: {reminder.time} ({reminder.weather})
            </div>
        ))}
        {dayReminders.length >= 2 && (
          <div className="more-reminders" onClick={() => handleDayClick(dayReminders)}>+{dayReminders.length - 1} más</div>
        )}
      </div>
    )
  }

  const remainingDays = 42 - calendarDays.length;
  for (let i=1;i <= remainingDays; i++) {
    const nextMonth = currentMonth + 1;
    const nextYear = nextMonth > 11 ? currentYear + 1: currentYear;
    const nextMonthIndex = nextMonth > 11 ? 0 : nextMonth;
    const nextDateString = `${nextYear}-${String(nextMonthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const nextReminders = reminders.filter(r => r.date === nextDateString);
    nextReminders.sort((a, b) => a.time.localeCompare(b.time));
    calendarDays.push(
      <div key={`next-${i}`} className="empty-day" onClick={() => navigateToMonth(nextDateString)}>
        <span className="empty-number">{i}</span>
        {nextReminders.slice(0, 1).map((reminder, index) => (
          <div key={index} className="reminder" onClick={() => handleEdit(reminder)}>
            {reminder.text} - {reminder.city} H: {reminder.time} ({reminder.weather})
          </div>
        ))}
        {nextReminders.length >= 2 && (
          <div className="more-reminders" onClick={() => handleDayClick(nextReminders)}>+{nextReminders.length -1} más</div>
        )}
      </div>
    )
  }

  return (
    <div className="containerCalendar">
      <h1>Calendar</h1>
      <div className="year-navigation">
        <button onClick={navigateToPreviousYear}>Año Anterior</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={navigateToNextYear}>Año Siguinte</button>
      </div>
      <form onSubmit={handleAddReminder}>
        <input name="text" type="text" maxLength={"30"} placeholder="Recordatorio" defaultValue={editReminder ? editReminder.text : ''} required />
        <input name="date" type="date" defaultValue={editReminder ? editReminder.date: ''} required/>
        <input name="time" type="time" defaultValue={editReminder ? editReminder.time: ''} required/>
        <input name="city" type="text" placeholder="Ciudad" defaultValue={editReminder ? editReminder.city : ''} required/>
        <button type="submit">{editReminder ? 'Actualizar Recordatorio' : 'Agregar Recordatorio'}</button>
      </form>
      <div className="calendar-grid">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-header">{day}</div>
        ))}
        {calendarDays}
      </div>
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>Recordatorios</h3>
            {selectedDayReminders.sort((a, b) => a.time.localeCompare(b.time)).map((reminder, index) => (
              <div key={index} className="reminder" onClick={() => handleSelectReminder(reminder)}>
                {reminder.text} - {reminder.city} H: {reminder.time} ({reminder.weather})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProp = state => ({
  reminders: state.reminders,
  editReminder: state.editReminder
});

const mapDispatchToProps = dispatch => ({
  addReminder: reminder => dispatch({ type: 'ADD_REMINDER', payload: reminder }),
  updateReminder: reminder => dispatch({ type: 'UPDATE_REMINDER', payload: reminder }),
  setEditReminder: reminder => dispatch({ type: 'SET_EDIT_REMINDER', payload: reminder }),
  clearEditReminder: () => dispatch({ type: 'CLEAR_EDIT_REMINDER' })
});




export default connect(mapStateToProp, mapDispatchToProps)(Calendar);
