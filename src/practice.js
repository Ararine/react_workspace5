import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./commonApi/todoApi";
import TableRow from "./components/board/table_row";

const BoardList = () => {
  const [boardList, setBoardList] = useState();
  const [pv, setPv] = useState({ currentPage: 1 });
  const { currentPage } = useParam().currentPage;

  useEffect(() => {
    getTemplateInstallPackage(currentPage ? currentPage : 1);
  }, []);

  const getList = async (currentPage) => {
    await axios
      .get(baseUrl + "/board/list?" + currentPage)
      .then((res) => {
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
      <table>
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
        endPage={pv.startPage}
        blockPage={pv.blockPage}
        totalPabe={pv.totalPage}
        getList={getList}
      />
    </div>
  );
};

const TableRow = (props) => {
  const { board, currentPage } = props;

  return (
    <tr>
      <td>{board.num}</td>
      <td>{board.subject}</td>
      <td>{board.writer}</td>
      <td>{board.readcount}</td>
    </tr>
  );
};

const PageNavigation = (props) => {
  const { currentPage, startPage, endPage, blockPage, totalPage } = props;

  const PageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    PageNumbers.push(i);
  }

  return (
    <nav arai-label="...">
      <ul className="pagination">
        <li className={startPage <= 1 ? "page-item disabled" : "page-item"}>
          <a
            className="page-link"
            onClick={() => getList(startPage - blockPage)}
          >
            &laquo;
          </a>
        </li>
        {PageNumbers.map((pnum, idx) => (
          <li
            className={currentPage === pnum ? "page-item active" : null}
            aria-current={currentPage === pnum ? "page" : null}
            key={pnum}
          >
            <a onClick={() => getList(pnum)}>
              <span className="page-link">{pnum}</span>
            </a>
          </li>
        ))}

        <li
          className={endPage >= totalPage ? "page-item disabled" : "page-item"}
        >
          <a
            className="page-link"
            onClick={() => getList(startPage + blockPage)}
          >
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};
