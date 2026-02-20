<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ShiftGuard PRO - README</title>
  <style>
    body{
      font-family: Arial, Helvetica, sans-serif;
      margin: 0;
      background:#0b1020;
      color:#eaf0ff;
      line-height:1.7;
    }
    .wrap{
      max-width: 980px;
      margin: 0 auto;
      padding: 32px 18px 60px;
    }
    .card{
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 18px;
      padding: 22px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.35);
      margin-bottom: 18px;
    }
    h1,h2,h3{
      margin: 0 0 10px;
      line-height: 1.25;
    }
    h1{
      font-size: 34px;
      letter-spacing: .2px;
    }
    h2{
      font-size: 22px;
      margin-top: 14px;
    }
    h3{
      font-size: 18px;
      margin-top: 14px;
    }
    p{ margin: 8px 0 0; opacity:.95; }
    .badge-row{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin: 14px 0 0;
    }
    .badge{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:8px 12px;
      border-radius:999px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      font-size: 13px;
      opacity:.95;
      white-space: nowrap;
    }
    a{ color:#8fd1ff; text-decoration:none; }
    a:hover{ text-decoration:underline; }
    .grid{
      display:grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 12px;
    }
    @media (max-width: 760px){
      .grid{ grid-template-columns: 1fr; }
      h1{ font-size: 28px; }
    }
    ul{
      margin: 8px 0 0;
      padding-right: 18px;
    }
    li{ margin: 6px 0; }
    code, pre{
      font-family: Consolas, 'Courier New', monospace;
    }
    pre{
      background: rgba(0,0,0,0.35);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 14px;
      padding: 14px;
      overflow:auto;
      margin: 10px 0 0;
    }
    .pill{
      display:inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(143,209,255,0.12);
      border: 1px solid rgba(143,209,255,0.25);
      font-size: 12px;
      margin-right: 8px;
    }
    table{
      width:100%;
      border-collapse: collapse;
      margin-top: 10px;
      overflow:hidden;
      border-radius: 14px;
    }
    th, td{
      text-align:right;
      padding: 12px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.10);
    }
    th{
      background: rgba(255,255,255,0.06);
      font-weight: 700;
    }
    tr:last-child td{ border-bottom:none; }
    .footer{
      opacity:.85;
      text-align:center;
      margin-top: 20px;
      font-size: 14px;
    }
    .title-row{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:12px;
      flex-wrap:wrap;
    }
    .live{
      padding: 10px 14px;
      border-radius: 14px;
      background: rgba(0,0,0,0.22);
      border: 1px solid rgba(255,255,255,0.10);
      font-size: 14px;
    }
  </style>
</head>

<body>
  <div class="wrap">

    <div class="card">
      <div class="title-row">
        <div>
          <h1>🛡️ ShiftGuard PRO</h1>
          <p><span class="pill">מערכת חכמה לניהול משמרות (חמ״ל)</span></p>
          <p>
            <b>ShiftGuard PRO</b> היא מערכת חכמה לניהול משמרות סגל חמ״ל, המאפשרת שיבוץ קל ונוח באמצעות גרירה (Drag & Drop),
            ניהול אילוצים בזמן אמת, הפקת דוחות וסטטיסטיקות, ושליחת סידור עבודה ישירות ל-WhatsApp.
          </p>
        </div>

        <div class="live">
          🌍 <b>אתר חי:</b><br/>
          <a href="https://smart-shift-ruddy.vercel.app" target="_blank" rel="noreferrer">
            smart-shift-ruddy.vercel.app
          </a>
        </div>
      </div>

      <div class="badge-row">
        <span class="badge">⚛️ React</span>
        <span class="badge">🎨 Tailwind CSS</span>
        <span class="badge">🧩 Drag & Drop (@hello-pangea/dnd)</span>
        <span class="badge">🗄️ Supabase (Auth + DB + Storage)</span>
        <span class="badge">🚀 Vercel</span>
      </div>
    </div>

    <div class="card">
      <h2>✨ תכונות עיקריות</h2>

      <div class="grid">
        <div>
          <h3>🧩 לוח חמ״ל אינטראקטיבי</h3>
          <ul>
            <li>שיבוץ קצינים וסמב״צים באמצעות Drag & Drop</li>
            <li>תצוגת משמרות שבועית ברורה ואינטואיטיבית</li>
          </ul>
        </div>

        <div>
          <h3>🚫 ניהול אילוצים חכם</h3>
          <ul>
            <li>חסימת שיבוץ אוטומטית בימים עם אילוץ</li>
            <li>תמיכה באילוצים: מחלה / לימודים / חופשה ועוד</li>
          </ul>
        </div>

        <div>
          <h3>👤 ניהול פרופיל והרשאות</h3>
          <ul>
            <li>העלאת תמונת פרופיל</li>
            <li>שם מותאם אישית</li>
            <li>הרשאות לפי תפקיד: משתמש / מנהל משמרת</li>
          </ul>
        </div>

        <div>
          <h3>📊 דוחות וסטטיסטיקות</h3>
          <ul>
            <li>גרפים להתפלגות משמרות</li>
            <li>מעקב עומסים בין חברי הסגל</li>
          </ul>
        </div>

        <div>
          <h3>📲 אינטגרציית WhatsApp</h3>
          <ul>
            <li>שליחת סידור משמרות בלחיצת כפתור</li>
            <li>כולל תאריך, שעה ותפקיד</li>
          </ul>
        </div>

        <div>
          <h3>🔐 אבטחה ואימות</h3>
          <ul>
            <li>אימות משתמשים דרך Supabase</li>
            <li>שחזור סיסמה במייל</li>
            <li>Session Management מאובטח</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>🚀 הוראות התקנה</h2>

      <h3>1️⃣ שכפול הפרויקט</h3>
      <pre><code>git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME</code></pre>

      <h3>2️⃣ התקנת חבילות</h3>
      <pre><code>npm install</code></pre>

      <h3>3️⃣ הגדרת משתני סביבה</h3>
      <p>צור קובץ בשם <code>.env.local</code> בתיקייה הראשית והוסף:</p>
      <pre><code>VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key</code></pre>

      <h3>4️⃣ הרצת האפליקציה</h3>
      <pre><code>npm run dev</code></pre>
      <p>האפליקציה תהיה זמינה בכתובת: <code>http://localhost:5173</code></p>
    </div>

    <div class="card">
      <h2>⚙️ הגדרות נדרשות ב-Supabase</h2>

      <h3>🗂 Storage</h3>
      <ul>
        <li>צור Bucket בשם: <code>AVATARS</code></li>
        <li>הגדר Policies:
          <ul>
            <li>קריאה ציבורית (Public read)</li>
            <li>העלאה למשתמשים מחוברים (Authenticated upload)</li>
          </ul>
        </li>
      </ul>

      <h3>🔐 Authentication</h3>
      <ul>
        <li>ב-URL Configuration הגדר את <b>Site URL</b> לכתובת ה-Vercel שלך</li>
        <li>הוסף <b>Redirect URL</b> לשחזור סיסמה:</li>
      </ul>
      <pre><code>https://smart-shift-ruddy.vercel.app/#type=recovery</code></pre>

      <h3>🗄 Database</h3>
      <p>ודא שקיימות הטבלאות:</p>
      <ul>
        <li><code>personnel</code></li>
        <li><code>shifts</code></li>
        <li><code>availability</code></li>
      </ul>
      <p>ושדות לדוגמה:</p>
      <ul>
        <li><code>id</code>, <code>name</code>, <code>role</code></li>
        <li><code>shift_date</code>, <code>shift_type</code></li>
        <li><code>constraint_type</code>, <code>created_at</code></li>
      </ul>
    </div>

    <div class="card">
      <h2>🛠 טכנולוגיות</h2>
      <table>
        <thead>
          <tr>
            <th>שכבה</th>
            <th>טכנולוגיה</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Frontend</td>
            <td>React.js + Tailwind CSS</td>
          </tr>
          <tr>
            <td>Drag & Drop</td>
            <td>@hello-pangea/dnd</td>
          </tr>
          <tr>
            <td>Icons</td>
            <td>Lucide React</td>
          </tr>
          <tr>
            <td>Backend / Auth</td>
            <td>Supabase</td>
          </tr>
          <tr>
            <td>Deployment</td>
            <td>Vercel</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h2>🔮 פיתוחים עתידיים</h2>
      <ul>
        <li>היררכיית הרשאות מתקדמת (חייל / קצין / מפקד)</li>
        <li>אלגוריתם איזון עומסים אוטומטי</li>
        <li>שליחת SMS והתראות חכמות</li>
        <li>ייצוא סידור משמרות ל-PDF</li>
        <li>Dashboard ניהולי מתקדם</li>
      </ul>
    </div>

    <div class="footer">
      👨‍💻 פותח על ידי <b>ליאור רימון</b> – 2026
    </div>

  </div>
</body>
</html>
