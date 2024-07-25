import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const CreateListing = () => {

    const {user} = useContext(UserContext)
    const email = user.email
  const [formData, setFormData] = useState({
    ownerEmail: email,
    name: '',
    description: '',
    address: '',
    regularPrice: '',
    discountPrice: '',
    bathrooms: '',
    bedrooms: '',
    furnished: false,
    parking: false,
    images: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append('images', formData.images[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        'https://real-estate-marketplace-backend.onrender.com/api/v1/listing/create',
        formDataToSend,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      console.log('Listing created successfully:', response.data);
      navigate('/'); // Redirect to home page or any other page
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* <input 
            type="email" 
            name="ownerEmail" 
            value={formData.ownerEmail} 
            onChange={handleChange} 
            placeholder="Owner Email" 
            className="border p-2 rounded"
            required 
          /> */}
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            className="border p-2 rounded"
            required 
          />
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Description" 
            className="border p-2 rounded"
            required 
          />
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            placeholder="Address" 
            className="border p-2 rounded"
            required 
          />
          <input 
            type="number" 
            name="regularPrice" 
            value={formData.regularPrice} 
            onChange={handleChange} 
            placeholder="Regular Price" 
            className="border p-2 rounded"
            required 
          />
          <input 
            type="number" 
            name="discountPrice" 
            value={formData.discountPrice} 
            onChange={handleChange} 
            placeholder="Discount Price" 
            className="border p-2 rounded"
            required 
          />
          <input 
            type="number" 
            name="bathrooms" 
            value={formData.bathrooms} 
            onChange={handleChange} 
            placeholder="Bathrooms" 
            className="border p-2 rounded"
            required 
          />
          <input 
            type="number" 
            name="bedrooms" 
            value={formData.bedrooms} 
            onChange={handleChange} 
            placeholder="Bedrooms" 
            className="border p-2 rounded"
            required 
          />
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="furnished" 
              checked={formData.furnished} 
              onChange={handleChange} 
              className="mr-2"
            />
            Furnished
          </label>
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="parking" 
              checked={formData.parking} 
              onChange={handleChange} 
              className="mr-2"
            />
            Parking
          </label>
          <input 
            type="file" 
            name="images" 
            multiple 
            onChange={handleChange} 
            className="border p-2 rounded"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 transition"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
