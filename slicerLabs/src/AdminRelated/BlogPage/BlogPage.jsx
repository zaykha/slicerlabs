import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { BlogCollection } from "../../firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import styled from "styled-components";
import {
  DisplayHeader,
  ItemHeaderprofile,
  UPHeaderFullline1,
} from "../../Pages/UserProfile/UserProfileElement";
import { NoitemCart, Step1Container } from "../../Pages/Cart/Cartpageelement";
import {
  Inputelem,
  RegsubHeader,
  ValidateEmailButton,
} from "../../Pages/Register/RegisterComponents/Registerformelement";
import {
  LoginContainer,
  LoginFlexdiv,
  LoginFromcontainer,
  LoginHeader,
} from "../../Pages/Login/LoginComponents/LoginForm/LoginFormelements";
const Container = styled.div`
  color: white;
  padding: 20px;
  // background-color: #f5f5f5;
`;

const BlogPost = styled.div`
  // background-color: white;
  border-top: 0.5px solid lightblue;
  border-bottom: 0.5px solid lightblue;
  padding: 10px;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: lightblue;
  border: none;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  // background-color: white;
  border: 1px solid lightblue;
  padding: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  background: rgba(87, 87, 87, 0.43);
  border: 1px solid ${({ borderColor }) => borderColor || "#a5a5a5"};
  border-radius: 10px;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  text-align: center;
  outline: none;
  margin: 5px auto 10px auto;
  color: white;
  padding: 10px;
  resize: none;
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

const AddButton = styled(Button)`
  background-color: #388fc9;
  width: 200px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 5px 10px 5px 12px;
  &:hover {
    background-color: #2c73a3;
  }
`;
const LoginFromcontainer2 = styled.div`
  box-sizing: border-box;

  width: 773px;
  padding: 40px 0;
  margin: 40px auto;
  background: linear-gradient(
    180deg,
    rgba(8, 51, 71, 0.63) 0%,
    rgba(0, 80, 118, 0.63) 100%
  );
  border: 1px solid rgba(201, 201, 201, 0.41);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;

  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;
const AddPostButton = styled(Button)`
  background-color: lightblue;
  margin-top: 10px;
`;

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    subTitle: "",
    content: "",
    imageFile: null,
  });

  const storage = getStorage();

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
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchBlogPosts();
  }, []);

  // Function to handle adding a new blog post
  const handleAddOrEditPost = async () => {
    try {
      // Upload image to storage if a new image is selected
      let imageUrl = null;
      if (newPost.imageFile) {
        const imageRef = ref(
          storage,
          `images/${newPost.title}&${newPost.imageFile?.name}`
        );
        await uploadBytes(imageRef, newPost.imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } else {
        // Use the existing image URL if no new image is selected
        imageUrl = newPost.imageUrl;
      }
      const now = new Date();
      const postedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
      const postedTime = `${now.getHours()}:${now.getMinutes()}`;
      const updatedPostData = {
        title: newPost.title,
        subTitle: newPost.subTitle,
        content: newPost.content,
        fileName: newPost.imageFile?.name,
        imageUrl: imageUrl,
        postedDate,
        postedTime,
      };

      // Check if the post ID already exists in the list of blog posts
      const existingPostIndex = blogPosts.findIndex(
        (post) => post.id === newPost.id
      );

      if (existingPostIndex !== -1) {
        // Post with the same ID exists, update it
        const updatedBlogPosts = [...blogPosts];
        updatedBlogPosts[existingPostIndex] = {
          ...updatedBlogPosts[existingPostIndex],
          ...updatedPostData,
        };

        // Update Firestore document
        await updateDoc(doc(BlogCollection, newPost.id), updatedPostData);

        setBlogPosts(updatedBlogPosts);
        setShowEditForm(false);
      } else {
        // Post doesn't exist, add a new one
        const docRef = await addDoc(BlogCollection, updatedPostData);
        setBlogPosts((prevPosts) => [
          ...prevPosts,
          { id: docRef.id, ...updatedPostData },
        ]);
        setShowAddForm(false);
      }

      // Clear the form fields
      setNewPost({
        id: "",
        title: "",
        subTitle: "",
        content: "",
        imageFile: null,
        imageUrl: null,
      });
    } catch (error) {
      console.error("Error adding/editing blog post:", error);
    }
  };

  // Function to handle deleting a blog post
  const handleDeletePost = async (postId) => {
    try {
      // Delete image from storage
      const post = blogPosts.find((post) => post.id === postId);
      console.log(post);
      if (post) {
        const imageRef = ref(storage, `images/${post.fileName}`);
        // Delete the file
        deleteObject(imageRef)
          .then(() => {
            // File deleted successfully
            console.log("delete image file success");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log("error deleting file", error);
          });
      }

      // Delete blog post from Firestore
      await deleteDoc(doc(BlogCollection, postId));
      setBlogPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleEditClick = (post) => {
    console.log(post);
    setNewPost({
      id: post.id,
      title: post.title,
      subTitle: post.subTitle,
      content: post.content,
      // imageFile:post.fileName, // Set to null initially, as you are not replacing the image by default
      imageUrl: post.imageUrl, // Set the existing image URL
    });
    setShowEditForm(true);
  };
  // Your rendering logic here
  return (
    <Step1Container>
      <Container>
        <UPHeaderFullline1>Admin Blog Page</UPHeaderFullline1>
        {/* Display existing blog posts */}

        {blogPosts.length > 0 ? (
          <LoginFromcontainer2>
            {blogPosts.map((post) => (
              <BlogPost key={post.id}>
                <LoginFlexdiv>
                  <ItemHeaderprofile>{post.title}</ItemHeaderprofile>
                  <div>
                    <RegsubHeader>{post.subTitle}</RegsubHeader>
                    <RegsubHeader>posted Time:{post.postedDate}, {post.postedTime}</RegsubHeader>
                  </div>

                  <div>
                    <AddButton onClick={() => handleEditClick(post)}>
                      Edit
                    </AddButton>
                    <AddButton onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </AddButton>
                  </div>
                </LoginFlexdiv>
              </BlogPost>
            ))}
          </LoginFromcontainer2>
        ) : (
          <></>
        )}

        {/* Show add form */}
        {showAddForm && (
          <PopupContainer>
            <LoginFromcontainer>
              <LoginHeader>Add New Blog Post</LoginHeader>

              <Inputelem
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              <Inputelem
                type="text"
                placeholder="Sub Title"
                value={newPost.subTitle}
                onChange={(e) =>
                  setNewPost({ ...newPost, subTitle: e.target.value })
                }
              />
              <TextArea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows={4}
              />
              <FileInputWrapper>
                <FileInputLabel>
                  {newPost.imageFile ? newPost.imageFile.name : "Choose Image"}
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewPost({ ...newPost, imageFile: e.target.files[0] })
                    }
                  />
                </FileInputLabel>
              </FileInputWrapper>
              <ValidateEmailButton onClick={handleAddOrEditPost}>
                Add Post
              </ValidateEmailButton>
            </LoginFromcontainer>
          </PopupContainer>
        )}
        {showEditForm && (
          <PopupContainer>
            <LoginFromcontainer>
              <LoginHeader>Edit Blog Post</LoginHeader>

              <Inputelem
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              <Inputelem
                type="text"
                placeholder="Sub Title"
                value={newPost.subTitle}
                onChange={(e) =>
                  setNewPost({ ...newPost, subTitle: e.target.value })
                }
              />
              <TextArea
                placeholder="Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows={4}
              />
              <FileInputWrapper>
                <FileInputLabel>
                  {newPost.imageFile ? newPost.imageFile.name : "Choose Image"}
                  <FileInput
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setNewPost({ ...newPost, imageFile: e.target.files[0] })
                    }
                  />
                </FileInputLabel>
              </FileInputWrapper>
              <ValidateEmailButton onClick={handleAddOrEditPost}>
                Edit Post
              </ValidateEmailButton>
            </LoginFromcontainer>
          </PopupContainer>
        )}
        {blogPosts.length > 0 ? (
          <ValidateEmailButton onClick={() => setShowAddForm(true)}>
            Add New Post
          </ValidateEmailButton>
        ) : (
          <NoitemCart>
            <ValidateEmailButton onClick={() => setShowAddForm(true)}>
              Add New Post
            </ValidateEmailButton>
          </NoitemCart>
        )}
      </Container>
    </Step1Container>
  );
};
const PopupContainer = styled.div`
  /* Styles for the popup container */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FileInputWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-top: 15px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const FileInputLabel = styled.label`
  background: linear-gradient(
    180deg,
    rgb(38, 102, 130) 0%,
    rgb(0, 128, 188) 100%
  );
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 10;
  &:hover {
    color: lightblue;
    background: linear-gradient(
      180deg,
      rgb(38, 102, 131) 0%,
      rgb(0, 128, 191) 100%
    );
  }
`;
export default BlogPage;
