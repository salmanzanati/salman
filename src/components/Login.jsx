import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebaseConfig";
import { useEffect } from "react";
// import { selectAlldata, updateAccess } from "../toolkit/slice";
// import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  let inputValue = "";
  const collectionRef = collection(database, "users");
  // const dispatch = useDispatch();
  // const stateData = useSelector((state) => state.accountInfo.value);
  // const stateData = useSelector(selectAlldata);

  let isUserFound = null;

  const checkOnUser = () => {
    // comment the inputs
    let input = document.getElementById("input");
    let submitBtn = document.getElementById("submitBtn");
    input.value = localStorage.accessCode;
    input.disabled = true;
    submitBtn.disabled = true;
    submitBtn.style.cursor = "not-allowed";
    submitBtn.textContent = "جارِ التحميل...";

    // getting the users and check if the input accessCode equal to any of them
    getDocs(collectionRef)
      .then((response) => {
        response.docs.map((item) => {
          if (item.data().accessCode === inputValue) {
            isUserFound = true;
            // dispatch(updateAccess());
            localStorage.accessCode = inputValue;
          } else isUserFound = false;
        });
        if (isUserFound === false) {
          isUserFound = null;
          input.value = "";
          input.disabled = false;
          submitBtn.disabled = false;
          submitBtn.style.cursor = "pointer";
          submitBtn.textContent = "إرسال";
          alert("خطأ في إدخال الكود, الرجاء المحاولة مرة اخرى.");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // checking if the user has loged in befor
    if (
      localStorage.accessCode &&
      inputValue === ""
      // && stateData.access == false
    ) {
      inputValue = localStorage.accessCode;
      checkOnUser();
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    checkOnUser();
  };

  return (
    <div className="flex justify-center items-center flex-1">
      <form
        onSubmit={handleSubmit}
        className="shadow-sm shadow-gray-300 shadow-lg shadow-gray-200 rounded-lg p-5 flex flex-col gap-5"
      >
        <label htmlFor="codeInput" className="font-semibold text-xl">
          أدخل الكود الخاص بك:{" "}
        </label>
        <input
          type="text"
          id="input"
          placeholder="الكود..."
          className="border-2 border-solid bg-gray-200 border-gray-200 rounded-md py-3 px-5 focus:border-main focus:outline-none"
          onChange={(e) => {
            inputValue = e.target.value;
          }}
        />
        <button
          type="submit"
          className="p-3 rounded-md bg-main text-white text-xl self-center font-semibold"
          id="submitBtn"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default Login;
