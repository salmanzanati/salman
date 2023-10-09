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

const AddVeg = ({ update }) => {
  const [name, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  let { state } = useLocation();

  useEffect(() => {
    if (update) setFullName(state.name);
  }, []);
  const onNameChange = (e) => setFullName(e.target.value);

  const collectionRef = collection(database, "vegs");

  const commentInput = () => {
    const vegNameInput = document.getElementById("vegName");
    const addVegSubmitBtn = document.getElementById("addVegSubmitBtn");
    return {
      comment: function () {
        vegNameInput.disabled = true;
        addVegSubmitBtn.disabled = true;
      },
      unComment: function () {
        vegNameInput.value = "";
        vegNameInput.disabled = false;
        addVegSubmitBtn.disabled = false;
      },
    };
  };

  const handleAdding = () => {
    commentInput().comment();

    setLoading(true);
    addDoc(collectionRef, {
      name,
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
    const docToUpdate = doc(database, "vegs", state.id);
    commentInput().comment();
    setLoading(true);
    updateDoc(docToUpdate, {
      name,
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
          {update ? "تعديل بيانات الصنف" : "إضافة صنف جديد"}
        </h1>
        <form className="flex flex-col gap-2">
          <label htmlFor="vegName">أدخل إسم العملية : </label>
          <Input
            id="vegName"
            name="vegName"
            type="text"
            placeholder="الإسم..."
            value={update && name}
            onChange={onNameChange}
          />
          <Button.large
            id="addVegSubmitBtn"
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

export default AddVeg;
