import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DELIVERY_FEE_LIMIT = 50000;
const Main = () => {
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [list, setList] = useState();

  const refInput = useRef(null);

  function handleFocus() {
    console.log(refInput.current.value);
    refInput.current.focus();
  }
  function priceSort() {
    console.log("priceSort");
    let tempArray = [...list];
    tempArray.sort((a, b) => {
      return a.price - b.price;
    });
    setList(tempArray);
    console.log(list);
  }

  const nv = useNavigate();

  const makeList = (data) => {
    let totalValue = 0;
    const result = data.map((item) => {
      totalValue = totalValue + item.price;
      return (
        <div
          key={item.id}
          style={{
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "100px 200px 140px",
            gap: "10px",
            padding: "10px",
          }}
          onClick={() => {
            nv(`/detail/${item.id}`);
          }}
        >
          <div>
            <img
              height={"100px"}
              width={"100px"}
              src={require(`../img/${item.image}`)}
              alt={item.name}
            />
          </div>
          <div>{item.title}</div>
          <div style={{ textAlign: "right" }}>
            {item?.price?.toLocaleString()}
          </div>
        </div>
      );
    });
    setTotal(totalValue);
    return result;
  };

  useEffect(() => {
    const value = total > DELIVERY_FEE_LIMIT ? 0 : 3000;
    setDelivery(value);
  }, [total]);

  //axios
  useEffect(() => {
    const mockData = [
      {
        id: 2,
        title: "네스프레소 커피머신",
        price: 134950,
        image: "3.jpeg",
      },
      {
        id: 1,
        title: "Apple AirPods Pro",
        price: 239000,
        image: "1.jpeg",
      },
      {
        id: 3,
        title: "스타벅스 텀블러",
        price: 35000,
        image: "2.jpeg",
      },
    ];
    setList(makeList(mockData));
    //axios.get("http://localhost:3300/v1/cartList").then((respose) => {
    //  console.log(respose?.data);
    //  if (respose?.data?.cartList) {
    //    const listData = respose?.data?.cartList;
    //    setList(makeList(listData));
    //  }
    //});
  }, []);

  return (
    <div style={{ width: "480px", margin: "auto", border: "1px solid" }}>
      <div
        style={{ border: "1px solid", textAlign: "center", padding: "10px" }}
      >
        제목제목
      </div>
      <div onClick={() => priceSort()}>가격순 </div>
      <div>
        <input type="text" ref={refInput} />
        <input type="button" value="입력" onClick={() => handleFocus()} />
      </div>
      <div>{list}</div>
      <div>
        <div
          style={{ border: "1px solid", textAlign: "center", padding: "10px" }}
        >
          ※배달비 3,000원 (블라블라)
        </div>
        <div style={{ marginLeft: "auto", width: "50%", padding: "10px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>상품금액 합계</div>
            <div style={{ marginLeft: "auto" }}>
              {total > 0 ? total.toLocaleString() : 0}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>배달비</div>
            <div style={{ marginLeft: "auto" }}>
              {total > 0 && delivery > 0 ? delivery.toLocaleString() : 0}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>결제필요금액</div>
            <div style={{ marginLeft: "auto" }}>
              {Number(total + delivery).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
