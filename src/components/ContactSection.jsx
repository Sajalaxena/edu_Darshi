import React, { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    alert("Dummy submit — backend later");
  };

  return (
    <section id="contact" className="my-16 container mx-auto px-6">
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{ color: "var(--brand)" }}
      >
        Still Confused? Contact Us
      </h2>
      <form className="max-w-xl mx-auto card p-6 space-y-4" onSubmit={submit}>
        <input
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Your name"
          className="w-full border border-var(--border) p-2 rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handle}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handle}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handle}
          rows="4"
          className="w-full border p-2 rounded"
          placeholder="Message"
        />
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            Send Message
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setForm({ name: "", email: "", phone: "", message: "" })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
