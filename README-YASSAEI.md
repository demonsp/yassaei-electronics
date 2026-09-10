# راهنمای عملیات سایت «قطعات الکترونیک یاسایی» (پروژه ۲)

## نشانی‌ها
- سایت زنده: https://yassaei-electronics.onrender.com
- ریپو: https://github.com/demonsp/yassaei-electronics (شاخه main)
- سرویس Render: srv-dahcik6k1f9s73fajff0 (نام yassaei-electronics، منطقه frankfurt، پلن free)
- بات تلگرام: @? (توکن 8608077462 — وب‌هوک خودکار روی /api/tg/webhook با هدر محرمانه)

## ورودها
- ادمین: admin / Yassaei@1404 (در اولین ورود پیام تغییر رمز می‌آید؛ حتماً عوض کنید)
- نقش‌ها/کاربران دیگر از پنل → کاربران قابل ساخت است.

## گردش کار تغییر و دیپلوی (مثل پروژه ۱)
1. تغییر در کد/داده → تست محلی: `BM_TG=off BM_QUEUE=off PORT=3000 node server/main.mjs`
2. تست‌ها: `node tests/client-parse.mjs` و `node tests/http-smoke.mjs`
3. اگر فایل‌های public عوض شد: `node tools/gen-sw-precache.mjs` (کش سرویس‌ورکر) و تگ BUILD را در `public/js/state.mjs`، `public/sw.js`، `server/lib/util.mjs` یکی جلو ببرید (ys-v2 و…)
4. commit + push به main. **push به‌تنهایی دیپلوی نمی‌کند** (autoDeploy روی کاغذ yes است ولی عمل نمی‌کند):
   `POST https://api.render.com/v1/services/srv-dahcik6k1f9s73fajff0/deploys` با هدر `Authorization: Bearer <کلید Render>` و بدنهٔ `{"clearCache":"do_not_clear"}`
5. بررسی: `GET /api/system/status` → فیلد build باید تگ جدید باشد.

## بات تلگرام
- تنظیمات → تلگرام پنل: روشن/خاموش، توکن، متن خوش‌آمد. وب‌هوک هر ۲۰ ثانیه خودکار تضمین می‌شود.
- اگر توکن لو رفت: BotFather → /revoke و توکن جدید را در پنل بگذارید.

## خواب/بیداری سرویس free
- سرویس free بعد از بی‌کاری می‌خوابد؛ اولین درخواست بیدارش می‌کند (چند ثانیه تأخیر).
- برای بیداری دستی: `bander-wake.html` (داخل زیپ/ریپو) را در مرورگر باز کنید یا UptimeRobot روی `https://yassaei-electronics.onrender.com/healthz` هر ۵ دقیقه.

## داده‌ها
- `data/db.json` همان دیتابیس است (seed اولیه: ۱۸ دسته، ۱۴ برند، ۱۲۱ کالا، قیمت تومان).
- افزودن/ویرایش کالا از پنل ادمین؛ عکس کالاها در `public/uploads/` آپلود می‌شود.
- تولید دوبارهٔ seed اولیه: `python3 tools/gen-db-yassaei.py` (روی db فعلی بازنویسی می‌کند — مراقب!).

## امنیت (یادآور دائم)
- توکن‌های گیت/Render/بات که در چت رد و بدل شده‌اند را پس از تثبیت سایت **revoke** کنید و از پنل/ENV جدید بگذارید.
- رمز ادمین را در اولین ورود عوض کنید؛ staf اضافه کنید به‌جای اشتراک رمز owner.
