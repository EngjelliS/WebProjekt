
const AuthTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'login', label: 'Anmelden' },
    { id: 'register', label: 'Registrieren' }
  ];

  return (
    <div className="auth-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`auth-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;