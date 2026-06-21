import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (email) => {
    try {
      await api.patch(`/users/${email}`, {
        role: "admin",
      });

      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Role:</b> {user.role}
              </p>
            </div>

            <button
              onClick={() => makeAdmin(user.email)}
              className="btn btn-primary"
            >
              Make Admin
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;