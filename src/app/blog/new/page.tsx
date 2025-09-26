"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import axios from "axios";
import {
  author_service,
  blogCategories,
  useAppData,
} from "@/context/AppContext";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { fetchBlogs } = useAppData();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    blogcontent: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fromDataToSend = new FormData();

    fromDataToSend.append("title", formData.title);
    fromDataToSend.append("description", formData.description);
    fromDataToSend.append("blogcontent", formData.blogcontent);
    fromDataToSend.append("category", formData.category);

    if (formData.image) {
      fromDataToSend.append("file", formData.image);
    }

    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${author_service}/api/v1/blog/new`,
        fromDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setFormData({
        title: "",
        description: "",
        category: "",
        image: null,
        blogcontent: "",
      });
      setContent("");
      setTimeout(() => {
        fetchBlogs();
      }, 4000);
    } catch (error) {
      toast.error("Error while adding blog");
    } finally {
      setLoading(false);
    }
  };

  const [aiTitle, setAiTitle] = useState(false);

  const aiTitleResponse = async () => {
    try {
      setAiTitle(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/title`, {
        text: formData.title,
      });
      setFormData({ ...formData, title: data });
    } catch (error) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiTitle(false);
    }
  };

  const [aiDescripiton, setAiDescription] = useState(false);

  const aiDescriptionResponse = async () => {
    try {
      setAiDescription(true);
      const { data } = await axios.post(
        `${author_service}/api/v1/ai/descripiton`,
        {
          title: formData.title,
          description: formData.description,
        }
      );
      setFormData({ ...formData, description: data });
    } catch (error) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiDescription(false);
    }
  };

  const [aiBlogLoading, setAiBlogLoading] = useState(false);

  const aiBlogResponse = async () => {
    try {
      setAiBlogLoading(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/blog`, {
        blog: formData.blogcontent,
      });
      setContent(data.html);
      setFormData({ ...formData, blogcontent: data.html });
    } catch (error: any) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiBlogLoading(false);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "Start typings...",
    }),
    []
  );
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-4xl mx-auto p-6">
        <Card className="glass-card border-white/20 shadow-glow">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-glow">
              <span className="text-2xl">✍️</span>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create New Blog
            </h2>
            <p className="text-gray-600">Share your thoughts with the world</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Title</Label>
                <div className="flex justify-center items-center gap-3">
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter an engaging blog title"
                    className={`border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                      aiTitle ? "animate-pulse placeholder:opacity-60" : ""
                    }`}
                    required
                  />
                  {formData.title !== "" && (
                    <Button
                      type="button"
                      onClick={aiTitleResponse}
                      disabled={aiTitle}
                      className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[50px]"
                      title="Check grammar with AI"
                    >
                      <RefreshCw className={`w-4 h-4 ${aiTitle ? "animate-spin" : ""}`} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Description</Label>
                <div className="flex justify-center items-center gap-3">
                  <Input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a compelling description"
                    className={`border-2 border-pink-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                      aiDescripiton ? "animate-pulse placeholder:opacity-60" : ""
                    }`}
                    required
                  />
                  {formData.title !== "" && (
                    <Button
                      onClick={aiDescriptionResponse}
                      type="button"
                      disabled={aiDescripiton}
                      className="px-4 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-xl hover:from-pink-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed min-w-[50px]"
                      title="Generate description with AI"
                    >
                      <RefreshCw className={`w-4 h-4 ${aiDescripiton ? "animate-spin" : ""}`} />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Category</Label>
                <Select
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="border-2 border-yellow-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm">
                    <SelectValue
                      placeholder={formData.category || "Select a category"}
                    />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-white/20 bg-white/90 backdrop-blur-sm">
                    {blogCategories?.map((e, i) => (
                      <SelectItem key={i} value={e} className="hover:bg-purple-50 rounded-lg">
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Cover Image</Label>
                <div className="relative">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="border-2 border-gray-200 rounded-xl px-4 py-3 h-12 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:transition-all file:duration-300 cursor-pointer flex items-center"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium">Blog Content</Label>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <p className="text-sm text-gray-600 flex-1">
                    ✨ Write your blog content here. Use rich text formatting and add images after improving grammar with AI.
                  </p>
                  <Button
                    type="button"
                    onClick={aiBlogResponse}
                    disabled={aiBlogLoading}
                    className="ml-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-purple-500 text-white rounded-xl hover:from-yellow-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    title="Fix grammar with AI"
                  >
                    <RefreshCw
                      size={16}
                      className={aiBlogLoading ? "animate-spin" : ""}
                    />
                    <span className="font-semibold">Fix Grammar</span>
                  </Button>
                </div>
                <div className="border-2 border-purple-200 rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => {
                      setContent(newContent);
                      setFormData({ ...formData, blogcontent: newContent });
                    }}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-4 font-bold text-lg text-white bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 rounded-xl hover:from-purple-700 hover:via-pink-700 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] relative overflow-hidden group" 
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? "Publishing..." : "Publish Blog"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddBlog;
