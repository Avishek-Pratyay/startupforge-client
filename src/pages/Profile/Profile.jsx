import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { uploadImage } from "../../utils/imageUpload";
const Profile = () => {
  const { dbUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    image: "",
    imageFile: null,
    skills: "",
    bio: "",
  });

  useEffect(() => {
    if (dbUser) {
      setForm({
        name: dbUser.name || "",
        image: dbUser.image || "",
        skills: Array.isArray(dbUser.skills)
          ? dbUser.skills.join(", ")
          : dbUser.skills || "",
        bio: dbUser.bio || "",
      });
    }
  }, [dbUser]);

  const handleChange = (e) => {
  if (e.target.type === "file") {
    setForm({
      ...form,
      imageFile: e.target.files[0],
    });
  } else {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
};
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const email = dbUser?.email;

      if (!email) {
        toast.error("User information not loaded");
        return;
      }
      let imageUrl = form.image;

if (form.imageFile) {
  imageUrl = await uploadImage(form.imageFile);
}

      const payload = {
        name: form.name,
        image: imageUrl,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        bio: form.bio,
      };

      await api.patch(
        `/users/profile/${email}`,
        payload
      );

      toast.success(
        "Profile updated successfully!"
      );

      setTimeout(() => {
        window.location.href = "/profile";
      }, 1200);

    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message ||
          "Profile update failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Profile Settings
          </h1>

          <p className="text-gray-300 mt-2">
            Keep your profile updated so startups
            and founders can know more about you.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

          {/* IMAGE PREVIEW */}
          <div className="flex justify-center mb-8">
            <img
              src={
  form.image ||
  dbUser?.image ||
  "https://i.ibb.co/4pDNDk1/avatar.png"
}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
            />
          </div>

          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            {/* NAME */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Full Name
              </label>

              <p className="text-gray-400 text-sm mb-2">
                Enter your display name.
              </p>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Profile Image URL
              </label>

              <p className="text-gray-400 text-sm mb-2">
                Paste a public image URL for your
                profile picture.
              </p>

              <input
  type="file"
  accept="image/*"
  onChange={handleChange}
  className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3"
/>
            </div>

            {/* SKILLS */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Skills
              </label>

              <p className="text-gray-400 text-sm mb-2">
                Separate skills with commas.
              </p>

              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Tailwind CSS"
                className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* BIO */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Professional Bio
              </label>

              <p className="text-gray-400 text-sm mb-2">
                Introduce yourself, your experience,
                interests and goals.
              </p>

              <textarea
                rows="5"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="I am a passionate frontend developer with experience in React and modern web technologies..."
                className="w-full rounded-xl bg-white/10 border border-white/20 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Save Profile Changes
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;