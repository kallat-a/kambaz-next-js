import Link from "next/link";
import { Form, FormControl, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h1>Signup</h1>
      <Form>
        <div className="mb-2">
          <FormControl placeholder="username" className="wd-username" />
        </div>
        <div className="mb-2">
          <FormControl
            placeholder="password"
            type="password"
            className="wd-password"
          />
        </div>
        <div className="mb-2">
          <FormControl
            placeholder="verify password"
            type="password"
            className="wd-password-verify"
          />
        </div>
        <Link href="/account/profile" className="d-block mb-2">
          <Button variant="primary" className="w-100">
            Signup
          </Button>
        </Link>
        <Link href="/account/signin" className="text-primary">
          Signin
        </Link>
      </Form>
    </div>
  );
}
