import { useEffect } from "react";
import {
  getWorkers,
  selectWorkersEntities,
  selectWorkersLoading,
} from "../../toolkit/wokersSlice";
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

const Workers = () => {
  const dispatch = useDispatch();
  const bringWorkersData = useSelector(selectWorkersEntities);
  const workersLoading = useSelector(selectWorkersLoading);
  const [workersData, setWorkersData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getWorkers());
  }, []);
  useEffect(() => {
    setWorkersData(bringWorkersData);
  }, [bringWorkersData]);

  if (loading) return <Loading />;

  return (
    <Box className="flex-col gap-5 relative">
      <div className="flex justify-between">
        <Button.large>
          <Link to="/home/addWorker">إضافة عامل</Link>
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
            <th>الإسم الكامل</th>
            <th>رقم الهاتف</th>
            <th>عمليات</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {workersLoading === "loading" && (
            <tr>
              <td>
                <Loading />
              </td>
            </tr>
          )}
          {workersData &&
            workersLoading !== "loading" &&
            workersData
              .filter((worker) => {
                const workerValues = Object.values(worker);
                return workerValues.some((value) =>
                  value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                );
              })
              .map((worker) => (
                <tr key={worker.id}>
                  <td key="1">{worker.fullName}</td>
                  <td key="2">{worker.phone}</td>
                  <td key="3" className="flex gap-2 justify-center">
                    <Button.small>صورة</Button.small>
                    <Button.small>
                      <Link to="/home/updataWorker" state={worker}>
                        تعديل
                      </Link>
                    </Button.small>
                    <Button.small
                      onClick={() => {
                        const sure = confirm("هل أنت متأكد من الحذف.");
                        const docToDelete = doc(database, "workers", worker.id);
                        if (sure) {
                          setLoading(true);
                          deleteDoc(docToDelete)
                            .then(() => {
                              setLoading(false);
                              dispatch(getWorkers());
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

export default Workers;
