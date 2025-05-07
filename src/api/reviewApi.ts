import { ReviewProps } from "../types";

export const fetchReviews = async (placeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Fetching reviews for placeId:', placeId);

  return mockReviews;
};

const mockReviews: ReviewProps[] = [
  {
    id: 1,
    username: 'eoksdjeos',
    profileImage: 'https://source.unsplash.com/random/100x100?person-1', // 샘플 이미지 URL
    date: '24.09.23',
    rating: 4.5,
    emoji: 'good',
    content: `조용하고 아늑해요 해도 잘 들어서 낮에 방문하기 좋았어요
  매 달 한 번씩은 들르고 싶은 곳이에요
  혼자 온 사람들도 많아서 눈치 안 보고 오래 있을 수 있었어요 앞으로도…`,
    images: [],
    tags: [
      '조용한',
      '고급스러운',
      '자연친화적인',
      '1인 좌석이 있는',
      '1인 메뉴가 있는',
    ],
  },
  {
    id: 2,
    username: 'slxofwjsc',
    profileImage: 'https://source.unsplash.com/random/100x100?person-2',
    date: '24.10.12',
    rating: 4.5,
    emoji: 'good',
    content: `혼자 갔는데 좋았어요
  분위기 있고 조용해서 작업에도 집중이 잘 됐습니다`,
    images: [
      'https://source.unsplash.com/random/300x300?cafe-1',
      'https://source.unsplash.com/random/300x300?coffee',
      'https://source.unsplash.com/random/300x300?window',
      'https://source.unsplash.com/random/300x300?interior',
    ],
    tags: [
      '조용한',
      '고급스러운',
      '1인 좌석이 있는',
      '1인 메뉴가 있는',
      '태그 없음',
    ],
  },
  {
    id: 3,
    username: 'pesddcsq',
    profileImage: 'https://source.unsplash.com/random/100x100?person-3',
    date: '24.10.16',
    rating: 4.5,
    emoji: 'bad',
    content: '',
    images: [],
    tags: ['조용한', '고급스러운', '트렌디한', '태그 없음'],
  },
  {
    id: 4,
    username: 'hana01',
    profileImage: 'https://source.unsplash.com/random/100x100?portrait',
    date: '24.10.20',
    rating: 4.0,
    emoji: 'good',
    content: `햇살이 잘 들어오는 창가 자리가 마음에 들었어요. 책 읽기 좋은 분위기였습니다.`,
    images: ['https://source.unsplash.com/random/300x300?window'],
    tags: ['조용한', '자연친화적인', '1인 좌석이 있는'],
  },
  {
    id: 5,
    username: 'mokcoffee',
    profileImage: 'https://source.unsplash.com/100x100/?man,coffee',
    date: '24.10.21',
    rating: 3.5,
    emoji: 'bad',
    content: `분위기는 좋았는데 커피 맛이 아쉬웠어요. 하지만 조용한 건 정말 만족!`,
    images: ['https://source.unsplash.com/300x300/?coffee,cafe'],
    tags: ['조용한', '고급스러운', '태그 없음'],
  },
  {
    id: 6,
    username: 'leemoon',
    profileImage: 'https://source.unsplash.com/100x100/?man,portrait',
    date: '24.10.22',
    rating: 4.8,
    emoji: 'good',
    content: `작업하기 너무 좋은 공간이었어요. 와이파이도 빠르고 콘센트도 많아서 좋았음.`,
    images: ['https://source.unsplash.com/300x300/?workspace,desk'],
    tags: ['조용한', '작업하기 좋은', '1인 메뉴가 있는'],
  },
  {
    id: 7,
    username: 'julia.dev',
    profileImage: 'https://source.unsplash.com/100x100/?woman,smile',
    date: '24.10.23',
    rating: 5.0,
    emoji: 'good',
    content: `완전 제 취향의 카페였어요. 음악도 잔잔하고 인테리어도 깔끔!`,
    images: [],
    tags: ['조용한', '고급스러운', '트렌디한'],
  },
  {
    id: 8,
    username: 'seon222',
    profileImage: 'https://source.unsplash.com/100x100/?person,hoodie',
    date: '24.10.24',
    rating: 3.0,
    emoji: 'bad',
    content: `너무 붐볐어요. 혼자 가기엔 좀 부담스러운 분위기였어요.`,
    images: ['https://source.unsplash.com/300x300/?crowd,cafe'],
    tags: ['트렌디한', '사람이 많은', '태그 없음'],
  }
];
