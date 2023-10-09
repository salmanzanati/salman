import { useEffect } from "react";
import Box from "../styles/Box.styled";
import Button from "../styles/Button.styled";
import Input from "../styles/Input.styled";
import Table from "../styles/Table.styled";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import Loading from "../Loading";
import {
  getActs,
  selectActsEntities,
  selectActsLoading,
} from "../../toolkit/actsSlice";

const Acts = () => {
  const dispatch = useDispatch();
  const bringActsData = useSelector(selectActsEntities);
  const actsLoading = useSelector(selectActsLoading);
  const [actsData, setActsData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getActs());
  }, []);
  useEffect(() => {
    setActsData(bringActsData);
  }, [bringActsData]);

  if (loading) return <Loading />;

  return (
    <Box className="flex-col gap-5 relative">
      <div className="flex justify-between">
        <Button.large>
          <Link to="/home/addAct">إضافة صنف</Link>
        </Button.large>
        <div className="flex justify-center items-center gap-5">
          <label>مربع البحث: </label>
          <Input
            className="bg-white self-start"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <Table className="p-3 rounded-2xl bg-white">
        <thead>
          <tr>
            <th>إسم الصنف</th>
            <th>عمليات</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {actsLoading === "loading" && (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          )}
          {actsData &&
            actsLoading !== "loading" &&
            actsData
              .filter((act) => act.name.includes(searchTerm))
              .map((act) => (
                <tr key={act.id}>
                  <td key="1">{act.name}</td>
                  <td key="2" className="flex gap-2 justify-center">
                    <Button.small>
                      <Link to="/home/updataAct" state={act}>
                        تعديل
                      </Link>
                    </Button.small>
                    <Button.small
                      onClick={() => {
                        const sure = confirm("هل أنت متأكد من الحذف.");
                        const docToDelete = doc(database, "acts", act.id);
                        if (sure) {
                          setLoading(true);
                          deleteDoc(docToDelete)
                            .then(() => {
                              setLoading(false);
                              dispatch(getActs());
                            })
                            .catch((err) => {
                              alert(err.message);
                            });
                        }
                      }}
                    >
                      حذف
                    </Button.small>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default Acts;
