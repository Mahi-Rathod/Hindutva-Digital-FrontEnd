import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const About = () => {
    const { isLight } = useSelector(state=>state.theme);

    return (
        <div className="container mx-auto px-4">
            <div className={`${isLight ? "bg-slate-100" : "bg-slate-800"} shadow-lg rounded-lg overflow-hidden`}>
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1360092910/photo/words-with-about-us-web-concept-idea.jpg?s=1024x1024&w=is&k=20&c=A7p3J3uwa4_5wp9kOoMN4q02Ly05xE2hKRi9VwomSQ4=')" }}></div>
                <div className="p-6 md:p-10">
                    {/* <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1> */}
                    <p className={`text-lg ${isLight ? "text-gray-600" : "text-slate-300"} mb-6 leading-relaxed`}>
                        Welcome to <strong>Hindutva Digital Seva</strong>, your go-to destination for insightful articles, latest updates, and thought-provoking content. We are passionate about sharing knowledge, inspiring ideas, and creating a community of like-minded individuals who love to stay informed.
                    </p>
                    <h2 className={`text-2xl font-semibold  ${isLight ? "text-gray-800" : "text-slate-100"} mb-4`}>Our Mission</h2>
                    <p className={`text-lg ${isLight ? "text-gray-600" : "text-slate-300"} mb-6 leading-relaxed`}>
                        At <strong>Hindutva Digital Seva</strong>, our mission is to provide valuable and engaging content that empowers our readers. Whether it’s the latest news, educational insights, or career opportunities, we strive to deliver quality information that makes a difference in your life.
                    </p>
                    <h2 className={`text-2xl font-semibold ${isLight ? "text-gray-800" : "text-slate-100"} mb-4`}>What We Offer</h2>
                    <ul className={`list-disc pl-6 text-lg ${isLight ? "text-gray-600" : "text-slate-300"} mb-6 space-y-2`}>
                        <li>Trending updates on <strong>news</strong> and <strong>current events</strong>.</li>
                        <li>Detailed guides on <strong>government schemes</strong>.</li>
                        <li>Insights into <strong>job opportunities</strong> and <strong>career advice</strong>.</li>
                        <li>Informative content on <strong>education and learning resources</strong>.</li>
                    </ul>
                    <h2 className={`text-2xl font-semibold ${isLight ? "text-gray-800" : "text-slate-100"} mb-4`}>Why Choose Us?</h2>
                    <p className={`text-lg ${isLight ? "text-gray-600" : "text-slate-300"} mb-6 leading-relaxed`}>
                        We are committed to maintaining high standards of accuracy and reliability in every post. Our team of dedicated writers, editors, and contributors ensures that you receive the most up-to-date and comprehensive information available.
                    </p>
                    <h2 className={`text-2xl font-semibold ${isLight ? "text-gray-600" : "text-slate-300"} mb-4`}>Join Our Community</h2>
                    <p className={`text-lg ${isLight ? "text-gray-600" : "text-slate-300"} mb-6 leading-relaxed`}>
                        We believe in the power of community. Connect with us on social media, leave your comments, and share your thoughts. Together, we can create a platform where everyone can learn, grow, and inspire.
                    </p>
                    <div className="mt-6">
                        <NavLink
                            to="/contact-us"
                            className={`px-6 py-3 ${isLight ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-700 hover:bg-slate-600"} text-white font-semibold rounded-lg shadow-md  transition duration-300`}
                        >
                            Contact Us
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
