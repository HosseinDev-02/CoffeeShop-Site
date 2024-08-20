const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// مسیر پوشه‌ای که فایل‌های استاتیک شما در آن قرار دارند
const publicDirectoryPath = path.join(__dirname, 'public');

// استفاده از فایل‌های استاتیک در پوشه public
app.use(express.static(publicDirectoryPath));

// شروع به گوش دادن به پورت مشخص شده
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});