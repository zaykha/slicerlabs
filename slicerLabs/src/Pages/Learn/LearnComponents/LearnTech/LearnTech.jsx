import React, { useEffect, useState } from 'react'
import { SCheader1, SSpan } from '../../../Services/Serviceselement'
import { TBcontainer } from '../ToBlogs/ToBlogselement'

import { LTBDivider, LTBlogCard, LTBlogcontent, LTBlogHeader, LTBlogIMG, LTBlogtoggle, LTsubHeader } from './LearnTechelement'

import pic1 from '../../../../assets/22.jpg';
import uparrowblog from '../../../../assets/uparrowtechblog.svg';
import downarrowblog from '../../../../assets/downarrowtechblog.svg';
import { getDocs } from 'firebase/firestore';
import { BlogCollection } from '../../../../firebase';

const LearnTech = () => {
  const [blogPosts, setBlogPosts] = useState([]);

   // Fetch existing blog posts
   useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const querySnapshot = await getDocs(BlogCollection);
        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        setBlogPosts(posts);
        console.log(posts)
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchBlogPosts();
  }, []);
  const handleToggleExpand = (postId) => {
    setBlogPosts((prevData) =>
      prevData.map((post) =>
        post.id === postId ? { ...post, toggleExpand: !post.toggleExpand } : post
      )
    );
  };

  return (
    <TBcontainer>
      <LTsubHeader>OUR TECHNOLOGIES</LTsubHeader>
      <SCheader1>
        Made In <SSpan>SlicerLabs</SSpan>{" "}
      </SCheader1>

      {blogPosts.map((post) => (
        <BlogPost
          
          key={post.id}
          title={post.title}
          content={post.content}
          imageUrl={post.imageUrl}
          toggleExpand={post.toggleExpand}
          onToggleExpand={() => handleToggleExpand(post.id)}
        />
      ))}
    </TBcontainer>
  );
};

const BlogPost = ({ title, content, imageUrl, toggleExpand, onToggleExpand }) => {
  return (
    <LTBlogCard data-aos="fade-down" toggleExpand={toggleExpand} onClick={onToggleExpand}>
      <LTBlogIMG src={imageUrl}></LTBlogIMG>
      <LTBDivider>
        <LTBlogHeader>{title}</LTBlogHeader>
        <LTBlogcontent>{content}</LTBlogcontent>
      </LTBDivider>
      {toggleExpand ? (
        <LTBlogtoggle src={uparrowblog} onClick={onToggleExpand}></LTBlogtoggle>
      ) : (
        <LTBlogtoggle src={downarrowblog} onClick={onToggleExpand}></LTBlogtoggle>
      )}
    </LTBlogCard>
  );
};

export default LearnTech;
