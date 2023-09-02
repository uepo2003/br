import { LoginForm } from "@/features/auth/components/login_form";
export function Login(): JSX.Element {
  return (
    <div className="main users-new">
      <div className="container">
        <h2 className="form-heading" data-test="form-heading">
          Log in
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
