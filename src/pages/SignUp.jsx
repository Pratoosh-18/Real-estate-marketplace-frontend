import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [coverImg, setCoverImg] = useState(null);
  const [coverImgPreview, setCoverImgPreview] = useState(null);
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();

  const handleCoverImgChange = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
    setCoverImgPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('coverImg', coverImg);

    try {
      const response = await axios.post("https://real-estate-marketplace-backend.onrender.com/api/v1/user/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('Response:', response.data);
      setError('');
      toast.success('You are sigined up !', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      navigate("/login")
      
    } catch (err) {
      setIsLoading(false)
      setError('Error creating account');
      console.error('Error:', err);
    }
  };

  return (
    <div className="flex mb-10 items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full mb-10 max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImg">
              Profile Photo
            </label>
            <input
              type="file"
              id="coverImg"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleCoverImgChange}
              required
            />
          </div>
          {coverImgPreview && (
            <div className="mb-4 w-full items-center flex justify-center">
              <img src={coverImgPreview} alt="Profile Preview" className="w-[150px] h-[150px] object-cover rounded-lg" />
            </div>
          )}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            {
              isLoading?<div
              type="submit"
              className="w-full flex justify-center items-center bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Loading ...
            </div>:<button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            }
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
