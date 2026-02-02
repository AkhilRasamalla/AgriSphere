import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterSeed = () => {
  const { user } = useAuth();
  const fileRef = useRef(null);

  const [seedName, setSeedName] = useState('');
  const [seedType, setSeedType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!user) {
      setErrorMessage('Please login first');
      return;
    }

    const formData = new FormData();
    formData.append('seedName', seedName);
    formData.append('seedType', seedType);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('createdBy', user._id);
    formData.append('createdByEmail', user.email);

    try {
      const res = await fetch('http://localhost:5000/api/seeds/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register seed');
      }

      setSuccessMessage('Seed registered successfully');

      // reset form
      setSeedName('');
      setSeedType('');
      setDescription('');
      setImage(null);
      if (fileRef.current) fileRef.current.value = '';

      // auto-hide message
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'black' }}>Register Seed</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Seed Name"
          value={seedName}
          onChange={(e) => setSeedName(e.target.value)}
          required
        />

        <input
          placeholder="Seed Type"
          value={seedType}
          onChange={(e) => setSeedType(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Register Seed</button>
      </form>
    </div>
  );
};

export default RegisterSeed;
