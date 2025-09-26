"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData, user_service } from "@/context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";

const ProfilePage = () => {
  const { user, setUser, logoutUser } = useAppData();
  const InputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    bio: user?.bio || "",
  });

  if (!user) return redirect("/login");

  const logoutHandler = () => {
    logoutUser();
  };

  const clickHandler = () => {
    InputRef.current?.click();
  };

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formDataImage = new FormData();
      formDataImage.append("file", file);
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.post(
          `${user_service}/api/v1/user/update/pic`,
          formDataImage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        setLoading(false);
        Cookies.set("token", data.token, {
          expires: 5,
          secure: true,
          path: "/",
        });
        setUser(data.user);
      } catch {
        toast.error("Image Update Failed");
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${user_service}/api/v1/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      toast.success(data.message);
      Cookies.set("token", data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      setUser(data.user);
      setOpen(false);
    } catch {
      toast.error("Update Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Your Profile</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="glass-effect shadow-glow border-0 rounded-3xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 relative">
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <CardContent className="relative -mt-16 px-8 pb-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative group">
                      <Avatar
                        className="w-32 h-32 border-4 border-white shadow-glow cursor-pointer transition-all duration-300 group-hover:scale-105"
                        onClick={clickHandler}
                      >
                        <AvatarImage src={user?.image} alt="profile pic" />
                      </Avatar>
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Change Photo</span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={InputRef}
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold gradient-text">{user?.name}</h2>
                      {user?.bio && (
                        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                          {user.bio}
                        </p>
                      )}
                    </div>

                    {(user?.instagram || user?.facebook || user?.linkedin) && (
                      <div className="flex gap-4 mt-6">
                        {user?.instagram && (
                          <a
                            href={user.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-pink-50 rounded-full hover:bg-pink-100 transition-all duration-300 hover:scale-110 shadow-lg"
                          >
                            <Instagram className="text-pink-500 w-6 h-6" />
                          </a>
                        )}

                        {user?.facebook && (
                          <a
                            href={user.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-all duration-300 hover:scale-110 shadow-lg"
                          >
                            <Facebook className="text-blue-500 w-6 h-6" />
                          </a>
                        )}

                        {user?.linkedin && (
                          <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-all duration-300 hover:scale-110 shadow-lg"
                          >
                            <Linkedin className="text-blue-700 w-6 h-6" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-effect shadow-glow border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg gradient-text">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => router.push("/blog/new")}
                    className="w-full gradient-bg text-white font-semibold py-3 rounded-xl shadow-glow-hover transition-all duration-300 hover:scale-105"
                  >
                     Create New Blog
                  </Button>
                  
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                         Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] glass-effect border-0 rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl gradient-text">Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label className="text-gray-700 font-medium">Name</Label>
                          <Input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-1 border-2 border-gray-200 rounded-xl focus:border-purple-400 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium">Bio</Label>
                          <Input
                            value={formData.bio}
                            onChange={(e) =>
                              setFormData({ ...formData, bio: e.target.value })
                            }
                            className="mt-1 border-2 border-gray-200 rounded-xl focus:border-purple-400 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium">Instagram</Label>
                          <Input
                            value={formData.instagram}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                instagram: e.target.value,
                              })
                            }
                            className="mt-1 border-2 border-gray-200 rounded-xl focus:border-purple-400 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium">Facebook</Label>
                          <Input
                            value={formData.facebook}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                facebook: e.target.value,
                              })
                            }
                            className="mt-1 border-2 border-gray-200 rounded-xl focus:border-purple-400 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-700 font-medium">LinkedIn</Label>
                          <Input
                            value={formData.linkedin}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                linkedin: e.target.value,
                              })
                            }
                            className="mt-1 border-2 border-gray-200 rounded-xl focus:border-purple-400 transition-all duration-300"
                          />
                        </div>
                        <Button
                          onClick={handleFormSubmit}
                          className="w-full gradient-bg text-white font-semibold py-3 rounded-xl shadow-glow-hover transition-all duration-300 hover:scale-105 mt-6"
                        >
                           Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card className="glass-effect shadow-glow border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg gradient-text">Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={logoutHandler}
                    variant="outline"
                    className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                     Logout
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-effect shadow-glow border-0 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg gradient-text">Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Blogs Written</span>
                    <span className="font-bold text-purple-600">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Views</span>
                    <span className="font-bold text-purple-600">1.2k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Followers</span>
                    <span className="font-bold text-purple-600">89</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
