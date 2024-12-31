import { useRef } from 'react';

type DragEvent = React.DragEvent<HTMLTableRowElement>;

const useDragAndDrop = () => {
  const fromRef = useRef<number | null>(null);
  const toRef = useRef<number | null>(null);

  //현재 값을 저장하고 드래그 시작한 요소에 스타일 지정
  const handleDragStart = (e: DragEvent, from: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('drag-start');
    fromRef.current = from;
  };

  //비벼진 요소의 값을 저장
  //자기 값이 아닐 때 클래스 지정
  const handleDragEnter = (e: DragEvent, from: number, to: number) => {
    if (fromRef.current !== from) {
      e.currentTarget.classList.add('drag-over');
    }
    toRef.current = to;
  };

  //자기 값이 아닐 때
  //드래그 벗어나면 스타일 제거
  const handleDragLeave = (e: DragEvent, from: number) => {
    if (fromRef.current !== from) {
      e.currentTarget.classList.remove('drag-over');
    }
  };

  //드레그 끝나면 드래그 시작할때 클레스 제거
  //모든 요소의
  const handleDragEnd = (
    e: DragEvent,
    callback: (itemId: number, position: number) => void
  ) => {
    const rows = document.querySelectorAll(e.currentTarget.tagName);
    rows.forEach(row => {
      row.classList.remove('drag-over');
    });
    e.currentTarget.classList.remove('drag-start');

    if (fromRef.current && toRef.current) {
      callback(fromRef.current, toRef.current);
    }
  };

  return { handleDragEnd, handleDragEnter, handleDragStart, handleDragLeave };
};

export default useDragAndDrop;
