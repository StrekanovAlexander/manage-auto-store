function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'You liked this!';
  }

  return <button onClick={() => setLiked(true)}>Like</button>;
}

const app = document.getElementById('app');
const root = ReactDOM.createRoot(app);
root.render(React.createElement(LikeButton));