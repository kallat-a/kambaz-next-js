"use client";

import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  const dateObjectToHtmlDateString = (date: Date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    return `${date.getFullYear()}-${m < 10 ? "0" : ""}${m}-${d < 10 ? "0" : ""}${d}`;
  };

  if (!startDate) {
    return (
      <div id="wd-date-state-variables">
        <h2>Date State Variables</h2>
        <h3>--</h3>
        <h3>--</h3>
        <FormControl type="date" disabled />
        <hr />
      </div>
    );
  }

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <FormControl
        type="date"
        defaultValue={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <hr />
    </div>
  );
}
