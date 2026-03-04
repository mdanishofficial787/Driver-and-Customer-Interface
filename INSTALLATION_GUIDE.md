# 🚀 RidenServe - Installation Guide

## ⚠️ Error Fix: "could not determine executable to run"

### **Solution:**

You need to install dependencies first!

## 📋 **Step-by-Step Installation:**

### **1. Extract the ZIP file**
```bash
unzip ridenserve-COMPLETE-PREMIUM-UI.zip
cd ridenserve-main
```

### **2. Install Dependencies (IMPORTANT!)**
```bash
npm install
```

**Wait for installation to complete (may take 2-5 minutes)**

### **3. Run the App**
```bash
ionic serve
```

OR

```bash
npm start
```

---

## 🔧 **Common Issues & Fixes:**

### **Issue 1: "npm install" fails**
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules if exists
rm -rf node_modules
rm -rf package-lock.json

# Install again
npm install
```

### **Issue 2: "ionic command not found"**
**Solution:**
```bash
# Install Ionic CLI globally
npm install -g @ionic/cli

# Then run
ionic serve
```

### **Issue 3: Port already in use**
**Solution:**
```bash
# Run on different port
ionic serve --port=8101
```

---

## ✅ **Complete Installation Commands:**

```bash
# Step 1: Navigate to project
cd ridenserve-main

# Step 2: Install dependencies
npm install

# Step 3: Run development server
ionic serve

# OR use npm
npm start
```

---

## 📱 **After Installation:**

The app will open at:
```
http://localhost:8100
```

You should see:
1. ✅ Splash Screen (2 seconds)
2. ✅ Select User Type page
3. ✅ Driver Signup Flow

---

## 🎯 **Verify Installation:**

After `npm install` completes, check:

```bash
# Should show node_modules folder
ls -la

# Should see @angular, @ionic, etc.
ls node_modules/@angular
ls node_modules/@ionic
```

---

## 💡 **Pro Tips:**

### **Fast Installation:**
```bash
npm install --legacy-peer-deps
```

### **Clean Install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Check Node/NPM Version:**
```bash
node --version    # Should be 18.x or higher
npm --version     # Should be 9.x or higher
```

---

## 🐛 **Still Having Issues?**

### **Try this complete reset:**
```bash
# 1. Clean everything
rm -rf node_modules
rm -rf package-lock.json
rm -rf .angular

# 2. Clear cache
npm cache clean --force

# 3. Fresh install
npm install

# 4. Run
ionic serve
```

---

## 📊 **Expected Output After npm install:**

```
added 1200+ packages in 2m
180 packages are looking for funding
```

Then you can run:
```bash
ionic serve
```

And see:
```
** Angular Live Development Server is listening on localhost:8100 **
✔ Browser application bundle generation complete.
```

---

## ✨ **Quick Start (Copy-Paste):**

```bash
cd ridenserve-main
npm install
ionic serve
```

**That's it!** 🎉

---

## 📞 **Need Help?**

If you still face issues:
1. Check Node.js version (needs 18+)
2. Check npm version (needs 9+)
3. Make sure you're in the `ridenserve-main` folder
4. Delete `node_modules` and try again

---

**Happy Coding!** 🚀
