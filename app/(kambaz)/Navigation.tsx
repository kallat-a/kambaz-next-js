"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  function activeClass(active: boolean) {
    if (active) {
      return " wd-nav-active";
    }
    return "";
  }

  const accountActive = pathname.startsWith("/account");
  const dashboardActive = pathname === "/dashboard";
  const coursesActive = pathname.startsWith("/courses");
  const calendarActive = pathname === "/calendar";
  const inboxActive = pathname === "/inbox";
  const labsActive = pathname.startsWith("/labs");

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <ListGroupItem className={"wd-nav-item wd-nav-account" + activeClass(accountActive)}>
        <Link href="/account" id="wd-account-link" className="wd-nav-link">
          <FaRegCircleUser className="wd-nav-icon" />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <ListGroupItem className={"wd-nav-item" + activeClass(dashboardActive)}>
        <Link href="/dashboard" id="wd-dashboard-link" className="wd-nav-link">
          <AiOutlineDashboard className="wd-nav-icon" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem className={"wd-nav-item" + activeClass(coursesActive)}>
        <Link href="/dashboard" id="wd-course-link" className="wd-nav-link">
          <LiaBookSolid className="wd-nav-icon" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem className={"wd-nav-item" + activeClass(calendarActive)}>
        <Link href="/calendar" id="wd-calendar-link" className="wd-nav-link">
          <IoCalendarOutline className="wd-nav-icon" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem className={"wd-nav-item" + activeClass(inboxActive)}>
        <Link href="/inbox" id="wd-inbox-link" className="wd-nav-link">
          <FaInbox className="wd-nav-icon" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem className={"wd-nav-item" + activeClass(labsActive)}>
        <Link href="/labs" id="wd-labs-link" className="wd-nav-link">
          <LiaCogSolid className="wd-nav-icon" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
