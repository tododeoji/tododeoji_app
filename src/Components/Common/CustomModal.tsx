import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { H, Text } from '.';
import { FontFamily, FontStyle } from '../../Common/Font';
import Color from '../../Common/Color';

interface ModalProps {
  isVisible: boolean;
  title: string;
  description: string;
  leftButton: React.JSX.Element;
  rightButton: React.JSX.Element;
  closeModal: () => void;
}

function CustomModal({ isVisible, title, description, leftButton, rightButton, closeModal }: ModalProps) {
  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <Pressable style={styles.centeredView} onPress={closeModal}>
        <View
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <Text fontFamily={FontFamily.BOLD} fontStyle={FontStyle.description1}>
            {title}
          </Text>
          <H />
          <Text fontStyle={FontStyle.description1} color={Color.gray3}>
            {description}
          </Text>
          <H h={16} />
          <View style={styles.bottomButtonBox}>
            {leftButton}
            {rightButton}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: { width: '90%', maxWidth: 312, backgroundColor: 'white', padding: 24, borderRadius: 16 },
  bottomButtonBox: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  bottomButton: { width: 128, paddingVertical: 16, borderWidth: 1, borderColor: Color.gray2, borderRadius: 28 },
});

export default CustomModal;
