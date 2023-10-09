import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/styles/Global";
import { UilBell } from "@iconscout/react-unicons";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Expenses from "./components/Expenses";
import Footer from "./components/About";
import Processes from "./components/Processes";
import ProcessesWorkers from "./components/ProcessesWorkers";
import Purchases from "./components/Purchases";
import Sales from "./components/sales/Sales";
import SickConditions from "./components/SickConditions";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AddWorker from "./components/management/AddWorker";
import AddSeller from "./components/management/AddSeller";
import AddCustomer from "./components/management/AddCustomer";
import AddAct from "./components/management/AddAct";
import AddVeg from "./components/management/AddVeg";
import AddSale from "./components/sales/AddSale";

const theme = {
  colors: {
    body: "#eee",
    bgElements: "#eee",
  },
};

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div className="flex flex-col min-h-screen ">
          <nav className="bg-main flex items-center justify-between px-5 py-3 shadow-md shadow-mainAlt z-30">
            <div className="flex items-center">
              <p className="flex items-center gap-2 text-2xl font-messiri text-gray-100 text-center pr-3">
                <img
                  src="./src/assets/icons8-vegetables-100-white.png"
                  alt="logo"
                  className="h-12"
                />
                المحاسب الزراعي
              </p>
            </div>
            <div className="flex gap-5">
              <span className="inline-block flex place-items-center cursor-pointer">
                <UilBell color="white" size="30" />
              </span>
              <span className="h-10 w-10 inline-block bg-white hover:bg-mainAlt rounded-full cursor-pointer"></span>
            </div>
          </nav>
          {/* {!stateData.access && <Login />} */}
          {/* {stateData.access && ( */}
          <div className="flex flex-1">
            <Sidebar />
            <Routes>
              {/* Management section */}
              <Route path="/" element={<Home />} />
              <Route path="/home/addWorker" element={<AddWorker />} />
              <Route
                path="/home/updataWorker"
                element={<AddWorker update={true} />}
              />
              <Route path="/home/addSeller" element={<AddSeller />} />
              <Route
                path="/home/updataSeller"
                element={<AddSeller update={true} />}
              />
              <Route path="/home/addCustomer" element={<AddCustomer />} />
              <Route
                path="/home/updataCustomer"
                element={<AddSeller update={true} />}
              />
              <Route path="/home/addAct" element={<AddAct />} />
              <Route
                path="/home/updataAct"
                element={<AddAct update={true} />}
              />
              <Route path="/home/addVeg" element={<AddVeg />} />
              <Route
                path="/home/updataVeg"
                element={<AddVeg update={true} />}
              />

              {/* Sales section */}
              <Route path="/sales" element={<Sales />} />

              <Route path="/sales/addSale" element={<AddSale />} />
              <Route
                path="/sales/updataSale"
                element={<AddSale update={true} />}
              />
              <Route path="/sickConditions" element={<SickConditions />} />
              <Route path="/processes" element={<Processes />} />
              <Route
                path="/processes/processesWorkers"
                element={<ProcessesWorkers name="salah" isPaied="true" />}
              />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/purchases/expenses" element={<Expenses />} />
              <Route path="/about" element={<Footer />} />
            </Routes>
          </div>
          {/* )} */}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
