import useBlogPosts from "../components/useBlogPosts";
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate();

  const {data, error, loading} = useBlogPosts()


  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Posts</h1>
        <button onClick={() => navigate("/post/create")}>Create Post</button>
      </div>
      <div className="board">
        {data.map((post) => {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={() => navigate(`/post/view/${post.id}`)}
                >
                  View post
                </button>
                <button className="edit-button" onClick={() => navigate(`/post/edit/${post.id}`)}>Edit post</button>
              </div>

              <button className="delete-button" >x</button>
            </div>
          );
        })}
      </div>
      {error ? <h1>Request failed</h1> : null}
      {loading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;
