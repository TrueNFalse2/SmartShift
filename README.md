🛡️ ShiftGuard PRO
מערכת חכמה לניהול משמרות (חמ״ל)

ShiftGuard PRO היא מערכת חכמה לניהול משמרות סגל חמ״ל, המאפשרת שיבוץ קל ונוח באמצעות גרירה (Drag & Drop), ניהול אילוצים בזמן אמת, הפקת דוחות וסטטיסטיקות, ושליחת סידור עבודה ישירות ל-WhatsApp.

🌍 אתר חי:
https://smart-shift-ruddy.vercel.app

✨ תכונות עיקריות
🧩 לוח חמ״ל אינטראקטיבי

שיבוץ קצינים וסמב״צים באמצעות Drag & Drop

תצוגת משמרות שבועית ברורה ונוחה

🚫 ניהול אילוצים חכם

חסימת שיבוץ אוטומטית בימים עם אילוץ
(מחלה, לימודים, חופשה וכו׳)

👤 ניהול פרופיל משתמש

העלאת תמונת פרופיל

שם מותאם אישית

ניהול הרשאות לפי תפקיד (משתמש / מנהל משמרת)

📊 דוחות וסטטיסטיקות

גרפים להתפלגות משמרות

מעקב עומסים בין חברי הסגל

📲 אינטגרציית WhatsApp

שליחת סידור משמרות בלחיצת כפתור

כולל תאריך, שעה ותפקיד

🔐 אבטחה ואימות

אימות משתמשים דרך Supabase

שחזור סיסמה באמצעות מייל

ניהול סשן מאובטח

🌍 תמיכה דו־לשונית

מעבר מהיר בין עברית לאנגלית

🚀 הוראות התקנה
1️⃣ שכפול הפרויקט
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
2️⃣ התקנת חבילות

ודא שמותקן Node.js, ואז הרץ:

npm install
3️⃣ הגדרת משתני סביבה

צור קובץ בשם:

.env.local

והוסף:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4️⃣ הרצת האפליקציה
npm run dev

האפליקציה תהיה זמינה בכתובת:

http://localhost:5173
⚙️ הגדרות נדרשות ב-Supabase
🗂 Storage

צור Bucket בשם: AVATARS

הגדר Policy:

קריאה ציבורית

כתיבה למשתמשים מחוברים

🔐 Authentication

הגדר Site URL לכתובת ה-Vercel שלך

הוסף Redirect URL:

https://smart-shift-ruddy.vercel.app/#type=recovery
🗄 Database

ודא שקיימות הטבלאות הבאות:

personnel

shifts

availability

כולל שדות לדוגמה:

id

name

role

shift_date

shift_type

constraint_type

created_at

🛠 טכנולוגיות
שכבה	טכנולוגיה
Frontend	React.js + Tailwind CSS
Drag & Drop	@hello-pangea/dnd
Icons	Lucide React
Backend & Auth	Supabase
Deployment	Vercel
👨‍💻 פותח על ידי

ליאור רימון – 2026
ניהול מערכות מידע | סייבר וארכיטקטורת מערכות
