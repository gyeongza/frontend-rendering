'use client';

import { useRouter } from 'next/navigation';

export default function Create() {
  const router = useRouter();

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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch(`http://localhost:9999/topics`, options)
          .then((res) => res.json())
          .then((res) => {
            const lastId = res.id;

            router.push(`read/${lastId}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
      <h2>Create</h2>
    </form>
  );
}
