import {useState, useEffect} from "react"
import axios from "axios";

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

export default useBlogPosts;