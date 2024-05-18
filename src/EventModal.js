import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { IoPersonOutline } from "react-icons/io5";
import { CiStickyNote } from "react-icons/ci";
import { LuSendHorizonal } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EventModal.css';

const EventModal = ({ event, people }) => {
    const [details, setDetails] = useState(event.details);
    const [comments, setComments] = useState(event.comments || []);
    const [newComment, setNewComment] = useState('');
    const [assignedPerson, setAssignedPerson] = useState(event.assignedPerson || '');
    const [note, setNote] = useState(event.note || '');
    const [isComplete, setIsComplete] = useState(event.status === 'complete');

    const handleCommentAdd = () => {
        
        const comment = { id:getPersonNameById(assignedPerson),text: newComment, author: 'Jane Smith' }; // Example author
        setComments([...comments, comment]);
        setNewComment('');
    };

    const handleCommentEdit = (index, newText) => {
        const updatedComments = comments.map((comment, i) =>
            i === index ? { ...comment, text: newText } : comment
        );
        setComments(updatedComments);
    };
    const handleCommentDelete = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
    };
    const handleComplete = () => {
        setIsComplete(true);
    };

    useEffect(() => {
        // Handle the update to the server or state here
    }, [details, assignedPerson, note, comments, isComplete]);

    const getPersonNameById = (id) => {
        const person = people.find(p => p.id === id);
        return person ? person.name : '';
    };
    const [date, setDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
    return (
        <div className="event-modal">
            <button className="complete-btn" onClick={handleComplete}>
                { <TiTick />}
            </button>
            <button className="delete-btn"><RiDeleteBin6Line /></button><br></br><br></br>
            <div className="border1"><input
                type="text"
                className="event-title"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
            /></div><br></br>
            <div className="event-date">
            <div className="border2">
            <div className="calender"onClick={toggleEditing}><CiCalendar /></div>
            <div className="date">{isEditing ? (
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMM d, yyyy 'at' h:mm aa"
        />
      ) : (
        <span onClick={toggleEditing}>
          {date.toLocaleString([], {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </span>
      )}
      </div>
      </div>
            </div>
            <div className="assign-section">
            <div className="profile-icon"><IoPersonOutline /></div>
                <label className="font">Assign to:</label>
                <div className='dropdown'>
                <img className="img" src={`https://randomuser.me/api/portraits/thumb/men/${assignedPerson}.jpg`} alt="Person" />
                <select className="lol"value={assignedPerson} onChange={(e) => setAssignedPerson(e.target.value)}>
                    {people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                </div>
            </div>
            <div className="note-section">
            <div className="note"><CiStickyNote /></div>
            <label className="font">Note:</label>
                <textarea
                className='addnote'
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                />
            </div>
            <hr className="hr" ></hr>
            <div className="comments-section">
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                        <img src={`https://randomuser.me/api/portraits/thumb/men/${assignedPerson}.jpg`} alt="Person" />
                            <span>{getPersonNameById(assignedPerson)}</span>
                            <div className='incmt'>
                            <textarea
                                type="text"
                                value={comment.text}
                                onChange={(e) => handleCommentEdit(index, e.target.value)}
                            />
                            </div>
                            <div className='delbut'>
                             <button onClick={() => handleCommentDelete(comment.id)}><RiDeleteBin6Line /></button></div>
                        </li>
                    ))}
                </ul>
                <div className='lo'><img src={`https://randomuser.me/api/portraits/thumb/men/${assignedPerson}.jpg`} alt="Person" /></div>
                
                <input
                className="cmt"
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write comment..."
                />
                <button className="send" onClick={handleCommentAdd}><LuSendHorizonal /></button>
            </div>
        </div>
    );
};

export default EventModal;
