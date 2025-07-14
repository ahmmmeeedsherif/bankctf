"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FlagPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/file.pcap');
  }, [router]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>
        You find me,{" "}
        <a href="/file.pcap">click here</a>.
      </p>
    </div>
  );
}
