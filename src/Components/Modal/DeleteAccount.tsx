import React from 'react';
import { CustomModal } from '../Common';
import Color from '../../Common/Color';

function DeleteAccountModal({ isVisible, closeModal }: { isVisible: boolean; closeModal: () => void }) {
  return (
    <CustomModal
      isVisible={isVisible}
      title={'계정 삭제'}
      description={'계정을 삭제하면, 모든 데이터가 삭제돼요.\n그래도 정말 삭제하시겠어요?'}
      leftButton={{ title: '취소하기', color: Color.black, backgroundColor: Color.yellow }}
      rightButton={{ title: '네, 삭제할게요', color: Color.red, backgroundColor: Color.white }}
      onPressLeftButton={closeModal}
      onPressRightButton={() => {
        console.log('계정 삭제');
        closeModal();
      }}
      closeModal={closeModal}
    />
  );
}

export default DeleteAccountModal;
