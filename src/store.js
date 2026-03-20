import { useState, useEffect } from 'react';

// Generates a random ID
export const generateId = () => Math.random().toString(36).substring(2, 9);

// Standard local storage helper
export const initData = (key, defaultData) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return initData(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// Data Models Init
const INITIAL_TEXTILES = [];

const INITIAL_WORKERS = [];

export const useStore = () => {
  const [currentUser, setCurrentUser] = useLocalStorage('texus_current_user', null);
  const [language, setLanguage] = useLocalStorage('texus_lang', 'en'); // en or ta
  const [users, setUsers] = useLocalStorage('texus_users', []);
  const [textiles, setTextiles] = useLocalStorage('texus_textiles', INITIAL_TEXTILES);
  const [workers, setWorkers] = useLocalStorage('texus_workers', INITIAL_WORKERS);
  const [advances, setAdvances] = useLocalStorage('texus_advances', []);
  const [settlements, setSettlements] = useLocalStorage('texus_settlements', []);

  // Helpers
  const registerOwner = (name, phone, pin) => {
    // Basic verification without complex error handling for demo
    if (users.find(u => u.phone === phone)) return false; 
    
    const newUser = {
      id: generateId(),
      role: 'owner',
      name,
      phone,
      pin
    };
    setUsers(prev => [...prev, newUser]);
    return true;
  };

  const changePin = (newPin) => {
    if(!currentUser) return;
    if(currentUser.role === 'owner') {
      setUsers(prev => prev.map(u => u.id === currentUser.id ? {...u, pin: newPin} : u));
    }
    // Update active session too
    setCurrentUser({...currentUser, pin: newPin});
    return true;
  };

  const login = (role, phone, pin) => {
    if (role === 'owner') {
      // Check dynamic users first
      const user = users.find(u => u.role === 'owner' && u.phone === phone && u.pin === pin);
      if (user) {
        setCurrentUser(user);
        return true;
      }
    } else if (role === 'worker') {
      // Allow worker login
      const worker = workers.find(w => w.name.toLowerCase() === phone.toLowerCase());
      if (worker && pin === '1234') { // Using default 1234 for all workers
        setCurrentUser({ role: 'worker', id: worker.id, name: worker.name, textileId: worker.textileId });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  const addAdvance = (workerId, amount, note, date) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;
    const newAdvance = {
      id: generateId(),
      workerId,
      textileId: worker.textileId,
      amount: Number(amount),
      date: date || new Date().toISOString(),
      note,
      settled: false
    };
    setAdvances(prev => [...prev, newAdvance]);
  };

  const addTextile = (name) => {
    setTextiles(prev => [...prev, { id: generateId(), name }]);
  };

  const editTextile = (id, name) => {
    setTextiles(prev => prev.map(t => t.id === id ? { ...t, name } : t));
  };

  const deleteTextile = (id) => {
    setTextiles(prev => prev.filter(t => t.id !== id));
    // Clean up related workers
    setWorkers(prev => prev.filter(w => w.textileId !== id));
  };

  const addWorker = (name, textileId, weeklySalary) => {
    setWorkers(prev => [...prev, { id: generateId(), name, textileId, weeklySalary: Number(weeklySalary), joinedDate: new Date().toISOString() }]);
  };

  const deleteWorker = (id) => {
    setWorkers(prev => prev.filter(w => w.id !== id));
  };

  const editWorker = (id, newName, newSalary) => {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, name: newName, weeklySalary: Number(newSalary) } : w));
  };

  const settleSalary = (workerId) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    // Get unpaid advances
    const unpaidAdvances = advances.filter(a => a.workerId === workerId && !a.settled);
    const totalAdvances = unpaidAdvances.reduce((sum, a) => sum + a.amount, 0);

    const finalPaid = worker.weeklySalary - totalAdvances;

    const newSettlement = {
      id: generateId(),
      workerId,
      textileId: worker.textileId,
      baseSalary: worker.weeklySalary,
      totalAdvances: totalAdvances,
      finalPaid: finalPaid > 0 ? finalPaid : 0,
      date: new Date().toISOString(),
    };

    setSettlements(prev => [...prev, newSettlement]);

    // Mark advances as settled
    setAdvances(prev => prev.map(a => 
      (a.workerId === workerId && !a.settled) ? { ...a, settled: true, settlementId: newSettlement.id } : a
    ));
    
    return newSettlement;
  };

  return {
    currentUser, login, logout, resetAll, registerOwner, users, changePin,
    language, setLanguage,
    textiles, setTextiles, addTextile, deleteTextile, editTextile,
    workers, addWorker, deleteWorker, editWorker,
    advances, addAdvance,
    settlements, settleSalary
  };
};
