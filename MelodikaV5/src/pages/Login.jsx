import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useScroll } from '../hooks/useScroll';
import { useScrollAnimation } from '../hooks/useAnimation';
import AuthTabs from '../components/AuthTabs';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import BrandPromise from '../components/BrandPromise';
import HeroSection from '../components/HeroSection';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { fadeInElements } = useScrollAnimation();

  return (
    <div className="login-page">
      {/* Hero Section with Parallax */}
      <HeroSection currentPage="login" />

      {/* Auth Forms Container */}
      <section className="auth-container" ref={fadeInElements}>
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="auth-forms-wrapper">
          <LoginForm isActive={activeTab === 'login'} />
          <RegisterForm isActive={activeTab === 'register'} />
        </div>
      </section>

      {/* Brand Promise Section */}
      <BrandPromise />
    </div>
  );
};

export default Login;
