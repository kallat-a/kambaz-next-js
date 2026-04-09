"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FormControl, Form } from "react-bootstrap";
import * as client from "../../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
    setName(`${u.firstName ?? ""} ${u.lastName ?? ""}`.trim());
    setEmail(u.email ?? "");
    setRole(u.role ?? "USER");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  const deleteUser = async (id: string) => {
    await client.deleteUser(id);
    onClose();
  };

  const saveUser = async () => {
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const lastName = rest.join(" ") || firstName;
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const saveEmail = async () => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
  };

  const saveRole = async () => {
    const updatedUser = { ...user, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingRole(false);
  };

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 overflow-auto">
      <button
        type="button"
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div
            className="wd-name"
            onClick={() => setEditing(true)}
            role="button"
            tabIndex={0}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <div className="mt-3">
        <b>Email:</b>{" "}
        {!editingEmail ? (
          <>
            <span className="wd-email">{user.email}</span>{" "}
            <FaPencil
              className="ms-1"
              role="button"
              onClick={() => {
                setEmail(user.email ?? "");
                setEditingEmail(true);
              }}
            />
          </>
        ) : (
          <>
            <FormControl
              type="email"
              className="d-inline-block w-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaCheck className="ms-2" role="button" onClick={() => saveEmail()} />
          </>
        )}
      </div>
      <div className="mt-2">
        <b>Roles:</b>{" "}
        {!editingRole ? (
          <>
            <span className="wd-roles">{user.role}</span>{" "}
            <FaPencil
              className="ms-1"
              role="button"
              onClick={() => {
                setRole(user.role ?? "USER");
                setEditingRole(true);
              }}
            />
          </>
        ) : (
          <>
            <Form.Select
              className="d-inline-block w-50"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="STUDENT">STUDENT</option>
              <option value="TA">TA</option>
              <option value="FACULTY">FACULTY</option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </Form.Select>
            <FaCheck className="ms-2" role="button" onClick={() => saveRole()} />
          </>
        )}
      </div>
      <b>Login ID:</b>{" "}
      <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        type="button"
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        type="button"
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
