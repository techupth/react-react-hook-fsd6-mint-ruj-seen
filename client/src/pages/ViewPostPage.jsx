import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewPostPage() {
  const navigate = useNavigate();

  function useBlogPosts(){
    const [postsData, setPostsData] = useState([])
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const getPostsData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const results = await axios("http://localhost:4000/posts");
        setPostsData(results.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
      }
    };  
    
    useEffect(() => {
    getPostsData();
  }, []);

    return { data : postsData,
            error : isError,
            loading : isLoading 
          }
  }

  const blogPostData = useBlogPosts()


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
        {blogPostData.data.map((post) => {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button className="view-button">View post</button>
              </div>
            </div>
          );
        })}
        {blogPostData.error ? <h1>Request failed</h1> : null}
        {blogPostData.loading ? <h1>Loading ....</h1> : null}
      </div>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default ViewPostPage;
