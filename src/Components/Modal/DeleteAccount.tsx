import React from 'react';
import { ConfirmButton, CustomModal } from '../Common';
import Color from '../../Common/Color';

function DeleteAccountModal({ isVisible, closeModal }: { isVisible: boolean; closeModal: () => void }) {
  return (
    <CustomModal
      isVisible={isVisible}
      title={'계정 삭제'}
      description={'계정을 삭제하면, 모든 데이터가 삭제돼요.\n그래도 정말 삭제하시겠어요?'}
      leftButton={
        <ConfirmButton title="취소하기" color={Color.black} backgroundColor={Color.yellow} onPressButton={closeModal} />
      }
      rightButton={
        <ConfirmButton
          title="네, 삭제할게요"
          color={Color.red}
          backgroundColor={Color.white}
          onPressButton={() => {
            console.log('계정 삭제');
            closeModal();
          }}
        />
      }
      closeModal={closeModal}
    />
  );
}

export default DeleteAccountModal;
