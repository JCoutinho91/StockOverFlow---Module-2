document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("StocksMaxJose JS imported successfully!");
  },
  false
);

console.log("Hello!!")

const getLike = document.querySelector(".like")
const getLikeNum = document.querySelector(".likeNum")


increaseLike = () => {
  like++
  getLikeNum.innerHTML = `${like}`
}

likeClick = () => {
  increaseLike()
}


getLike.addEventListener(("click"), likeClick)