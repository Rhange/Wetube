import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList");
const delBtn = commentList.querySelectorAll("button");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = targetLi => {
  commentList.removeChild(targetLi);
  decreaseNumber();
};

const sendDelComment = async targetLi => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId: targetLi.id
    }
  });
  if (response.status === 200) {
    delComment(targetLi);
  }
};

const handleClick = e => {
  // console.log(e.target);
  // console.log(e.target.parentNode);
  const targetLi = e.target.parentNode;
  sendDelComment(targetLi);
};

const init = () => {
  //   console.log(delBtn);
  delBtn.forEach(each => each.addEventListener("click", handleClick));
};

if (commentNumber && commentNumber.innerText > 0) {
  init();
}
