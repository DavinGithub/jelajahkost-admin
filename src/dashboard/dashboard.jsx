// src/dashboard/Dashboard.jsx
import { Users, Package, TrendingUp, Clock, Edit, Eye } from 'lucide-react';
import Sidebar from '../layout/sidebar';
import React, { useEffect, useState } from 'react'; 
import DashboardModal from './dashboardmodal';

const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <p className={`text-sm mt-2 flex items-center ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {changeType === 'up' ? '↑' : '↓'} {change}
        </p>
      </div>
      <div className={`p-3 rounded-full ${title === 'Total User' ? 'bg-blue-50' : title === 'Total Order' ? 'bg-yellow-50' : title === 'Total Sales' ? 'bg-green-50' : 'bg-red-50'}`}>
        <Icon className={title === 'Total User' ? 'text-blue-500' : title === 'Total Order' ? 'text-yellow-500' : title === 'Total Sales' ? 'text-green-500' : 'text-red-500'} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [kosts, setKosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to toggle modal
  const [selectedKost, setSelectedKost] = useState(null); // State for selected kost
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    phone_number: '',
    image: '',
    description: '',
    address: '',
    city: '',
    regency: '',
    kost_type: 'kost_reguler',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchKosts = async () => {
      const response = await fetch('https://bpkbautodigital.com/api/kost');
      const data = await response.json();
      if (data.status === 'success') {
        setKosts(data.data);
      }
    };
    fetchKosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);  // Handle the form submission here
  };

  const handleDetailClick = (id) => {
    const fetchKostDetail = async () => {
      const response = await fetch(`https://bpkbautodigital.com/api/kost/detail/${id}`);
      const data = await response.json();
      if (data.status === 'success') {
        setSelectedKost(data.data); // Set selected kost data
        setIsModalOpen(true); // Open modal
      }
    };
    fetchKostDetail();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total User" 
            value="0" 
            icon={Users}
            change="8.5% Up from yesterday"
            changeType="up"
          />
          <StatCard 
            title="Total Order" 
            value="0" 
            icon={Package}
            change="1.3% Up from past week"
            changeType="up"
          />
          <StatCard 
            title="Total Sales" 
            value="$0" 
            icon={TrendingUp}
            change="4.3% Down from yesterday"
            changeType="down"
          />
          <StatCard 
            title="Total Pending" 
            value="0" 
            icon={Clock}
            change="1.8% Up from yesterday"
            changeType="up"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Kost Details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-4">No</th>
                  <th className="pb-4">Image</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Owner</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {kosts.map((kost, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4">{index + 1}</td>
                    <td className="py-4">
                      <img src={kost.image} alt={kost.name} className="w-12 h-12 rounded-md object-cover" />
                    </td>
                    <td className="py-4">{kost.name}</td>
                    <td className="py-4">{kost.owner}</td>
                    <td className="py-4">{kost.kost_type}</td>
                    <td className="py-4">{kost.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <DashboardModal 
          isModalOpen={isModalOpen} 
          setIsModalOpen={setIsModalOpen} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
          selectedKost={selectedKost} // Pass selected kost to modal
        />
      </div>
    </div>
  );
};

export default Dashboard;
