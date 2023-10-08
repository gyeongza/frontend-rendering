export default async function Read(props: { params: { id: string } }) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
    cache: 'no-store',
  });
  const topic = await resp.json();
  return (
    <>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
    </>
  );
}
