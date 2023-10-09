import { Link } from "react-router-dom";
import Button from "./styles/Button.styled";
import Input from "./styles/Input.styled";
import Table from "./styles/Table.styled";
import Container from "./styles/Container.styled";

const Processes = () => {
  return (
    <Container>
      <div className="flex justify-center gap-2 mt-5">
        <Button.large onClick={() => {}}>عملية جديدة</Button.large>
      </div>
      <div className="flex justify-center mt-5">
        <Input type="text" placeholder="بحث..." onChange={() => {}} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>العملية</th>
            <th>الصنف</th>
            <th>سعر الساعة</th>
            <th>التاريخ</th>
            <th>عمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>حواش</td>
            <td>بندورة</td>
            <td>10</td>
            <td>10-3-2023</td>
            <td className="flex justify-center items-center gap-1">
              <Button.medium onClick={() => {}}>
                <Link to="/processes/processesWorkers">العمال</Link>
              </Button.medium>
              <Button.medium onClick={() => {}}>حذف</Button.medium>
              <Button.medium onClick={() => {}}>تعديل</Button.medium>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Processes;
