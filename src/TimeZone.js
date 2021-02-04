import React, {useState, useEffect} from 'react';

export default function TimeZone({ zoneName }) {

    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    // Get the timezone for the respective zone and set date and time
    function getTimeZone() {
        fetch(`http://api.timezonedb.com/v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${zoneName}`)
        .then(response => response.json())
        .then(res => {
            const filter = res.formatted.split(" ");
            setDate(filter[0]);
            setTime(filter[1]);
        });
    }

    //  Calls the api and sets the interval for 5 sec while mounting and
    //  clears the interval while unmounting
    useEffect(() => {
        getTimeZone();
        const updateTimeInterval = setInterval(getTimeZone, 5000);

        return () => {
            clearInterval(updateTimeInterval);
        }
    }, [])
   return (
       <div className="time-container">
           <span><b>Date:</b> {date}</span>
           <span><b>Time:</b> {time}</span>
       </div>
   )
}