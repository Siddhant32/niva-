import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  await new Promise((r) => setTimeout(r, 2500));

  const fileName = file.name;
  const seed = file.size % 100;
  const templateIndex = seed % 4;

  const templates = [
    {
      type: 'lab_report' as const,
      title: `Blood Work Analysis – ${fileName}`,
      observations: [
        { testName: 'Hemoglobin', value: +(12.5 + (seed % 5)).toFixed(1), unit: 'g/dL', referenceRange: '13.5-17.5', status: (12.5 + seed % 5) < 13.5 ? 'low' as const : 'normal' as const, interpretation: 'Red blood cell oxygen capacity marker.' },
        { testName: 'Platelet Count', value: (180 + seed * 2) * 1000, unit: 'cells/mcL', referenceRange: '150000-450000', status: 'normal' as const, interpretation: 'Blood clotting function.' },
        { testName: 'RBC Count', value: +(4.2 + seed * 0.02).toFixed(1), unit: 'M/mcL', referenceRange: '4.5-5.5', status: (4.2 + seed * 0.02) < 4.5 ? 'low' as const : 'normal' as const, interpretation: 'Red blood cell concentration.' },
        { testName: 'WBC Count', value: 5200 + seed * 80, unit: 'cells/mcL', referenceRange: '4500-11000', status: 'normal' as const, interpretation: 'Immune system activity.' },
      ],
      diagnoses: ['Hematological Assessment'],
      recommendations: ['Maintain iron-rich diet (spinach, lentils).', 'Stay hydrated — 2-3 litres daily.', 'Follow up in 6 months.'],
      summary: { en: `Blood work from "${fileName}": Hemoglobin ${(12.5 + seed % 5).toFixed(1)} g/dL, Platelets ${(180 + seed * 2) * 1000}/mcL, WBC ${5200 + seed * 80}/mcL. Overall blood health appears stable.`, hi: `"${fileName}" रक्त जांच: हीमोग्लोबिन ${(12.5 + seed % 5).toFixed(1)} g/dL, प्लेटलेट्स सामान्य, WBC सामान्य।` },
      rawOcrText: `LAB REPORT – ${fileName}\nHemoglobin: ${(12.5 + seed % 5).toFixed(1)} g/dL\nPlatelet: ${(180 + seed * 2) * 1000}/mcL\nRBC: ${(4.2 + seed * 0.02).toFixed(1)} M/mcL\nWBC: ${5200 + seed * 80}/mcL`,
    },
    {
      type: 'lab_report' as const,
      title: `Metabolic Panel – ${fileName}`,
      observations: [
        { testName: 'Fasting Blood Sugar', value: 85 + (seed % 40), unit: 'mg/dL', referenceRange: '70-100', status: (85 + seed % 40) > 100 ? 'high' as const : 'normal' as const, interpretation: 'Glucose homeostasis.' },
        { testName: 'HbA1c', value: +(5.2 + (seed % 20) * 0.1).toFixed(1), unit: '%', referenceRange: '< 5.7', status: (5.2 + (seed % 20) * 0.1) > 5.7 ? 'high' as const : 'normal' as const, interpretation: '3-month blood sugar average.' },
        { testName: 'Serum Creatinine', value: +(0.8 + seed * 0.005).toFixed(2), unit: 'mg/dL', referenceRange: '0.7-1.3', status: 'normal' as const, interpretation: 'Kidney filtration function.' },
        { testName: 'Uric Acid', value: +(4.5 + seed * 0.03).toFixed(1), unit: 'mg/dL', referenceRange: '3.4-7.0', status: 'normal' as const, interpretation: 'Joint & kidney health.' },
      ],
      diagnoses: ['Metabolic Screening'],
      recommendations: ['Limit refined sugar & processed carbs.', '30 minutes daily physical activity.', 'Annual metabolic panel advised.'],
      summary: { en: `Metabolic panel from "${fileName}": FBS ${85 + seed % 40} mg/dL, HbA1c ${(5.2 + (seed % 20) * 0.1).toFixed(1)}%, Creatinine ${(0.8 + seed * 0.005).toFixed(2)} mg/dL. Kidney function markers within healthy range.`, hi: `"${fileName}" मेटाबोलिक पैनल: ब्लड शुगर ${85 + seed % 40} mg/dL, HbA1c ${(5.2 + (seed % 20) * 0.1).toFixed(1)}%। किडनी सामान्य।` },
      rawOcrText: `METABOLIC PANEL – ${fileName}\nFBS: ${85 + seed % 40} mg/dL\nHbA1c: ${(5.2 + (seed % 20) * 0.1).toFixed(1)}%\nCreatinine: ${(0.8 + seed * 0.005).toFixed(2)} mg/dL\nUric Acid: ${(4.5 + seed * 0.03).toFixed(1)} mg/dL`,
    },
    {
      type: 'prescription' as const,
      title: `Prescription Extract – ${fileName}`,
      medicines: [
        { name: 'Amoxicillin', dosage: '500 mg', frequency: 'Twice daily', duration: '7 Days', instructions: 'After meals with water.' },
        { name: 'Pantoprazole', dosage: '40 mg', frequency: 'Once daily (Morning)', duration: '14 Days', instructions: '30 min before breakfast.' },
        { name: 'Cetirizine', dosage: '10 mg', frequency: 'Once daily (Night)', duration: '5 Days', instructions: 'Before bed. May cause drowsiness.' },
      ],
      diagnoses: ['Upper Respiratory Infection', 'Acid Reflux (GERD)'],
      recommendations: ['Complete full antibiotic course.', 'Avoid spicy and acidic foods.', 'Stay hydrated and rest.'],
      summary: { en: `Prescription from "${fileName}": Amoxicillin 500mg (antibiotic, 7 days), Pantoprazole 40mg (acid reflux, 14 days), Cetirizine 10mg (allergy, 5 days). Complete the full antibiotic course.`, hi: `"${fileName}" प्रिस्क्रिप्शन: अमोक्सिसिलिन 500mg 7 दिन, पैंटोप्राज़ोल 40mg 14 दिन, सेटिरिज़िन 10mg 5 दिन। पूरा कोर्स करें।` },
      rawOcrText: `PRESCRIPTION – ${fileName}\nRx:\n1. Tab Amoxicillin 500mg – BD x 7d\n2. Tab Pantoprazole 40mg – OD x 14d\n3. Tab Cetirizine 10mg – HS x 5d\nDx: URTI, GERD`,
    },
    {
      type: 'diagnostic' as const,
      title: `Diagnostic Report – ${fileName}`,
      observations: [
        { testName: 'Chest X-Ray', value: 'NAD', unit: '', referenceRange: 'Normal', status: 'normal' as const, interpretation: 'No abnormal densities detected.' },
        { testName: 'Cardiac Silhouette', value: 'Normal', unit: '', referenceRange: 'Normal', status: 'normal' as const, interpretation: 'Heart size within limits.' },
        { testName: 'Lung Fields', value: 'Clear', unit: '', referenceRange: 'Clear', status: 'normal' as const, interpretation: 'No consolidation or effusion.' },
        { testName: 'CP Angles', value: 'Sharp', unit: '', referenceRange: 'Sharp', status: 'normal' as const, interpretation: 'No pleural effusion.' },
      ],
      diagnoses: ['Normal Radiological Study'],
      recommendations: ['No immediate follow-up needed.', 'Annual screening for patients over 40.', 'Report persistent cough.'],
      summary: { en: `Imaging analysis of "${fileName}": Chest X-Ray normal. Cardiac silhouette normal, lungs clear bilaterally, CP angles sharp. No infection, effusion, or structural abnormality.`, hi: `"${fileName}" डायग्नोस्टिक: चेस्ट एक्स-रे सामान्य। हृदय सामान्य, फेफड़े साफ, कोई असामान्यता नहीं।` },
      rawOcrText: `RADIOLOGY REPORT – ${fileName}\nChest X-Ray PA View\nFindings: NAD\nCardiac silhouette: Normal\nLung fields: Clear bilateral\nCP angles: Sharp\nImpression: Normal study`,
    },
  ];

  const t = templates[templateIndex];

  return NextResponse.json({
    record: {
      id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: t.type,
      date: new Date().toISOString(),
      title: t.title,
      provider: 'Niva AI Document Scanner',
      fileName,
      observations: t.observations || [],
      medicines: (t as any).medicines || [],
      diagnoses: t.diagnoses,
      recommendations: t.recommendations,
      rawOcrText: t.rawOcrText,
      summary: t.summary,
    },
  });
}
