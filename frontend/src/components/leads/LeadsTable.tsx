import { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
  id: string;
  name: string;
  phone_number: string;
  email_address: string;
  services_needed: string;
  bot_type: string;
  source: string;
  status: string;
  confidence_score: number;
  createdAt: string;
}

const LeadsTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://ally-agent-crm-cjgecca2a8c9hjfv.eastus2-01.azurewebsites.net/api/contacts")
      .then((res) => {
        console.log("API Response:", res.data);
        // Normalize response: Convert single object or array to array
        const data = Array.isArray(res.data) ? res.data : [res.data].filter(Boolean);
        setContacts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contacts", err);
        setError("Failed to load contacts. Please try again later.");
        setContacts([]);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse bg-white dark:bg-gray-900 dark:text-gray-100">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Phone</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Email</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Services Needed</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Bot Type</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Source</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Status</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Confidence Score</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Created At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.name}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.phone_number}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.email_address}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.services_needed}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.bot_type}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.source}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.status}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">{c.confidence_score}</td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && (
          <p className="text-center p-4 text-gray-500 dark:text-gray-400">
            No contacts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default LeadsTable;