import Home from "components/home";
import Blog from "components/blog";

const navigation = {
  "/": {
    name: "home",
    component: Home,
    display: "Home",
    exact: true,
    navExact: true
  },
  "/blog": {
    name: "blog",
    component: Blog,
    display: "Blog",
    exact: false,
    navExact: false
  }
};

// Iterate through a navigation object and produce the proper results.
const map = (nav, fn) => {
  return Object.keys(nav).map((val, i) => {
    return fn(val, nav[val], i);
  });
};

export default navigation;
export { map };
