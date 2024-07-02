<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

## Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-​end UI products with attention to details, cross-browser compatibility, standards, and  reusability.


## Assignment

The goal of this exercise is to create a demo calendar application using React.

You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:
<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/CalendarSample.png"/>
</div>

## Mandatory features
 - Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.
 - Ability to edit reminders - including changing text, city, day and time.
 - Add a weather service call from [MetaWeather](https://www.metaweather.com/), [AccuWeather](https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/daily/5day/%7BlocationKey%7D) or [VisualCrossing](https://www.visualcrossing.com/weather/weather-data-services#/login) and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

## Bonus (Optional)

- Expand the calendar to support more than the current month or year.
- Properly handle overflow when multiple reminders appear on the same date.
- Unit test the functionality: *Ability to add "*reminders*" (max. 30 characters) for a day and time specified by the user. Also, include a city.*

## Considerations

 - Show us in the Readme all relevant information about your project.
 - The project is completely focused on Front-end. Ignore the Back-end.
 - Create your Calendar using the route `/calendar`
 - Feel free to use small helper libraries for:
 -- UI Elements.
 -- Date/Time handling.
 - **You must create the calendar component yourself**. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
 - Provide working API keys to any external API you use.
 - We have implemented Redux thunk for state management, but you may use any state manager you are familiar with.
 - Show us your capabilities on CSS and styling, if possible.

# How to deploy

 - Run `npm install` | `yarn install` to install all dependencies.
 - Run `npm start`   | `yarn run` to run the app locally.
 - You can find the project running on `localhost:3000`.

# Reminder

<div align="center">
    <img width="442" alt="image" src="https://github.com/Willikox/calendarioRedux/assets/38199474/4737d236-439f-4b13-9715-5ee54fe3a37a">
</div>

A data entry was created and can be observed within the indicated date. It is controlled by month in such a way that, if you want to enter a reminder in a specific month and year, the reminder will be there, and the data entry will be cleared. Reminders cannot exceed 30 characters.

If the reminder is set outside the current month, it can be seen in a shaded color, and by clicking on the shaded color, it will direct you to that month for modification.

# More Reminders

<div align="center">
    <img width="442" alt="image" src="https://github.com/Willikox/calendarioRedux/assets/38199474/da5141dd-a987-4341-bcbf-756847057afb">
</div>

By clicking, the information is retrieved, which can be modified such as the reminder, date, time, and city. If you do not want to modify and want a new reminder instead, you can click on an empty box in the calendar, and the data will be cleared.

The way to control more reminders is by clicking the '+3 more' button since I have 3 reminders, and according to the amount, you can see the number; which allows you to see the reminders made and ordered by time. Additionally, if I create a reminder, it will always be shown in the calendar at the earliest time.

# edit multiple reminders

<div align="center">
    <img width="442" alt="image" src="https://github.com/Willikox/calendarioRedux/assets/38199474/a50e0e29-2de9-4281-8fe8-d69bfa5a2f43">
</div>

In a modal, we can see all the reminders, and when hovering over them, they are selected thanks to the cursor pointer, and the color changes to select which one we want to modify. We select it, and the modal closes, retrieving the data so we can modify it. If we do not want to modify anything, clicking outside the modal will close it.

`const remindersReducer = (state = [], action) => {
    switch (action.type){
        case 'ADD_REMINDER':
            return [...state, action.payload];
        case 'UPDATE_REMINDER':
            return state.map(r => (r.id === action.payload.id ? action.payload : r));
        default:
            return state;
    }
};

export default remindersReducer;`

`const remindersReducer = (state = [], action) => {
    switch (action.type){
        case 'ADD_REMINDER':
            return [...state, action.payload];
        case 'UPDATE_REMINDER':
            return state.map(r => (r.id === action.payload.id ? action.payload : r));
        default:
            return state;
    }
};

export default remindersReducer;`

`const handleAddReminder = async (e) =>{
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
`
There are some details such as the colors used for the text color, background, etc., which do not allow defining unique styles for this practice. The main focus was the implementation of Redux in the code, which allows us to better synthesize the code when making requests and not have to go through all the code, ideal for large projects. What I did was focus on best practices and divide into parts like editing and data entry. For example, we can see that for an edit, 'editReminder' was used, it will be updated to 'updateReminder', and for an entry, 'addReminder' was used.

# VisualCrossing

`const fetchWeather = async () => {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ecuador?unitGroup=metric&key=5LQWAFGK7VFALAM3SWURFYY8L&contentType=json`);
    const data = await response.json();
    return data.days[0].description;
  }
`
`onst weather = await fetchWeather(newReminder.city, newReminder.date);
    newReminder.weather = weather;
`
The API used is VisualCrossing. By following the steps for API incorporation, we were able to use an address from Ecuador for this example with its included key. A unique key allows us to obtain weather data. In part of the previous code, we can see that through await, we make a request to wait for weather data, which we merge with newReminders.city obtained from fetchWeather.
Feel free to ask if you have any questions about the code. It was submitted as a Fork to the repository, creating a branch, as I did not have access. I appreciate the opportunity and believe it meets the requested criteria, including the Bonuses. Thank you :)

