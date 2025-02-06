import React from 'react';
import { CustomModal } from '../Common';
import Color from '../../Common/Color';

function LogoutModal({ isVisible, closeModal }: { isVisible: boolean; closeModal: () => void }) {
  return (
    <CustomModal
      isVisible={isVisible}
      title={'삭제하기'}
      description="로그아웃 하시겠어요?"
      leftButton={{ title: '취소하기', color: Color.black, backgroundColor: Color.yellow }}
      rightButton={{ title: '로그아웃', color: Color.black, backgroundColor: Color.white }}
      onPressLeftButton={closeModal}
      onPressRightButton={() => {
        console.log('로그아웃');
        closeModal();
      }}
      closeModal={closeModal}
    />
  );
}

export default LogoutModal;
