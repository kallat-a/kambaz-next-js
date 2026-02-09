import Link from "next/link";
import { Form, FormControl, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h1>Signin</h1>
      <Form>
        <div className="mb-2">
          <FormControl
            id="wd-username"
            defaultValue="alice"
            placeholder="username"
            className="mb-2"
          />
        </div>
        <div className="mb-2">
          <FormControl
            id="wd-password"
            defaultValue="123"
            placeholder="password"
            type="password"
            className="mb-2"
          />
        </div>
        <Link href="/account/profile" id="wd-signin-btn" className="d-block mb-2">
          <Button variant="primary" className="w-100">
            Signin
          </Button>
        </Link>
        <Link id="wd-signup-link" href="/account/signup" className="text-primary">
          Signup
        </Link>
      </Form>
    </div>
  );
}
