"use client";
import React from "react";
import "./Form.scss";

interface FormType {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  autoComplete?: boolean;
}

export default function Form({
  children,
  onSubmit,
  autoComplete = true,
}: FormType) {
  return (
    <form
      className="form"
      onSubmit={onSubmit}
      autoComplete={autoComplete ? "on" : "off"}
    >
      {children}
    </form>
  );
}
