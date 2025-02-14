"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [name, setName] = useState("");

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
      </form>
    </div>
  );
}
