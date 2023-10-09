import Button from "./styles/Button.styled";
import Container from "./styles/Container.styled";
import Input from "./styles/Input.styled";
import Table from "./styles/Table.styled";

function Expenses() {
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
            <th>المادة</th>
            <th>الكمية</th>
            <th>الصنف</th>
            <th>التاريخ</th>
            <th className="flex-auto">عمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>سماد</td>
            <td>10</td>
            <td>بندورة</td>
            <td>15-3-2023</td>
            <td className="flex gap-1 flex-auto justify-center items-center">
              <Button.medium onClick={() => {}}>حذف</Button.medium>
              <Button.medium onClick={() => {}}>تعديل</Button.medium>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Expenses;
