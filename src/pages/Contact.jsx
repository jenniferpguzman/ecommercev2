import React, { useState } from 'react';
import '../stylesheets/Contact.css'
import '../stylesheets/Navbar.css'
import '../stylesheets/Footer.css'

//creating my functional component
const Contact = () => {
  //using useState to set state variable as fromData which is the values of the form fields, inititially set to empty strings
  //setFormData is the function that is called to update the formData, when a user types something
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
  });

  const [errors, setErrors] = useState([]); // Add state to track errors

  // Handle form input changes, when user types something into the fields
  //e is event, like typing
  const handleChange = (e) => {
    //extracting input values 
    const { id, value } = e.target; //referring to the specific input field that triggered the event
    //id- indicates what field is being changed
    //value is the input the user is inputting
    setFormData({
      //formData is called in this spread operator , getting the exisiting properties
      ...formData,
      [id]: value, //setting the property of the object based on the input field
      //what user types in the fields will update in the formData
    });
  };

  // Validation function
  const validateForm = () => {
    let errorMessages = [];
    const { firstName, lastName, email, comments } = formData;

    if (!firstName.trim()) {
      errorMessages.push("First name is required.");
    }
    if (!lastName.trim()) {
      errorMessages.push("Last name is required.");
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.trim()) {
      errorMessages.push("Email is required.");
    } else if (!emailRegex.test(email)) {
      errorMessages.push("Enter a valid email address.");
    }

    if (!comments.trim()) {
      errorMessages.push("Please leave a comment.");
    }

    setErrors(errorMessages); // Update errors state

    return errorMessages.length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit the form (you can make an API call here)
      console.log(formData);
    }
  };

  return (
    <div>
      <section className="contact_box">
        <div className="contact_text">
          <p><strong>Location:</strong> 1101 Red Ventures Dr Fort Mill, SC 29707</p>
          <p><strong>Phone Number:</strong> (980)-234-5678</p>
          <p><strong>Email:</strong> jennyspade@gmail.com</p>
        </div>
      </section>

      <div className="form_container">
        <form onSubmit={handleSubmit}>
          <div className="form_box">
            <h1>Contact Us</h1>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              //getting the input field in component state
              value={formData.firstName}
              //onChange will be called when user types in the input field
              //handlechange is the function in my component that updates the formData state
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              //getting the input field in component state
              value={formData.lastName}
              //onChange will be called when user types in the input field
              //handlechange is the function in my component that updates the formData state
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              //getting the input field in component state
              value={formData.email}
            //onChange will be called when user types in the input field
              //handlechange is the function in my component that updates the formData state 
              onChange={handleChange}
            />
            <h3>Leave Us a Comment</h3>
            <textarea
              name="comments"
              id="comments"
              //getting the input field in component state
              value={formData.comments}
              //onChange will be called when user types in the input field
              //handlechange is the function in my component that updates the formData state
              onChange={handleChange}
            ></textarea>
            <input type="submit" value="Send" id="button" />
              {/* Display error messages */}
        {errors.length > 0 && (
          <div id="errorMessages" className="errorMessages">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
          </div>
        </form>
      </div>

      <section className="contact_additional">
        <h2>Monday-Friday 8am-5pm</h2>
        <h4>THE BAG OF YOUR DREAMS IS ONE CLICK AWAY</h4>
      </section>
    </div>
  );
};

export default Contact;