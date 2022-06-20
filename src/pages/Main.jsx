import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const DELIVERY_FEE_LIMIT = 50000;
const Main = () => {
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);

  //서버에서 최초로 받아온 모든 값들을 저장하는 state를 하나 따로 두고 하는게 좋음
  const [initValArray, setInitValArray] = useState([]);

  const [activeBtn, setActiveBtn] = useState(["blue", "black", "black"]);

  const [list, setList] = useState([]);

  const refInput = useRef(null);

  //입력을 누르면 이 함수로 옴
  function handleFocus() {
    console.log(refInput.current.value);

    let searchResult = initValArray.filter(
      //완전일치 검색일때
      //(item) => item.title === refInput.current.value

      //like 검색일때
      (item) => item.title.indexOf(refInput.current.value) > -1
    );
    setList(searchResult);
  }
  function totalPrice() {
    let totalprice = 0;
    list.map((item) => (totalprice = item.price + totalprice));
    return totalprice;
  }

  //기본정렬
  function basicSort() {
    setActiveBtn(["blue", "black", "black"]);
    setList(initValArray);
  }

  //가격으로 정렬
  function priceSort() {
    console.log("priceSort");

    //버튼 컨트롤
    setActiveBtn(["black", "blue", "black"]);
    let tempArray = [...list];

    //내림차순 정렬일때
    //오름차순일때는 a,b를 반대로 빼면 됨
    tempArray.sort((a, b) => {
      return b.price - a.price;
    });

    setList(tempArray);
    console.log(list);
  }

  //id로 정렬
  function idSort() {
    //버튼 컨트롤
    setActiveBtn(["black", "black", "blue"]);
    let tempArray = [...list];

    //오름차순 정렬일때
    //내림차순일때는 a,b를 반대로 빼면 됨
    tempArray.sort((a, b) => {
      return a.id - b.id;
    });

    setList(tempArray);
    console.log(list);
  }

  const settings = {
    dots: true,
  };

  const nv = useNavigate();

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
        id: 3,
        title: "Apple AirPods Pro",
        price: 239000,
        image: "1.jpeg",
      },
      {
        id: 1,
        title: "스타벅스 텀블러",
        price: 35000,
        image: "2.jpeg",
      },
    ];
    setInitValArray(mockData);
    setList(mockData);

    //실제 api
    //axios.get("http://localhost:3300/v1/cartList").then((respose) => {
    //  console.log(respose?.data);
    //  if (respose?.data?.cartList) {
    //    const listData = respose?.data?.cartList;
    //    setList(makeList(listData));
    //  }
    //});
  }, []);

  return (
    <>
      <div style={{ width: "480px", margin: "auto", border: "1px solid" }}>
        <div
          style={{ border: "1px solid", textAlign: "center", padding: "10px" }}
        >
          제목제목
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              border: "1px solid",
              textAlign: "center",
              width: "50px",
              color: activeBtn[0],
            }}
            onClick={() => basicSort()}
          >
            기본
          </div>
          <div
            style={{
              border: "1px solid",
              textAlign: "center",
              width: "50px",
              color: activeBtn[1],
            }}
            onClick={() => priceSort()}
          >
            가격순
          </div>
          <div
            style={{
              border: "1px solid",
              textAlign: "center",
              width: "50px",
              color: activeBtn[2],
            }}
            onClick={() => idSort()}
          >
            id순
          </div>
        </div>
        <div>
          <input type="text" ref={refInput} />
          <input type="button" value="입력" onClick={() => handleFocus()} />
        </div>
        <div>
          {list.map((item) => (
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
                  //public폴더에 제공된 이미지 파일을 넣으면 됨
                  src={`/img/${item.image}`}
                  alt={item.name}
                />
              </div>
              <div>{item.title}</div>
              <div style={{ textAlign: "right" }}>
                {item?.price?.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              border: "1px solid",
              textAlign: "center",
              padding: "10px",
            }}
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
              <div style={{ marginLeft: "auto" }}>{totalPrice()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* slide 문제 나올때 쓰기 
      npm install react-slick
      npm install slick-carousel
      필요
      */}
      <div>
        <div style={{ justifyContent: "center" }} className="container">
          <Slider {...settings}>
            <div>
              <img
                src="http://placekitten.com/g/400/200"
                alt=""
                style={{ margin: "auto" }}
              />
            </div>
            <div>
              <img
                src="http://placekitten.com/g/400/200"
                alt=""
                style={{ margin: "auto" }}
              />
            </div>
            <div>
              <img
                src="http://placekitten.com/g/400/200"
                alt=""
                style={{ margin: "auto" }}
              />
            </div>
            <div>
              <img
                src="http://placekitten.com/g/400/200"
                alt=""
                style={{ margin: "auto" }}
              />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Main;
