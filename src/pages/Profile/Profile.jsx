import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { dbUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    image: "",
    skills: "",
    bio: "",
  });

  // load current data
  useEffect(() => {
    if (dbUser) {
      setForm({
        name: dbUser.name || "",
        image: dbUser.image || "",
        skills: dbUser.skills || "",
        bio: dbUser.bio || "",
      });
    }
  }, [dbUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const email = dbUser?.email;

    if (!email) {
      alert("User not loaded yet. Try again.");
      return;
    }

    const payload = {
      name: form.name,
      image: form.image,
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      bio: form.bio,
    };

    await api.patch(`/users/profile/${email}`, payload);

    alert("Profile updated successfully!");

    // better than reload
    window.location.href = "/profile";
  } catch (err) {
    console.log("PROFILE UPDATE ERROR:", err);
    alert(err?.response?.data?.message || "Update failed");
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Update Profile
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-3 rounded-xl"
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-3 rounded-xl"
        />

        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border p-3 rounded-xl"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;