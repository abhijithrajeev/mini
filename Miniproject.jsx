// Home.jsx
import React, { useState } from 'react';
import LocationImage from './Images/LocationImage.png'; // Importing the image

const Home = () => {
  // State to manage hostel/accommodation houses data
  const [houses, setHouses] = useState([]);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    vacancies: 0,
    contact: ''
  });

  // State to manage editing mode
  const [editMode, setEditMode] = useState(null);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode !== null) {
      // If editMode is not null, update the existing house
      const updatedHouses = houses.map(house =>
        house.id === editMode ? { ...house, ...formData } : house
      );
      setHouses(updatedHouses);
      setEditMode(null);
    } else {
      // Generate a unique ID for the new house
      const newId = houses.length + 1;
      // Create a new house object with form data
      const newHouse = { id: newId, ...formData };
      // Add the new house to the houses array
      setHouses([...houses, newHouse]);
    }
    // Reset the form data
    setFormData({
      name: '',
      location: '',
      vacancies: 0,
      contact: ''
    });
  };

  // Function to set edit mode for a specific house
  const setEdit = (id) => {
    const houseToEdit = houses.find(house => house.id === id);
    setFormData(houseToEdit);
    setEditMode(id);
  };

  // Function to delete a house
  const handleDelete = (id) => {
    const updatedHouses = houses.filter(house => house.id !== id);
    setHouses(updatedHouses);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="admin-info">
          <span className='intro'>Welcome, Admin</span>
          {/* Add your admin name here */}
          <img src="https://s.tmimgcdn.com/scr/1200x750/316500/youtube-logo-template-mrbeast_316521-original.png" alt="Admin Icon" className="admin-icon" />
          {/* Replace 'admin-icon.png' with the path to your admin icon */}
        </div>
      </nav>

      {/* Main content */}
      <div className="container">
        <div className='owner-heading'>
            <h1>Owner's Side</h1>
        </div>
        {/* Form to add a new hostel/accommodation house */}
        <form onSubmit={handleSubmit} className="form-container">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
          <label htmlFor="vacancies">Vacancies:</label>
          <input type="number" id="vacancies" name="vacancies" value={formData.vacancies} onChange={handleInputChange} required />
          <label htmlFor="contact">Contact:</label>
          <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleInputChange} required />
          <div className="buttoncontainer"> 
            <button type="submit">{editMode !== null ? 'Update House' : 'Add House'}</button>
          </div>
        </form>
        

        {/* Display the list of hostel/accommodation houses */}
        <h2>Hostel/Accommodation Houses:</h2>
        <div className='hostelinfo'>
          {houses.map((house) => (
            <div key={house.id} className="house-card">
              <div className="house-details">
                <div className="house-name">
                  <h3>{house.name}</h3>
                </div>
                <div className="house-details-middle">
                  <p><a className='loca' href={'https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(house.location)}'} target="_blank" rel="noopener noreferrer">Location <img className='loc-icon' src={LocationImage} alt="" /></a></p>
                </div>
                <div className="house-details-right">
                  <p>Vacancies: {house.vacancies}</p>
                  <p>Contact: {house.contact}</p>
                </div>
              </div>
              <div className="button-container">
                <button className='editButton' onClick={() => setEdit(house.id)}>Edit</button>
                <button className='deleteButton' onClick={() => handleDelete(house.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
