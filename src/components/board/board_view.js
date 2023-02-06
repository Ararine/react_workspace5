import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../commonApi/todoApi";

const BoardView = () => {
  const [board, setBoard] = useState({});
  const { currentPage, num } = useParams();
  console.log(currentPage, num);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`${baseUrl}/board/view/${num}`)
      .then((res) => {
        console.log(res.data);
        setBoard(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <tbody>
          <tr>
            <th width="20%">글쓴이</th>
            <td>{board.writer}</td>
            <th width="20%">조회수</th>
            <td>{board.readcount}</td>
          </tr>

          <tr>
            <th>제목</th>
            <td colSpan="3">{board.subject}</td>
          </tr>

          <tr>
            <th>메일</th>
            <td colSpan="3">{board.email}</td>
          </tr>

          <tr>
            <th>내용</th>
            <td colSpan="3">{board.content}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BoardView;
