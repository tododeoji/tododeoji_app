import React from 'react';
import { ConfirmButton, CustomModal } from '../Common';
import Color from '../../Common/Color';

function LogoutModal({ isVisible, closeModal }: { isVisible: boolean; closeModal: () => void }) {
  return (
    <CustomModal
      isVisible={isVisible}
      title={'로그아웃'}
      description="로그아웃 하시겠어요?"
      leftButton={
        <ConfirmButton title="취소하기" color={Color.black} backgroundColor={Color.yellow} onPressButton={closeModal} />
      }
      rightButton={
        <ConfirmButton
          title="로그아웃"
          color={Color.black}
          backgroundColor={Color.white}
          onPressButton={() => {
            console.log('로그아웃');
            closeModal();
          }}
        />
      }
      closeModal={closeModal}
    />
  );
}

export default LogoutModal;
