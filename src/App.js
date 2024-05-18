import React from 'react';
import EventModal from './EventModal';

const App = () => {
    const event = {
        details: 'Flower Arrangement',
        assignedPerson: '1', // Assuming person ID for Jane Smith
        note: '09382049832\nwww.flowervendor.com',
        comments: [
            { text: 'Thanks for assigning me on the task. We’ll get the details ironed out.', author: 'Jane Smith' },
        ],
        status: 'pending',
    };

    const people = [
        { id: '1', name: 'Jane Smith' },
        { id: '2', name: 'John Doe' },
        { id: '3', name: 'Alice Johnson' },
    ];

    return (
        <div className="App">
            <EventModal event={event} people={people} />
        </div>
    );
};

export default App;
