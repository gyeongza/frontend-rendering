'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Update() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:9999/topics/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          title: { value: string };
          body: { value: string };
        };

        const title = target.title.value;
        const body = target.body.value;

        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch(`http://localhost:9999/topics/${params.id}`, options)
          .then((res) => res.json())
          .then((res) => {
            const lastId = res.id;
            router.refresh();
            router.push(`/read/${lastId}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
      <h2>Update</h2>
    </form>
  );
}
