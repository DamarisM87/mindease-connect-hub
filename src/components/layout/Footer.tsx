
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-mindease-light py-10 border-t">
      <div className="mindease-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-mindease-accent">Mind</span>
              <span className="text-2xl font-bold text-mindease-primary">Ease</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your companion for mental wellness, providing support, resources, and guidance on your journey to better mental health.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/mental-tracker" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  Mood Tracking
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  Therapy Sessions
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-mindease-accent transition-colors">
                  Community Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">support@mindease.example</li>
              <li className="text-muted-foreground">+1 (555) 123-4567</li>
              <li className="text-muted-foreground">123 Wellness St, NY, USA</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-muted">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MindEase. All rights reserved. This is a demo application.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
