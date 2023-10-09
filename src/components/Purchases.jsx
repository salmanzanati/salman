import { Link } from "react-router-dom";
import Button from "./styles/Button.styled";
import Input from "./styles/Input.styled";
import Table from "./styles/Table.styled";
import Container from "./styles/Container.styled";

const Purchases = () => {
  return (
    <Container>
      <div className="flex justify-center gap-2 mt-5">
        <Button.large onClick={() => {}}>إضافة فاتورة جديدة</Button.large>
        <Button.large onClick={() => {}}>حذف السطور المحددة</Button.large>
        <Button.large onClick={() => {}}>تعديل السطر المحدد</Button.large>
      </div>
      <div className="flex justify-center mt-5">
        <Input type="text" placeholder="بحث..." onChange={() => {}} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>الشراء</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>التاريخ</th>
            <th>التاجر</th>
            <th>مسددة ام لا</th>
            <th className="flex-shrink-0">عمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>سماد</td>
            <td>10</td>
            <td>35</td>
            <td>15-3-2023</td>
            <td>سلمان الزناتي</td>
            <td>غير مسددة</td>
            <td className="flex gap-1 flex-wrap justify-center">
              <Button.small onClick={() => {}}>حذف</Button.small>
              <Button.small onClick={() => {}}>تعديل</Button.small>
              <Button.small onClick={() => {}}>
                <Link to="/purchases/expenses">مصاريف</Link>
              </Button.small>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Purchases;
