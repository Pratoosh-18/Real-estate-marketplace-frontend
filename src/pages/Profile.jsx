import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center space-x-4">
        <img 
          className="w-24 h-24 rounded-full object-cover" 
          src={user.avatar} 
          alt={`${user.username}'s avatar`} 
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-400 text-sm">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800">User ID:</h3>
        <p className="text-gray-600">{user._id}</p>
      </div>
      <div className="mt-6">
        <Link to="/create-listing">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-blue-600 transition">
            Create Listing
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
