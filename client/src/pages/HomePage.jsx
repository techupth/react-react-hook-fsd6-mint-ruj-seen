import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
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
      <div className="app-wrapper">
        <h1 className="app-title">Posts</h1>
        <button onClick={() => navigate("/post/create")}>Create Post</button>
      </div>
      <div className="board">
        {blogPostData.data.map((post) => {
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
      {blogPostData.error ? <h1>Request failed</h1> : null}
      {blogPostData.loading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;
