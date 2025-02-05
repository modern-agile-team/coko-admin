import { DailyQuest } from './types';

export const parseDailyQuestData = (
  DailyQuestFormData: Record<string, FormDataEntryValue>
): Omit<DailyQuest, 'id'> => {
  return {
    title: DailyQuestFormData.title.toString(),
    point: Number(DailyQuestFormData.point),
    content: DailyQuestFormData.content.toString(),
    exp: Number(DailyQuestFormData.exp),
    condition: Number(DailyQuestFormData.condition),
  };
};
