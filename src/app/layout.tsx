import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Control } from './Control';

export const metadata: Metadata = {
  title: 'Baton by NEXT.js',
  description: 'code review plaform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await fetch('http://localhost:9999/topics', {
    cache: 'no-store',
  });
  const topics = await resp.json();
  return (
    <html lang="ko">
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic: any) => {
            return (
              <li key={topic.id}>
                <Link href={`/read/${topic.id}`}>{topic.title}</Link>
              </li>
            );
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
