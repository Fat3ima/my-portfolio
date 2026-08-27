import { createContext } from "react";

const WorkContext = createContext({
  projects: [
    {
      type: "web",
      title: "Luqma Restaurant",
      description: "A responsive restaurant website built with HTML and CSS,.",
      details: ["HTML", "CSS", "Resposive"],
      link: "https://fat3ima.github.io/Luqma-Restaurant/",
      imgSrc: "images/web/Lluqmarestaurant.png",
      id: 1,
    },
  ],
  writings: [
    // {
    //   type: "book",
    //   title: "portfolio",
    //   author: "fatima",
    //   description: "this is my porfolio is the first one",
    //   status: "writing...",
    //   link: "",
    //   id: 1,
    // },
  ],
  courses: [
    // {
    //   title: "web course",
    //   description: "this is my porfolio is the first one",
    //   status: "ongoing...",
    //   hoursNumber: "10H",
    //   level: "beginner",
    //   link: "",
    //   id: 1,
    // },
  ],
});

export default WorkContext;
