import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FooterSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="bg-[#F7F7F7] dark:bg-gray-800 dark:text-gray-100 py-3 flex flex-col justify-between items-center font-sans">
      <section className="flex sm:justify-between sm-max:justify-between xl:justify-evenly items-start pb-3 border-b-4 w-full xl:px-20 sm:px-10 sm-max:px-5">
        {/* logo */}
        <Link
          activeClass="active"
          to="hero"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="flex items-center sm-max:flex-col gap-2 cursor-pointer"
        >
          {loading ? (
            <Skeleton circle={true} height={60} width={60} />
          ) : (
            <img
              width="60px"
              height="60px"
              src="logoHomepage.png"
              alt="logoHomepage"
            />
          )}
          {loading ? (
            <Skeleton circle={true} height={60} width={60} />
          ) : (
            <img
              width="70px"
              height="70px"
              src="/homepageImg/cstad-removebg-preview.png"
              alt="logoHomepage"
            />
          )}
        </Link>
        {/* card info */}
        <div className="flex flex-col justify-start gap-2 items-start">
          <p className="font-semibold">
            {loading ? <Skeleton width={100} /> : "Contact Us"}
          </p>
          <div className="flex justify-center items-center gap-4">
            {loading ? (
              <Skeleton circle={true} height={28} width={28} />
            ) : (
              <MdWifiCalling3 className="w-7 h-7 text-primary" />
            )}
            {loading ? <Skeleton width={150} /> : <p>+855 95 990 910</p>}
          </div>
          <div className="flex justify-center items-center gap-4">
            {loading ? (
              <Skeleton circle={true} height={28} width={28} />
            ) : (
              <FaLocationDot className="w-7 h-7 text-primary" />
            )}
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <p>St 562, Phnom Penh 12151</p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start gap-2 items-start">
          <p className="font-semibold">
            {loading ? <Skeleton width={100} /> : "FAQS"}
          </p>

          <div className="flex justify-center items-center gap-4">
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <a href="register">Sign Up</a>
            )}
          </div>
          <div className="flex justify-center items-center gap-4">
            {loading ? <Skeleton width={150} /> : <a href="login">Log In</a>}
          </div>
        </div>
        {/* section */}
        <ul className="flex flex-col justify-start gap-2 items-start">
          <p className="font-semibold">
            {loading ? <Skeleton width={100} /> : "Explore"}
          </p>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="template"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Template
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="features"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Features
              </Link>
            )}
          </li>
          <li className="hover:text-primary cursor-pointer">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                About
              </Link>
            )}
          </li>
          <div className="hover:text-primary cursor-pointer ">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                Contact
              </Link>
            )}
          </div>
        </ul>
      </section>
      {/* copyright */}
      <p className="pt-4 pb-2">
        &copy;{" "}
        {loading ? (
          <Skeleton width={50} />
        ) : (
          `Copyright - ${new Date().getFullYear()}`
        )}
        <span className="text-primary font-medium"> Showcase</span>
      </p>
    </footer>
  );
};

export default FooterSection;
