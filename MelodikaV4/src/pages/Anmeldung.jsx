import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Anmeldung = () => {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    regName: '',
    regEmail: '',
    regPassword: '',
    regPasswordConfirm: '',
    remember: false,
    terms: false
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, remember: true }));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      if (formData.remember) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      setMessage('Erfolgreich angemeldet!');
      navigate('/konto', { state: { email: user.email } }); // ✅ NEU: Weiterleitung
    } else {
      setMessage('E-Mail oder Passwort ist falsch.');
    }
  };

  const handleRegister = (e) => {
  e.preventDefault();
  const { regEmail, regPassword, regPasswordConfirm, regName, terms } = formData;
  if (!terms) return setMessage('Bitte akzeptiere die AGB.');
  if (regPassword !== regPasswordConfirm) return setMessage('Passwörter stimmen nicht überein.');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === regEmail)) {
    return setMessage('E-Mail ist bereits registriert.');
  }

  users.push({ name: regName, email: regEmail, password: regPassword });
  localStorage.setItem('users', JSON.stringify(users));
  setMessage('Registrierung erfolgreich!');
  navigate('/konto', { state: { email: regEmail } });
};

  return (
    <Main>
      <AuthHeroParallax>
        <ParallaxContent>
          <h1 className="fade-in">Willkommen zurück</h1>
          <p className="fade-in">Melden Sie sich an, um Ihre Melodika-Erfahrung fortzusetzen.</p>
        </ParallaxContent>
      </AuthHeroParallax>

      <AuthContainer>
        <AuthTabs>
          <TabButton active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Anmelden</TabButton>
          <TabButton active={activeTab === 'register'} onClick={() => setActiveTab('register')}>Registrieren</TabButton>
        </AuthTabs>

        <AuthFormsWrapper>
          {message && <p style={{ textAlign: 'center', color: 'red' }}>{message}</p>}

          {activeTab === 'login' ? (
            <AuthForm className="active">
              <FormInner>
                <h2>Bei Melodika anmelden</h2>
                <form onSubmit={handleLogin}>
                  <FormGroup>
                    <FormControl type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder=" " />
                    <FormLabel>E-Mail</FormLabel>
                  </FormGroup>

                  <FormGroup>
                    <FormControl type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder=" " />
                    <FormLabel>Passwort</FormLabel>
                  </FormGroup>

                  <FormOptions>
                    <RememberMe>
                      <input type="checkbox" checked={formData.remember} onChange={(e) => setFormData({...formData, remember: e.target.checked})} />
                      <label>Angemeldet bleiben</label>
                    </RememberMe>
                    <ForgotPassword href="#">Passwort vergessen?</ForgotPassword>
                  </FormOptions>

                  <AuthButton type="submit">Anmelden</AuthButton>
                </form>
              </FormInner>
            </AuthForm>
          ) : (
            <AuthForm className="active">
              <FormInner>
                <h2>Neues Konto erstellen</h2>
                <form onSubmit={handleRegister}>
                  <FormGroup>
                    <FormControl type="text" required value={formData.regName} onChange={(e) => setFormData({...formData, regName: e.target.value})} placeholder=" " />
                    <FormLabel>Name</FormLabel>
                  </FormGroup>

                  <FormGroup>
                    <FormControl type="email" required value={formData.regEmail} onChange={(e) => setFormData({...formData, regEmail: e.target.value})} placeholder=" " />
                    <FormLabel>E-Mail</FormLabel>
                  </FormGroup>

                  <FormGroup>
                    <FormControl type="password" required value={formData.regPassword} onChange={(e) => setFormData({...formData, regPassword: e.target.value})} placeholder=" " />
                    <FormLabel>Passwort</FormLabel>
                  </FormGroup>

                  <FormGroup>
                    <FormControl type="password" required value={formData.regPasswordConfirm} onChange={(e) => setFormData({...formData, regPasswordConfirm: e.target.value})} placeholder=" " />
                    <FormLabel>Passwort bestätigen</FormLabel>
                  </FormGroup>

                  <RememberMe>
                    <input type="checkbox" checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
                    <label>Ich akzeptiere die AGB</label>
                  </RememberMe>

                  <AuthButton type="submit">Registrieren</AuthButton>
                </form>
              </FormInner>
            </AuthForm>
          )}
        </AuthFormsWrapper>
      </AuthContainer>
    </Main>
  );
};

// Alle Styled Components bleiben gleich



const Main = styled.main``;

const AuthHeroParallax = styled.section`
  height: 50vh;
  background-image: url('/src/assets/Hintergrundbild.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  }
`;


const ParallaxContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #ffffff;

  h1 {
    font-size: 4.8rem;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 1.1;
  }

  p {
    font-size: 2.4rem;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

const AuthContainer = styled.section`
  max-width: 1000px;
  margin: 30px auto 100px;
  position: relative;
  z-index: 10;
  padding: 0 20px;
`;

const AuthTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  font-weight: 500;
  padding: 15px 25px;
  color: ${props => props.active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '40px' : '0'};
    height: 2px;
    background-color: var(--accent-color);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--text-primary);
  }
`;

const AuthFormsWrapper = styled.div`
  position: relative;
  min-height: 500px;
`;

const AuthForm = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--card-background);
  border-radius: 20px;
  box-shadow: var(--card-shadow);
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease;
  transform: translateY(20px);

  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const FormInner = styled.div`
  padding: 40px;

  h2 {
    font-size: 2.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
    color: var(--text-primary);
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 25px;
`;

const FormControl = styled.input`
  width: 100%;
  padding: 15px 20px;
  font-size: 1.6rem;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

const FormLabel = styled.label`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  color: var(--text-secondary);
  pointer-events: none;
  transition: all 0.3s ease;

  ${FormControl}:focus ~ &,
  ${FormControl}:not(:placeholder-shown) ~ & {
    top: 0;
    transform: translateY(-50%) scale(0.8);
    background-color: var(--background-primary);
    padding: 0 5px;
  }
`;

const FormOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }

  label {
    font-size: 1.4rem;
    color: var(--text-secondary);
  }
`;

const ForgotPassword = styled.a`
  font-size: 1.4rem;
  color: var(--accent-color);
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
  }
`;


const MediaQueries = css`
  @media (max-width: 768px) {
    .auth-container {
      margin-top: 30px;
    }

    .auth-tabs {
      flex-direction: column;
      align-items: center;
    }

    .auth-tab-btn {
      width: 100%;
      text-align: center;
    }

    .form-inner {
      padding: 30px 20px;
    }

    .auth-form h2 {
      font-size: 2.4rem;
    }
  }
`;
export default Anmeldung;
