import axios from "axios";

const baseUrl = process.env.NEXT_STATIC_BASE_URL || "http://localhost:3030/";
// const baseUrlOnline = process.env.NEXT_STATIC_BASE_URL || "https://link.herokuapp.com";
async function Post(url, data) {
  try {
    console.log("ENTROU NO POST");
    console.log(data);

    let response = await axios.post(baseUrl + url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
async function Get(url) {
  try {
    console.log("ENTROU NO GET");
    let response = await axios.get(baseUrl + url);
    // console.log(response.data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export { Post, Get };
