🛡️ ShiftGuard PRO
Smart Shift Management System for Command Centers








ShiftGuard PRO היא מערכת חכמה לניהול משמרות סגל חמ"ל, המאפשרת שיבוץ קל ואינטואיטיבי, ניהול אילוצים בזמן אמת, הפקת דוחות, ושליחת סידור עבודה ישירות ל-WhatsApp.

🌍 Live Demo:
https://smart-shift-ruddy.vercel.app

✨ Features
🧩 Interactive Command Board

שיבוץ קצינים וסמב"צים באמצעות Drag & Drop

תצוגת משמרות שבועית ברורה ואינטואיטיבית

🚫 Smart Constraint Blocking

מניעת שיבוץ אוטומטית במקרה של אילוץ (מחלה / לימודים / חופשה)

👤 Profile Management

העלאת תמונת פרופיל

שם מותאם אישית

ניהול הרשאות לפי תפקיד (User / Shift Manager)

📊 Reports & Analytics

גרפים סטטיסטיים של התפלגות משמרות

מעקב עומס לפי משתמש

📲 WhatsApp Integration

שליחת סידור משמרות בלחיצה

כולל תאריך, שעה ותפקיד

🔐 Secure Authentication

אימות משתמשים דרך Supabase

שחזור סיסמה במייל

Session Management

🌍 Bilingual Support

מעבר מהיר בין עברית ואנגלית

🚀 Installation
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
2️⃣ Install Dependencies

וודא שמותקן Node.js:

npm install
3️⃣ Environment Variables

צור קובץ בשם:

.env.local

והוסף:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4️⃣ Run Development Server
npm run dev

האפליקציה תעלה בכתובת:

http://localhost:5173
⚙️ Supabase Configuration

כדי שהמערכת תפעל באופן מלא:

🗂 Storage

צור Bucket בשם: AVATARS

הגדר Policy:

Public read

Authenticated upload

🔐 Authentication

Site URL → כתובת ה-Vercel שלך

Redirect URL:

https://smart-shift-ruddy.vercel.app/#type=recovery
🗄 Database

ודא שקיימות הטבלאות:

personnel

shifts

availability

כולל השדות:

id

role

name

shift_date

shift_type

constraint_type

created_at

🛠 Tech Stack
Layer	Technology
Frontend	React.js + Tailwind CSS
Drag & Drop	@hello-pangea/dnd
Icons	Lucide React
Backend/Auth	Supabase
Deployment	Vercel
🧠 Future Improvements

Role-based permission hierarchy (Officer / Soldier)

Automated shift balancing algorithm

SMS Notifications

PDF shift export

Admin dashboard analytics

👨‍💻 Author

Developed by Lior Rimon – 2026
Management Information Systems | Cyber & System Architecture
