import useDailyQuestsQuery from '../queries';

export default function DailyQuestsContainer() {
  const { data: dailyQuests } = useDailyQuestsQuery.getDailyQuests();
  return (
    <>
      {dailyQuests.map(dailyQuest => (
        <tr>
          <td>{dailyQuest.id}</td>
        </tr>
      ))}
    </>
  );
}
