type LoaderProps = {
  theme: string;
};
const Loader = ({ theme }: LoaderProps) => {
  //console.log("th", theme);


  return (
    <div
      className={`flex space-x-2 justify-center items-center ${
        theme === "dark" ? "bg-black" : "bg-slate-50"
      }`}
    >
      <span className="sr-only">Loading...</span>
      <div
        className={`h-8 w-8 rounded-full  animate-bounce [animation-delay:-0.3s] ${
          theme === "dark" ? "bg-white" : "bg-black"
        }`}
      ></div>
      <div
        className={`h-8 w-8  rounded-full animate-bounce [animation-delay:-0.15s] ${
          theme === "dark" ? "bg-white" : "bg-black"
        }`}
      ></div>
      <div
        className={`h-8 w-8  rounded-full animate-bounce  ${
          theme === "dark" ? "bg-white" : "bg-black"
        }`}
      ></div>
    </div>
  );
};

export default Loader;
