"use client";
import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const updatedMessages = [...messages, { sender: "Bạn", text: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (!data.response) throw new Error("Không có phản hồi từ AI");

      setMessages([...updatedMessages, { sender: "Siêu nhân Gao", text: data.response }]);
    } catch (error) {
      console.error("Lỗi:", error);
      setMessages([...updatedMessages, { sender: "Siêu nhân Gao", text: "Lỗi khi gửi tin nhắn. Hãy thử lại." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Đóng" : "Trợ lý khách hàng thông minh"}
      </button>

      {/* Hộp chat chỉ hiển thị khi isOpen = true */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 border p-2 flex flex-col bg-white shadow-lg rounded-lg">
          {/* Danh sách tin nhắn */}
          <div className="flex-1 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <p key={index} className={msg.sender === "Bạn" ? "text-blue-500" : "text-green-500"}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="p-2 border-t">
            <input
              className="border p-1 w-full rounded"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button className="bg-blue-500 text-white p-1 w-full mt-2 rounded" onClick={sendMessage} disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;