import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req; //! Beautiful
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location }
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  // console.log(req.user);

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");

    // console.log(video.comments);
    // console.log(String(video.comments[0].creator));
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
    user
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      console.log(user.comments.length);
      user.videos = user.videos.filter(each => String(each) !== video.id);
      user.save();
      // const commentCreatorArray = video.comments.map(each => each.creator);
      // TODO: How to make if video were deleted, all user's comments have to remove from their user comments DB
      console.log(user.comments.length);
      await Video.findOneAndDelete({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

//! Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

//! Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id).populate("comments");

    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      delete: "✖"
    });

    // const checkCommentsCreator = await video.comments.map(each => each.creator);
    // console.log(checkCommentsCreator);

    video.comments.push(newComment.id);
    video.save();

    user.comments.push(newComment.id);
    user.save();

    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

//! Remove Comment

export const postDeleteComment = async (req, res) => {
  //! From API get clicked target button's 'commentId'
  // console.log(commentId);
  const {
    params: { id },
    body: { commentId },
    user
  } = req;

  try {
    const video = await Video.findById(id).populate("comments");

    //! Update Video model's comments
    const videoCommentsIdArray = video.comments.map(each => each.id);
    // console.log(videoCommentsIdArray);
    // console.log(typeof videoCommentsIdArray[0]);
    // console.log(
    //   videoCommentsIdArray.filter(each => String(each) !== commentId)
    // );
    video.comments = videoCommentsIdArray.filter(
      each => String(each) !== commentId
    );
    video.save();

    //! Update User model's comments
    // console.log(user.comments);
    const userCommentsIdArray = user.comments;
    // console.log(userCommentsIdArray);
    // console.log(typeof userCommentsIdArray[0]);
    // console.log(userCommentsIdArray.filter(each => String(each) !== commentId));
    user.comments = userCommentsIdArray.filter(
      each => String(each) !== commentId
    );
    user.save();

    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
