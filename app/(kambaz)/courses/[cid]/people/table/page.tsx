"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as enrollmentsClient from "../../../../enrollments/client";
import PeopleTable from "../Table";

export default function CoursePeopleTablePage() {
  const { cid } = useParams() as { cid: string };
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const enrolled = await enrollmentsClient.findUsersForCourse(cid);
    setUsers(enrolled);
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
