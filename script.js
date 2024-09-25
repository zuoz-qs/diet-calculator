document.getElementById("calculator-form").addEventListener("submit", function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    
    // الحصول على المدخلات
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activityLevel = document.getElementById("activity-level").value;
    const goal = document.getElementById("goal").value;

    // حساب السعرات الحرارية (هنا تحتاج إلى إضافة المنطق الخاص بك)
    let bmr; // معدل الأيض الأساسي
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityMultiplier;
    switch (activityLevel) {
        case "sedentary":
            activityMultiplier = 1.2;
            break;
        case "light":
            activityMultiplier = 1.375;
            break;
        case "moderate":
            activityMultiplier = 1.55;
            break;
        case "active":
            activityMultiplier = 1.725;
            break;
        case "intense":
            activityMultiplier = 1.9;
            break;
    }

    const caloriesNeeded = Math.round(bmr * activityMultiplier);
    
    // حساب الماكروز (يمكنك تعديل هذه النسب حسب الحاجة)
    let protein = Math.round((caloriesNeeded * 0.30) / 4);
    let carbs = Math.round((caloriesNeeded * 0.50) / 4);
    let fats = Math.round((caloriesNeeded * 0.20) / 9);

    // عرض النتائج
    document.getElementById("calories").textContent = caloriesNeeded;
    document.getElementById("protein").textContent = protein;
    document.getElementById("carbs").textContent = carbs;
    document.getElementById("fats").textContent = fats;
    document.getElementById("results").classList.remove("hidden");

    // إضافة تأثير التحميل
    setTimeout(() => {
        document.getElementById("results").classList.remove("hidden");
    }, 3000); // يظهر النتائج بعد 3 ثواني
});
