import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Simulate AI processing delay (OCR + GenAI Analysis)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock highly structured AI response based on typical lab results or prescriptions
    const aiResponse = {
      record: {
        id: `rec-${Math.random().toString(36).substring(7)}`,
        type: 'diagnostic',
        date: new Date().toISOString(),
        title: 'Uploaded AI Analysis Report',
        provider: 'Niva AI OCR Module',
        observations: [
          { testName: 'Fasting Blood Sugar', value: 110, unit: 'mg/dL', referenceRange: '70-100', status: 'high' },
          { testName: 'HbA1c', value: 6.2, unit: '%', referenceRange: '< 5.7', status: 'high' }
        ],
        summary: {
          en: 'Our AI has analyzed the document. It indicates elevated fasting blood sugar (110 mg/dL) and HbA1c (6.2%), which suggests prediabetes. Please consult your physician for dietary advice.',
          hi: 'हमारे AI ने दस्तावेज़ का विश्लेषण किया है। यह बढ़े हुए फास्टिंग ब्लड शुगर और HbA1c को दर्शाता है, जो प्रीडायबिटीज का संकेत देता है। कृपया अपने चिकित्सक से सलाह लें।'
        }
      }
    };

    return NextResponse.json(aiResponse, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
  }
}
