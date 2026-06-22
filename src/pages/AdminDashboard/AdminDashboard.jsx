import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [startups, setStartups] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [tab, setTab] = useState("users");

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStartup, setSelectedStartup] = useState(null);

  // ================= LOAD DATA =================
  const loadAll = async () => {
    try {
      const [s, u, st, t] = await Promise.all([
        api.get("/admin-stats"),
        api.get("/admin/users"),
        api.get("/admin/startups"),
        api.get("/transactions"),
      ]);

      setStats(s.data);
      setUsers(u.data);
      setStartups(st.data);
      setTransactions(t.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // ================= USER ACTIONS =================
  const blockUser = async (id) => {
    await api.patch(`/admin/users/block/${id}`);
    loadAll();
  };

  const unblockUser = async (id) => {
    await api.patch(`/admin/users/unblock/${id}`);
    loadAll();
  };

  // ================= STARTUP ACTIONS =================
  const approveStartup = async (id) => {
    await api.patch(`/admin/startups/approve/${id}`);
    loadAll();
  };

  const deleteStartup = async (id) => {
    await api.delete(`/admin/startups/${id}`);
    loadAll();
  };

  // ================= UI =================
  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      {/* ================= STATS ================= */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white shadow rounded-xl">
            Users {stats.totalUsers}
          </div>
          <div className="p-4 bg-white shadow rounded-xl">
            Startups {stats.totalStartups}
          </div>
          <div className="p-4 bg-white shadow rounded-xl">
            Opportunities {stats.totalOpportunities}
          </div>
          <div className="p-4 bg-white shadow rounded-xl">
            Revenue ${stats.totalRevenue}
          </div>
        </div>
      )}

      {/* ================= TABS ================= */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("users")}
          className={`px-4 py-2 rounded-xl ${
            tab === "users"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setTab("startups")}
          className={`px-4 py-2 rounded-xl ${
            tab === "startups"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Startups
        </button>

        <button
          onClick={() => setTab("transactions")}
          className={`px-4 py-2 rounded-xl ${
            tab === "transactions"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Transactions
        </button>
      </div>

      {/* ================= USERS ================= */}
      {tab === "users" && (
        <div className="grid gap-3">
          {users.map((u) => (
            <div
              key={u._id}
              className="p-4 bg-white rounded-xl shadow flex justify-between"
            >
              <div>
                <p className="font-bold">{u.name}</p>
                <p className="text-sm text-gray-500">
                  {u.email}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedUser(u)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Details
                </button>

                {u.isBlocked ? (
                  <button
                    onClick={() => unblockUser(u._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => blockUser(u._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Block
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= STARTUPS ================= */}
      {tab === "startups" && (
        <div className="grid gap-3">
          {startups.map((s) => (
            <div
              key={s._id}
              className="p-4 bg-white rounded-xl shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">
                  {s.startup_name}
                </h3>
                <p className="text-sm text-gray-500">
                  {s.industry}
                </p>
                <p className="text-xs text-gray-400">
                  Status: {s.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedStartup(s)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  View
                </button>

                {s.status !== "Approved" && (
                  <button
                    onClick={() =>
                      approveStartup(s._id)
                    }
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteStartup(s._id)
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TRANSACTIONS ================= */}
      {tab === "transactions" && (
        <div className="bg-white p-4 rounded-xl shadow">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="border-b py-2 flex justify-between"
            >
              <p>{t.user_email}</p>
              <p>${t.amount}</p>
              <p>
                {new Date(
                  t.paid_at
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ================= USER MODAL ================= */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold mb-3">
              User Details
            </h2>

            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <p>
              Status:{" "}
              {selectedUser.isBlocked
                ? "Blocked"
                : "Active"}
            </p>

            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= STARTUP MODAL ================= */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[450px]">
            <h2 className="text-xl font-bold">
              {selectedStartup.startup_name}
            </h2>

            <img
              src={selectedStartup.logo}
              className="w-full h-40 object-cover rounded mt-3"
            />

            <p className="mt-3">
              Industry: {selectedStartup.industry}
            </p>

            <p>Description: {selectedStartup.description}</p>
            <p>Stage: {selectedStartup.funding_stage}</p>
            <p>Status: {selectedStartup.status}</p>

            <button
              onClick={() => setSelectedStartup(null)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;