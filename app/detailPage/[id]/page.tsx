"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
export default function detailPage({ params }) {
    const router = useRouter(); 
    const { id } = params;
    console.log(id);
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/api/onePostApi/${id}`);
        const data = await response.json();
        setPost(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPost();
    }, []);

    const addToCartHandler = async () => {
      const user = session.user.id;
      // Check if the user is authenticated before adding the post to the cart
      if (!session?.user) {
        // Redirect the user to the login page or show a message indicating they need to be logged in
        return router.push('/login');
      }
  
      try {
        // Add the post to the cart by calling the addToCart API route
        const response = await fetch('http://localhost:3000/api/cartPostApi', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            id
          }),
        });
  
        if (response.ok) {
          // Handle the success case (e.g., show a success message)
          console.log("Post added to cart successfully");
        } else {
          // Handle the error case (e.g., show an error message)
          console.error("Error adding post to cart");
        }
      } catch (error) {
        console.error("Error adding post to cart:", error);
      }
    };
  
    const ratePost = () => {
     
      router.push(`/ratingForm/${id}`);
    };
    const postReview = () => {
     
      router.push(`/reviewPage/${id}`);
    };
  return (
    <div className="mt-20">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img style={{maxHeight: "500px", padding:"20px" }}
              alt={isLoading ? "Loading...": "post image" }
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={post?.image}
            ></img>{" "}
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
               POST DETAIL
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {isLoading ? "Loading..." : post?.title} 
              </h1>
              <div className="flex mb-4">
                
              
              </div>
              <p 
                   style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxHeight: "3rem", // Adjust this value as per your desired line height
                  }}
                  className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow">
                    {post?.category}
                  </p>
                  <p 
                   style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxHeight: "3rem", // Adjust this value as per your desired line height
                  }}
                  className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow">
                    {post?.size}
                  </p>
                  <p 
                   style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxHeight: "3rem", // Adjust this value as per your desired line height
                  }}
                  className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow">
                    {post?.color}
                  </p>
                  <p 
                   style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    maxHeight: "3rem", // Adjust this value as per your desired line height
                  }}
                  className="ml-4 mt-1 mb-2 hover:cursor-default text-gray-700 cursor-arrow">
                   $ {post?.price}
                  </p>
              <p className="leading-relaxed">
              {isLoading ? "Loading..." : post?.description} 
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                
              </div>
              <div className="flex">
              <button  onClick={ratePost}
                className="flex ml-auto text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Rate
                </button>
                <button  onClick={addToCartHandler}
                className="flex ml-auto text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Add to cart
                </button>
                <button  onClick={postReview}
                className="flex ml-auto text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                 Check Reviews
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                  Check Reviews
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
