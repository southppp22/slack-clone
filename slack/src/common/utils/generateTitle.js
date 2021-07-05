function generateTitle(user, title) {
  return title.split(",").filter((el) => el !== user)[0];
}

export default generateTitle;
