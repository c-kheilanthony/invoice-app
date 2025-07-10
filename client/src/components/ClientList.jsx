import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleCreate = async () => {
    if (!newClient.name || !newClient.email || !newClient.address) {
      toast.error("All fields are required");
      return;
    }
    if (!isValidEmail(newClient.email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/clients",
        newClient
      );
      toast.success("Client successfully created!");
      setClients((prev) => [...prev, res.data]);
      setNewClient({ name: "", email: "", address: "" });
    } catch (err) {
      console.error("Creation failed", err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEdit = (client) => {
    setEditingId(client._id);
    setForm({
      name: client.name,
      email: client.email,
      address: client.address,
    });
  };

  const handleUpdate = async () => {
    if (!form.name || !form.email || !form.address) {
      toast.error("All fields are required");
      return;
    }
    if (!isValidEmail(form.email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      await axios.patch(`http://localhost:5000/api/clients/${editingId}`, form);

      setClients((prev) =>
        prev.map((c) => (c._id === editingId ? { ...c, ...form } : c))
      );
      setEditingId(null);
      setForm({ name: "", email: "", address: "" });
      toast.success("Client updated successfully!");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update client");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-gray-900 dark:text-gray-100">
      <div className="mb-6 space-y-2">
        <h3 className="text-lg font-semibold">Add New Client</h3>
        <input
          type="text"
          placeholder="Name"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          className="w-full p-2 border dark:border-gray-600 dark:bg-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          value={newClient.email}
          onChange={(e) =>
            setNewClient({ ...newClient, email: e.target.value })
          }
          className="w-full p-2 border dark:border-gray-600 dark:bg-gray-700"
        />
        <input
          type="text"
          placeholder="Address"
          value={newClient.address}
          onChange={(e) =>
            setNewClient({ ...newClient, address: e.target.value })
          }
          className="w-full p-2 border dark:border-gray-600 dark:bg-gray-700"
        />
        <button
          onClick={handleCreate}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Client
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">Client List</h2>
      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client._id}
            className="p-4 border rounded-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
          >
            {editingId === client._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2 border dark:border-gray-600 dark:bg-gray-700"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2 border dark:border-gray-600 dark:bg-gray-700"
                />
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full p-2 border dark:border-gray-600 dark:bg-gray-700"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p>
                  <strong>{client.name}</strong>
                </p>
                <p className="text-sm">{client.email}</p>
                <p className="text-sm">{client.address}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="px-2 py-1 text-sm bg-blue-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(client._id)}
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {deleteTarget && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md text-center">
              <p className="mb-4 text-gray-800 dark:text-white">
                Are you sure you want to delete this client?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `http://localhost:5000/api/clients/${deleteTarget}`
                      );
                      setClients((prev) =>
                        prev.filter((c) => c._id !== deleteTarget)
                      );
                      toast.success("Client deleted");
                    } catch (err) {
                      toast.error("Failed to delete client");
                    } finally {
                      setDeleteTarget(null);
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
