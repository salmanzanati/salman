import { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  useEffect(() => {
    let links = document.querySelectorAll("#links li a");
    if (!sessionStorage.getItem("activePartAtSidebar"))
      sessionStorage.setItem("activePartAtSidebar", "mang");
    links.forEach((link) => {
      if (link.dataset.value === sessionStorage.getItem("activePartAtSidebar"))
        link.classList.add("bg-mainAlt");
    });
    links.forEach((a) => {
      a.addEventListener("click", function () {
        links.forEach((link) => link.classList.remove("bg-mainAlt"));
        a.classList.add("bg-mainAlt");
        console.log(a.dataset.value);
        sessionStorage.setItem("activePartAtSidebar", a.dataset.value);
      });
    });
  }, []);

  return (
    <div className="bg-main text-white p-5 z-20">
      <ul id="links" className="flex flex-col gap-2 text-xl">
        <li className="text-center">
          <Link
            className="block p-1 rounded-md  hover:bg-mainAlt"
            to="/"
            data-value="mang"
          >
            إدارة
          </Link>
        </li>
        <li className="text-center">
          <Link
            className="block p-1 rounded-md hover:bg-mainAlt"
            to="/sales"
            data-value="sales"
          >
            المبيعات
          </Link>
        </li>
        {/* <li className="text-center">
          <Link
            className="block p-1 rounded-md hover:bg-mainAlt"
            to="/purchases"
            data-value="purchases"
          >
            المشتريات
          </Link>
        </li>
        <li className="text-center">
          <Link
            className="block p-1 rounded-md hover:bg-mainAlt"
            to="/sickConditions"
            data-value="sickConditions"
          >
            حالات مرضية
          </Link>
        </li>
        <li className="text-center">
          <Link
            className="block p-1 rounded-md hover:bg-mainAlt"
            to="/processes"
            data-value="processes"
          >
            العمليات
          </Link>
        </li> */}
        <li className="text-center">
          <Link
            className="block p-1 rounded-md hover:bg-mainAlt"
            to="/about"
            data-value="developerInfo"
          >
            بيانات المطور
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
