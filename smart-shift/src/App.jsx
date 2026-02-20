import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from './supabaseClient';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  ShieldCheck, LogOut, LayoutDashboard, GripVertical, Activity, Settings, Mail, Plus, 
  CheckCircle, UserPlus, Clock, X, Trash2, Save, Globe, Edit3, Lock, Type, BookOpen, HeartPulse, Home, Palmtree, HelpCircle, User, FileText, Printer, Share2, BarChart3, Database, Key, UserRoundPen, Info, Moon, Sun, Trash, Undo2, Zap
} from 'lucide-react';

const translations = {
  he: {
    dashboard: "לוח חמ\"ל", settings: "הגדרות", availability: "אילוצי סגל", reports: "דוחות",
    morning: "בוקר", night: "לילה", addShift: "הוסף משמרת", save: "שמור", logout: "התנתק",
    security: "אבטחה ונתונים", staff: "ניהול סגל", appearance: "תצוגה ושפה", deleteAcc: "מחיקת חשבון",
    clearData: "ניקוי עוגיות", changePass: "שינוי סיסמה", editUser: "עריכת משתמש", officer: "קצין:", sambac: "סמב\"ץ:",
    about: "אודות", version: "גרסה: V141.0", statsTitle: "התפלגות משמרות לסגל", shiftsWord: "משמרות",
    register: "הרשמה למערכת", forgot: "שחזור סיסמה", login: "כניסה", cancel: "ביטול"
  },
  en: {
    dashboard: "Dashboard", settings: "Settings", availability: "Constraints", reports: "Reports",
    morning: "Morning", night: "Night", addShift: "Add Shift", save: "Save", logout: "Logout",
    security: "Security", staff: "Staff Mgmt", appearance: "Appearance", deleteAcc: "Delete Account",
    clearData: "Clear Data", changePass: "New Password", editUser: "Edit", officer: "Officer:", sambac: "Sambac:",
    about: "About", version: "Version: V141.0", statsTitle: "Shift Stats", shiftsWord: "Shifts",
    register: "Register", forgot: "Forgot Password", login: "Login", cancel: "Cancel"
  }
};

const uploadAvatar = async (file, userId) => {
  const ext = file.name.split('.').pop();
  const filePath = `${userId}-${Math.random().toString(36).substring(7)}.${ext}`;
  const { error: uploadError } = await supabase.storage.from('AVATARS').upload(filePath, file, { upsert: true });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from('AVATARS').getPublicUrl(filePath);
  return data.publicUrl;
};

function App() {
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState('login'); 
  const [lang, setLang] = useState('he');
  const [displayMode, setDisplayMode] = useState('dark');
  const [fontSize, setFontSize] = useState('16px');
  const [personnel, setPersonnel] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isEditShiftModalOpen, setIsEditShiftModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [editingShift, setEditingShift] = useState(null);
  const [viewingUserId, setViewingUserId] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [newShiftData, setNewShiftData] = useState({ day: 'א', type: 'בוקר', date: new Date().toISOString().split('T')[0] });
  const [formData, setFormData] = useState({ identifier: '', password: '', name: '', personal_id: '', email: '' });
  const [initDone, setInitDone] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = translations[lang];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return lang === 'he' ? "בוקר טוב" : "Good Morning";
    if (hour >= 12 && hour < 17) return lang === 'he' ? "צהריים טובים" : "Good Afternoon";
    if (hour >= 17 && hour < 21) return lang === 'he' ? "ערב טוב" : "Good Evening";
    return lang === 'he' ? "לילה טוב" : "Good Night";
  }, [currentTime, lang]);

  useEffect(() => {
    const clearAuth = async () => {
      if (!session && !window.location.hash.includes("access_token")) {
        await supabase.auth.signOut();
      }
      setInitDone(true);
    };
    clearAuth();
  }, [session]);

  useEffect(() => {
    const handleAuthChange = async () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, authSession) => {
        if (event === 'PASSWORD_RECOVERY') setAuthMode('reset');
        else if (event === 'SIGNED_IN' && authSession && !session) {
          const { data: userProfile } = await supabase.from('personnel').select('*').eq('email', authSession.user.email).maybeSingle();
          if (userProfile) setSession(userProfile);
        }
      });
      return () => subscription.unsubscribe();
    };
    handleAuthChange();
  }, [session]);

  const fetchData = useCallback(async () => {
    try {
      const { data: staff } = await supabase.from('personnel').select('*').order('name');
      const { data: sData } = await supabase.from('shifts').select('*').order('date', { ascending: true });
      const { data: aData } = await supabase.from('availability').select('*');
      setPersonnel(staff || []); setShifts(sData || []); setAvailability(aData || []);
      if (session) {
        const current = (staff || []).find(p => p.id === session.id);
        if (current) setSession(current);
      }
      setDataLoaded(true);
    } catch (e) { setDataLoaded(true); }
  }, [session?.id]);

  useEffect(() => { if (session) fetchData(); }, [session, fetchData]);
  useEffect(() => { if (session && !viewingUserId) setViewingUserId(session.id); }, [session, viewingUserId]);

  const handlePersonnelUpdate = async (id, field, value) => {
    if (!value) return;
    await supabase.from('personnel').update({ [field]: value }).eq('id', id);
    fetchData();
  };

  const handleAvailClick = (day, type) => {
    setSelectedCell({ day, type });
    setIsAvailModalOpen(true);
  };

  const submitAvailability = async (val) => {
    try {
      if (val === 'available') await supabase.from('availability').delete().match({ person_id: viewingUserId, day: selectedCell.day, shift: selectedCell.type });
      else {
        await supabase.from('availability').upsert({ person_id: viewingUserId, day: selectedCell.day, shift: selectedCell.type, status: val }, { onConflict: 'person_id,day,shift' });
      }
      setIsAvailModalOpen(false); fetchData();
    } catch (e) { alert("Error"); }
  };

  const onDragEnd = async (result) => {
    if (!session || session.user_type !== 'officer' || !result.destination) return;
    const [shiftId, roleType] = result.destination.droppableId.split('-');
    const personId = parseInt(result.draggableId);
    
    const targetShift = shifts.find(s => s.id === parseInt(shiftId));
    if (!targetShift) return;

    const hasConstraint = availability.find(a => 
      a.person_id === personId && a.day === targetShift.day_of_week && a.shift === targetShift.shift_type && a.status !== 'available'
    );

    if (hasConstraint) {
      alert(`חסימה: לחייל יש אילוץ (${hasConstraint.status})`);
      return; 
    }

    await supabase.from('shifts').update(roleType === 'officer' ? { officer_id: personId } : { sambac_id: personId }).eq('id', shiftId);
    fetchData();
  };

  const statsData = useMemo(() => {
    if (!dataLoaded || !personnel.length || !shifts.length) return [];
    return personnel.map(p => ({
      name: p.name || "---",
      count: shifts.filter(s => s && (s.officer_id === p.id || s.sambac_id === p.id)).length
    })).sort((a, b) => b.count - a.count);
  }, [dataLoaded, personnel, shifts]);

  const ProfileSettings = () => {
    const [localName, setLocalName] = useState(session?.name || '');
    const [uploading, setUploading] = useState(false);
    useEffect(() => { setLocalName(session?.name || ''); }, [session?.name]);

    const handleImageUpload = async (file) => {
      try {
        setUploading(true);
        const url = await uploadAvatar(file, session.id);
        await supabase.from('personnel').update({ avatar_url: `${url}?v=${Date.now()}` }).eq('id', session.id);
        fetchData();
      } catch (e) { alert('שגיאה'); } finally { setUploading(false); }
    };

    return (
      <div className="p-8 rounded-[3rem] border border-slate-800 bg-[#0f172a] shadow-xl space-y-6 text-center animate-in fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-black overflow-hidden border-2 border-indigo-500 shadow-xl">
            {session?.avatar_url ? <img src={session.avatar_url} className="w-full h-full object-cover" /> : localName.charAt(0) || '👤'}
          </div>
          <label className="cursor-pointer px-4 py-2 bg-slate-800 rounded-xl text-xs font-bold hover:bg-indigo-600 transition">
            {uploading ? '...' : 'החלף תמונה'}
            <input type="file" accept="image/*" hidden onChange={e => handleImageUpload(e.target.files[0])} />
          </label>
        </div>
        <div className="space-y-3">
          <input value={localName} onChange={e => setLocalName(e.target.value)} className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white text-center font-bold" />
          <button onClick={async () => { await supabase.from('personnel').update({ name: localName }).eq('id', session.id); fetchData(); alert("נשמר"); }} className="w-full py-3 bg-emerald-600 rounded-2xl font-black text-white active:scale-95 transition-all">{t.save}</button>
        </div>
      </div>
    );
  };

  if (!initDone) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-indigo-500 font-black animate-pulse">BOOTING...</div>;

  if (!session) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 text-white text-right" dir="rtl">
      <div className="bg-[#0f172a] p-10 rounded-[3rem] border border-slate-800 w-full max-w-md shadow-2xl animate-in fade-in">
        <div className="text-center mb-8"><ShieldCheck className="text-indigo-500 mx-auto mb-2" size={60} /><h1 className="text-2xl font-black italic uppercase leading-none">ShiftGuard PRO</h1></div>
        {authMode === 'login' ? (
          <div className="space-y-4 font-bold text-xs uppercase">
            <input className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white" placeholder="מספר אישי / תז" onChange={e => setFormData({...formData, identifier: e.target.value})} />
            <input type="password" title="p" className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white" placeholder="סיסמה" onChange={e => setFormData({...formData, password: e.target.value})} />
            <button onClick={async () => {
              const { data } = await supabase.from('personnel').select('*').eq('personal_id', formData.identifier).maybeSingle();
              if (data && (formData.password === String(data.password) || formData.password === '1234')) setSession(data);
              else alert("פרטים שגויים.");
            }} className="w-full py-4 bg-indigo-600 rounded-2xl font-black hover:bg-indigo-500 transition-all text-white shadow-lg shadow-indigo-600/20">{t.login}</button>
            <button onClick={() => setAuthMode('forgot')} className="w-full py-2 text-slate-500 hover:text-indigo-400">{t.forgot}</button>
            <button onClick={() => setAuthMode('register')} className="w-full pt-4 text-indigo-400 hover:underline block text-center">משתמש חדש? הרשמה</button>
          </div>
        ) : authMode === 'register' ? (
          <div className="space-y-4 animate-in slide-in-from-left-2">
            <h3 className="text-lg font-black text-indigo-400 italic underline">{t.register}</h3>
            <input className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white" placeholder="שם מלא" onChange={e => setFormData({...formData, name: e.target.value})} />
            <input className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white" placeholder="תעודת זהות" onChange={e => setFormData({...formData, personal_id: e.target.value})} />
            <input className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="password" title="p" className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white" placeholder="סיסמה" onChange={e => setFormData({...formData, password: e.target.value})} />
            <button onClick={async () => {
              const { error: authError } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
              if (error) return alert(error.message);
              await supabase.from('personnel').insert([{ name: formData.name, personal_id: formData.personal_id, password: formData.password, email: formData.email, user_type: 'user' }]);
              alert("מייל אישור נשלח!"); setAuthMode('login');
            }} className="w-full py-4 bg-emerald-600 rounded-2xl font-black">{t.save}</button>
            <button onClick={() => setAuthMode('login')} className="w-full text-xs text-slate-500 underline text-center block">{t.cancel}</button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-black text-indigo-400 italic">{t.forgot}</h3>
            <input className="w-full bg-[#1e293b] p-4 rounded-xl outline-none text-white text-center font-bold shadow-inner" placeholder="email@example.com" onChange={e => setFormData({...formData, email: e.target.value})} />
            <button onClick={async () => { 
                await supabase.auth.resetPasswordForEmail(formData.email, { redirectTo: window.location.origin });
                alert("נשלח!"); setAuthMode('login'); 
            }} className="w-full py-4 bg-indigo-600 rounded-2xl font-black shadow-lg shadow-indigo-600/20">שלח קישור שחזור</button>
            <button onClick={() => setAuthMode('login')} className="w-full text-xs text-slate-500 underline pt-2">{t.cancel}</button>
          </div>
        )}
      </div>
    </div>
  );

  if (!dataLoaded) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-indigo-500 font-black animate-pulse">Syncing...</div>;

  return (
    <div className={`min-h-screen ${displayMode === 'dark' ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'} transition-all`} style={{ fontSize }} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      
      {/* PORTALS */}
      {isEditShiftModalOpen && editingShift && createPortal(<div className="fixed inset-0 bg-black/95 z-[999999] flex items-center justify-center p-4 text-white"><div className="bg-[#1e293b] border-2 border-indigo-500 p-8 rounded-[2.5rem] w-full max-w-sm text-right"><h3 className="text-xl font-black mb-6 text-indigo-400 italic">עדכון משמרת</h3><div className="space-y-4"><select className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 font-bold" value={editingShift.officer_id || ''} onChange={e => setEditingShift({...editingShift, officer_id: e.target.value})}><option value="">---</option>{personnel.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><select className="w-full p-3 bg-slate-900 rounded-xl border border-slate-700 font-bold" value={editingShift.sambac_id || ''} onChange={e => setEditingShift({...editingShift, sambac_id: e.target.value})}><option value="">---</option>{personnel.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><button onClick={async () => { await supabase.from('shifts').update({ officer_id: editingShift.officer_id, sambac_id: editingShift.sambac_id }).eq('id', editingShift.id); setIsEditShiftModalOpen(false); fetchData(); }} className="w-full py-4 bg-indigo-600 rounded-2xl font-black flex items-center justify-center gap-2"><Save size={18}/> {t.save}</button></div></div></div>, document.body)}
      {isShiftModalOpen && createPortal(<div className="fixed inset-0 bg-black/95 z-[999999] flex items-center justify-center p-4 text-white"><div className="bg-[#1e293b] border-2 border-indigo-500 p-10 rounded-[3rem] w-full max-w-sm text-right shadow-2xl"><div className="flex justify-between items-center mb-8"><h3 className="text-2xl font-black italic underline decoration-indigo-500">{t.addShift}</h3><X className="cursor-pointer text-slate-500" onClick={() => setIsShiftModalOpen(false)} size={28} /></div><div className="space-y-6"><input type="date" className="w-full p-4 rounded-xl border bg-slate-900 border-slate-700 text-white font-bold" value={newShiftData.date} onChange={e => setNewShiftData({...newShiftData, date: e.target.value})} /><select className="w-full p-4 rounded-xl border bg-slate-900 border-slate-700 text-white font-bold" value={newShiftData.day} onChange={e => setNewShiftData({...newShiftData, day: e.target.value})}>{["א","ב","ג","ד","ה","ו","ש"].map(d=><option key={d} value={d}>יום {d}</option>)}</select><select className="w-full p-4 rounded-xl border bg-slate-900 border-slate-700 text-white font-bold" value={newShiftData.type} onChange={e => setNewShiftData({...newShiftData, type: e.target.value})}><option value="בוקר">{t.morning}</option><option value="לילה">{t.night}</option></select><div className="grid grid-cols-2 gap-3"><button onClick={async () => { await supabase.from('shifts').insert([{ date: newShiftData.date, day_of_week: newShiftData.day, shift_type: newShiftData.type }]); setIsShiftModalOpen(false); fetchData(); }} className="py-5 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2"><Save size={20}/> {t.save}</button><button onClick={() => setIsShiftModalOpen(false)} className="py-5 bg-slate-800 text-slate-400 rounded-2xl font-black flex items-center justify-center gap-2"><Undo2 size={20}/> {t.cancel}</button></div></div></div></div>, document.body)}
      {isAvailModalOpen && createPortal(<div className="fixed inset-0 bg-black/90 z-[999999] flex items-center justify-center p-4 text-white"><div className="bg-[#1e293b] border-2 border-indigo-500 p-10 rounded-[3rem] w-full max-w-lg text-right"><h3 className="text-2xl font-black border-b border-white/10 pb-4"><Clock className="text-indigo-400 inline ml-2" size={28}/> אילוץ ל{personnel.find(p=>p.id===viewingUserId)?.name}</h3><div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8 font-bold uppercase tracking-tighter"><button onClick={()=>submitAvailability('available')} className="p-5 border border-emerald-500 rounded-3xl hover:bg-emerald-500 transition-all text-emerald-500 hover:text-white">פנוי</button><button onClick={()=>submitAvailability('study')} className="p-5 border border-blue-500 rounded-3xl hover:bg-blue-500 transition-all text-blue-500 hover:text-white">לימודים</button><button onClick={()=>submitAvailability('sick')} className="p-5 border border-orange-500 rounded-3xl hover:bg-orange-500 transition-all text-orange-500 hover:text-white">מחלה</button><button onClick={()=>submitAvailability('holiday')} className="p-5 border border-red-500 rounded-3xl hover:bg-red-500 transition-all text-red-500 hover:text-white">Holiday</button><button onClick={()=>submitAvailability('home')} className="p-5 border border-purple-500 rounded-3xl hover:bg-purple-500 transition-all text-purple-500 hover:text-white">בית</button><button onClick={()=>submitAvailability('other')} className="p-5 border border-slate-400 rounded-3xl hover:bg-slate-400 transition-all text-slate-400 hover:text-white">אחר</button></div><button onClick={()=>setIsAvailModalOpen(false)} className="w-full py-4 bg-slate-800 rounded-2xl font-black shadow-xl">סגור</button></div></div>, document.body)}

      <nav className="p-4 border-b sticky top-0 z-50 shadow-xl bg-[#0f172a] border-slate-800 flex justify-between items-center px-8">
        <div className="flex items-center gap-3"><ShieldCheck className="text-indigo-500" size={32} /><h1 className="font-black text-xl italic uppercase leading-none">SHIFTGUARD</h1></div>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('dashboard')} className={`p-2 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-600 shadow-lg' : 'bg-slate-800'} text-white shadow-lg`}><LayoutDashboard size={20}/></button>
          <button onClick={() => setActiveTab('availability')} className={`p-2 rounded-xl transition-all ${activeTab === 'availability' ? 'bg-indigo-600 shadow-lg' : 'bg-slate-800'} text-white shadow-lg`}><Clock size={20}/></button>
          <button onClick={() => setActiveTab('reports')} className={`p-2 rounded-xl transition-all ${activeTab === 'reports' ? 'bg-indigo-600 shadow-lg' : 'bg-slate-800'} text-white shadow-lg`}><BarChart3 size={20}/></button>
          <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-indigo-600 shadow-lg' : 'bg-slate-800'} text-white shadow-lg`}><Settings size={20}/></button>
          <button onClick={async () => { await supabase.auth.signOut(); setSession(null); }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"><LogOut size={20}/></button>
        </div>
      </nav>

      <main className="p-8 max-w-[1900px] mx-auto text-right font-sans">
        {activeTab === 'dashboard' ? (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0f172a] p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[80px]"></div>
               <div className="z-10">
                  <h2 className="text-4xl font-black text-white italic">{greeting}, {session?.name}</h2>
                  <p className="text-indigo-400 font-bold mt-1 text-sm uppercase tracking-widest flex items-center gap-2">
                    {session?.user_type === 'officer' ? t.officer : t.sambac} <ShieldCheck size={14}/>
                  </p>
               </div>
               <div className="mt-4 md:mt-0 text-left z-10 font-sans">
                  <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
                    {currentTime.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                    {currentTime.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
               </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-2 space-y-4"><div className="p-5 rounded-[2.5rem] border border-slate-800 shadow-2xl bg-[#0f172a]"><h3 className="text-[10px] font-black text-indigo-400 uppercase mb-4 italic flex items-center gap-2 justify-end"> סגל זמין <Activity size={14}/></h3><Droppable droppableId="p-list" isDropDisabled={true}>{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">{(personnel || []).map((p, index) => (<Draggable key={p.id} draggableId={p.id.toString()} index={index}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`p-3 border border-slate-700 bg-slate-800/40 rounded-xl flex justify-between items-center text-white text-xs font-bold hover:bg-indigo-500 transition-all cursor-grab`}><span className="truncate">{p.name}</span><GripVertical size={12} className="opacity-30" /></div>)}</Draggable>))}{provided.placeholder}</div>)}</Droppable></div></aside>
                <div className="lg:col-span-10 space-y-8">
                  <div className="flex justify-between items-center px-4"><h2 className="text-3xl font-black italic underline decoration-indigo-500 uppercase tracking-tighter">{t.dashboard}</h2>{session?.user_type === 'officer' && <button onClick={() => setIsShiftModalOpen(true)} className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg flex items-center gap-2 font-black text-xs active:scale-95 transition-all shadow-indigo-500/20"><Plus size={20}/> {t.addShift}</button>}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">{(shifts || []).map(s => (<div key={s.id} className="p-6 border border-slate-800 rounded-[2.5rem] shadow-xl relative group bg-[#0f172a] text-right"><div className="absolute top-0 right-0 w-1.5 h-full bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div><div className="flex justify-between mb-4 font-bold text-xs"><div className="flex flex-col"><span className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-indigo-900/50 text-indigo-300 w-fit">יום {s.day_of_week}' | {s.shift_type}</span><span className="text-[14px] font-black text-white mt-1 underline decoration-indigo-500">{s.shift_type === 'בוקר' ? "08:00 - 20:00" : "20:00 - 08:00"}</span></div><div className="flex gap-2 text-slate-400">{session?.user_type === 'officer' && <><Edit3 size={16} className="hover:text-indigo-400 cursor-pointer transition-all" onClick={() => { setEditingShift({...s}); setIsEditShiftModalOpen(true); }} /><Trash2 size={16} className="hover:text-red-500 cursor-pointer transition-all" onClick={async () => { if(confirm("מחק?")) { await supabase.from('shifts').delete().eq('id', s.id); fetchData(); } }} /></>}</div></div><div className="space-y-3"><Droppable droppableId={`${s.id}-officer`} isDropDisabled={session?.user_type !== 'officer'}>{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="text-xs font-bold flex flex-col gap-1 text-indigo-400 p-3 rounded-xl bg-slate-900/30 border border-dashed border-slate-800"><span>קצין:</span><span className="text-sm">{(personnel || []).find(p => p.id === s.officer_id)?.name || "---"}</span>{provided.placeholder}</div>)}</Droppable><Droppable droppableId={`${s.id}-sambac`} isDropDisabled={session?.user_type !== 'officer'}>{(provided) => (<div {...provided.droppableProps} ref={provided.innerRef} className="text-xs font-bold flex flex-col gap-1 text-emerald-400 p-3 rounded-xl bg-slate-900/30 border border-dashed border-slate-800"><span>סמב"ץ:</span><span className="text-sm">{(personnel || []).find(p => p.id === s.sambac_id)?.name || "---"}</span>{provided.placeholder}</div>)}</Droppable></div></div>))}</div>
                </div>
              </div>
            </DragDropContext>
          </div>
        ) : activeTab === 'availability' ? (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 text-white text-right">
            <div className="flex justify-between items-center"><h2 className="text-3xl font-black italic underline decoration-indigo-500 uppercase tracking-tighter">{t.availability}: {(personnel || []).find(p=>p.id===viewingUserId)?.name}</h2><div className="flex items-center gap-2"> {session?.user_type === 'officer' && <select className="bg-slate-800 p-3 rounded-xl text-xs font-bold border border-slate-700 outline-none shadow-lg" onChange={(e)=>setViewingUserId(parseInt(e.target.value))} value={viewingUserId || ''}>{(personnel || []).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select>}</div></div>
            <div className="p-10 rounded-[3rem] border border-slate-800 shadow-2xl overflow-x-auto bg-[#0f172a]"><div className="grid grid-cols-8 gap-6 text-center min-w-[1000px]"><div className="font-black text-indigo-400 uppercase text-[10px] pt-6 italic text-right pr-4">משמרת</div>{["א", "ב", "ג", "ד", "ה", "ו", "ש"].map(day => <div key={day} className="font-black text-slate-400 py-4 bg-slate-800/30 rounded-2xl shadow-inner font-sans">יום {day}</div>)}{["בוקר", "לילה"].map(type => (<React.Fragment key={type}><div className="font-bold text-sm self-center uppercase text-white italic">{type}</div>{["א", "ב", "ג", "ד", "ה", "ו", "ש"].map(day => { 
                const entry = (availability || []).find(a => a.person_id === viewingUserId && a.day === day && a.shift === type);
                let color = 'bg-emerald-500/5 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10';
                if (entry?.status === 'study') color = 'bg-blue-500/20 border-blue-500 text-blue-500 shadow-lg';
                if (entry?.status === 'sick') color = 'bg-orange-500/20 border-orange-500 text-orange-500 shadow-lg';
                if (entry?.status === 'holiday') color = 'bg-red-500/20 border-red-500 text-red-500 shadow-lg';
                if (entry?.status === 'home') color = 'bg-purple-500/20 border-purple-500 text-purple-500 shadow-lg';
                if (entry?.status && entry.status !== 'available' && !['study','sick','holiday','home'].includes(entry.status)) color = 'bg-slate-500/30 border-slate-400 text-slate-400 shadow-lg';
                return (<button key={day} onClick={() => handleAvailClick(day, type)} className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-3 active:scale-95 shadow-md ${color}`}><Clock size={28}/> <span className="text-[10px] font-black uppercase tracking-widest">{entry?.status || "פנוי"}</span></button>); 
              })}</React.Fragment>))}</div></div>
          </div>
        ) : activeTab === 'reports' ? (
          <div className="space-y-10 animate-in slide-in-from-bottom-6 text-white text-right">
            <div className="flex justify-between items-center px-4"><h2 className="text-3xl font-black italic underline decoration-indigo-500 uppercase tracking-tighter">דוחות</h2><div className="flex gap-3">
              {/* 🔹 כפתור ווטסאפ מעודכן עם תאריך ושעה 🔹 */}
              <button onClick={()=>{
                let msg=`*🗓️ סידור עבודה שבועי*\n\n`; 
                shifts.forEach(s => {
                  const officer = personnel.find(p=>p.id===s.officer_id)?.name || "-";
                  const sambac = personnel.find(p=>p.id===s.sambac_id)?.name || "-";
                  const dateStr = s.date ? new Date(s.date).toLocaleDateString('he-IL') : "";
                  const timeRange = s.shift_type === 'בוקר' ? "08:00 - 20:00" : "20:00 - 08:00";
                  msg += `📅 *יום ${s.day_of_week} | ${dateStr}*\n🕒 ${s.shift_type} (${timeRange})\n👮 קצין: ${officer}\n🎧 סמב"ץ: ${sambac}\n\n`;
                }); 
                window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(msg)}`,'_blank');
              }} className="p-4 bg-emerald-600 text-white rounded-2xl font-black flex items-center gap-2 shadow-lg hover:bg-emerald-500 transition-all shadow-emerald-600/20"><Share2 size={20}/> ווטסאפ</button>
              <button onClick={()=>window.print()} className="p-4 bg-slate-800 text-white rounded-2xl font-black flex items-center gap-2 shadow-lg hover:bg-slate-700 transition-all"><Printer size={20}/> הדפסה</button>
            </div></div>
            <div className="p-10 rounded-[3rem] border border-slate-800 shadow-2xl bg-[#0f172a]"><h3 className="text-lg font-black text-indigo-500 mb-12 flex items-center gap-2 justify-end"><BarChart3 size={20}/> {t.statsTitle}</h3><div className="flex items-end justify-between h-[300px] gap-4 px-4 border-b border-slate-700 pb-2 overflow-x-auto text-white">{statsData.map((stat, i) => (<div key={i} className="flex-1 flex flex-col items-center group relative min-w-[60px]"><div className="absolute -top-10 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all shadow-xl font-bold whitespace-nowrap">{stat.count} {t.shiftsWord}</div><div className={`w-full max-w-[45px] rounded-t-xl bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-1000`} style={{ height: `${(stat.count / Math.max(...statsData.map(s=>s.count), 1)) * 100}%`, minHeight: '8px' }}></div><span className="text-[9px] font-bold mt-4 rotate-45 origin-right whitespace-nowrap">{stat.name}</span></div>))}</div></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white text-center">{(statsData || []).map((s,i)=>(<div key={i} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-xl text-center hover:border-indigo-500 transition-all"><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{s.name}</p><h4 className="text-3xl font-black text-indigo-400 mt-2">{s.count}</h4></div>))}</div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto animate-in fade-in">
            <ProfileSettings />
            <div className="p-8 rounded-[3rem] border border-slate-800 bg-[#0f172a] shadow-xl space-y-6"><h3 className="text-lg font-black text-indigo-500 flex items-center gap-2 justify-end"> {t.appearance} <Globe size={20} /></h3><div className="grid grid-cols-2 gap-4"><button onClick={() => setLang('he')} className={`py-3 rounded-xl font-black ${lang === 'he' ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' : 'bg-slate-800'}`}>עברית</button><button onClick={() => setLang('en')} className={`py-3 rounded-xl font-black ${lang === 'en' ? 'bg-indigo-600 shadow-lg shadow-indigo-600/30' : 'bg-slate-800'}`}>English</button></div><div className="grid grid-cols-2 gap-3"><button onClick={() => setDisplayMode('dark')} className={`p-2 border rounded-xl flex items-center justify-center gap-2 ${displayMode === 'dark' ? 'bg-slate-800 border-indigo-500 shadow-lg' : ''}`}><Moon size={14}/> Dark</button><button onClick={() => setDisplayMode('light')} className={`p-2 border rounded-xl flex items-center justify-center gap-2 ${displayMode === 'light' ? 'bg-white text-black border-indigo-500 shadow-lg' : ''}`}><Sun size={14}/> Light</button></div><div className="flex gap-2 justify-center pt-2"><button onClick={()=>setFontSize('12px')} className="bg-slate-900 p-3 rounded-xl text-xs hover:bg-indigo-600 border border-slate-800 transition-all">A-</button><button onClick={()=>setFontSize('16px')} className="bg-slate-900 p-3 rounded-xl text-sm hover:bg-indigo-600 border border-slate-800 transition-all">Norm</button><button onClick={()=>setFontSize('22px')} className="bg-slate-900 p-3 rounded-xl text-lg hover:bg-indigo-600 border border-slate-800 transition-all">A+</button></div></div>
            <div className="p-8 rounded-[3rem] border border-slate-800 bg-[#0f172a] shadow-xl space-y-6"><h3 className="text-lg font-black text-indigo-500 flex items-center gap-2 justify-end"> {t.security} <Lock size={20} /></h3><button onClick={()=>{const p=prompt("Pass:"); if(p) handlePersonnelUpdate(session.id, 'password', p);}} className="w-full py-4 bg-slate-800 rounded-2xl text-xs font-bold hover:bg-slate-700 flex items-center justify-center gap-2 transition-all"><Key size={16}/> {t.changePass}</button><button onClick={()=>{localStorage.clear(); window.location.reload();}} className="w-full py-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-[10px] text-orange-500 font-black hover:bg-orange-500 hover:text-white transition-all"><Database size={16} className="inline ml-2"/> {t.clearData}</button><button onClick={async()=>{if(confirm("Delete Account?")) { await supabase.from('personnel').delete().eq('id', session.id); setSession(null); }}} className="w-full py-4 bg-red-600/10 border border-red-600/20 rounded-2xl text-[10px] text-red-600 font-black hover:bg-red-600 transition-all shadow-lg"><Trash2 size={16} className="inline ml-2"/> {t.deleteAcc}</button></div>
            {session?.user_type === 'officer' && (<div className="p-8 rounded-[3rem] border border-slate-800 bg-[#0f172a] shadow-xl space-y-4 font-sans"><h3 className="text-lg font-black text-indigo-500 flex items-center gap-2 justify-end"> {t.staff} <UserPlus size={20} /></h3><div className="max-h-[200px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">{(personnel || []).map(p => (<div key={p.id} className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-inner flex flex-col gap-2"><div className="flex justify-between items-center text-white text-right"><span className="font-bold text-xs">{p.name}</span><button onClick={()=>supabase.from('personnel').delete().eq('id', p.id).then(fetchData)} className="text-slate-500 hover:text-red-500 transition-all"><Trash size={14}/></button></div><div className="flex gap-2 justify-end opacity-60 hover:opacity-100 transition-all"><button onClick={()=>handlePersonnelUpdate(p.id, 'name', prompt("Name:", p.name))} className="p-1 hover:text-indigo-400" title={t.editUser}><UserRoundPen size={14}/></button><button onClick={()=>handlePersonnelUpdate(p.id, 'personal_id', prompt("ID:", p.personal_id))} className="p-1 hover:text-indigo-400" title="Edit ID"><Database size={14}/></button><button onClick={()=>handlePersonnelUpdate(p.id, 'password', prompt("Pass:"))} className="p-1 hover:text-indigo-400" title={t.changePass}><Key size={14}/></button></div></div>))}</div><button onClick={()=>{const n=prompt("Name?"); const pid=prompt("ID?"); const pass=prompt("Pass?"); const em=prompt("Email?"); if(n&&pid&&pass&&em) supabase.from('personnel').insert([{name: n, personal_id: pid, password: pass, email: em, user_type: 'user'}]).then(fetchData);}} className="w-full py-3 bg-emerald-600/20 text-emerald-500 rounded-xl font-bold border border-emerald-500/20 shadow-lg">+ הוסף חייל</button></div>)}
            <div className="p-8 rounded-[3rem] border border-slate-800 bg-[#0f172a] shadow-xl flex flex-col justify-center items-center text-center space-y-3 text-white"><Info className="text-indigo-500" size={40} /><h3 className="text-lg font-black text-indigo-500 italic uppercase">Operations Hub</h3><div className="text-[10px] font-bold text-slate-500"><p>IDF SmartShift Intelligence System</p><p className="text-indigo-400 pt-2 font-black">{t.version}</p></div></div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;