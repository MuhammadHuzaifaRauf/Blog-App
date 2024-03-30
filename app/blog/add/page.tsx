// "use client";

// import { useRef } from "react";
// import { Toaster } from "react-hot-toast";

// export default function AddBlog() {
//   const titleRef = useRef<HTMLInputElement | null>(null);
//   const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     const title = titleRef.current?.value;
//     const description = descriptionRef.current?.value;
//     console.log(title, description);
//   };

//   }

//   return (
//     <>
//       <Toaster />
//       <div className="w-full m-auto flex my-4">
//         <div className="flex flex-col justify-center items-center m-auto">
//           <p className="text-2xl text-slate-200 font-semibold p-3 ">
//             Add a Wonderful Blog 🚀
//           </p>
//           <form onSubmit={handleSubmit}>
//             <input
//               ref={titleRef}
//               type="text"
//               className="rounded-md px-4 w-full py-2 my-2 bg-slate-200"
//               placeholder="Enter your Blog Title here"
//             />
//             <textarea
//               ref={descriptionRef}
//               className="rounded-md px-4 py-2 w-full my-2 bg-slate-200"
//               placeholder="Enter your Blog Description here"
//             ></textarea>
//             <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
//               Add your Blog
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

const postBlog = async ({
  title,
  description,
}: {
  title: string | undefined;
  description: string | undefined;
}) => {
  const res = fetch("http://localhost:3000/api/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
  return (await res).json();
};

export default function AddBlog() {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (titleRef.current && descriptionRef.current) {
      toast.loading(" Sending Request 🚀", { id: "1" });
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
      });
      toast.success("Your Blog is Posted Successfully", { id: "1" });
      router.push("/");
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-semibold p-3 ">
            Add a Wonderful Blog 🚀
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
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              Add your Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
