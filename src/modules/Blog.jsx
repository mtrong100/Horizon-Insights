import React from "react";

const Blog = () => {
  return (
    <article className="flex flex-col">
      <div className="w-full h-[200px] ">
        <img
          src="https://source.unsplash.com/random"
          alt="blog-image"
          className="img-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2 bg-whiteSoft shadow-sm p-3 rounded-br-lg rounded-bl-lg">
        <span className=" font-bold text-sm bg-blue-500 bg-opacity-20 text-indigo-500 w-fit px-5 py-2 rounded-full ">
          React
        </span>
        <h1 className="font-bold text-slate-900 text-2xl leading-tight hover:underline cursor-pointer">
          Beyond the Horizon: Exploring Life's Possibilities
        </h1>
        <p className="text-slate-700 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem
          dolores dolorem, laudantium molestias mollitia placeat, asperiores
          illo repellendus hic fuga eius voluptates nemo,
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-2">
          <img
            src="https://source.unsplash.com/random"
            alt="user-avatar"
            className="object-cover w-[50px] h-[50px] rounded-full flex-shrink-0"
          />
          <div>
            <h3 className="font-bold text-slate-700 ">Crowbar</h3>
            <p className="text-sm font-medium">13 hours ago</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blog;
