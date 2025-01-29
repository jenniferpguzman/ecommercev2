import React, { useState } from 'react';
import '../stylesheets/Contact.css'
import '../stylesheets/Navbar.css'
import '../stylesheets/Footer.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
  });

  const [errors, setErrors] = useState([]); // Add state to track errors

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
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
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <h3>Leave Us a Comment</h3>
            <textarea
              name="comments"
              id="comments"
              value={formData.comments}
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