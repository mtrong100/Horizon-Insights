import React from "react";

const FeatureBlog = () => {
  return (
    <article className="flex items-start justify-between gap-2 h-[400px] ">
      <div className="w-full flex-1 h-[400px]">
        <img
          src="https://source.unsplash.com/random"
          alt="blog-image"
          className="img-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col flex-1 bg-gray-100 py-3 px-5 gap-2 h-[400px] rounded-md">
        <span className=" font-bold bg-blue-500 bg-opacity-20 text-indigo-500 w-fit px-5 py-2 rounded-full ">
          React
        </span>
        <h1 className="font-bold text-slate-900 text-4xl leading-tight  hover:underline cursor-pointer">
          Beyond the Horizon: Exploring Life's Possibilities
        </h1>
        <p className="text-slate-700 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum autem
          dolores dolorem, laudantium molestias mollitia placeat, asperiores
          illo repellendus hic fuga eius voluptates nemo, molestiae ratione modi
          culpa vero nesciunt? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Et eveniet perferendis delectus ea, dolorum unde
          autem cum doloribus fuga earum. Debitis odit voluptatem quibusdam
          distinctio sit provident aperiam vitae consectetur?
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 ">
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

export default FeatureBlog;
