import Link from "next/link";
import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  Button,
} from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: "500px" }}>
      <h1>Profile</h1>
      <Form>
        <div className="mb-2">
          <FormLabel>Username</FormLabel>
          <FormControl
            defaultValue="alice"
            placeholder="username"
            className="wd-username"
          />
        </div>
        <div className="mb-2">
          <FormLabel>Password</FormLabel>
          <FormControl
            defaultValue="123"
            placeholder="password"
            type="password"
            className="wd-password"
          />
        </div>
        <div className="mb-2">
          <FormLabel>First Name</FormLabel>
          <FormControl
            defaultValue="Alice"
            placeholder="First Name"
            id="wd-firstname"
          />
        </div>
        <div className="mb-2">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            defaultValue="Wonderland"
            placeholder="Last Name"
            id="wd-lastname"
          />
        </div>
        <div className="mb-2">
          <FormLabel>Date of Birth</FormLabel>
          <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" />
        </div>
        <div className="mb-2">
          <FormLabel>Email</FormLabel>
          <FormControl
            defaultValue="alice@wonderland.com"
            type="email"
            id="wd-email"
          />
        </div>
        <div className="mb-2">
          <FormLabel>Role</FormLabel>
          <FormSelect defaultValue="USER" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
        </div>
        <Link href="/account/signin" className="d-block mt-2">
          <Button variant="danger" className="w-100">
            Signout
          </Button>
        </Link>
      </Form>
    </div>
  );
}
