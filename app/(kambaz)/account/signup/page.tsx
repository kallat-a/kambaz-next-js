"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client";
import { FormControl, Button } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const current = await client.signup(user);
      dispatch(setCurrentUser(current));
      router.push("/dashboard");
    } catch {
      // username taken or error
    }
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h1>Signup</h1>
      <FormControl
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="mb-2 wd-username"
      />
      <FormControl
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
        className="mb-2 wd-password"
      />
      <FormControl
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        placeholder="first name"
        className="mb-2"
      />
      <FormControl
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        placeholder="last name"
        className="mb-2"
      />
      <FormControl
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="mb-2"
      />
      <select
        className="form-control mb-2"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">TA</option>
        <option value="ADMIN">Admin</option>
      </select>
      <Button variant="primary" className="w-100 mb-2" onClick={signup}>
        Signup
      </Button>
      <Link href="/account/signin"> Sign in </Link>
    </div>
  );
}
