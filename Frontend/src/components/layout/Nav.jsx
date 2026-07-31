import { useNavigate } from "react-router";

const Nav = ({ user }) => {
  const navigate = useNavigate();

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-5 sm:px-8">
      <button onClick={() => navigate("/app")} className="text-base font-semibold tracking-tight text-zinc-900">Nexus</button>
      {user ? (
        <div className="flex size-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
          {user.firstName?.[0]?.toUpperCase() || "U"}
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <button onClick={() => navigate("/login")} className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100">Log in</button>
          <button onClick={() => navigate("/register")} className="rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700">Sign up</button>
        </div>
      )}
    </header>
  );
};

export default Nav;
