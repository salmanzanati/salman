import { UilLinkedin } from "@iconscout/react-unicons";
import { UilEnvelope } from "@iconscout/react-unicons";
const Footer = () => {
  return (
    <div
      className="flex justify-center items-center flex-col text-black bg-eee flex-1"
      style={{ direction: "ltr" }}
    >
      <ul className="flex gap-2">
        <li className="p-2 hover:scale-125 transition-all">
          <a href="https://www.linkedin.com/in/salah-zanati-419a1024a/">
            <UilLinkedin size="20" color="#000" />
          </a>
        </li>
        <li className="p-2 hover:scale-125 transition-all">
          <a href="mailto:salahzanati0@gmail.com">
            <UilEnvelope size="20" color="#000" />
          </a>
        </li>
      </ul>
      <hr className="w-1/4 border-black my-2" />
      <p className="p-2">
        Developed by Salah Zanati &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
