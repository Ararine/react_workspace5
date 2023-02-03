import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TableRow from "./table_row";
import { baseUrl } from "../../commonApi/todoApi";
import PageNavigation from "./page_nav";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [pv, setPv] = useState({ currentPage: 1 });
  const { currentPage } = useParams();

  useEffect(() => {
    getList(currentPage ? currentPage : 1);
  }, []);

  const getList = async (currentPage) => {
    await axios
      .get(baseUrl + "/board/list/" + currentPage)
      .then((res) => {
        // console.log(res.data);
        setBoardList(res.data.aList);
        setPv(res.data.pv);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Link className="btn btn-danger" to="/board/write">
        글쓰기
      </Link>

      <h3 className="text-center">게시판 목록</h3>
      <table className="table table-striped mt-6" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
          <col width="*" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {boardList.map((board) => {
            return (
              //반복문은 필수로 key 값이 필요하다
              <TableRow
                board={board}
                currentPage={currentPage}
                key={board.num}
              />
            );
          })}
        </tbody>
      </table>
      <PageNavigation
        currentPage={pv.currentPage}
        startPage={pv.startPage}
        endPage={pv.endPage}
        blockPage={pv.blockPage}
        totalPage={pv.totalPage}
        getList={getList}
      />
    </div>
  );
};

export default BoardList;
