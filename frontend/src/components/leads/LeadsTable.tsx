// src/components/ContactsTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const LeadsTable = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get("https://aacecrm-apddfadygzcmggct.eastus2-01.azurewebsites.net/api/v1/aace/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error fetching contacts", err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Contacts - (AACE)
      </h1>
      <div className="overflow-x-auto border border-gray-300 dark:border-gray-700 rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse bg-white dark:bg-gray-900 dark:text-gray-100">
          <thead className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Email</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Phone</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Company</th>
              <th className="py-2 px-4 border border-gray-300 dark:border-gray-700">Created At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">
                  {c.first_name} {c.last_name}
                </td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">
                  {c.email}
                </td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">
                  {c.phone}
                </td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">
                  {c.company}
                </td>
                <td className="py-2 px-4 border border-gray-300 dark:border-gray-700">
                  {new Date(c.timestamp).toLocaleString()}
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
