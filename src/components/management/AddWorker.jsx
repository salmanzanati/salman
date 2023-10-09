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

const AddWorker = ({ update }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  let { state } = useLocation();

  useEffect(() => {
    if (update) setFullName(state.fullName);
    if (update) setPhone(state.phone);
  }, []);
  const onNameChange = (e) => setFullName(e.target.value);
  const onPhoneChange = (e) => setPhone(e.target.value);

  const collectionRef = collection(database, "workers");

  const commentInput = () => {
    const workerNameInput = document.getElementById("workerName");
    const workerPhoneInput = document.getElementById("workerPhone");
    const workerPhotoInput = document.getElementById("workerPhoto");
    const addWorkerSubmitBtn = document.getElementById("addWorkerSubmitBtn");
    return {
      comment: function () {
        workerNameInput.disabled = true;
        workerPhoneInput.disabled = true;
        workerPhotoInput.disabled = true;
        addWorkerSubmitBtn.disabled = true;
      },
      unComment: function () {
        workerNameInput.value = "";
        workerPhoneInput.value = "";
        workerPhotoInput.value = "";
        workerNameInput.disabled = false;
        workerPhoneInput.disabled = false;
        workerPhotoInput.disabled = false;
        addWorkerSubmitBtn.disabled = false;
      },
    };
  };

  const handleAdding = () => {
    commentInput().comment();
    setLoading(true);
    addDoc(collectionRef, {
      fullName,
      phone,
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
    const docToUpdate = doc(database, "workers", state.id);
    commentInput().comment();
    setLoading(true);
    updateDoc(docToUpdate, {
      fullName,
      phone,
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
          {update ? "تعديل بيانات عامل" : "إضافة عامل جديد"}
        </h1>
        <form className="flex flex-col gap-2">
          <label htmlFor="workerName">أدخل إسم العامل : </label>
          <Input
            id="workerName"
            name="workerName"
            type="text"
            placeholder="الإسم..."
            value={update && fullName}
            onChange={onNameChange}
          />
          <label htmlFor="workerPhone">أدخل رقم الهاتف : </label>
          <Input
            id="workerPhone"
            name="workerPhone"
            type="text"
            placeholder="رقم الهاتف..."
            value={update && phone}
            onChange={onPhoneChange}
          />
          <label htmlFor="workerPhoto">إختر صورة : </label>
          <input id="workerPhoto" name="workerPhoto" type="file" />
          <Button.large
            id="addWorkerSubmitBtn"
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

export default AddWorker;
