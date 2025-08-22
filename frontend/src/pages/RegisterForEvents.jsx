import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EventRegister = () => {
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState(false);

  const event = {
    title: "Corporate Blood Drive - TechCorp",
    date: "Tuesday, December 19, 2023",
    time: "10:00 AM - 6:00 PM",
    venue: "TechCorp Headquarters",
    address: "456 Innovation Drive, Tech Park, ST 12348",
    organizer: "TechCorp Employee Council",
    goal: "75 donations",
    registered: "34 registered",
    progress: 45,
    status: "Open to Public",
    description:
      "Join our annual blood drive and help save lives. Type O- donors are especially encouraged to participate. Everyone is welcome!"
  };

  const handleShare = () => {
    navigator.clipboard.writeText("https://dummy-blood-donation-link.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full gap-10 py-10 px-4">
      <h3 className="text-4xl font-bold text-center text-red-700">
        Donate Now, Save Lives ❤️
      </h3>
      <EventCard setShowForm={setShowForm} event={event} onShare={handleShare} />

      {/* Share copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg"
          >
            Link copied to clipboard ✅
          </motion.div>
        )}
      </AnimatePresence>

      {/* Register Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
              >
                ✕
              </button>
              <RegisterForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RegisterForm = () => {
  const [form, setForm] = React.useState({
    fullname: "",
    type: "you",
    bloodType: "",
    phone: ""
  });
  const [error, setError] = React.useState({});
  const bloodTypes = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
  const types = [
    { value: "you", label: "You" },
    { value: "family", label: "Family" },
    { value: "other", label: "Other" }
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let err = {};
    if (!form.fullname || form.fullname.length < 3) {
      err.fullname = "Name should be more than 3 characters";
    }
    if (!form.type) err.type = "Type is required";
    if (!form.bloodType) err.bloodType = "Blood type is required";
    if (!form.phone || !/^\+?[0-9]{10,15}$/.test(form.phone)) {
      err.phone = "Please enter a valid phone number";
    }
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Registered Successfully!");
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        Register Member
      </h2>

      <div>
        <label className="block text-red-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
        />
        {error.fullname && (
          <p className="text-red-500 text-sm">{error.fullname}</p>
        )}
      </div>

      <div>
        <label className="block text-red-700 font-medium mb-1">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
        >
          {types.map(t => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-red-700 font-medium mb-1">Blood Type</label>
        <select
          name="bloodType"
          value={form.bloodType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select Blood Type</option>
          {bloodTypes.map(bt => (
            <option key={bt} value={bt}>
              {bt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-red-700 font-medium mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
        />
        {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
      >
        Register
      </button>
    </form>
  );
};

const EventCard = ({ event, setShowForm, onShare }) => {
  if (!event) return null;
  return (
    <div className="p-6 rounded-3xl w-full shadow-xl border max-w-4xl border-gray-200 bg-white">
      <h4 className="text-xl font-semibold mb-2">{event.title}</h4>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <i className="ri-calendar-line"></i>
          <h6>{event.date}</h6>
          <h6>• {event.time}</h6>
        </div>
        <div
          className={`py-1 px-3 rounded-2xl flex gap-2 items-center w-fit mt-2 md:mt-0 ${
            event.status === "Appointments Available"
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          <div
            className={`h-3 w-3 rounded-full ${
              event.status === "Appointments Available"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
          <h6
            className={`text-sm font-medium ${
              event.status === "Appointments Available"
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {event.status}
          </h6>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center gap-2 text-lg font-medium">
          <i className="ri-map-pin-line text-gray-500"></i>
          {event.venue}
        </div>
        <p className="text-gray-600">{event.address}</p>
        <div className="flex items-center gap-2 text-gray-600 mt-1">
          <i className="ri-group-line"></i>
          <h6>Hosted by</h6>
          <span className="font-medium">{event.organizer}</span>
        </div>
      </div>

      <div className="w-full md:max-w-sm mb-4">
        <div className="flex gap-2">
          <h5 className="font-medium">Goal:</h5>
          <h6 className="text-gray-600">{event.goal}</h6>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${event.progress}%` }}
          />
        </div>
        <h6 className="text-gray-600 mt-1">
          {event.registered} / {event.goal}
        </h6>
      </div>

      <h6 className="text-lg font-medium mb-2">Description</h6>
      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="flex gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="flex gap-2 items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <i className="ri-add-line"></i> Register Member
        </button>
        <button
          onClick={onShare}
          className="flex gap-2 items-center justify-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600"
        >
          <i className="ri-share-2-line"></i> Share
        </button>
      </div>
    </div>
  );
};

export default EventRegister;
