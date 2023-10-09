import Button from "./styles/Button.styled";
import Container from "./styles/Container.styled";
import Table from "./styles/Table.styled";

const ProcessesWorkers = (props) => {
  return (
    <Container>
      <div className="flex justify-center gap-2 mt-5">
        <Button.large onClick={() => {}}>إضافة عامل</Button.large>
      </div>
      <Table>
        <thead>
          <tr>
            <th>العامل</th>
            <th>عدد الساعات</th>
            <th>حساب العامل</th>
            <th>حسابه مدفوع</th>
            <th className="">عمليات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props["name"]}</td>
            <td>10</td>
            <td>100</td>
            <td>{props.isPaied === "true" ? "مدفوع" : "غير مدفوع"}</td>
            <td className="flex gap-1 items-center flex-wrap justify-center">
              <Button.medium onClick={() => {}}>
                {props.isPaied === "true" ? "سحب الدفعة" : "دفع"}
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

export default ProcessesWorkers;
