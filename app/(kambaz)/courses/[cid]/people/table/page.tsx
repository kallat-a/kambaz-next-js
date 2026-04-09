"use client";

import { useState, useEffect } from "react";
import * as db from "../../../../database";
import { useParams } from "next/navigation";
import * as client from "../../../../account/client";
import PeopleTable from "../Table";

export default function CoursePeopleTablePage() {
  const { cid } = useParams() as { cid: string };
  const { enrollments } = db;
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const all = await client.findAllUsers();
    const filtered = all.filter((usr: { _id: string }) =>
      enrollments.some(
        (enrollment: { user: string; course: string }) =>
          enrollment.user === usr._id && enrollment.course === cid,
      ),
    );
    setUsers(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
