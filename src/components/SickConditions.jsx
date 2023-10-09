import Button from "./styles/Button.styled";
import Container from "./styles/Container.styled";
import Input from "./styles/Input.styled";
import Table from "./styles/Table.styled";

const SickConditions = () => {
  return (
    <Container>
      <div className="flex justify-center gap-2 mt-5">
        <Button.large onClick={() => {}}>التعديل على حالة</Button.large>
        <Button.large onClick={() => {}}>حالة جديدة</Button.large>
        <Button.large onClick={() => {}}>حذف الحالات المحددة</Button.large>
      </div>
      <div className="flex justify-center mt-5">
        <Input type="text" placeholder="بحث..." onChange={() => {}} />
      </div>
      <Table>
        <thead>
          <tr>
            <th>إسم الحالة</th>
            <th>شرح</th>
            <th>عمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>بقع صفراء على البندورة</td>
            <td className="flex-1">
              بقع صفراء تظهر على ثمار البندورة بعد مرور موجة صقيع
            </td>
            <td className="flex justify-center items-center gap-1">
              <Button.medium onClick={() => {}}>صورة</Button.medium>
              <Button.medium onClick={() => {}}>مزيد</Button.medium>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default SickConditions;
