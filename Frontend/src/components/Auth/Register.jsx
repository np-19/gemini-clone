import { useState } from "react";
import { setAccessToken } from "../../helper/authToken";
import { apiUrl } from "../../helper/apiFetch";
import { useNavigate } from "react-router";

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const fields = [["firstName", "First name", "text"], ["lastName", "Last name", "text"], ["username", "Username", "text"], ["email", "Email", "email"], ["password", "Password", "password"]];
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch(apiUrl("/api/auth/register"), { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ User: form }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || "Unable to create your account.");
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate("/app");
    } catch (err) { setError(err.message); }
  };
  return <main className="fixed inset-0 flex min-h-dvh w-full items-center justify-center overflow-y-auto bg-[#f7f7f5] p-5">
    <section className="my-auto w-full max-w-[420px] rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_12px_40px_rgba(24,24,27,0.08)] sm:p-10">
      <button onClick={() => navigate("/app")} className="mx-auto flex size-11 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white">N</button>
      <div className="mt-6 text-center"><h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Create your account</h1><p className="mt-2 text-sm leading-6 text-zinc-500">Save your chats and return whenever you need them.</p></div>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-3">{fields.slice(0, 2).map(([name, label, type]) => <label key={name} className="block text-sm font-medium text-zinc-700">{label}<input name={name} type={type} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} required className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3 py-3 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100" /></label>)}</div>
        {fields.slice(2).map(([name, label, type]) => <label key={name} className="block text-sm font-medium text-zinc-700">{label}<input autoComplete={name === "password" ? "new-password" : undefined} name={name} type={type} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} required className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3.5 py-3 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100" /></label>)}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-zinc-700">Create account</button>
      </form>
      <p className="mt-7 text-center text-sm text-zinc-500">Already have an account? <button onClick={() => navigate("/login")} className="font-semibold text-zinc-900 hover:underline">Log in</button></p>
    </section>
  </main>;
};

export default Register;
