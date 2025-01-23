import React from "react";
import { useSelector } from "react-redux";

const ContactUs = () => {
    const { isLight } = useSelector((state) => state.theme);

    return (
        <div className="container mx-auto px-4 py-10">
            <div className={`max-w-3xl mx-auto ${isLight ? "bg-white" : "bg-slate-900"} shadow-lg rounded-lg overflow-hidden mb-10`}>
                <div className="p-6 md:p-10">
                    <h1 className={`text-4xl font-bold ${isLight ? "text-gray-800" : "text-slate-100"} mb-6`}>
                        Contact Us
                    </h1>
                    <p className={`text-lg ${isLight ? "text-gray-600" : "text-slate-300"} mb-6 leading-relaxed`}>
                        We’d love to hear from you! Fill out the form below or reach out to us through our contact details, and we’ll get back to you as soon as possible.
                    </p>
                    <form className="space-y-6">
                        <div>
                            <label
                                className={`block text-sm font-medium ${isLight ? "text-gray-800" : "text-slate-300"} mb-1`}
                                htmlFor="name"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isLight ? "border-gray-300 bg-gray-50" : "border-slate-600 bg-slate-700 text-slate-300"
                                } focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label
                                className={`block text-sm font-medium ${isLight ? "text-gray-800" : "text-slate-300"} mb-1`}
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isLight ? "border-gray-300 bg-gray-50" : "border-slate-600 bg-slate-700 text-slate-300"
                                } focus:ring-2 focus:ring-blue-500 outline-none`}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label
                                className={`block text-sm font-medium ${isLight ? "text-gray-800" : "text-slate-300"} mb-1`}
                                htmlFor="message"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    isLight ? "border-gray-300 bg-gray-50" : "border-slate-600 bg-slate-700 text-slate-300"
                                } focus:ring-2 focus:ring-blue-500 outline-none`}
                                rows="5"
                                placeholder="Write your message here"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={`w-full py-3 rounded-lg font-semibold ${
                                    isLight
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : "bg-slate-700 hover:bg-slate-600 text-white"
                                } transition duration-300`}
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                <h2 className={`text-2xl font-bold ${isLight ? "text-gray-800" : "text-slate-100"} mb-4`}>
                    Our Location
                </h2>
                <div
                    className={`overflow-hidden rounded-lg shadow-lg ${
                        isLight ? "bg-gray-100" : "bg-slate-700"
                    }`}
                >
                    <iframe
                        title="Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15204.791020250046!2d75.4828036!3d19.8964389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba5d53b367e2d%3A0xd7f095e2e7e3e967!2sAshatavinayak%20Society%20Phase%20-1%20Gangapur%20Jahagir%20431154!5e0!3m2!1sen!2sin!4v1701322832005!5m2!1sen!2sin"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
