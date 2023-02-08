import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../commonApi/todoApi";

const JoinForm = () => {
  const navigator = useNavigate();

  const [member, setMember] = useState({
    username: "",
    password: "",
    email: "",
    authRole: "ROLE_MEMBER", // radio 에서 자동으로 잡혀 있는 초기값이 적용이 안되기 때문에 따로 정해준다.
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${baseUrl}/join`, member, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setMember({
          username: "",
          password: "",
          email: "",
          authRole: "ROLE_MEMBER",
        });
      })
      .then((res) => {
        navigator("/");
      })
      .catch((err) => console.error(err));
  };

  const handleValueChange = (e) => {
    // radio 버튼에서는 e.preventDefault()를 하면 더블클릭을 해줘야 한다.
    // e.preventDefault();
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <div className="container">
          <h1>회원가입</h1>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              onChange={handleValueChange}
            />
          </div>
          <div className="form-group mb-1">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={handleValueChange}
            />
          </div>
          <hr className="my-3" />
          <div className="form-group mb-3 mb-1">
            <div
              className="form-check form-check-inline  form-group"
              onChange={handleValueChange}
            >
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_ADMIN"
                  className="form-check-input"
                />
                관리자
              </label>
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_MANAGER"
                  className="form-check-input"
                />
                매니저
              </label>
              <label className="mx-5">
                <input
                  type="radio"
                  name="authRole"
                  value="ROLE_MEMBER"
                  className="form-check-input"
                  //기본값으로 설정하기 위해 사용
                  defaultChecked={true}
                />
                일반 사용자
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinForm;
