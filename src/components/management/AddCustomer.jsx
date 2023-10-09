import { useState } from "react";
import Input from "../styles/Input.styled";
import Box from "../styles/Box.styled";
import Container from "../styles/Container.styled";
import Button from "../styles/Button.styled";
import { database } from "../../firebaseConfig.js";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import LoadingLine from "../LoadingLine";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const AddCustomer = ({ update }) => {
  const [fullName, setFullName] = useState("");
  const [des, setDes] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  let { state } = useLocation();

  useEffect(() => {
    if (update) setFullName(state.fullName);
    if (update) setPhone(state.phone);
    if (update) setDes(state.des);
  }, []);
  const onNameChange = (e) => setFullName(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);
  const onDesChange = (e) => setDes(e.target.value);

  const collectionRef = collection(database, "customers");

  const commentInput = () => {
    const customerNameInput = document.getElementById("customerName");
    const customerPhoneInput = document.getElementById("customerPhone");
    const customerPhotoInput = document.getElementById("customerPhoto");
    const customerDesInput = document.getElementById("customerDes");
    const addCustomerSubmitBtn = document.getElementById(
      "addCustomerSubmitBtn"
    );
    return {
      comment: function () {
        customerNameInput.disabled = true;
        customerPhoneInput.disabled = true;
        customerPhotoInput.disabled = true;
        customerDesInput.disabled = true;
        addCustomerSubmitBtn.disabled = true;
      },
      unComment: function () {
        customerNameInput.value = "";
        customerPhoneInput.value = "";
        customerPhotoInput.value = "";
        customerDesInput.value = "";
        customerNameInput.disabled = false;
        customerPhoneInput.disabled = false;
        customerPhotoInput.disabled = false;
        customerDesInput.disabled = false;
        addCustomerSubmitBtn.disabled = false;
      },
    };
  };

  const handleAdding = () => {
    commentInput().comment();

    setLoading(true);
    addDoc(collectionRef, {
      fullName,
      phone,
      des,
      imgPath: "not found",
    })
      .then(() => {
        alert("تمت الإضافة بنجاح.");
        commentInput().unComment();
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleUpdating = () => {
    const docToUpdate = doc(database, "customers", state.id);
    commentInput().comment();
    setLoading(true);
    updateDoc(docToUpdate, {
      fullName,
      phone,
      des,
    })
      .then(() => {
        setLoading(false);
        commentInput().unComment();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSubmitBtn = () => {
    if (!update) handleAdding();
    if (update) handleUpdating();
  };

  return (
    <Container className="my-5">
      <Box className="rounded-xl flex-col">
        <h1 className="font-bold text-xl">
          {update ? "تعديل بيانات التاجر" : "إضافة عامل جديد"}
        </h1>
        <form className="flex flex-col gap-2">
          <label htmlFor="customerName">أدخل إسم الزيون : </label>
          <Input
            id="customerName"
            name="customerName"
            type="text"
            placeholder="الإسم..."
            value={update && fullName}
            onChange={onNameChange}
          />
          <label htmlFor="customerDes">أدخل صفة التاجر : </label>
          <Input
            id="customerDes"
            name="customerDes"
            type="text"
            placeholder="الصفة..."
            value={update && des}
            onChange={onDesChange}
          />
          <label htmlFor="customerPhone">أدخل رقم الهاتف : </label>
          <Input
            id="customerPhone"
            name="customerPhone"
            type="text"
            placeholder="رقم الهاتف..."
            value={update && phone}
            onChange={onPhoneChange}
          />
          <label htmlFor="customerPhoto">إختر صورة : </label>
          <input id="customerPhoto" name="customerPhoto" type="file" />
          <Button.large
            id="addCustomerSubmitBtn"
            type="button"
            onClick={() => {
              handleSubmitBtn();
            }}
          >
            {!loading && !update && "إرسال"}
            {loading && <LoadingLine />}
            {!loading && update && "تعديل"}
          </Button.large>
        </form>
      </Box>
    </Container>
  );
};

export default AddCustomer;
