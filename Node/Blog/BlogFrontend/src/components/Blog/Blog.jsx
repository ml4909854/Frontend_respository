import React, { useEffect, useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import axios from 'axios';
import './Blog.css';

const Blog = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const accessToken  = localStorage.getItem("accessToken")
  // Fetch blogs
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${backendUrl}/blog`);
      const blogs = response.data.blog;

      if (!blogs || blogs.length === 0) {
        setError("No blogs found! Please create some blogs.");
      } else {
        setData(blogs);
      }
    } catch (error) {
      console.error(error);
      setError("No blogs found! Please create some blogs");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) return <Spinner />;
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</div>;

  // Edit blog (example: edit title only)
  const handleEdit = async (id , title  ,content) => {
  const newTitle = prompt("Enter new blog title:" , title);
  if (!newTitle) return;

  const newContent = prompt("Enter new blog content:" ,content);
  if (!newContent) return;

  try {
    await axios.patch(`${backendUrl}/blog/update/${id}`, 
      {
        title: newTitle,
        content: newContent
      }, 
      {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
    );

    alert("Blog updated!");
    fetchTodos(); // Refresh list
  } catch (error) {
    console.error(error);
    alert("Blog update failed.");
  }
};

  // Delete blog
  const handleDelete = async (id ) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?" );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendUrl}/blog/delete/${id}` ,{
        headers:{
          authorization:`Bearer ${accessToken}`
        }
      });
      alert("Blog deleted!");
      fetchTodos(); // Refresh list
    } catch (error) {
      console.error(error);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className='container'>
      <h1>Read Blog For Good Experience!</h1>
      {data.map((blog, index) => (
        <div key={blog._id} className='blog-card'>
          <h3>#{index + 1}. {blog.title}</h3>
          <p><strong>Author:</strong> {blog.author?.username || 'Unknown Author'}</p>
          <p>{blog.content}</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <button onClick={() => handleEdit(blog._id , blog.title , blog.content)}>Edit</button>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
