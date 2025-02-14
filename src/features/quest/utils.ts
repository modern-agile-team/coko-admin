import { DailyQuest } from './types';

export const parseDailyQuestData = (
  DailyQuestFormData: Record<string, FormDataEntryValue>
): Omit<DailyQuest, 'id'> => {
  return {
    point: Number(DailyQuestFormData.point),
    content: DailyQuestFormData.content.toString(),
    experience: Number(DailyQuestFormData.exp),
    condition: Number(DailyQuestFormData.condition),
  };
};
