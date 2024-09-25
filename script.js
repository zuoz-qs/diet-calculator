document.getElementById('calculate').addEventListener('click', function() {
    // إظهار مؤشر التحميل
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';

    setTimeout(() => {
        // استرجاع المدخلات
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activityLevel = document.getElementById('activity').value;
        const goal = document.getElementById('goal').value;

        // حساب BMR
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        // تعديل BMR بناءً على مستوى النشاط
        let activityMultiplier;
        switch (activityLevel) {
            case 'sedentary': activityMultiplier = 1.2; break;
            case 'light': activityMultiplier = 1.375; break;
            case 'moderate': activityMultiplier = 1.55; break;
            case 'high': activityMultiplier = 1.725; break;
            case 'intense': activityMultiplier = 1.9; break;
        }
        const totalCalories = bmr * activityMultiplier;

        // حساب الماكروز
        let protein, carbs, fat;
        if (goal === 'lose') {
            protein = weight * 2; // 2 جرام بروتين لكل كغ من الوزن
            fat = totalCalories * 0.25 / 9; // 25% دهون
            carbs = (totalCalories - (protein * 4 + fat * 9)) / 4; // المتبقي كربوهيدرات
        } else if (goal === 'maintain') {
            protein = weight * 1.5; // 1.5 جرام بروتين لكل كغ من الوزن
            fat = totalCalories * 0.30 / 9; // 30% دهون
            carbs = (totalCalories - (protein * 4 + fat * 9)) / 4; // المتبقي كربوهيدرات
        } else {
            protein = weight * 1.2; // 1.2 جرام بروتين لكل كغ من الوزن
            fat = totalCalories * 0.20 / 9; // 20% دهون
            carbs = (totalCalories - (protein * 4 + fat * 9)) / 4; // المتبقي كربوهيدرات
        }

        // عرض النتائج
        document.getElementById('calories').textContent = `السعرات الحرارية اليومية: ${Math.round(totalCalories)} سعر`;
        document.getElementById('bmr').textContent = `معدل الأيض الأساسي (BMR): ${Math.round(bmr)} سعر`;
        document.getElementById('water').textContent = `الاحتياجات المائية اليومية: ${(weight * 0.033).toFixed(2)} لتر`; // 33 مل لكل كغ
        document.getElementById('protein').textContent = `البروتين: ${Math.round(protein)} جم`;
        document.getElementById('carbs').textContent = `الكربوهيدرات: ${Math.round(carbs)} جم`;
        document.getElementById('fat').textContent = `الدهون: ${Math.round(fat)} جم`;

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';

        // رسم الماكروز
        const ctx = document.getElementById('macrosChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['بروتين', 'كربوهيدرات', 'دهون'],
                datasets: [{
                    label: 'توزيع الماكروز',
                    data: [protein, carbs, fat],
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                }]
            },
        });
    }, 3000); // مدة التحميل 3 ثواني
});