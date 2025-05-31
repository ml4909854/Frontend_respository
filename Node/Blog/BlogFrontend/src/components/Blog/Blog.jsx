import React, { useEffect, useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import axios from 'axios';
import "./Blog.css"
const Blog = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${backendUrl}/blog`);
      const blogs = response.data.blog;

      if (!blogs || blogs.length === 0) {
        setError("No blogs found! Please create some blogs.");
      } else {
        setData(blogs);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong while fetching blogs.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
  }

  return (
    <div className='container'>
      <h1>Read Blog For good experience!</h1>
      {data.map((blog, index) => (
        <div >
          <h3>#{index + 1}. {blog.title}</h3>
          <p><strong>Author:</strong> {blog.author ? blog.author.name : 'Unknown Author'}</p>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
