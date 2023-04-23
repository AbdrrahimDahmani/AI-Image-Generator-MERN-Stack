import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPromt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPromt });
  };
  const generateImage = () => {};
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[600px]">
          Create some highly imaginative AI images and share them with the
          community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Jhon Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an astronaut lounging in a tropical resort in space, vaporwave"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              After creating the desired AI image, you can easily share it with
              other member of the community
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {loading ? "Sharing..." : "Share with the community"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
