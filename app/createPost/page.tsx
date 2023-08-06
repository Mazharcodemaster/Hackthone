"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setsize] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSizeChange = (e) => {
    setsize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setImageFile(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = session.user.id;
    try {
      // Prepare the image data to be sent to the server
      const imageData = imageFile ? imageFile.split(",")[1] : null;

      const response = await fetch("http://localhost:3000/api/createPostApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          price,
          color,
          size,
          image: imageData,// Send the image data as a string
          user
        }),
      });

      if (response.ok) {
        setShowAlert(true);
        // router.push("/allPosts"); 
        // Post created successfully, do something with the response if needed
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  
  
  return (
    <div className="flex min-h-full max-w-md w-1/2 mx-auto   flex-col justify-center px-6 py-12 lg:px-8 mt-20">
      {showAlert && (
         <div className="flex w-full rounded-lg border-l-[6px] border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md md:p-9">
         <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
           <svg
             width="16"
             height="12"
             viewBox="0 0 16 12"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
               fill="white"
               stroke="white"
             ></path>
           </svg>
         </div>
         <div className="w-full">
           <h5 className="mb-3 text-lg font-semibold text-dark">
             Product Added Successfully
           </h5>
         </div>
       </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://img.icons8.com/external-flat-icons-vectorslab/68/external-Add-Product-shopping-and-commerce-flat-icons-vectorslab.png"
          alt="Your post"
        ></img>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Product
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6  text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Price
          </label>
          <input
            type="Float"
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={handleColorChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Size
          </label>
          <input
            type="text"
            id="size"
            name="size"
            value={size}
            onChange={handleSizeChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            rows="3"
            required
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Image
          </label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full border  border-gray-300 rounded-md p-2"
            required
          />
          <span>
            {" "}
            {imageFile && <img src={imageFile} style={{ width: "100px" }} />}
          </span>
        </div>
        

        <button
          type="submit"
          className="flex w-half justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;


  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value)
  // }
  // const handleDescriptionChange = (e) => {
  //   setDescription(e.target.value)
  // }
  // const [imageFile, setImageFile] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.onload = function (e) {
  //     setImageFile(e.target.result);
  //   };
  //   fileReader.readAsDataURL(file);
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("description", description);
  //     // formData.append("image", imageFile); // Assuming imageFile is a File object
  
  //     const response = await fetch("http://localhost:3000/api/createPostApi", {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     if (!response.ok) {
  //       throw new Error("Error creating post");
  //     }
  
  //     // Handle the response
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // };
  