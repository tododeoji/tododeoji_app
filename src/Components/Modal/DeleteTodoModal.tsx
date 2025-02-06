import React from 'react';
import { CustomModal } from '../Common';
import Color from '../../Common/Color';
import { useDeleteTodoModalStore } from '../../stores/home';

function DeleteTodoModal() {
  const { deleteItem } = useDeleteTodoModalStore();
  const { isVisible, closeDeleteTodoModal } = useDeleteTodoModalStore();

  return (
    <CustomModal
      isVisible={isVisible}
      title={'삭제하기'}
      description={`[${deleteItem?.title}] 할 일을 삭제할까요?`}
      leftButton={{
        title: '취소하기',
        color: Color.black,
        backgroundColor: Color.white,
      }}
      rightButton={{ title: '삭제하기', color: Color.red, backgroundColor: Color.yellow }}
      onPressLeftButton={closeDeleteTodoModal}
      onPressRightButton={() => {
        console.log('delete Item ID: ', deleteItem?.id);
        closeDeleteTodoModal();
      }}
      closeModal={closeDeleteTodoModal}
    />
  );
}

export default DeleteTodoModal;
