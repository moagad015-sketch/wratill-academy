<antml:writeToFile path="script.js">
// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
}

// ===== Header Scroll Effect =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===== Fade In Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .program-card, .value-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Teachers Page Tabs =====
const teacherTabs = document.querySelectorAll('.teacher-tab');
const teacherForms = document.querySelectorAll('.teacher-form-container');

if (teacherTabs.length > 0) {
    teacherTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            teacherTabs.forEach(t => t.classList.remove('active'));
            teacherForms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// ===== Login Page Tabs =====
const loginTabs = document.querySelectorAll('.login-tab');
const loginForms = document.querySelectorAll('.login-form');

if (loginTabs.length > 0) {
    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            loginTabs.forEach(t => t.classList.remove('active'));
            loginForms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// ===== Pricing Page Tabs =====
const pricingTabs = document.querySelectorAll('.tab-btn');
const pricingTables = document.querySelectorAll('.pricing-table-wrapper');

if (pricingTabs.length > 0) {
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            
            pricingTabs.forEach(t => t.classList.remove('active'));
            pricingTables.forEach(t => t.style.display = 'none');
            
            tab.classList.add('active');
            const targetTable = document.getElementById(target);
            if (targetTable) {
                targetTable.style.display = 'block';
            }
        });
    });
}

// ===== دالة فتح واتساب (الطريقة المحسّنة) =====
function openWhatsApp(phone, message) {
    // تنظيف الرقم من أي مسافات أو أصفار في البداية
    phone = phone.replace(/\s+/g, '');
    
    // ترميز الرسالة
    const encodedMessage = encodeURIComponent(message);
    
    // بناء الرابط
    const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp:', whatsappURL);
    
    // محاولة فتح واتساب بعدة طرق (للتوافق مع كل المتصفحات)
    try {
        // الطريقة الأولى: فتح في نفس النافذة (الأكثر موثوقية)
        window.location.href = whatsappURL;
        
        // الطريقة الثانية (احتياطية): فتح في نافذة جديدة بعد ثانية
        setTimeout(() => {
            // لو الطريقة الأولى مش شغالة، جرب دي
            const newWindow = window.open(whatsappURL, '_blank');
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                // لو فتح النافذة فشل، اعرض رسالة للمستخدم
                showManualLink(whatsappURL);
            }
        }, 1000);
    } catch (error) {
        console.error('Error opening WhatsApp:', error);
        showManualLink(whatsappURL);
    }
}

// ===== دالة عرض الرابط يدوياً لو الفتح فشل =====
function showManualLink(url) {
    // إنشاء نافذة منبثقة بالرابط
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        direction: rtl;
        font-family: 'Cairo', sans-serif;
    `;
    
    modal.innerHTML = `
        <h3 style="color: #0d4d3c; margin-bottom: 15px;">لم يتم فتح الواتساب تلقائياً</h3>
        <p style="margin-bottom: 20px;">اضغط على الزر أدناه لفتح المحادثة:</p>
        <a href="${url}" target="_blank" style="
            display: inline-block;
            padding: 12px 30px;
            background: #25D366;
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-bottom: 15px;
        ">
            <i class="fab fa-whatsapp"></i> فتح الواتساب
        </a>
        <br>
        <button onclick="this.parentElement.parentElement.remove()" style="
            padding: 8px 20px;
            background: #f0f0f0;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: inherit;
        ">إغلاق</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // إغلاق عند الضغط خارج النافذة
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

// ===== Program: Qirat Registration =====
const qiratForm = document.getElementById('qiratForm');
if (qiratForm) {
    qiratForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Qirat form submitted');
        
        const name = document.getElementById('q-name').value.trim();
        const age = document.getElementById('q-age').value.trim();
        const phone = document.getElementById('q-phone').value.trim();
        const gender = document.querySelector('input[name="q-gender"]:checked');
        const reading = document.getElementById('q-reading').value;
        const level = document.querySelector('input[name="q-level"]:checked');
        const notes = document.getElementById('q-notes').value.trim();
        
        // التحقق من البيانات
        if (!name || !age || !phone || !reading) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        if (!gender) {
            alert('من فضلك اختر النوع (ذكر/أنثى)');
            return;
        }
        if (!level) {
            alert('من فضلك حدد مستواك');
            return;
        }
        
        const message = `🌟 *تسجيل جديد في برنامج إجازة القراءات* 🌟

👤 *الاسم:* ${name}
🎂 *العمر:* ${age} سنة
📱 *رقم التواصل:* ${phone}
⚧ *النوع:* ${gender.value}
📖 *القراءة المطلوبة:* ${reading}
📊 *المستوى:* ${level.value}
📝 *ملاحظات:* ${notes || 'لا يوجد'}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
}

// ===== Program: Hifz Registration =====
const hifzForm = document.getElementById('hifzForm');
if (hifzForm) {
    hifzForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Hifz form submitted');
        
        const name = document.getElementById('h-name').value.trim();
        const age = document.getElementById('h-age').value.trim();
        const phone = document.getElementById('h-phone').value.trim();
        const gender = document.querySelector('input[name="h-gender"]:checked');
        const level = document.querySelector('input[name="h-level"]:checked');
        const notes = document.getElementById('h-notes').value.trim();
        
        if (!name || !age || !phone) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        if (!gender) {
            alert('من فضلك اختر النوع');
            return;
        }
        if (!level) {
            alert('من فضلك حدد مستواك');
            return;
        }
        
        const message = `📖 *تسجيل جديد في برنامج حفظ وتجويد* 📖

👤 *الاسم:* ${name}
🎂 *العمر:* ${age} سنة
📱 *رقم التواصل:* ${phone}
⚧ *النوع:* ${gender.value}
📊 *المستوى:* ${level.value}
📝 *ملاحظات:* ${notes || 'لا يوجد'}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
}

// ===== Program: Noor Al-Bayan Registration =====
const noorForm = document.getElementById('noorForm');
if (noorForm) {
    noorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Noor form submitted');
        
        const name = document.getElementById('n-name').value.trim();
        const age = document.getElementById('n-age').value.trim();
        const phone = document.getElementById('n-phone').value.trim();
        const gender = document.querySelector('input[name="n-gender"]:checked');
        const level = document.querySelector('input[name="n-level"]:checked');
        const notes = document.getElementById('n-notes').value.trim();
        
        if (!name || !age || !phone) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        if (!gender) {
            alert('من فضلك اختر النوع');
            return;
        }
        if (!level) {
            alert('من فضلك حدد مستواك');
            return;
        }
        
        const message = `🌸 *تسجيل جديد في برنامج نور البيان* 🌸

👤 *الاسم:* ${name}
🎂 *العمر:* ${age} سنة
📱 *رقم التواصل:* ${phone}
⚧ *النوع:* ${gender.value}
📊 *المستوى:* ${level.value}
📝 *ملاحظات:* ${notes || 'لا يوجد'}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
}

// ===== Program: Intensive Registration =====
const intensiveForm = document.getElementById('intensiveForm');
if (intensiveForm) {
    intensiveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Intensive form submitted');
        
        const name = document.getElementById('i-name').value.trim();
        const age = document.getElementById('i-age').value.trim();
        const phone = document.getElementById('i-phone').value.trim();
        const gender = document.querySelector('input[name="i-gender"]:checked');
        const level = document.querySelector('input[name="i-level"]:checked');
        const notes = document.getElementById('i-notes').value.trim();
        
        if (!name || !age || !phone) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        if (!gender) {
            alert('من فضلك اختر النوع');
            return;
        }
        if (!level) {
            alert('من فضلك حدد مستواك');
            return;
        }
        
        const message = `⚡ *تسجيل جديد في البرنامج المكثف* ⚡

👤 *الاسم:* ${name}
🎂 *العمر:* ${age} سنة
📱 *رقم التواصل:* ${phone}
⚧ *النوع:* ${gender.value}
📊 *المستوى:* ${level.value}
📝 *ملاحظات:* ${notes || 'لا يوجد'}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
}

// ===== Teacher Registration (Male) =====
const teacherMaleForm = document.getElementById('teacherMaleForm');
if (teacherMaleForm) {
    teacherMaleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Teacher Male form submitted');
        
        const name = document.getElementById('tm-name').value.trim();
        const age = document.getElementById('tm-age').value.trim();
        const phone = document.getElementById('tm-phone').value.trim();
        const qualification = document.getElementById('tm-qualification').value.trim();
        const ijaza = document.querySelector('input[name="tm-ijaza"]:checked');
        const onlineExp = document.querySelector('input[name="tm-online"]:checked');
        
        if (!name || !age || !phone || !qualification) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        if (!ijaza || !onlineExp) {
            alert('من فضلك أجب على جميع الأسئلة');
            return;
        }
        
        const message = `👨‍🏫 *طلب انضمام كمعلم* 👨‍🏫

👤 *الاسم:* ${name}
🎂 *العمر:* ${age} سنة
📱 *رقم التواصل:* ${phone}
🎓 *المؤهل:* ${qualification}
📜 *حاصل على إجازة:* ${ijaza.value}
💻 *خبرة أونلاين سابقة:* ${onlineExp.value}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201285182041', message);
    });
}

// ===== Teacher Registration (Female) =====
const teacherFemaleForm = document.getElementById('teacherFemaleForm');
if (teacherFemaleForm) {
    teacherFemaleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Teacher Female form submitted');
        
        const name = document.getElementById('tf-name').value.trim();
        const age = document.getElementById('tf-age').value.trim();
        const phone = document.getElementById('tf-phone').value.trim();
        const qualification = document.getElementById('tf-qualification').value.trim();
        const ijaza = document.querySelector('input[name="tf-ijaza"]:checked');
        const onlineExp = document.querySelector('input[name="tf-online"]:checked');
        
        if (!name || !age || !phone || !qualification) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        if (!ijaza || !onlineExp) {
            alert('من فضلك أجيبي على جميع الأسئلة');
            return;
        }
        
        const message = `👩‍🏫 *طلب انضمام كمعلمة* 👩‍🏫

👤 *الاسم:* ${name}
🎂 *العمر:* ${age} سنة
📱 *رقم التواصل:* ${phone}
🎓 *المؤهل:* ${qualification}
📜 *حاصلة على إجازة:* ${ijaza.value}
💻 *خبرة أونلاين سابقة:* ${onlineExp.value}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201285182041', message);
    });
}

// ===== Login Form =====
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('سيتم تفعيل نظام تسجيل الدخول قريباً. تواصل معنا عبر الواتساب للمزيد من المعلومات.');
        openWhatsApp('201515404370', 'مرحباً، أرغب في الاستفسار عن تسجيل الدخول');
    });
}

// ===== Register Form =====
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        
        if (!name || !email) {
            alert('من فضلك أكمل جميع البيانات المطلوبة');
            return;
        }
        
        const message = `🆕 *طلب تسجيل حساب جديد* 🆕

👤 *الاسم:* ${name}
📧 *البريد الإلكتروني:* ${email}

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
}

// ===== Pricing Subscribe Buttons =====
document.querySelectorAll('.subscribe-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const package = btn.dataset.package;
        const price = btn.dataset.price;
        
        const message = `🎯 *رغبة في الاشتراك* 🎯

الباقة المختارة: ${package}
السعر: ${price}

من فضلك تواصلوا معي لإتمام عملية الاشتراك.

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
});

// ===== Gulf Package Country Selection =====
document.querySelectorAll('.gulf-country-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const country = btn.dataset.country;
        
        const message = `🌍 *استفسار من ${country}* 🌍

مرحباً، أنا من ${country} وأرغب في معرفة تفاصيل الباقات والأسعار الخاصة بدول الخليج.

من فضلك أفيدوني بالتفاصيل.

---
تم الإرسال من موقع أكاديمية ورتل`;
        
        openWhatsApp('201515404370', message);
    });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Console Welcome Message =====
console.log('%c أكاديمية ورتل ', 'background: #0d4d3c; color: #d4af37; padding: 10px 20px; font-size: 20px; font-weight: bold; border-radius: 5px;');
console.log('%c تحت إشراف الشيخ محمد بن جاد ', 'color: #0d4d3c; font-size: 14px;');
console.log('%c ورتل القرآن ترتيلا ', 'color: #555; font-size: 12px; font-style: italic;');
</antml:writeToFile>