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
}

const movieGenres: IGenres[] = [
  {
    id: 28,
    name: "액션",
  },
  {
    id: 12,
    name: "모험",
  },
  {
    id: 16,
    name: "애니메이션",
  },
  {
    id: 35,
    name: "코미디",
  },
  {
    id: 80,
    name: "범죄",
  },
  {
    id: 99,
    name: "다큐멘터리",
  },
  {
    id: 18,
    name: "드라마",
  },
  {
    id: 10751,
    name: "가족",
  },
  {
    id: 14,
    name: "판타지",
  },
  {
    id: 36,
    name: "역사",
  },
  {
    id: 27,
    name: "공포",
  },
  {
    id: 10402,
    name: "음악",
  },
  {
    id: 9648,
    name: "미스터리",
  },
  {
    id: 10749,
    name: "로맨스",
  },
  {
    id: 878,
    name: "SF",
  },
  {
    id: 10770,
    name: "TV 영화",
  },
  {
    id: 53,
    name: "스릴러",
  },
  {
    id: 10752,
    name: "전쟁",
  },
  {
    id: 37,
    name: "서부",
  },
  {
    id: 10759,
    name: "액션 & 어드벤쳐",
  },

  {
    id: 10762,
    name: "키즈",
  },

  {
    id: 10763,
    name: "뉴스",
  },
  {
    id: 10764,
    name: "리얼리티",
  },
  {
    id: 10765,
    name: "SF & 판타지",
  },
  {
    id: 10766,
    name: "연속극",
  },
  {
    id: 10767,
    name: "토크",
  },
  {
    id: 10768,
    name: "전쟁 & 정치",
  },
];

export const getGenres = (id: number): IGenres => {
  return movieGenres.filter((m) => m.id === id)[0];
};
