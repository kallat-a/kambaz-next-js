"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../courses/[cid]/people/Table";
import * as client from "../client";

export default function Users() {
  const { uid } = useParams() as { uid?: string };
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const loadUsers = useCallback(async (roleFilter: string, nameFilter: string) => {
    if (roleFilter && nameFilter) {
      const list = await client.findUsersByRoleAndPartialName(
        roleFilter,
        nameFilter,
      );
      setUsers(list);
      return;
    }
    if (roleFilter) {
      const list = await client.findUsersByRole(roleFilter);
      setUsers(list);
      return;
    }
    if (nameFilter) {
      const list = await client.findUsersByPartialName(nameFilter);
      setUsers(list);
      return;
    }
    const list = await client.findAllUsers();
    setUsers(list);
  }, []);

  const fetchUsers = useCallback(async () => {
    await loadUsers(role, name);
  }, [loadUsers, role, name]);

  const filterUsersByRole = async (r: string) => {
    setRole(r);
    await loadUsers(r, name);
  };

  const filterUsersByName = async (n: string) => {
    setName(n);
    await loadUsers(role, n);
  };

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    loadUsers("", "");
  }, [uid, loadUsers]);

  return (
    <div>
      <button
        type="button"
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>
      <h3>Users</h3>
      <FormControl
        value={name}
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <div className="clearfix mb-3" />
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
