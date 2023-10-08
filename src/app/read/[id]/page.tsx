export default async function Read(props: any) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`);
  const topic = await resp.json();
  return (
    <>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
    </>
  );
}
