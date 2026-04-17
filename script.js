const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(urlObj) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = urlObj.url;

    img.onload = () => resolve(img);

    img.onerror = () => reject(`Failed to load image: ${urlObj.url}`);
  });
}

async function downloadImages() {
  loading.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  Promise.all(imageUrls.map((img) => downloadImage(img))).then((res)=>
  {
 loading.style.display = "none";
 res.forEach((img) => {
      output.appendChild(img);
    });
  }).catch((err)=>
  {
 loading.style.display = "none";
  errorDiv.textContent = err;
  })


}

btn.addEventListener("click", downloadImages);
