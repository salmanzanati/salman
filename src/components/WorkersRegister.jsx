import SelectMenu from "./elements/SelectMenu";
import Button from "./styles/Button.styled";
import Container from "./styles/Container.styled";
import Table from "./styles/Table.styled";

const WorkersRegister = () => {
  return (
    <Container>
      <div className="flex items-center justify-between flex- gap-2 bg-gray-100 mt-5 p-5">
        <SelectMenu />
        <Button.large onClick={() => {}}>تسديد العمليات المحددة</Button.large>
        <Button.large onClick={() => {}}>تسديد كامل الحساب</Button.large>
      </div>
      <Table>
        <thead>
          <tr>
            <th>العملية</th>
            <th>الصنف</th>
            <th>عدد الساعات</th>
            <th>سعر الساعة</th>
            <th>حساب العملية</th>
            <th>تاريخ العملية</th>
            <th>تم التسديد</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>قطف</td>
            <td>بندورة</td>
            <td>5</td>
            <td>6</td>
            <td>30</td>
            <td>19-12-2023</td>
            <td>نعم</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default WorkersRegister;
