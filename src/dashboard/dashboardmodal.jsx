import React, { useState } from 'react';

const DashboardModal = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    phone_number: '',
    description: '',
    address: '',
    city: '',
    regency: '',
    kost_type: 'kost_reguler'
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      // Append image file
      formDataToSend.append('image', image);

      const response = await fetch('bpkbautodigital.com/api/kost/insert-kost', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to add kost');
      }

      const result = await response.json();
      alert('Kost added successfully!');
      setIsModalOpen(false);
      // Reset form
      setFormData({
        name: '',
        price: '',
        phone_number: '',
        description: '',
        address: '',
        city: '',
        regency: '',
        kost_type: 'kost_reguler'
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error('Error adding kost:', error);
      alert('Failed to add kost. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Add New Kost</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-md"
                />
                {preview && (
                  <div className="mt-2">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <input
                type="text"
                name="name"
                placeholder="Kost Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md h-32"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="regency"
                placeholder="Regency"
                value={formData.regency}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
              <select
                name="kost_type"
                value={formData.kost_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="kost_reguler">Kost Reguler</option>
                <option value="kost_exclusive">Kost Exclusive</option>
              </select>
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

export default DashboardModal;