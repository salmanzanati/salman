import { useState } from "react";
import Input from "../styles/Input.styled";
import Box from "../styles/Box.styled";
import Container from "../styles/Container.styled";
import Button from "../styles/Button.styled";
import Select from "../styles/Select.styled";
import { database } from "../../firebaseConfig.js";
import "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import LoadingLine from "../LoadingLine";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const AddSale = ({ update }) => {
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const [veg, setVeg] = useState();
  const [customer, setCustomer] = useState();
  const [loading, setLoading] = useState(false);

  let { state } = useLocation();

  useEffect(() => {
    if (update) {
      setQuantity(state.quantity);
      setPrice(state.price);
      setDate(state.date);
      setIsPaid(state.isPaid);
      const vegDoc = doc(database, "vegs", state.vegId);
      setVeg(vegDoc);
      const customerDoc = doc(database, "customers", state.customerId);
      setCustomer(customerDoc);
    }
  }, []);
  const onQuantityChange = (e) => setQuantity(e.target.value);
  const onPriceChange = (e) => setPrice(e.target.value);
  const onDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const timestemp = Timestamp.fromDate(selectedDate);
    setDate(timestemp);
  };
  const onIsPaidChange = () => setIsPaid(!isPaid);
  const onVegChange = (e) => {
    const theVeg = doc(database, "vegs", e.target.value);
    setVeg(theVeg);
  };
  const onCustomerChange = (e) => {
    const theCustomer = doc(database, "customers", e.target.value);
    setCustomer(theCustomer);
  };

  const collectionRef = collection(database, "sales");

  const handleAdding = () => {
    setLoading(true);
    addDoc(collectionRef, {
      veg,
      quantity,
      price,
      date,
      customer,
      isPaid,
    })
      .then(() => {
        setLoading(false);
        alert("تمت الإضافة بنجاح.");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleUpdating = () => {
    const docToUpdate = doc(database, "sales", state.id);
    setLoading(true);
    updateDoc(docToUpdate, {
      veg,
      quantity,
      price,
      date,
      customer,
      isPaid,
    })
      .then(() => {
        setLoading(false);
        alert("تمت التعديل بنجاح.");
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
          {update ? "تعديل بيانات الفاتورة" : "إضافة فاتورة جديد"}
        </h1>
        <form className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            <label htmlFor="saleQuanity">أدخل الكمية: </label>
            <Input
              id="saleQuantity"
              name="saleQuantity"
              type="number"
              placeholder="الكمية..."
              value={update && quantity}
              onChange={onQuantityChange}
              disabled={loading === "loading" ? true : false}
            />
            <label htmlFor="salePrice">أدخل السعر: </label>
            <Input
              id="salePrice"
              name="salePrice"
              type="number"
              placeholder="السعر..."
              value={update && price}
              onChange={onPriceChange}
              disabled={loading === "loading" ? true : false}
            />
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="saleVeg">إختر الصنف: </label>
            <Select
              id="saleVeg"
              name="saleVeg"
              onChange={onVegChange}
              value={update && veg}
              disabled={loading === "loading" ? true : false}
            >
              <option value="" disabled selected></option>
              <option value="vP0jvuRKLM0vjTpwRiw0">1 صنف</option>
              <option value="vP0jvuRKLM0vjTpwRiw0">2 صنف</option>
            </Select>
            <label htmlFor="saleCustomer">إختر الزبون: </label>
            <Select
              id="saleCustomer"
              name="saleCustomer"
              value={update && customer}
              onChange={onCustomerChange}
              disabled={loading === "loading" ? true : false}
            >
              <option value="" disabled selected></option>
              <option value={"pW1B4qP9Q3s7RiOps7WI"}>1 زبون</option>
              <option value={"pW1B4qP9Q3s7RiOps7WI"}>زبون 2</option>
            </Select>
          </div>
          <div className="flex gap-5 items-center">
            <label htmlFor="saleDate">أدخل التاريخ: </label>
            <Input
              id="saleDate"
              name="saleDate"
              type="date"
              placeholder="التاريخ..."
              value={update && date}
              onChange={onDateChange}
              disabled={loading === "loading" ? true : false}
            />
            <label htmlFor="saleIsPaid" className="flex items-center gap-3">
              مسددة أم لا :
              <Input
                id="saleIsPaid"
                name="saleIsPaid"
                type="checkbox"
                placeholder="مسددة أم لا..."
                value={update && isPaid}
                onChange={onIsPaidChange}
                disabled={loading === "loading" ? true : false}
              />
            </label>
          </div>

          <Button.large
            id="addSaleSubmitBtn"
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

export default AddSale;
