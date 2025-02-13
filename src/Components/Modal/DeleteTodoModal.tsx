import React from 'react';
import { ConfirmButton, CustomModal } from '../Common';
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
      leftButton={
        <ConfirmButton
          title="취소하기"
          color={Color.black}
          backgroundColor={Color.white}
          onPressButton={closeDeleteTodoModal}
        />
      }
      rightButton={
        <ConfirmButton
          title="삭제하기"
          color={Color.red}
          backgroundColor={Color.yellow}
          onPressButton={() => {
            console.log('delete Item ID: ', deleteItem?.id);
            closeDeleteTodoModal();
          }}
        />
      }
      closeModal={closeDeleteTodoModal}
    />
  );
}

export default DeleteTodoModal;
