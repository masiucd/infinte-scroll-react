const DummyPosts = [
  {
    id: 1,
    title: "Hello World",
    content: "This is my first post",
  },
  {
    id: 2,
    title: "Yo World",
    content: "This is second first post",
  },
];

export default function Page() {
  return (
    <div>
      <ul>
        {DummyPosts.map((post) => {
          return (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
