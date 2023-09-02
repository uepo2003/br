import { SignupForm } from "@/features/auth/components/signup_form";

export function Signup(): JSX.Element {
  return (
    <div className="main users-new">
      <div className="container">
        <h2 className="form-heading" data-test="form-heading">
          Sign up
        </h2>
        <SignupForm />
      </div>
    </div>
  );
}
