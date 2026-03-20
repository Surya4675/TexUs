import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import { useStore } from './store';
import { 
  Home, Users, Clock, History, Settings, LogOut, FileText, ChevronRight, UserPlus, DollarSign, Wallet, Phone, Lock, Plus, Building, Trash2, Edit2
} from 'lucide-react';
import './index.css';
import TexUsLogo from './assets/TexUs.png';

const tLabels = {
  en: {
    dashboard: "Dashboard",
    unsettledAdvances: "Unsettled Advances",
    unsettledWeekly: "Unsettled Weekly Advances",
    recentAdvances: "Recent Advances",
    viewAll: "View All",
    textiles: "Textiles",
    workers: "Workers",
    units: "Units",
    active: "Active",
    home: "Home",
    history: "History",
    settings: "Settings",
    giveAdvance: "Give Advance",
    settleSalary: "Settle Salary",
    advancesPending: "Advances Pending",
    weeklySalary: "Weekly Salary",
    allWorkers: "All Workers",
    assignedWorkers: "Workers assigned",
    totalAdvancesDeducted: "Advances Deducted",
    baseWeeklySalary: "Base Weekly Salary",
    finalPayable: "Final Payable Amount",
    advancesBreakup: "Advances Breakup",
    confirmSettlement: "Confirm Settlement",
    amountRs: "Amount (₹)",
    noteReason: "Note / Reason (Optional)",
    saveAdvance: "Save Advance",
    pending: "Pending",
    settled: "Settled",
    settlements: "Settlements",
    advances: "Advances",
    paid: "Paid",
    base: "Base",
    adv: "Adv",
    logout: "Logout",
    appTheme: "App Theme",
    language: "Language",
    changePin: "Change PIN",
    dataBackup: "Data Backup",
    eraseAllData: "Erase All Local Data",
    myDashboard: "My Dashboard",
    advancesTaken: "Unsettled Advances Taken",
    myRecentAdvances: "My Recent Advances",
    myLastSettlement: "My Last Settlement",
    finalReceived: "Final Received",
    noAdvancesFound: "No advances found.",
    noWorkers: "No workers found.",
    noSettlements: "No settlement history found.",
    givingAdvanceTo: "Giving advance to",
    dateStr: "Date",
    workerDetails: "Worker Details",
    addTextile: "Add Textile",
    enterTextileName: "Enter new textile name:",
    addWorker: "Add Worker",
    enterWorkerName: "Enter worker name:",
    enterWorkerSalary: "Enter weekly salary (₹):",
    edit: "Edit",
    delete: "Delete",
    workersWithPending: "Pending Settlements",
    noPendingWorkers: "All settled up!"
  },
  ta: {
    dashboard: "முகப்பு",
    unsettledAdvances: "நிலுவையில் உள்ள முன்பணம்",
    unsettledWeekly: "இந்த வார நிலுவை முன்பணங்கள்",
    recentAdvances: "சமீபத்திய முன்பணங்கள்",
    viewAll: "அனைத்தையும் காண்",
    textiles: "நெசவாலைகள்",
    workers: "தொழிலாளர்கள்",
    units: "ஆலைகள்",
    active: "உள்ளனர்",
    home: "முகப்பு",
    history: "வரலாறு",
    settings: "அமைப்புகள்",
    giveAdvance: "முன்பணம் கொடு",
    settleSalary: "சம்பளம் வழங்கு",
    advancesPending: "முன்பண நிலுவை",
    weeklySalary: "வார சம்பளம்",
    allWorkers: "அனைத்து தொழிலாளர்கள்",
    assignedWorkers: "தொழிலாளர்கள் உண்டு",
    totalAdvancesDeducted: "பிடிக்கப்படும் முன்பணம்",
    baseWeeklySalary: "அடிப்படை வார சம்பளம்",
    finalPayable: "வழங்க வேண்டிய சம்பளம்",
    advancesBreakup: "முன்பண விவரங்கள்",
    confirmSettlement: "சம்பளத்தை உறுதி செய்",
    amountRs: "தொகை (₹)",
    noteReason: "காரணம் (விரும்பினால்)",
    saveAdvance: "முன்பணத்தை சேமி",
    pending: "நிலுவை",
    settled: "முடிந்தது",
    settlements: "வழங்கப்பட்டவை",
    advances: "முன்பணங்கள்",
    paid: "வழங்கப்பட்டது",
    base: "அடிப்படை",
    adv: "முன்பணம்",
    logout: "வெளியேறு",
    appTheme: "ஆப் தீம்",
    language: "மொழி",
    changePin: "PIN எண்ணை மாற்று",
    dataBackup: "தரவு காப்புப்பிரதி",
    eraseAllData: "அனைத்து தரவையும் அழிக்க",
    myDashboard: "எனது முகப்பு",
    advancesTaken: "வாங்கிய முன்பணங்கள்",
    myRecentAdvances: "எனது சமீபத்திய உறுதிகள்",
    myLastSettlement: "எனது கடந்த சம்பளம்",
    finalReceived: "பெற்ற முழுத் தொகை",
    noAdvancesFound: "முன்பணங்கள் ஏதுமில்லை.",
    noWorkers: "தொழிலாளர்கள் இல்லை.",
    noSettlements: "சம்பள வரலாறு ஏதுமில்லை.",
    givingAdvanceTo: "முன்பணம் பெறுபவர்:",
    dateStr: "தேதி",
    workerDetails: "தொழிலாளர் விவரம்",
    addTextile: "நெசவாலையை சேர்",
    enterTextileName: "நெசவாலையின் பெயர்:",
    addWorker: "தொழிலாளரை சேர்",
    enterWorkerName: "தொழிலாளர் பெயர்:",
    enterWorkerSalary: "வார சம்பளம் (₹):",
    edit: "திருத்து",
    delete: "அழி",
    workersWithPending: "முன்பண நிலுவையுள்ளவர்கள்",
    noPendingWorkers: "அனைத்தும் முடிந்தது!"
  }
};

const t = (key, lang = 'en') => tLabels[lang]?.[key] || tLabels['en'][key];

// Splash Screen
const TAMIL_QUOTES = [
  ["உழைப்பே உயர்வு தரும்", "நேர்மையே நிலைத்து நிற்கும்"],
  ["முயற்சி உடையார்", "இகழ்ச்சி அடையார்"],
  ["காலம் பொன் போன்றது", "கடமை கண் போன்றது"],
  ["நல்லதே நினைப்போம்", "நல்லதே நடக்கும்"],
  ["தன்னம்பிக்கை கொள்", "தரணியை வெல்"],
  ["தொழிலே தெய்வம்", "உழைப்பே மூலதனம்"],
  ["துணிவே துணை", "வெற்றியே இலக்கு"]
];

const Splash = ({ onComplete }) => {
  const [quote, setQuote] = useState(["", ""]);

  useEffect(() => {
    setQuote(TAMIL_QUOTES[Math.floor(Math.random() * TAMIL_QUOTES.length)]);
    const t = setTimeout(onComplete, 3500); 
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="app-container" style={{backgroundColor: 'white'}}>
      <div className="screen items-center justify-center p-4" style={{ backgroundColor: 'transparent' }}>
        <div className="text-center animate-slide-in w-full">
          <div style={{ width: '130px', height: '130px', backgroundColor: '#ffffff', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '6px', boxShadow: 'var(--shadow-md)' }}>
            <img src={TexUsLogo} alt="TexUs Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 className="mt-6 font-bold" style={{ color: 'var(--primary-color)', fontSize: '2.5rem', letterSpacing: '1px' }}>TexUs</h1>
          
          <div className="mt-10" style={{ padding: '0 1rem' }}>
            <div style={{
              fontSize: '1.4rem', 
              lineHeight: '1.8', 
              fontWeight: '800', 
              background: 'linear-gradient(135deg, var(--primary-dark), var(--secondary-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 10px rgba(0,0,0,0.05)'
            }}>
              "{quote[0]}<br />{quote[1]}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layout Header + Bottom Nav
const Layout = ({ children, title, showBack = false, hideNav = false }) => {
  const navigate = useNavigate();
  const { language } = useStore();
  return (
    <div className="app-container">
      <div className="header">
        {showBack && (
          <button className="icon-button" onClick={() => navigate(-1)} style={{marginRight: 'auto', padding: '0.25rem'}}>
            <ChevronRight style={{ transform: 'rotate(180deg)' }} />
          </button>
        )}
        <div className="header-title text-center" style={{flex: showBack ? 0.8 : 1}}>{title}</div>
        {showBack && <div style={{width: 24}}></div>}
      </div>
      <div className="content">
        {children}
      </div>
      {!hideNav && (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0.75rem', backgroundColor: 'var(--surface-color)', borderTop: '1px solid var(--border-color)', position: 'sticky', bottom: 0, zIndex: 10 }}>
          <button className="icon-button flex-col items-center gap-1" onClick={() => navigate('/')}>
            <Home size={22} /> <span style={{fontSize:'0.7rem', fontWeight: 500}}>{t('home', language)}</span>
          </button>
          <button className="icon-button flex-col items-center gap-1" onClick={() => navigate('/textiles')}>
            <Building size={22} /> <span style={{fontSize:'0.7rem', fontWeight: 500}}>{t('textiles', language)}</span>
          </button>
          <button className="icon-button flex-col items-center gap-1" onClick={() => navigate('/history')}>
            <History size={22} /> <span style={{fontSize:'0.7rem', fontWeight: 500}}>{t('history', language)}</span>
          </button>
          <button className="icon-button flex-col items-center gap-1" onClick={() => navigate('/settings')}>
            <Settings size={22} /> <span style={{fontSize:'0.7rem', fontWeight: 500}}>{t('settings', language)}</span>
          </button>
        </div>
      )}
    </div>
  );
};

// -- SCREENS --

const LoginScreen = () => {
  const { login, registerOwner, language, setLanguage } = useStore();
  const [role, setRole] = useState('owner');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(isRegistering ? '' : 'admin');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const isTa = language === 'ta';

  const tLocal = {
    en: {
      welcome: "Welcome back!",
      createAcc: "Create your account",
      owner: "Owner",
      worker: "Worker",
      fullName: "Full Name",
      phone: "Phone Number",
      ownerId: "Owner ID / Phone",
      workerName: "Worker Name",
      pin: "PIN / Password",
      createPin: "Create 4-digit PIN",
      login: "Login",
      signup: "Sign Up",
      alreadyHas: "Already have an account? Log in",
      createOwner: "Create an Owner account",
      invalid: "Invalid credentials!",
      fillFields: "Please fill all fields",
      ownersOnly: "Only owners can sign up directly.",
      success: "Account created successfully! Please log in.",
      exists: "An account with this phone number already exists."
    },
    ta: {
      welcome: "மீண்டும் வருக!",
      createAcc: "உங்கள் கணக்கை உருவாக்கவும்",
      owner: "உரிமையாளர்",
      worker: "தொழிலாளர்",
      fullName: "முழு பெயர்",
      phone: "மொபைல் எண்",
      ownerId: "மொபைல் எண் / ID",
      workerName: "தொழிலாளர் பெயர்",
      pin: "PIN / கடவுச்சொல்",
      createPin: "புதிய 4-இலக்க PIN",
      login: "உள்நுழைக",
      signup: "பதிவு செய்",
      alreadyHas: "கணக்கு உள்ளதா? உள்நுழைக",
      createOwner: "புதிய உரிமையாளர் கணக்கு",
      invalid: "தவறான தகவல்!",
      fillFields: "அனைத்தையும் நிரப்பவும்",
      ownersOnly: "உரிமையாளர்கள் மட்டுமே பதிவு செய்ய முடியும்.",
      success: "கணக்கு உருவாக்கப்பட்டது. உள்நுழையவும்.",
      exists: "இந்த எண் ஏற்கனவே பயன்பாட்டில் உள்ளது."
    }
  };
  const txt = tLocal[language] || tLocal['en'];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const success = login(role, phone, pin);
    if (!success) {
      setError(txt.invalid);
    } else {
      window.location.reload(); 
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !phone || !pin) return setError(txt.fillFields);
    if (role !== 'owner') return setError(txt.ownersOnly);

    const success = registerOwner(name, phone, pin);
    if (success) {
      setSuccessMsg(txt.success);
      setIsRegistering(false);
      setPhone(phone);
    } else {
      setError(txt.exists);
    }
  };

  return (
    <div className="app-container">
      <div className="screen items-center justify-center p-4 relative">
        <button onClick={toggleLang} className="badge badge-primary absolute top-4 right-4" style={{fontSize: '0.8rem', padding: '0.5rem 1rem'}}>
          {isTa ? 'English' : 'தமிழ்'}
        </button>
        <div className="card animate-slide-in relative" style={{ width: '100%', maxWidth: '360px' }}>
          <div className="text-center mb-6">
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ffffff', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '6px', boxShadow: 'var(--shadow-md)' }}>
              <img src={TexUsLogo} alt="TexUs Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h1 className="text-primary font-bold text-2xl" style={{letterSpacing: '0.5px'}}>TexUs</h1>
            <p className="text-secondary mt-1">{isRegistering ? txt.createAcc : txt.welcome}</p>
          </div>
          
          {!isRegistering && (
             <div className="flex gap-2 mb-6" style={{backgroundColor: 'var(--bg-color)', padding: '0.35rem', borderRadius: 'var(--radius-lg)'}}>
               <button 
                 className={`btn ${role === 'owner' ? 'btn-primary shadow-sm' : ''}`}
                 style={{flex: 1, backgroundColor: role === 'owner' ? 'var(--primary-color)' : 'transparent', color: role === 'owner' ? 'white' : 'var(--text-secondary)'}}
                 onClick={() => { setRole('owner'); setPhone('admin'); }}
               >
                 {txt.owner}
               </button>
               <button 
                 className={`btn ${role === 'worker' ? 'btn-primary shadow-sm' : ''}`}
                 style={{flex: 1, backgroundColor: role === 'worker' ? 'var(--primary-color)' : 'transparent', color: role === 'worker' ? 'white' : 'var(--text-secondary)'}}
                 onClick={() => { setRole('worker'); setPhone(''); }}
               >
                 {txt.worker}
               </button>
             </div>
          )}

          {successMsg && <p className="text-success mb-4 font-medium text-center bg-success-light p-2 rounded">{successMsg}</p>}
          {error && <p className="text-error mb-4 font-medium text-center bg-error-light p-2 rounded">{error}</p>}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="flex-col gap-4">
            {isRegistering && (
              <div className="form-group mb-4">
                <label className="form-label">{txt.fullName}</label>
                <div style={{position: 'relative'}}>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{width: '100%', paddingLeft: '2.5rem'}}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={txt.fullName}
                  />
                  <Users size={18} className="text-secondary" style={{position: 'absolute', left: '0.75rem', top: '1rem'}} />
                </div>
              </div>
            )}
            
            <div className="form-group mb-4">
              <label className="form-label">{role === 'owner' ? (isRegistering ? txt.phone : txt.ownerId) : txt.workerName}</label>
              <div style={{position: 'relative'}}>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{width: '100%', paddingLeft: '2.5rem'}}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="..."
                />
                <Phone size={18} className="text-secondary" style={{position: 'absolute', left: '0.75rem', top: '1rem'}} />
              </div>
            </div>
            
            <div className="form-group mb-6">
              <label className="form-label">{txt.pin}</label>
              <div style={{position: 'relative'}}>
                <input 
                  type="password" 
                  className="form-input" 
                  style={{width: '100%', paddingLeft: '2.5rem'}}
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder={isRegistering ? txt.createPin : "..."}
                />
                <Lock size={18} className="text-secondary" style={{position: 'absolute', left: '0.75rem', top: '1rem'}} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary shadow-md" style={{padding: '1rem', fontSize: '1.1rem', marginTop: '0.5rem'}}>
               {isRegistering ? txt.signup : txt.login}
            </button>
          </form>

          {role === 'owner' && (
             <div className="mt-5 text-center">
                 <button className="text-sm font-bold" style={{background: 'none', border: 'none', color: 'var(--primary-color)'}} onClick={() => {
                     setIsRegistering(!isRegistering);
                     setError('');
                     setSuccessMsg('');
                     if(!isRegistering) { setPhone(''); setPin(''); }
                 }}>
                   {isRegistering ? txt.alreadyHas : txt.createOwner}
                 </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Owner Flow
const DashboardScreen = () => {
  const { textiles, workers, advances, language } = useStore();
  const navigate = useNavigate();
  
  const unsettledAdvancesAmount = advances.filter(a => !a.settled).reduce((sum, a) => sum + a.amount, 0);
  const pendingIds = Object.keys(advances.filter(a => !a.settled).reduce((acc, a) => {
    acc[a.workerId] = true; return acc;
  }, {}));

  return (
    <Layout title={<span className="font-bold">TexUs {t('dashboard', language)}</span>} showBack={false}>
      <div className="summary-box">
        <h2>{t('unsettledWeekly', language)}</h2>
        <div className="amount mb-2">₹{unsettledAdvancesAmount}</div>
        <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontWeight: 500}}>
          {pendingIds.length > 0 ? `${pendingIds.length} ${t('workers', language)} Pending` : t('noPendingWorkers', language)}
        </p>
      </div>
      
      <div className="grid-2 mt-4">
        <button className="card text-center" onClick={() => navigate('/textiles')}>
          <Building size={28} className="text-primary mx-auto mb-2" />
          <div className="font-bold">{t('textiles', language)}</div>
          <div className="text-sm mt-1 text-secondary">{textiles.length} {t('units', language)}</div>
        </button>
        <button className="card text-center" onClick={() => navigate('/workers/all')}>
          <Users size={28} className="text-primary mx-auto mb-2" />
          <div className="font-bold">{t('workers', language)}</div>
          <div className="text-sm mt-1 text-secondary">{workers.length} {t('active', language)}</div>
        </button>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h3 className="font-bold">{t('workersWithPending', language)}</h3>
      </div>
      
      <div className="flex flex-col gap-3 mt-2">
        {(() => {
          const pendingByWorker = advances.filter(a => !a.settled).reduce((acc, a) => {
            acc[a.workerId] = (acc[a.workerId] || 0) + a.amount;
            return acc;
          }, {});
          const pendingIds = Object.keys(pendingByWorker);
          if (pendingIds.length === 0) return <div className="text-center p-4 text-secondary">{t('noPendingWorkers', language)}</div>;
          
          return pendingIds.map(wId => {
            const worker = workers.find(w => w.id === wId);
            if (!worker) return null;
            return (
              <div key={wId} className="card p-3 flex items-center justify-between" onClick={() => navigate(`/worker/${wId}`)} style={{cursor: 'pointer', borderLeft: '4px solid var(--error-color)'}}>
                <div className="flex items-center gap-3">
                   <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--error-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold'}}>
                     {worker.name.charAt(0)}
                   </div>
                   <div>
                     <div className="font-bold">{worker.name}</div>
                   </div>
                </div>
                <div className="font-bold text-error">-₹{pendingByWorker[wId]}</div>
              </div>
            );
          });
        })()}
      </div>
    </Layout>
  );
};

const TextileListScreen = () => {
  const { textiles, workers, language, addTextile, deleteTextile, editTextile } = useStore();
  const navigate = useNavigate();

  const handleAdd = () => {
    const name = window.prompt(t('enterTextileName', language));
    if(name && name.trim()){
       addTextile(name.trim());
    }
  };

  return (
    <Layout title={t('textiles', language)} showBack={true}>
      <div className="flex justify-end mb-4">
         <button className="btn btn-primary btn-sm flex items-center gap-2" onClick={handleAdd}>
           <Plus size={16} /> {t('addTextile', language)}
         </button>
      </div>
      <div className="flex flex-col gap-4">
        {textiles.map(tData => {
          const wCount = workers.filter(w => w.textileId === tData.id).length;
          return (
            <div key={tData.id} className="card p-0 flex items-center justify-between" style={{cursor: 'pointer'}}>
              <div className="flex items-center gap-4 flex-1 p-4" onClick={() => navigate(`/textiles/${tData.id}/workers`)}>
                <div style={{width: 50, height: 50, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Building size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-lg">{tData.name}</div>
                  <div className="text-sm text-secondary">{wCount} {t('assignedWorkers', language)}</div>
                </div>
              </div>
              <div className="flex items-center pr-4 gap-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    const newName = window.prompt(t('enterTextileName', language), tData.name);
                    if(newName && newName.trim()) editTextile(tData.id, newName.trim());
                  }}
                 className="icon-button p-2" style={{backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%'}}>
                   <Edit2 size={16} className="text-secondary" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); if(window.confirm(t('delete', language) + '?')) deleteTextile(tData.id); }} 
                  className="icon-button text-error p-2 bg-error-light rounded-full flex items-center justify-center"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  );
};

const WorkerListScreen = () => {
  const { id } = useParams();
  const { workers, textiles, language, addWorker, deleteWorker } = useStore();
  const navigate = useNavigate();

  const isAll = id === 'all';
  const displayWorkers = isAll ? workers : workers.filter(w => w.textileId === id);
  const textile = isAll ? { name: t('allWorkers', language) } : textiles.find(tx => tx.id === id);

  const handleAddWorker = () => {
    if(isAll){
      alert("Please select a specific textile from the Textiles tab to add a new worker.");
      return;
    }
    const name = window.prompt(t('enterWorkerName', language));
    if(!name || !name.trim()) return;
    const salary = window.prompt(t('enterWorkerSalary', language), "8000");
    if(!salary || isNaN(salary)) return;
    
    addWorker(name.trim(), id, salary);
  };

  return (
    <Layout title={textile?.name || t('workers', language)} showBack={true}>
      {!isAll && (
         <div className="flex justify-end mb-4">
            <button className="btn btn-primary btn-sm flex items-center gap-2" onClick={handleAddWorker}>
              <UserPlus size={16} /> {t('addWorker', language)}
            </button>
         </div>
      )}
      <div className="flex flex-col gap-3">
        {displayWorkers.length === 0 ? (
          <div className="text-center p-8 text-secondary">{t('noWorkers', language)}</div>
        ) : (
          displayWorkers.map(w => (
            <div key={w.id} className="card p-0 flex items-center justify-between overflow-hidden" style={{cursor: 'pointer'}} onClick={() => navigate(`/worker/${w.id}`)}>
              <div className="flex items-center gap-3 p-4 flex-1">
                 <div style={{width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '1.2rem'}}>
                   {w.name.charAt(0)}
                 </div>
                 <div>
                   <div className="font-bold text-md">{w.name}</div>
                   <div className="text-sm text-secondary font-medium">₹{w.weeklySalary}</div>
                 </div>
              </div>
              <div className="flex items-center pr-4 gap-2">
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    const newName = window.prompt(t('enterWorkerName', language), w.name);
                    if(!newName || !newName.trim()) return;
                    const newSal = window.prompt(t('enterWorkerSalary', language), w.weeklySalary);
                    if(newSal && !isNaN(newSal)) editWorker(w.id, newName.trim(), newSal);
                  }}
                 className="icon-button p-2" style={{backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '50%'}}>
                   <Edit2 size={16} className="text-secondary" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); if(window.confirm(t('delete', language) + '?')) deleteWorker(w.id); }}
                 className="icon-button text-error p-2 bg-error-light rounded-full">
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

const WorkerDetailScreen = () => {
  const { id } = useParams();
  const { workers, textiles, advances, language } = useStore();
  const navigate = useNavigate();
  
  const worker = workers.find(w => w.id === id);
  if (!worker) return <Layout title="Not Found" showBack={true}><p>Worker not found</p></Layout>;
  
  const textile = textiles.find(tx => tx.id === worker.textileId);
  const unsettled = advances.filter(a => a.workerId === id && !a.settled);
  const totalAdvances = unsettled.reduce((sum, a) => sum + a.amount, 0);

  return (
    <Layout title={t('workerDetails', language)} showBack={true}>
      <div className="card text-center p-6 mb-4">
        <div style={{width: 80, height: 80, borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '2.5rem', margin: '0 auto 1rem'}}>
          {worker.name.charAt(0)}
        </div>
        <h2 className="font-bold text-2xl">{worker.name}</h2>
        <p className="text-secondary font-medium mt-1">@ {textile?.name}</p>
        <div className="badge badge-success mt-2">{t('active', language)}</div>
      </div>

      <div className="grid-2 mb-4">
        <div className="card text-center bg-gray-50 border-none">
          <div className="text-sm text-secondary font-medium mb-1">{t('weeklySalary', language)}</div>
          <div className="font-bold text-lg text-primary">₹{worker.weeklySalary}</div>
        </div>
        <div className="card text-center bg-error-light border-none">
          <div className="text-sm text-error font-medium mb-1">{t('advancesPending', language)}</div>
          <div className="font-bold text-lg text-error">₹{totalAdvances}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button className="btn btn-primary p-4" onClick={() => navigate(`/worker/${id}/advance`)}>
          <DollarSign size={20} />
          {t('giveAdvance', language)}
        </button>
        <button className="btn btn-outline p-4" onClick={() => navigate(`/worker/${id}/settle`)} style={{border: '2px solid var(--primary-color)', color: 'var(--primary-color)'}}>
          <Wallet size={20} />
          {t('settleSalary', language)}
        </button>
      </div>

      <h3 className="font-bold mt-6 mb-2">{t('unsettledAdvances', language)} ({unsettled.length})</h3>
      <div className="card p-0">
        {unsettled.length === 0 ? (
          <div className="p-4 text-center text-secondary text-sm">{t('noAdvancesFound', language)}</div>
        ) : (
          unsettled.map(a => (
            <div key={a.id} className="list-item px-4 border-b">
              <div>
                <div className="font-medium">{new Date(a.date).toLocaleDateString()}</div>
                <div className="text-sm text-secondary">{a.note || '---'}</div>
              </div>
              <div className="font-bold text-error">-₹{a.amount}</div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

const AddAdvanceScreen = () => {
  const { id } = useParams();
  const { workers, addAdvance, language } = useStore();
  const navigate = useNavigate();
  const worker = workers.find(w => w.id === id);

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!amount) return;
    addAdvance(id, Number(amount), note);
    navigate(-1);
  };

  if(!worker) return null;

  return (
    <Layout title={t('giveAdvance', language)} showBack={true}>
      <div className="card p-6">
        <div className="text-center mb-6">
          <div className="text-secondary font-medium text-sm">{t('givingAdvanceTo', language)}</div>
          <div className="font-bold text-xl">{worker.name}</div>
        </div>
        <form onSubmit={submit}>
          <div className="form-group mb-4">
            <label className="form-label">{t('amountRs', language)}</label>
            <input 
              type="number" 
              className="form-input" 
              style={{fontSize: '1.5rem', padding: '1rem', fontWeight: 'bold'}}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0"
              autoFocus
            />
          </div>
          <div className="form-group mb-6">
            <label className="form-label">{t('noteReason', language)}</label>
            <input 
              type="text" 
              className="form-input" 
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="..."
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{padding: '1rem', fontSize: '1.1rem'}}>{t('saveAdvance', language)}</button>
        </form>
      </div>
    </Layout>
  );
};

const SettleSalaryScreen = () => {
  const { id } = useParams();
  const { workers, advances, settleSalary, language } = useStore();
  const navigate = useNavigate();
  const worker = workers.find(w => w.id === id);

  if(!worker) return null;

  const unsettled = advances.filter(a => a.workerId === id && !a.settled);
  const totalAdvances = unsettled.reduce((sum, a) => sum + a.amount, 0);
  const finalPaid = worker.weeklySalary - totalAdvances;

  const handleSettle = () => {
    settleSalary(id);
    navigate(-1);
  };

  return (
    <Layout title={t('settleSalary', language)} showBack={true}>
      <div className="summary-box mb-6 text-center" style={{padding: '2rem 1rem'}}>
        <h2 style={{fontSize: '1rem', opacity: 0.9}}>{t('finalPayable', language)}</h2>
        <div className="amount font-bold" style={{fontSize: '3rem', marginTop: '0.5rem'}}>
          ₹{finalPaid > 0 ? finalPaid : 0}
        </div>
      </div>

      <div className="card p-0 mb-6 overflow-hidden">
        <div className="list-item px-4 border-b">
          <div className="font-medium text-secondary">{t('baseWeeklySalary', language)}</div>
          <div className="font-bold">₹{worker.weeklySalary}</div>
        </div>
        <div className="list-item px-4 border-b bg-error-light">
          <div className="font-medium text-error">{t('totalAdvancesDeducted', language)}</div>
          <div className="font-bold text-error">-₹{totalAdvances}</div>
        </div>
      </div>

      <h3 className="font-bold mb-2">{t('advancesBreakup', language)}</h3>
      <div className="card p-0 mb-6">
        {unsettled.length === 0 ? (
          <div className="p-4 text-center text-secondary text-sm">{t('noAdvancesFound', language)}</div>
        ) : (
          unsettled.map(a => (
            <div key={a.id} className="list-item px-4 border-b">
              <div className="text-sm">
                <div>{new Date(a.date).toLocaleDateString()}</div>
                <div className="text-secondary">{a.note || '---'}</div>
              </div>
              <div className="font-medium">-₹{a.amount}</div>
            </div>
          ))
        )}
      </div>

      <button className="btn btn-primary p-4 text-lg font-bold" onClick={handleSettle}>
        {t('confirmSettlement', language)}
      </button>
    </Layout>
  );
};

const HistoryScreen = () => {
  const { settlements, advances, workers, language } = useStore();
  const [tab, setTab] = useState('settlements');
  
  const sortedSetts = [...settlements].sort((a,b) => new Date(b.date) - new Date(a.date));
  const sortedAdvances = [...advances].sort((a,b) => new Date(b.date) - new Date(a.date));

  return (
    <Layout title={t('history', language)} showBack={false}>
      <div className="flex gap-2 mb-4">
        <button 
          className={`btn btn-sm flex-1 ${tab === 'settlements' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('settlements')}
        >{t('settlements', language)}</button>
        <button 
          className={`btn btn-sm flex-1 ${tab === 'advances' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setTab('advances')}
        >{t('advances', language)}</button>
      </div>
      
      <div className="card p-0">
        {tab === 'settlements' && (
          sortedSetts.length === 0 ? (
            <div className="p-8 text-center text-secondary">{t('noSettlements', language)}</div>
          ) : (
            sortedSetts.map(s => {
              const worker = workers.find(w => w.id === s.workerId);
              return (
                <div key={s.id} className="list-item px-4 border-b flex-col items-start gap-2" style={{alignItems: 'stretch'}}>
                   <div className="flex justify-between items-center w-full">
                      <div className="font-bold text-md">{worker?.name || 'Unknown'}</div>
                      <div className="text-sm text-secondary font-medium">{new Date(s.date).toLocaleDateString()}</div>
                   </div>
                   <div className="flex justify-between items-center w-full bg-gray-50 p-2 rounded" style={{backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: 'var(--radius-sm)'}}>
                      <div className="text-xs">
                        <div>{t('base', language)}: ₹{s.baseSalary}</div>
                        <div className="text-error">{t('adv', language)}: -₹{s.totalAdvances}</div>
                      </div>
                      <div className="font-bold text-primary text-lg">{t('paid', language)}: ₹{s.finalPaid}</div>
                   </div>
                </div>
              )
            })
          )
        )}

        {tab === 'advances' && (
          sortedAdvances.length === 0 ? (
            <div className="p-8 text-center text-secondary">{t('noAdvancesFound', language)}</div>
          ) : (
            sortedAdvances.map(a => {
              const worker = workers.find(w => w.id === a.workerId);
              return (
                <div key={a.id} className="list-item px-4 border-b">
                  <div className="flex items-center gap-3">
                    <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold'}}>
                      {worker?.name.charAt(0) || '?'}
                    </div>
                    <div>
                      <div className="font-bold">{worker?.name || 'Unknown'}</div>
                      <div className="text-xs text-secondary">{new Date(a.date).toLocaleDateString()} • {a.note || '---'}</div>
                      <span className={`badge mt-1 ${a.settled ? 'badge-success' : 'badge-warning'}`}>{a.settled ? t('settled', language) : t('pending', language)}</span>
                    </div>
                  </div>
                  <div className="font-bold text-error">-₹{a.amount}</div>
                </div>
              )
            })
          )
        )}
      </div>
    </Layout>
  );
};

const SettingsScreen = () => {
  const { currentUser, logout, resetAll, changePin, language, setLanguage, textiles, workers, advances, settlements } = useStore();
  const [theme, setTheme] = useState(() => localStorage.getItem('texus_theme') || 'Light');

  useEffect(() => {
    localStorage.setItem('texus_theme', theme);
    document.documentElement.setAttribute('data-theme', theme.toLowerCase());
  }, [theme]);

  const handleBackup = () => {
    let text = `=======================================\n`;
    text += `       TexUs App - Ledger Statement    \n`;
    text += `       Generated: ${new Date().toLocaleString()}\n`;
    text += `=======================================\n\n`;

    text += `[WORKERS & WEEKLY BASE SALARIES]\n`;
    workers.forEach(w => text += `- ${w.name}: ₹${w.weeklySalary}\n`);
    text += `\n`;

    text += `[CURRENT PENDING ADVANCES]\n`;
    const pending = advances.filter(a => !a.settled);
    if (pending.length === 0) text += `No pending advances!\n`;
    pending.forEach(a => {
      const worker = workers.find(w => w.id === a.workerId)?.name || 'Unknown';
      text += `- ${worker} owes ₹${a.amount} (Note: ${a.note || 'None'} | Date: ${new Date(a.date).toLocaleDateString()})\n`;
    });
    text += `\n`;

    text += `[RECENT SETTLEMENT HISTORY]\n`;
    const recentSettlements = [...settlements].sort((a,b) => new Date(b.date) - new Date(a.date));
    if (recentSettlements.length === 0) text += `No settlement history.\n`;
    recentSettlements.forEach(s => {
      const worker = workers.find(w => w.id === s.workerId)?.name || 'Unknown';
      text += `- Date: ${new Date(s.date).toLocaleDateString()} | ${worker} received Final Pay ₹${s.finalPaid} | (Base: ₹${s.baseSalary}, Advances Deducted: -₹${s.totalAdvances})\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TexUs_Ledger_Statement_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePinChange = () => {
    const newPin = window.prompt(language === 'ta' ? 'புதிய PIN எண்ணை உள்ளிடவும் (4 இலக்கங்கள்)' : 'Enter new PIN (4 digits):');
    if (newPin && newPin.length >= 4) {
      changePin(newPin);
      alert(language === 'ta' ? 'PIN வெற்றிகரமாக மாற்றப்பட்டது!' : 'PIN changed successfully!');
    } else if (newPin) {
      alert(language === 'ta' ? 'PIN 4 இலக்கங்களில் இருக்க வேண்டும்' : 'PIN must be at least 4 digits long');
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  return (
    <Layout title={t('settings', language)} showBack={false}>
      <div className="card p-4 mb-4 flex items-center gap-4">
        <div style={{width: 60, height: 60, borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', fontWeight: 'bold', fontSize: '1.5rem'}}>
          {currentUser?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <div className="font-bold text-lg">{currentUser?.name}</div>
          <div className="text-sm text-secondary capitalize">{currentUser?.role} Account</div>
        </div>
      </div>

      <div className="card p-0 mb-4">
        <div className="list-item px-4 border-b py-4 font-medium" style={{cursor: 'pointer'}} onClick={handlePinChange}>
          {t('changePin', language)}
          <ChevronRight size={18} className="text-secondary" />
        </div>
        <div className="list-item px-4 border-b py-4 font-medium" style={{cursor: 'pointer'}} onClick={toggleLanguage}>
          {t('language', language)}: {language === 'ta' ? 'தமிழ்' : 'English'} (Toggle)
        </div>
        <div className="list-item px-4 border-b py-4 font-medium" style={{cursor: 'pointer'}} onClick={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}>
          {t('appTheme', language)} ({theme})
        </div>
        <div className="list-item px-4 border-b py-4 font-medium" style={{cursor: 'pointer'}} onClick={handleBackup}>
          {t('dataBackup', language)}
          <ChevronRight size={18} className="text-secondary" />
        </div>
      </div>

      <button className="btn btn-outline mb-4 p-4 text-error" style={{borderColor: 'var(--error-light)', color: 'var(--error-color)'}} onClick={() => { logout(); window.location.reload(); }}>
        <LogOut size={20} /> {t('logout', language)}
      </button>

      {currentUser?.role === 'owner' && (
        <div className="text-center mt-8">
           <button className="text-xs text-secondary underline" style={{background:'none', border:'none'}} onClick={() => { if(window.confirm('Erase all data?')) resetAll(); }}>
             {t('eraseAllData', language)}
           </button>
        </div>
      )}
    </Layout>
  );
};

// -- WORKER ROLE SCREENS --

const WorkerDashboard = () => {
  const { currentUser, advances, settlements, language } = useStore();
  const navigate = useNavigate();

  const myAdvances = advances.filter(a => a.workerId === currentUser.id);
  const mySettled = settlements.filter(s => s.workerId === currentUser.id);
  const myUnsettled = myAdvances.filter(a => !a.settled);
  const unsettledTotal = myUnsettled.reduce((sum, a) => sum + a.amount, 0);

  return (
    <Layout title={<span className="font-bold">{t('myDashboard', language)}</span>} showBack={false} hideNav={false}>
       <div className="summary-box mb-6">
        <h2>{t('advancesTaken', language)}</h2>
        <div className="amount mb-2">₹{unsettledTotal}</div>
      </div>

      <h3 className="font-bold mb-2">{t('myRecentAdvances', language)}</h3>
      <div className="card p-0 mb-6">
        {myAdvances.length === 0 ? (
          <div className="p-4 text-center text-secondary">{t('noAdvancesFound', language)}</div>
        ) : (
          myAdvances.slice(-3).reverse().map(a => (
            <div key={a.id} className="list-item px-4 border-b">
              <div>
                <div className="font-medium">{new Date(a.date).toLocaleDateString()}</div>
                <div className="text-sm text-secondary">{a.note || '---'}</div>
                <span className={`badge mt-1 ${a.settled ? 'badge-success' : 'badge-warning'}`}>{a.settled ? t('settled', language) : t('pending', language)}</span>
              </div>
              <div className="font-bold text-error">-₹{a.amount}</div>
            </div>
          ))
        )}
      </div>

      <h3 className="font-bold mb-2">{t('myLastSettlement', language)}</h3>
      <div className="card p-0">
        {mySettled.length === 0 ? (
          <div className="p-4 text-center text-secondary">{t('noSettlements', language)}</div>
        ) : (
          (() => {
            const s = mySettled[mySettled.length - 1]; 
            return (
              <div className="px-4 py-4">
                <div className="flex justify-between mb-2 pb-2 border-b">
                  <span className="font-medium">{t('dateStr', language)}</span>
                  <span className="font-bold">{new Date(s.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-secondary">{t('baseWeeklySalary', language)}</span>
                  <span>₹{s.baseSalary}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-error">{t('totalAdvancesDeducted', language)}</span>
                  <span className="text-error">-₹{s.totalAdvances}</span>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t">
                  <span className="font-bold text-lg text-primary">{t('finalReceived', language)}</span>
                  <span className="font-bold text-lg text-primary">₹{s.finalPaid}</span>
                </div>
              </div>
            )
          })()
        )}
      </div>
    </Layout>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { currentUser } = useStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('texus_theme') || 'Light';
    document.documentElement.setAttribute('data-theme', savedTheme.toLowerCase());
  }, []);

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      {currentUser ? (
        <Routes>
          {currentUser.role === 'owner' ? (
            <>
              <Route path="/" element={<DashboardScreen />} />
              <Route path="/textiles" element={<TextileListScreen />} />
              <Route path="/textiles/:id/workers" element={<WorkerListScreen />} />
              <Route path="/workers/:id" element={<WorkerListScreen />} />
              <Route path="/worker/:id" element={<WorkerDetailScreen />} />
              <Route path="/worker/:id/advance" element={<AddAdvanceScreen />} />
              <Route path="/worker/:id/settle" element={<SettleSalaryScreen />} />
              <Route path="/history" element={<HistoryScreen />} />
            </>
          ) : (
             <>
                <Route path="/" element={<WorkerDashboard />} />
                <Route path="/history" element={<Navigate to="/" />} />
                <Route path="/textiles" element={<Navigate to="/" />} />
             </>
          )}
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <LoginScreen />
      )}
    </BrowserRouter>
  );
}
