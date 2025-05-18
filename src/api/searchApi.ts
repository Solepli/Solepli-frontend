export const fetchRecentSearchWords = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockRecentSearchWords;
};

const mockRecentSearchWords: string[] = ['강남구', '돈까스', '성수동'];
