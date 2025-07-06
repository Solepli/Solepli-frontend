import { getPlaceInfo } from '../api/solrouteApi';
import { useSollectDetailStore } from '../store/sollectDetailStore';
import { useSollectWriteStore } from '../store/sollectWriteStore';
import { Paragraph } from '../types';

const CLOUDFRONT_URL: string = import.meta.env.VITE_CLOUDFRONT_URL;

//detailStore에 저장된 sollect 값을 writeStore로 변환
export const transformSollectDetailToWrite = async (id: number) => {
  const detail = useSollectDetailStore.getState();

  useSollectWriteStore.setState({
    id: id, //수정할 id를 부여해 작성이 아닌 수정임을 명시
    seq: detail.contents.length + 1,
    title: detail.title,
    thumbnail: await makeThumbnail(detail.thumbnailImageUrl ?? ''),
    paragraphs: await Promise.all(
      detail.contents.map(
        //thumbnail의 seq가 0이기에 seq를 1부터 부여함
        async (content, index) => await makeParagraph(content, index + 1)
      )
    ),
    //TODO:: 쏠루트 장소 한번에 가져오는 api 생성해 대체할 것
    places: await Promise.all(
      detail.placeSummaries.map(async (place) => await getPlaceInfo(place.id))
    ),
  });
};

function makeThumbnail(url: string) {
  const thumbnailParagraph: Paragraph = {
    seq: 0, //makeParagraph에서도 0을 부여하지만, Paragraph type으로 강제했기에 선언 필요
    type: 'IMAGE',
    content: url,
  };

  //makeParagraph를 통해 이미지 주소를 File 객체로 변환
  return makeParagraph(thumbnailParagraph, 0);
}

//detailStore의 content를 writeStore의 Paragraph로 변환
async function makeParagraph(
  paragraph: Paragraph,
  seq: number
): Promise<Paragraph> {
  //Paragraph에 seq가 없으면 사진 삭제가 안되기에 꼭 부여해야 함.
  paragraph.seq = seq;
  if (paragraph.type === 'TEXT') {
    paragraph.text = paragraph.content;
  } else {
    //type이 IMAGE일 경우
    const file = await urlToFile(paragraph.content ?? '', 'image');
    paragraph.content = file.name;
    paragraph.imageUrl = URL.createObjectURL(file);
    paragraph.file = file;
  }

  return paragraph;
}

//S3에 업로드된 이미지 url을 File 객체로 반환
//S3의 CORS 정책과, 크롬의 ORIGIN 전송 안함 문제로 S3 주소의 ORIGIN을 CLOUDFRONT 주소로 변환
async function urlToFile(url: string, filename: string): Promise<File> {
  try {
    const pathname = new URL(url, CLOUDFRONT_URL).pathname;
    const response = await fetch(CLOUDFRONT_URL + pathname);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const blob = await response.blob();
    const ext = blob.type.split('/')[1] || 'jpeg';
    return new File([blob], `${filename}.${ext}`, { type: blob.type });
  } catch (err) {
    console.error('urlToFile failed:', err);
    throw err;
  }
}
