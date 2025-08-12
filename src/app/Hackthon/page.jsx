import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <button
        className="px-6 py-3 m-2 text-white bg-blue-600 rounded"
        onClick={() => navigate('/esummit/hackathon/create')}
      >
        Create Your Team
      </button>
      <button
        className="px-6 py-3 m-2 text-white bg-green-600 rounded"
        onClick={() => navigate('/esummit/hackathon/join')}
      >
        Join a Team
      </button>
    </div>
  );
};