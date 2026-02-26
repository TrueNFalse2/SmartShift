# 🛡️ ShiftGuard PRO  
### Smart Command & Control Shift Management System

**ShiftGuard PRO** is an intelligent web-based system designed to manage Command & Control (C&C / NOC / SOC) personnel shifts in dynamic and high-responsibility environments.  
The platform enables fast scheduling using **Drag & Drop**, real-time constraint management, workload analytics, and one-click shift distribution via WhatsApp.

🌍 **Live Demo:**  
https://smart-shift-ruddy.vercel.app

---

## ✨ Key Features

### 🧩 Interactive Operations Board
- Assign officers and operators using **Drag & Drop**
- Clear and intuitive weekly shift view
- Role-based separation (Officer / Operator)

### 🚫 Smart Availability & Constraints Management
- Automatic blocking of assignments on unavailable days  
  (illness, studies, vacation, reserve duty, etc.)
- Prevents scheduling conflicts and human error

### 👤 User Profile Management
- Profile image upload
- Custom display name
- Role-based permissions  
  (Regular User / Shift Manager)

### 📊 Reports & Statistics
- Shift distribution charts
- Workload balance across personnel
- Improved transparency and fairness

### 📲 WhatsApp Integration
- One-click shift schedule sharing
- Includes date, time, and role
- Ready for immediate team distribution

### 🔐 Security & Authentication
- Secure user authentication via Supabase
- Password recovery via email
- Secure session management

### 🌍 Bilingual Support
- Instant language switching between **Hebrew & English**
- Full RTL / LTR support

---

## 🚀 Installation Guide (Local Development)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/TrueNFalse2/SmartShift.git
cd SmartShift

2️⃣ Install Dependencies

Make sure Node.js (v18+) is installed, then run:

npm install
3️⃣ Environment Variables

Create a file named:

.env.local

Add the following variables:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4️⃣ Run the Application
npm run dev

The application will be available at:

http://localhost:5173
