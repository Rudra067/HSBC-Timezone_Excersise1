import React, { useState, useEffect} from 'react';
import Select from 'react-select';
import TimeZone from './TimeZone';

export default function ZoneList() {
    const [zoneList, setZoneList] = useState([]);
    const [zone, setZone] = useState('Europe/London');
    const [countryName, setCountryName] = useState('United Kingdom');
    const [selectedZome, setSelectedZone] = useState('');

    // Create a zone object of label and value for select dropdown
    function createZoneObj(zones) {
        const zoneArray = zones.map((zone) => {
            const zoneName = zone.zoneName.replace(/\\\//g, "/");
            return {
                label: zone.countryName,
                value: zoneName
            }
        });
        setZoneList(zoneArray);
        setSelectedZone({
            label: 'United Kingdom',
            value: 'London'
        })
    }

    // Call the api to get all the europe zones while mounting
    useEffect(() => {
      fetch('http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*')
        .then(response => response.json())
        .then(res => createZoneObj(res.zones))
    }, [])

    // Assigns/Set value(s) zone on change of select dropdown for zones
    function handleZoneChange(event) {
        setSelectedZone(event);
        setZone(event.value);
        setCountryName(event.label);
        
    }

    return (
       <div className="container">
           <div className="zone-section select-section">
               <label>Europe Countries: </label>
                <Select
                    value = {selectedZome}
                    options={zoneList}
                    onChange={handleZoneChange}
                />
           </div>
           <div className="zone-section timezone-section">
               <h4>Current Local Time of {countryName} in {zone.split("/")[1]} zone is :</h4>
                <TimeZone
                   zoneName= {zone}
                />
           </div>
           
       </div>
    )
}