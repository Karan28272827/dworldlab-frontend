import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./Navigation.css";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="navigation-container">
        {/* Logo */}
        <div className="navigation-logo">Logo</div>
        {/* Desktop Menu */}
        <ul className="navigation-menu-desktop">
          <li>
            <a href="#" className="navigation-link">Home</a>
          </li>
          <li>
            <a href="#" className="navigation-link">Tools</a>
          </li>
          <li>
            <a href="#" className="navigation-link">About Us</a>
          </li>
          <li>
            <a href="#" className="navigation-link">Blog Updates</a>
          </li>
          <li className="navigation-support-center">
            <a href="#" className="navigation-link navigation-support-link">
              Support Center
              <ChevronDown className="navigation-chevron" />
            </a>
          </li>
        </ul>
        {/* Action Buttons */}
        <div className="navigation-actions-desktop">
          <button className="navigation-help-btn">Help</button>
          <button className="navigation-contact-btn">Contact</button>
        </div>
        {/* Mobile Menu Button */}
        <button className="navigation-mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="navigation-mobile-icon" />
          ) : (
            <Menu className="navigation-mobile-icon" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="navigation-mobile-menu">
          <div className="navigation-mobile-container">
            <ul className="navigation-mobile-list">
              <li>
                <a href="#" className="navigation-link-mobile">Home</a>
              </li>
              <li>
                <a href="#" className="navigation-link-mobile">Tools</a>
              </li>
              <li>
                <a href="#" className="navigation-link-mobile">About Us</a>
              </li>
              <li>
                <a href="#" className="navigation-link-mobile">Blog Updates</a>
              </li>
              <li>
                <a href="#" className="navigation-link-mobile">Support Center</a>
              </li>
            </ul>
            <div className="navigation-mobile-actions">
              <button className="navigation-help-btn-mobile">Help</button>
              <button className="navigation-contact-btn-mobile">Contact</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
