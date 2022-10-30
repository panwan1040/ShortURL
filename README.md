# ShortURL
# Test Synerry Corporation
#
#
## Features

-  เมื่อกรอก url สร้าง short url และ qrcode
-  ติดตามการคลิกของแต่ละลิ้งที่หน้า Tracker
- รวบรวมจำนวนการคลิกหากเป็นเว็บไซต์เดียวกันและแสดงผ่านกราฟที่หน้า top url



## Installation
สามารถติดตั้งตามขั้นตอนนี้หรือทดลองใช้ได้ที่ [คลิก]
ติดตั้ง nodejs, vscode และเปิดโฟลเดอร์โปรเจคขึ้นมา

```sh
npm init -y
```

ติดตั้ง packages

```sh
npm install express ejs dotenv qrcode shortid
```

เพิ่มไฟล์ .env 
- PORT = 3000
- DBURL = "ลิ้งเชื่อมต่อ mongoDB"

เปิดใช้งาน
```sh
node ./main.js
```
#
เปิด browser ขึ้นมาและกรอกลิ้ง https://localhost:3000


   [คลิก]: https://ShortURL.panwan1040.repl.co

