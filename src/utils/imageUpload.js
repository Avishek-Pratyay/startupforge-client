import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY;

export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
    formData
  );

  return res.data.data.url;
};