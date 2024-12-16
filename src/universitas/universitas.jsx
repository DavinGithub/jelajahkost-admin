import { useState, useEffect } from 'react';
import Sidebar from '../layout/sidebar';
import UnivModal from './universitasmodal.jsx';

const Universitas = () => {
  const [universities, setUniversities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Tambahkan state untuk modal

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('https://bpkbautodigital.com/api/university');
        const data = await response.json();
        if (data.status === 'success') {
          setUniversities(data.data);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Kost Details</h2>
            <button
              className="bg-blue-500 text-white p-2 rounded-lg"
              onClick={() => setIsModalOpen(true)} // Buka modal saat tombol ditekan
            >
              Tambah Universitas
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-4">No</th>
                  <th className="pb-4">Universitas</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((university, index) => (
                  <tr key={university.id} className="border-t">
                    <td className="py-4">{index + 1}</td>
                    <td>{university.university}</td>
                  </tr>
                ))}
                {universities.length === 0 && (
                  <tr>
                    <td colSpan="2" className="py-4 text-center text-gray-500">
                      Tidak ada data universitas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <UnivModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Universitas;
