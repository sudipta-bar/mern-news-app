import AuthForm from "../components/AuthForm";

function LoginPage() {
  return (
    <main className="page-shell narrow-page">
      <AuthForm mode="login" />
    </main>
  );
}

export default LoginPage;
