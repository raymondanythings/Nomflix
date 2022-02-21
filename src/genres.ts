interface IGenresName {
  name:
    | "액션"
    | "모험"
    | "애니메이션"
    | "코미디"
    | "범죄"
    | "다큐멘터리"
    | "드라마"
    | "가족"
    | "판타지"
    | "역사"
    | "공포"
    | "음악"
    | "미스터리"
    | "로맨스"
    | "SF"
    | "TV 영화"
    | "스릴러"
    | "전쟁"
    | "서부"
    | "액션 & 어드벤쳐"
    | "키즈"
    | "뉴스"
    | "리얼리티"
    | "SF & 판타지"
    | "연속극"
    | "토크"
    | "전쟁 & 정치";
}

export interface IGenres extends IGenresName {
  id: number;
  bgColor?: string;
  color?: string;
}

const movieGenres: IGenres[] = [
  {
    id: 28,
    name: "액션",
    bgColor: "firebrick",
  },
  {
    id: 12,
    name: "모험",
    bgColor: "#fbc531",
  },
  {
    id: 16,
    name: "애니메이션",
    bgColor: "#70a1ff",
  },
  {
    id: 35,
    name: "코미디",
    bgColor: "#44bd32",
  },
  {
    id: 80,
    name: "범죄",
    bgColor: "#7f8fa6",
  },
  {
    id: 99,
    name: "다큐멘터리",
    bgColor: "#353b48",
  },
  {
    id: 18,
    name: "드라마",
    bgColor: "#9c88ff",
  },
  {
    id: 10751,
    name: "가족",
    bgColor: "#ED4C67",
  },
  {
    id: 14,
    name: "판타지",
    bgColor: "#006266",
  },
  {
    id: 36,
    name: "역사",
    bgColor: "#F79F1F",
  },
  {
    id: 27,
    name: "공포",
    bgColor: "#40407a",
  },
  {
    id: 10402,
    name: "음악",
    bgColor: "#ffda79",
  },
  {
    id: 9648,
    name: "미스터리",
    bgColor: "#2c2c54",
  },
  {
    id: 10749,
    name: "로맨스",
    bgColor: "#ff5252",
  },
  {
    id: 878,
    name: "SF",
    bgColor: "#aaa69d",
  },
  {
    id: 10770,
    name: "TV 영화",
    bgColor: "#ccae62",
  },
  {
    id: 53,
    name: "스릴러",
    bgColor: "#b33939",
  },
  {
    id: 10752,
    name: "전쟁",
    bgColor: "#ffb142",
  },
  {
    id: 37,
    name: "서부",
    bgColor: "#ffb142",
  },
  {
    id: 10759,
    name: "액션 & 어드벤쳐",
    bgColor: "#ff3838",
  },

  {
    id: 10762,
    name: "키즈",
    bgColor: "#fff200",
  },

  {
    id: 10763,
    name: "뉴스",
    bgColor: "#32ff7e",
  },
  {
    id: 10764,
    name: "리얼리티",
    bgColor: "#2f3542",
  },
  {
    id: 10765,
    name: "SF & 판타지",
    bgColor: "#aaa69d",
  },
  {
    id: 10766,
    name: "연속극",
    bgColor: "#eccc68",
  },
  {
    id: 10767,
    name: "토크",
    bgColor: "#747d8c",
  },
  {
    id: 10768,
    name: "전쟁 & 정치",
    bgColor: "#747d8c",
  },
];

export const getGenres = (id: number): IGenres => {
  return movieGenres.filter((m) => m.id === id)[0];
};
