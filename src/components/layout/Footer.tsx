import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F8] py-12 px-6 border-t border-[#DFA69E] shadow-inner rounded-t-3xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-3xl font-bold text-[#E29B8E] drop-shadow-sm">Mind</span>
              <span className="text-3xl font-bold text-[#BD6466] drop-shadow-sm">Ease</span>
            </Link>
            <p className="mt-4 text-sm text-[#978486] leading-relaxed">
              Your gentle companion for mental wellness 🌸 providing calm support, resources, and cozy guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold text-[#BD6466] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-[#978486] hover:text-[#E29B8E] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-md font-semibold text-[#BD6466] mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Mood Tracking", path: "/mental-tracker" },
                { label: "Therapy Sessions", path: "/appointments" },
                { label: "Community Support", path: "/community" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-[#978486] hover:text-[#E29B8E] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-md font-semibold text-[#BD6466] mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-[#978486]">
              <li>support@mindease.example</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Wellness St, NY, USA</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[#DFA69E] text-center">
          <p className="text-xs text-[#978486]">
            &copy; {new Date().getFullYear()} MindEase. All rights reserved. Sending you a cozy hug 🤗
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
