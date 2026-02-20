🛡️ ShiftGuard PRO - Smart Shift Management System

ShiftGuard PRO היא מערכת חכמה לניהול משמרות סגל (חמ"ל), המאפשרת שיבוץ קל בגרירה (Drag & Drop), ניהול אילוצים בזמן אמת, הפקת דוחות וסטטיסטיקות, ושליחת סידור עבודה ישירות ל-WhatsApp.

🌍 אתר חי: smart-shift-ruddy.vercel.app
✨ תכונות עיקריות (Features)

    לוח חמ"ל אינטראקטיבי: שיבוץ קצינים וסמב"צים באמצעות גרירה (Drag & Drop).

    חסימת אילוצים חכמה: המערכת מונעת שיבוץ חייל ביום שבו הזין אילוץ (מחלה, לימודים וכו').

    ניהול פרופיל: העלאת תמונת פרופיל ושימוש בשם מותאם אישית לכל משתמש.

    מערכת דוחות: גרפים וסטטיסטיקות של התפלגות המשמרות בין חברי הסגל.

    WhatsApp Integration: שליחת סידור המשמרות הכולל תאריך, שעה ותפקיד בלחיצת כפתור.

    אבטחה מלאה: אימות משתמשים דרך Supabase, כולל שחזור סיסמה במייל.

    תמיכה דו-לשונית: מעבר מהיר בין עברית לאנגלית.

🚀 הוראות התקנה (Installation)

כדי להריץ את הפרויקט אצלך במחשב, בצע את השלבים הבאים:
1. שיכפול ה-Repository
Bash

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

2. התקנת חבילות (Dependencies)

וודא שמותקן אצלך Node.js, ואז הרץ:
Bash

npm install

3. הגדרת משתני סביבה (Environment Variables)

צור קובץ בשם .env.local בתיקייה הראשית והוסף את המפתחות של ה-Supabase שלך:
קטע קוד

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. הרצת האפליקציה
Bash

npm run dev

האפליקציה תהיה זמינה בכתובת: http://localhost:5173
⚙️ הגדרות Supabase נדרשות

כדי שהמערכת תעבוד בצורה מלאה, יש להגדיר ב-Supabase:

    Storage: צור Bucket בשם AVATARS והגדר לו Policy של Public או הרשאות כתיבה למשתמשים מחוברים.

    Authentication: * תחת URL Configuration, הגדר את ה-Site URL לכתובת ה-Vercel שלך.

        הוסף Redirect URL: https://smart-shift-ruddy.vercel.app/#type=recovery.

    Database: וודא שקיימות הטבלאות personnel, shifts ו-availability עם השדות המתאימים.

🛠️ טכנולוגיות (Tech Stack)

    Frontend: React.js, Tailwind CSS

    Icons: Lucide-React

    Drag & Drop: @hello-pangea/dnd

    Backend & Auth: Supabase

    Deployment: Vercel

פותח על ידי ליאור - 2026
