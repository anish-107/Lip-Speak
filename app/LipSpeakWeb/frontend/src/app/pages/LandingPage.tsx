/**
 * @author Anish 
 * @date 13-11-2025
 * @description Home Page for Lipspeak
 * @returns a tsx page
 * 
 */

"use client";

import { useEffect, useState } from "react";

export default function LandingPage() {
  const [message, setMessage] = useState<{ message?: string; ok?: boolean }>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_TEST_URL}`)
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching:", error));
  }, []);

  return (
    <div>
      {message.message ? (
        <>
          <p>Message: {message.message}</p>
          <p>Status: {message.ok ? "Yes" : "No"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
