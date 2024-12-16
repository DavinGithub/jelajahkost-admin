import React, { useState } from 'react';

const UnivModal = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    university: '', // Nama universitas
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update state sesuai dengan input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const token = localStorage.getItem('access_token');

      const response = await fetch(
        'https://bpkbautodigital.com/api/university/insert-university',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );
      

      const result = await response.json();
      alert('Universitas berhasil ditambahkan!');
      setIsModalOpen(false); 
      setFormData({
        university: '',
      });
    } catch (error) {
      console.error('Error adding university:', error);
      alert('Gagal menambahkan universitas. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (  
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Tambah Universitas</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="university"
                placeholder="Nama Universitas"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UnivModal;
