import Container from "./styles/Container.styled";
import Table from "./styles/Table.styled";

const Budget = () => {
  return (
    <Table className="flex-1 px-5">
      <thead>
        <tr>
          <th>الصنف</th>
          <th>تكاليف العمال</th>
          <th>تكاليف المشتريات</th>
          <th>المبيعات</th>
          <th>الميزانية</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>بندورة</td>
          <td>100</td>
          <td>50</td>
          <td>250</td>
          <td>+100</td>
        </tr>
        <tr>
          <td>خيار</td>
          <td>100</td>
          <td>50</td>
          <td>250</td>
          <td>+100</td>
        </tr>
        <tr>
          <td>خس</td>
          <td>100</td>
          <td>50</td>
          <td>250</td>
          <td>+100</td>
        </tr>
        <tr>
          <td>كوسا</td>
          <td>100</td>
          <td>50</td>
          <td>250</td>
          <td>+100</td>
        </tr>
        <tr>
          <td>باذنجان</td>
          <td>100</td>
          <td>50</td>
          <td>250</td>
          <td>+100</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Budget;
