const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3005"
  : "https://cinema-react-next-peihsinchang.vercel.app";
