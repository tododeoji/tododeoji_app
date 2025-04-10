import React from 'react';
import { ConfirmButton, CustomModal } from '../Common';
import Color from '../../Common/Color';
import { useLoginStatus } from '../../stores/auth';

function LogoutModal({ isVisible, closeModal }: { isVisible: boolean; closeModal: () => void }) {
  const { setIsLoggedIn } = useLoginStatus();
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
            setIsLoggedIn(false);
            closeModal();
          }}
        />
      }
      closeModal={closeModal}
    />
  );
}

export default LogoutModal;
