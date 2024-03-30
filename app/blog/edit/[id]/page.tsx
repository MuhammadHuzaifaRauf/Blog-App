"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

interface updateParams {
  title: string;
  description: string;
  id: string;
}

const updateBlog = async (data: updateParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
    }),
  });
  return (await res).json();
};

const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (await res).json();
};

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

export default function EditBlog({ params }: { params: { id: string } }) {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Completed", { id: "1" });
        }
      })
      .catch((err) => {
        toast.error("Fetching Failed", { id: "1" });
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading(" Sending Request 🚀", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success("Your Blog is Updated Successfully", { id: "1" });
      router.push("/");
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting your Blog", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Your Blog is Deleted Successfully", { id: "2" });
    router.push("/");
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-semibold p-3 ">
            Edit your Wonderful Blog 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 bg-slate-200"
              placeholder="Enter your Blog Title here"
            />
            <textarea
              ref={descriptionRef}
              className="rounded-md px-4 py-2 w-full my-2 bg-slate-200"
              placeholder="Enter your Blog Description here"
            ></textarea>
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update your Blog 📝
              </button>
            </div>
          </form>
          <button
            onClick={handleDelete}
            className="font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-red-500 mt-2"
          >
            Delete your Blog 🗑️
          </button>
        </div>
      </div>
    </>
  );
}
