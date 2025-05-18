export const fetchRecentSearchWords = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockRecentSearchWords;
};

export const deleteRecentSearchWords = async (keyword: string) => {
  // 하드 코딩으로 mockRecentSearchWords의 검색어 삭제
  mockRecentSearchWords = mockRecentSearchWords.filter((w) => w !== keyword);
  return mockRecentSearchWords;
};

let mockRecentSearchWords: string[] = ['강남구', '돈까스', '성수동'];
