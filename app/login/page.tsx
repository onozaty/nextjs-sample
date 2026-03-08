import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="max-w-sm mx-auto p-8 mt-16">
      <h1 className="text-3xl font-bold mb-8">ログイン</h1>
      <LoginForm />
    </main>
  );
}
