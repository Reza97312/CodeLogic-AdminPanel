import React from "react";
import http from "../../../../interceptor/interceptor.js";


export const editNews = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("Id", payload.Id);
    formData.append("SlideNumber", payload.GroupName);
    formData.append("CurrentImageAddress", payload.CourseId);
    formData.append("CurrentImageAddressTumb", payload.GroupCapacity);
    formData.append("Active", payload.Id);
    formData.append("Title", payload.GroupName);
    formData.append("GoogleTitle", payload.CourseId);
    formData.append("GoogleDescribe", payload.GroupCapacity);
    formData.append("MiniDescribe", payload.Id);
    formData.append("Describe", payload.GroupName);
    formData.append("Keyword", payload.CourseId);
    formData.append("IsSlider", payload.GroupCapacity);
    formData.append("Keyword", payload.CourseId);
    formData.append("IsSlider", payload.GroupCapacity);
    formData.append("NewsCategoryId", payload.CourseId);
    formData.append("Image", payload.GroupCapacity);

    const result = await http.put("/News/UpdateNews", formData);
    console.log(result);
    
    return result;
  } 
  catch(err){
    console.log(err);
  }
};
