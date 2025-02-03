import { DailyQuests } from './types';

export const parseDailyQuestData = (
  DailyQuestFormData: Record<string, FormDataEntryValue>
): Omit<DailyQuests, 'id'> => {
  return {
    title: DailyQuestFormData.title.toString(),
    point: Number(DailyQuestFormData.point),
    content: DailyQuestFormData.content.toString(),
    experience: Number(DailyQuestFormData.experience),
    condition: Number(DailyQuestFormData.condition),
  };
};
