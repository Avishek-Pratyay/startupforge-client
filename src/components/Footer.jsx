import {
FaFacebook,
FaLinkedin,
FaGithub,
FaTwitter,
FaMapMarkerAlt,
FaPhone,
FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
return ( 
<footer className="bg-slate-900 text-white mt-">
   <div className="max-w-7xl mx-auto px-6 py-16">


    <div className="grid md:grid-cols-4 gap-10">

      {/* Logo */}
      <div>
        <h2 className="text-3xl font-bold text-indigo-400">
          StartupForge
        </h2>

        <p className="mt-4 text-gray-400">
          Connecting founders and collaborators to build the next generation of startups.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-bold mb-4 text-lg">
          Quick Links
        </h3>

        <ul className="space-y-2 text-gray-400">
          <li><a href="/">Home</a></li>
          <li><a href="/browse-startups">Browse Startups</a></li>
          <li><a href="/browse-opportunities">Opportunities</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
        </ul>
      </div>

      {/* Dashboard */}
      <div>
        <h3 className="font-bold mb-4 text-lg">
          Dashboard
        </h3>

        <ul className="space-y-2 text-gray-400">
          <li>Founder Dashboard</li>
          <li>Collaborator Dashboard</li>
          <li>Admin Dashboard</li>
          <li>My Applications</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-bold mb-4 text-lg">
          Contact
        </h3>

        <div className="space-y-3 text-gray-400">

          <p className="flex gap-2 items-center">
            <FaMapMarkerAlt />
            Dhaka, Bangladesh
          </p>

          <p className="flex gap-2 items-center">
            <FaPhone />
            +880 1712 345678
          </p>

          <p className="flex gap-2 items-center">
            <FaEnvelope />
            support@startupforge.com
          </p>

        </div>

        <div className="flex gap-4 mt-6 text-2xl">

          <a href="#">
            <FaFacebook />
          </a>

          <a href="#">
            <FaLinkedin />
          </a>

          <a href="#">
            <FaGithub />
          </a>

          <a href="#">
            <FaTwitter />
          </a>

        </div>
      </div>

    </div>

    <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-400">
      © 2026 StartupForge. All Rights Reserved.
    </div>

  </div>
</footer>


);
};

export default Footer;
