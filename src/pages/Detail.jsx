import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Detail = () => {
  const param = useParams();
  console.log("param", param);

  const nv = useNavigate();

  const [list, setList] = useState();

  const makeList = (data) => {
    return (
      <div>
        <div
          style={{ border: "1px solid", textAlign: "center", padding: "10px" }}
        >
          {data.title}
        </div>
        <div>이미지</div>
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "210px 210px",
              gap: "20px",
            }}
          >
            <div style={{ textAlign: "right" }}>상품가격</div>
            <div style={{ textAlign: "left" }}>
              {data.price && data.price > 0 ? data.price.toLocaleString() : 0}
            </div>
            <div style={{ textAlign: "right" }}>만든곳</div>
            <div style={{ textAlign: "left" }}>{data.company}</div>
            <div style={{ textAlign: "right" }}>모델명</div>
            <div style={{ textAlign: "left" }}>{data.model}</div>
          </div>
        </div>
      </div>
    );
  };

  //axios
  useEffect(() => {
    console.log(1);
    axios.get(`http://localhost:3300/v1/item/${param.id}`).then((respose) => {
      console.log(respose?.data);
      if (respose?.data?.item) {
        const listData = respose?.data?.item;
        setList(makeList(listData));
      }
    });
  }, []);

  return (
    <div style={{ width: "480px", margin: "auto", border: "1px solid" }}>
      <div
        style={{ padding: "10px" }}
        onClick={() => {
          nv("/");
        }}
      >
        {"<--"}
      </div>
      {list}
    </div>
  );
};

export default Detail;
