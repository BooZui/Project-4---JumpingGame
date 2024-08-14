export default function loadImg(dirName, numFiles) {
  const img = [];
  for (let i = 1; i <= numFiles; i++) {
    let imgHandler = new Image();
    let fileName = dirName.toLowerCase()
    imgHandler.src = `PNG/${dirName}/${fileName}${i}.png`;
    img.push(imgHandler)
  }
  
  return img;
}