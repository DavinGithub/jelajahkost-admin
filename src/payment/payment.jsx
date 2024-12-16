import { useState, useEffect } from 'react';
import Sidebar from '../layout/sidebar';

const Payment = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // Get token from localStorage or your auth management system
        const token = localStorage.getItem('access_token'); // Adjust this based on where you store your token
        
        const response = await fetch('https://bpkbautodigital.com/api/kost/invoices', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          // Handle unauthorized access or other HTTP errors
          if (response.status === 401) {
            setError('Unauthorized access. Please login again.');
            // Optionally redirect to login page or refresh token
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          setInvoices(data.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Error fetching invoices');
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Kost Payment Details</h2>
          </div>

          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-4 px-4">No</th>
                    <th className="pb-4 px-4">Name</th>
                    <th className="pb-4 px-4">Phone Number</th>
                    <th className="pb-4 px-4">Email</th>
                    <th className="pb-4 px-4">Check In</th>
                    <th className="pb-4 px-4">Total Price</th>
                    <th className="pb-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} className="border-t">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">{invoice.name}</td>
                      <td className="py-4 px-4">{invoice.phone_number}</td>
                      <td className="py-4 px-4">{invoice.email}</td>
                      <td className="py-4 px-4">{invoice.check_in}</td>
                      <td className="py-4 px-4">
                        {invoice.total_price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;