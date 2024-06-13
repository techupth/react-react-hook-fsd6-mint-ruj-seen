import { useNavigate } from "react-router-dom";
import useBlogPosts from "../components/useBlogPosts";


function ViewPostPage() {
  const navigate = useNavigate();

  const {data, error, loading} = useBlogPosts()

  return (
    <div>
      <h1>View Post Page</h1>
      <div className="view-post-container">
        <h2>Post Title</h2>
        <p>Content</p>
      </div>

      <hr />
      <div className="show-all-posts-container">
        <h2>All Posts</h2>
        {data.map((post) => {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button className="view-button">View post</button>
              </div>
            </div>
          );
        })}
        {error ? <h1>Request failed</h1> : null}
        {loading ? <h1>Loading ....</h1> : null}
      </div>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewPostPage;
