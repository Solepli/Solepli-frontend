import { create } from 'zustand';
import { Announcement } from '../types';


interface AnnouncementStore {
  announcementList: Announcement[];
  setAnnouncementList: (announcementList: Announcement[]) => void;
  announcement: Announcement|null;
  setAnnouncement: (announcement: Announcement) => void;
}

export const useAnnouncementStore = create<AnnouncementStore>((set) => ({
  announcementList: [],
  setAnnouncementList: (announcementList) => set({ announcementList }),

  announcement: null,
  setAnnouncement: (announcement) => set({ announcement }),
}));
