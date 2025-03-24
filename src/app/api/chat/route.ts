import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Tin nhắn không được để trống' }, { status: 400 });
    }

    console.log('📨 Gửi tin nhắn đến Hugging Face:', message);

    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await response.json();

    console.log('📥 Phản hồi từ Hugging Face:', data);

    if (!data || data.error) {
      return NextResponse.json({ error: 'Lỗi từ Hugging Face API', details: data }, { status: 500 });
    }

    return NextResponse.json({ response: data[0].generated_text || 'Không có phản hồi từ AI' });
  } catch (error) {
    console.error('❌ Lỗi API:', error);
    return NextResponse.json({ error: 'Lỗi khi gọi Hugging Face API', details: error }, { status: 500 });
  }
}