"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    setProfile({ ...currentUser });
  }, [currentUser, router]);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  const save = async () => {
    if (!currentUser?._id) return;
    const updates = { ...profile, _id: currentUser._id };
    if (!updates.password) delete updates.password;
    const updated = await client.updateUser(updates);
    dispatch(setCurrentUser(updated));
  };

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && Object.keys(profile).length > 0 && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            value={profile.username ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            value={profile.password ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            value={profile.firstName ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            value={profile.lastName ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            value={
              typeof profile.dob === "string"
                ? profile.dob.slice(0, 10)
                : (profile.dob ?? "")
            }
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            value={profile.email ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            value={profile.role ?? "STUDENT"}
            onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={save} className="w-100 mb-2" variant="primary">
            Save
          </Button>
          <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
