import { NavLink, Outlet } from "react-router-dom";

function BaseLayout() {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "green" : "",
    fontSize: isActive ? "1.2rem" : "",
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink style={activeStyle} className="nav-link" to="/">
                HOME
              </NavLink>
            </li>

            <li className="nav-item">
              {/*NavLink에서는 파라미터 값을 넘겨줄 수 없다.
              일반 Link에서는 가능*/}
              <NavLink style={activeStyle} className="nav-link" to="/login">
                LOGIN
              </NavLink>
            </li>

            <li className="nav-item">
              {/*NavLink에서는 파라미터 값을 넘겨줄 수 없다.
              일반 Link에서는 가능*/}
              <NavLink style={activeStyle} className="nav-link" to="/join">
                JOIN
              </NavLink>
            </li>

            <li className="nav-item">
              {/*NavLink에서는 파라미터 값을 넘겨줄 수 없다.
              일반 Link에서는 가능*/}
              <NavLink style={activeStyle} className="nav-link" to="/board">
                BOARD
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default BaseLayout;
