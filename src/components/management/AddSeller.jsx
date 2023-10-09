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

const AddSeller = ({ update }) => {
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

  const collectionRef = collection(database, "sellers");

  const commentInput = () => {
    const sellerNameInput = document.getElementById("sellerName");
    const sellerPhoneInput = document.getElementById("sellerPhone");
    const sellerPhotoInput = document.getElementById("sellerPhoto");
    const sellerDesInput = document.getElementById("sellerDes");
    const addSellerSubmitBtn = document.getElementById("addSellerSubmitBtn");
    return {
      comment: function () {
        sellerNameInput.disabled = true;
        sellerPhoneInput.disabled = true;
        sellerPhotoInput.disabled = true;
        sellerDesInput.disabled = true;
        addSellerSubmitBtn.disabled = true;
      },
      unComment: function () {
        sellerNameInput.value = "";
        sellerPhoneInput.value = "";
        sellerPhotoInput.value = "";
        sellerDesInput.value = "";
        sellerNameInput.disabled = false;
        sellerPhoneInput.disabled = false;
        sellerPhotoInput.disabled = false;
        sellerDesInput.disabled = false;
        addSellerSubmitBtn.disabled = false;
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
    const docToUpdate = doc(database, "sellers", state.id);
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
          <label htmlFor="sellerName">أدخل إسم التاجر : </label>
          <Input
            id="sellerName"
            name="sellerName"
            type="text"
            placeholder="الإسم..."
            value={update && fullName}
            onChange={onNameChange}
          />
          <label htmlFor="sellerDes">أدخل صفة التاجر : </label>
          <Input
            id="sellerDes"
            name="sellerDes"
            type="text"
            placeholder="الصفة..."
            value={update && des}
            onChange={onDesChange}
          />
          <label htmlFor="sellerPhone">أدخل رقم الهاتف : </label>
          <Input
            id="sellerPhone"
            name="sellerPhone"
            type="text"
            placeholder="رقم الهاتف..."
            value={update && phone}
            onChange={onPhoneChange}
          />
          <label htmlFor="sellerPhoto">إختر صورة : </label>
          <input id="sellerPhoto" name="sellerPhoto" type="file" />
          <Button.large
            id="addSellerSubmitBtn"
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

export default AddSeller;
