import { create } from 'zustand';
import { Paragraph, placeSummary } from '../types';

interface SollectDetailStore {
  thumbnailImageUrl:string|undefined;
  title:string|null;
  placeName:string|null;
  otherPlaceCount:number;
  district:string|null;
  neighborhood:string|null;
  profileImageUrl:string|undefined;
  nickname:string|null;
  createdAt:string|null;
  contents:Paragraph[];
  markedCount:number;
  placeSummaries:placeSummary[];
  writerId:number;

  setSollectDetail:(data:SollectDetailStore)=>void;
}

export const useSollectDetailStore = create<SollectDetailStore>((set) => ({
  thumbnailImageUrl:undefined,
  title:null,
  placeName:null,
  otherPlaceCount:0,
  district:null,
  neighborhood:null,
  profileImageUrl:undefined,
  nickname:null,
  createdAt:null,
  contents:[],
  markedCount:0,
  placeSummaries:[],
  writerId:0,

  setSollectDetail:(data)=>set(()=>({...data})),

}));
