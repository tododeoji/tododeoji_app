import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FloatingAddIcon } from '../../assets/icons';
import { useBottomSheetStore } from '../../stores/home';

function AddFloatingButton({ insetsBottom = 0 }: { insetsBottom?: number }) {
  const { openCategorySheet, ref } = useBottomSheetStore();
  return (
    <Pressable
      style={[styles.box, { bottom: insetsBottom + 16 }]}
      onPress={() => {
        console.log('press Floating Button');
        ref && openCategorySheet(ref);
      }}
    >
      <Shadow distance={10} offset={[0, 10]} startColor={'#C8C8C8'} style={styles.shadow} />
      <FloatingAddIcon width={50} height={50} style={styles.icon} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    right: 24,
    borderRadius: 25,
    width: 45,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shadow: { borderRadius: 25, width: 30, height: 30 },
  icon: { position: 'absolute', top: 0, right: -3, zIndex: 100 },
});

export default AddFloatingButton;
